<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalePaymentRequest;
use App\Models\Sale;
use App\Models\SalePayment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SalePaymentController extends Controller
{
    public function index(): Response
    {
        $payments = SalePayment::query()
            ->with([
                'sale:id,reference,client_id,total_amount,paid_amount,remaining_amount,payment_status,status',
                'sale.client:id,name,phone,email',
                'user:id,name',
            ])
            ->latest('payment_date')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'reference' => $payment->reference,
                    'payment_date' => $payment->payment_date?->format('d/m/Y'),
                    'amount' => (float) $payment->amount,
                    'method' => $payment->method,
                    'notes' => $payment->notes,
                    'user' => $payment->user?->name ?? 'Utilisateur',
                    'sale' => [
                        'id' => $payment->sale?->id,
                        'reference' => $payment->sale?->reference,
                        'client' => $payment->sale?->client?->name ?? 'Client inconnu',
                        'total_amount' => (float) ($payment->sale?->total_amount ?? 0),
                        'paid_amount' => (float) ($payment->sale?->paid_amount ?? 0),
                        'remaining_amount' => (float) ($payment->sale?->remaining_amount ?? 0),
                        'payment_status' => $payment->sale?->payment_status,
                        'status' => $payment->sale?->status,
                    ],
                ];
            });

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'stats' => [
                'total_received' => SalePayment::query()->sum('amount'),
                'payments_count' => SalePayment::query()->count(),
                'today_amount' => SalePayment::query()
                    ->whereDate('payment_date', now()->toDateString())
                    ->sum('amount'),
                'unpaid_sales' => Sale::query()
                    ->whereIn('status', ['validee', 'payee', 'livree'])
                    ->where('remaining_amount', '>', 0)
                    ->count(),
            ],
        ]);
    }

    public function create(Sale $sale): Response|RedirectResponse
    {
        if ($sale->status === 'en_attente') {
            return redirect()
                ->route('sales.index')
                ->with('error', 'Vous devez d’abord valider la vente avant d’ajouter un paiement.');
        }

        if ($sale->status === 'annulee') {
            return redirect()
                ->route('sales.index')
                ->with('error', 'Impossible d’ajouter un paiement sur une vente annulée.');
        }

        if ((float) $sale->remaining_amount <= 0) {
            return redirect()
                ->route('sales.index')
                ->with('error', 'Cette vente est déjà totalement payée.');
        }

        $sale->load('client:id,name,phone,email');

        return Inertia::render('Admin/Payments/Create', [
            'sale' => [
                'id' => $sale->id,
                'reference' => $sale->reference,
                'client' => $sale->client?->name ?? 'Client inconnu',
                'total_amount' => (float) $sale->total_amount,
                'paid_amount' => (float) $sale->paid_amount,
                'remaining_amount' => (float) $sale->remaining_amount,
                'payment_status' => $sale->payment_status,
                'status' => $sale->status,
            ],
        ]);
    }

    public function store(StoreSalePaymentRequest $request, Sale $sale): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::transaction(function () use ($data, $sale) {
                $sale = Sale::query()
                    ->lockForUpdate()
                    ->findOrFail($sale->id);

                if ($sale->status === 'en_attente') {
                    throw new \Exception('Vous devez d’abord valider la vente avant le paiement.');
                }

                if ($sale->status === 'annulee') {
                    throw new \Exception('Impossible de payer une vente annulée.');
                }

                $amount = (float) $data['amount'];
                $remainingAmount = (float) $sale->remaining_amount;

                if ($remainingAmount <= 0) {
                    throw new \Exception('Cette vente est déjà totalement payée.');
                }

                if ($amount > $remainingAmount) {
                    throw new \Exception("Le montant payé dépasse le reste à payer. Reste à payer : {$remainingAmount} Ar.");
                }

                SalePayment::query()->create([
                    'sale_id' => $sale->id,
                    'user_id' => Auth::id(),
                    'reference' => $this->generateReference(),
                    'payment_date' => $data['payment_date'],
                    'amount' => $amount,
                    'method' => 'espece',
                    'notes' => $data['notes'] ?? null,
                ]);

                $this->recalculateSalePayment($sale);
            });

            return redirect()
                ->route('payments.index')
                ->with('success', 'Paiement en espèce enregistré avec succès.');
        } catch (\Throwable $e) {
            return redirect()
                ->back()
                ->with('error', $e->getMessage())
                ->withInput();
        }
    }

    public function destroy(SalePayment $payment): RedirectResponse
    {
        try {
            DB::transaction(function () use ($payment) {
                $sale = Sale::query()
                    ->lockForUpdate()
                    ->findOrFail($payment->sale_id);

                $payment->delete();

                $this->recalculateSalePayment($sale);
            });

            return redirect()
                ->route('payments.index')
                ->with('success', 'Paiement supprimé avec succès.');
        } catch (\Throwable $e) {
            return redirect()
                ->route('payments.index')
                ->with('error', $e->getMessage());
        }
    }

    private function recalculateSalePayment(Sale $sale): void
    {
        $paidAmount = (float) SalePayment::query()
            ->where('sale_id', $sale->id)
            ->sum('amount');

        $totalAmount = (float) $sale->total_amount;
        $remainingAmount = max($totalAmount - $paidAmount, 0);

        if ($sale->status === 'annulee') {
            $sale->update([
                'paid_amount' => $paidAmount,
                'remaining_amount' => $remainingAmount,
                'payment_status' => $paidAmount >= $totalAmount && $totalAmount > 0
                    ? 'paye'
                    : ($paidAmount > 0 ? 'partiel' : 'non_paye'),
                'status' => 'annulee',
            ]);

            return;
        }

        if ($paidAmount >= $totalAmount && $totalAmount > 0) {
            $paymentStatus = 'paye';
            $saleStatus = 'payee';
        } elseif ($paidAmount > 0) {
            $paymentStatus = 'partiel';
            $saleStatus = 'validee';
        } else {
            $paymentStatus = 'non_paye';
            $saleStatus = 'validee';
        }

        $sale->update([
            'paid_amount' => $paidAmount,
            'remaining_amount' => $remainingAmount,
            'payment_status' => $paymentStatus,
            'status' => $saleStatus,
            'payment_method' => 'espece',
        ]);
    }

    private function generateReference(): string
    {
        $lastId = SalePayment::withTrashed()->max('id') ?? 0;

        return 'PAY-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);
    }
}