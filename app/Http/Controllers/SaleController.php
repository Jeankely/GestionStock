<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SalePayment;
use App\Models\StockMovement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SaleController extends Controller
{
    public function index(): Response
    {
        $sales = Sale::query()
            ->with([
                'client:id,name,phone,email',
                'user:id,name',
                'items.product:id,name,reference',
            ])
            ->latest()
            ->get()
            ->map(function ($sale) {
                return [
                    'id' => $sale->id,
                    'reference' => $sale->reference,
                    'sale_date' => $sale->sale_date?->format('d/m/Y'),
                    'client' => $sale->client?->name ?? 'Client inconnu',
                    'client_phone' => $sale->client?->phone,
                    'client_email' => $sale->client?->email,
                    'seller' => $sale->user?->name ?? 'Utilisateur',
                    'sub_total' => (float) $sale->sub_total,
                    'discount' => (float) $sale->discount,
                    'tax' => (float) $sale->tax,
                    'total_amount' => (float) $sale->total_amount,
                    'paid_amount' => (float) $sale->paid_amount,
                    'remaining_amount' => (float) $sale->remaining_amount,
                    'payment_status' => $sale->payment_status,
                    'status' => $sale->status,
                    'payment_method' => $sale->payment_method,
                    'notes' => $sale->notes,
                    'items_count' => $sale->items->count(),
                    'items' => $sale->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product' => $item->product?->name ?? 'Produit supprimé',
                            'reference' => $item->product?->reference,
                            'quantity' => $item->quantity,
                            'unit_price' => (float) $item->unit_price,
                            'discount' => (float) $item->discount,
                            'total_price' => (float) $item->total_price,
                        ];
                    }),
                ];
            });

        return Inertia::render('Admin/Sales/Index', [
            'sales' => $sales,
            'stats' => [
                'total' => Sale::query()->count(),

                'pending' => Sale::query()
                    ->where('status', 'en_attente')
                    ->count(),

                'confirmed' => Sale::query()
                    ->whereIn('status', ['payee', 'livree'])
                    ->count(),

                'cancelled' => Sale::query()
                    ->where('status', 'annulee')
                    ->count(),

                'turnover' => Sale::query()
                    ->whereIn('status', ['payee', 'livree'])
                    ->sum('total_amount'),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Sales/CreateUpdate', [
            'sale' => null,
            'mode' => 'create',
            'clients' => $this->getClients(),
            'products' => $this->getProducts(),
        ]);
    }

    public function store(StoreSaleRequest $request): RedirectResponse
    {
        $data = $request->validated();

        try {
            DB::transaction(function () use ($data) {
                $subTotal = 0;
                $itemsData = [];
                $movementsData = [];

                foreach ($data['items'] as $item) {
                    $product = Product::query()
                        ->lockForUpdate()
                        ->find($item['product_id']);

                    if (!$product) {
                        throw ValidationException::withMessages([
                            'items' => 'Un produit sélectionné est introuvable.',
                        ]);
                    }

                    if (!in_array($product->status, ['disponible', 'faible_stock'], true)) {
                        throw ValidationException::withMessages([
                            'items' => "Le produit {$product->name} n’est pas disponible.",
                        ]);
                    }

                    $quantity = (int) $item['quantity'];
                    $discount = (float) ($item['discount'] ?? 0);

                    if ($quantity <= 0) {
                        throw ValidationException::withMessages([
                            'items' => 'La quantité demandée est invalide.',
                        ]);
                    }

                    if ($quantity > $product->stock_quantity) {
                        throw ValidationException::withMessages([
                            'items' => "Stock insuffisant pour {$product->name}. Stock disponible : {$product->stock_quantity}.",
                        ]);
                    }

                    $unitPrice = (float) $product->selling_price;
                    $totalPrice = max(($unitPrice * $quantity) - $discount, 0);

                    $stockBefore = (int) $product->stock_quantity;
                    $stockAfter = $stockBefore - $quantity;

                    $product->update([
                        'stock_quantity' => $stockAfter,
                        'status' => $this->getProductStatus(
                            $stockAfter,
                            (int) $product->alert_quantity
                        ),
                    ]);

                    $subTotal += $totalPrice;

                    $itemsData[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                        'discount' => $discount,
                        'total_price' => $totalPrice,
                    ];

                    $movementsData[] = [
                        'product_id' => $product->id,
                        'user_id' => Auth::id(),
                        'type' => 'sortie',
                        'quantity' => $quantity,
                        'stock_before' => $stockBefore,
                        'stock_after' => $stockAfter,
                        'reason' => 'commande',
                    ];
                }

                $globalDiscount = (float) ($data['discount'] ?? 0);
                $tax = (float) ($data['tax'] ?? 0);
                $totalAmount = max($subTotal - $globalDiscount + $tax, 0);

                $sale = Sale::query()->create([
                    'client_id' => $data['client_id'],
                    'user_id' => Auth::id(),
                    'reference' => $this->generateReference(),
                    'sale_date' => $data['sale_date'],
                    'sub_total' => $subTotal,
                    'discount' => $globalDiscount,
                    'tax' => $tax,
                    'total_amount' => $totalAmount,

                    'paid_amount' => 0,
                    'remaining_amount' => $totalAmount,
                    'payment_status' => 'non_paye',

                    'status' => 'en_attente',
                    'payment_method' => 'espece',
                    'notes' => $data['notes'] ?? null,
                ]);

                foreach ($itemsData as $itemData) {
                    $sale->items()->create($itemData);
                }

                foreach ($movementsData as $movementData) {
                    StockMovement::query()->create([
                        ...$movementData,
                        'sale_id' => $sale->id,
                        'notes' => 'Stock réservé lors de la vente ' . $sale->reference,
                    ]);
                }
            });

            return redirect()
                ->route('sales.index')
                ->with('success', 'Vente enregistrée. Le stock est réservé, mais la vente n’est pas encore payée.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            return redirect()
                ->back()
                ->with('error', $e->getMessage())
                ->withInput();
        }
    }

    public function edit(Sale $sale): Response
    {
        if ($sale->status !== 'en_attente') {
            return Inertia::render('Admin/Sales/CreateUpdate', [
                'sale' => null,
                'mode' => 'locked',
                'clients' => $this->getClients(),
                'products' => $this->getProducts(),
            ]);
        }

        $sale->load('items');

        return Inertia::render('Admin/Sales/CreateUpdate', [
            'sale' => [
                'id' => $sale->id,
                'client_id' => $sale->client_id,
                'sale_date' => $sale->sale_date?->format('Y-m-d'),
                'discount' => (float) $sale->discount,
                'tax' => (float) $sale->tax,
                'paid_amount' => 0,
                'payment_method' => $sale->payment_method,
                'notes' => $sale->notes,
                'items' => $sale->items->map(function ($item) {
                    return [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'discount' => (float) $item->discount,
                    ];
                }),
            ],
            'mode' => 'edit',
            'clients' => $this->getClients(),
            'products' => $this->getProducts(),
        ]);
    }

    public function update(UpdateSaleRequest $request, Sale $sale): RedirectResponse
    {
        if ($sale->status !== 'en_attente') {
            return redirect()
                ->route('sales.index')
                ->with('error', 'Cette vente ne peut plus être modifiée.');
        }

        $data = $request->validated();

        try {
            DB::transaction(function () use ($data, $sale) {
                $sale = Sale::query()
                    ->with('items')
                    ->lockForUpdate()
                    ->findOrFail($sale->id);

                $this->restoreReservedStock($sale, 'modification_vente');

                $sale->items()->delete();

                $subTotal = 0;
                $itemsData = [];
                $movementsData = [];

                foreach ($data['items'] as $item) {
                    $product = Product::query()
                        ->lockForUpdate()
                        ->find($item['product_id']);

                    if (!$product) {
                        throw ValidationException::withMessages([
                            'items' => 'Un produit sélectionné est introuvable.',
                        ]);
                    }

                    if (!in_array($product->status, ['disponible', 'faible_stock'], true)) {
                        throw ValidationException::withMessages([
                            'items' => "Le produit {$product->name} n’est pas disponible.",
                        ]);
                    }

                    $quantity = (int) $item['quantity'];
                    $discount = (float) ($item['discount'] ?? 0);

                    if ($quantity <= 0) {
                        throw ValidationException::withMessages([
                            'items' => 'La quantité demandée est invalide.',
                        ]);
                    }

                    if ($quantity > $product->stock_quantity) {
                        throw ValidationException::withMessages([
                            'items' => "Stock insuffisant pour {$product->name}. Stock disponible : {$product->stock_quantity}.",
                        ]);
                    }

                    $unitPrice = (float) $product->selling_price;
                    $totalPrice = max(($unitPrice * $quantity) - $discount, 0);

                    $stockBefore = (int) $product->stock_quantity;
                    $stockAfter = $stockBefore - $quantity;

                    $product->update([
                        'stock_quantity' => $stockAfter,
                        'status' => $this->getProductStatus(
                            $stockAfter,
                            (int) $product->alert_quantity
                        ),
                    ]);

                    $subTotal += $totalPrice;

                    $itemsData[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                        'discount' => $discount,
                        'total_price' => $totalPrice,
                    ];

                    $movementsData[] = [
                        'product_id' => $product->id,
                        'user_id' => Auth::id(),
                        'type' => 'sortie',
                        'quantity' => $quantity,
                        'stock_before' => $stockBefore,
                        'stock_after' => $stockAfter,
                        'reason' => 'modification_vente',
                    ];
                }

                $globalDiscount = (float) ($data['discount'] ?? 0);
                $tax = (float) ($data['tax'] ?? 0);
                $totalAmount = max($subTotal - $globalDiscount + $tax, 0);

                $sale->update([
                    'client_id' => $data['client_id'],
                    'sale_date' => $data['sale_date'],
                    'sub_total' => $subTotal,
                    'discount' => $globalDiscount,
                    'tax' => $tax,
                    'total_amount' => $totalAmount,
                    'paid_amount' => 0,
                    'remaining_amount' => $totalAmount,
                    'payment_status' => 'non_paye',
                    'payment_method' => 'espece',
                    'notes' => $data['notes'] ?? null,
                ]);

                foreach ($itemsData as $itemData) {
                    $sale->items()->create($itemData);
                }

                foreach ($movementsData as $movementData) {
                    StockMovement::query()->create([
                        ...$movementData,
                        'sale_id' => $sale->id,
                        'notes' => 'Nouvelle réservation après modification de la vente ' . $sale->reference,
                    ]);
                }
            });

            return redirect()
                ->route('sales.index')
                ->with('success', 'Vente modifiée. Le stock réservé a été mis à jour.');
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            return redirect()
                ->back()
                ->with('error', $e->getMessage())
                ->withInput();
        }
    }

    public function confirm(Sale $sale): RedirectResponse
    {
        try {
            DB::transaction(function () use ($sale) {
                $sale = Sale::query()
                    ->with('items')
                    ->lockForUpdate()
                    ->findOrFail($sale->id);

                if (in_array($sale->status, ['payee', 'livree'], true)) {
                    throw new \Exception('Cette vente est déjà payée/livrée.');
                }

                if ($sale->status === 'annulee') {
                    throw new \Exception('Une vente annulée ne peut pas être payée.');
                }

                if ($sale->items->isEmpty()) {
                    throw new \Exception('Impossible de valider une vente sans produit.');
                }

                $stockAlreadyMoved = StockMovement::query()
                    ->where('sale_id', $sale->id)
                    ->where('type', 'sortie')
                    ->exists();

                if (!$stockAlreadyMoved) {
                    $this->reserveStockForExistingSale($sale);
                }

                $paymentAlreadyExists = SalePayment::query()
                    ->where('sale_id', $sale->id)
                    ->exists();

                if (!$paymentAlreadyExists) {
                    SalePayment::query()->create([
                        'sale_id' => $sale->id,
                        'user_id' => Auth::id(),
                        'reference' => $this->generatePaymentReference(),
                        'payment_date' => now()->toDateString(),
                        'amount' => (float) $sale->total_amount,
                        'method' => 'espece',
                        'notes' => 'Paiement en espèce après livraison de la vente ' . $sale->reference,
                    ]);
                }

                $sale->update([
                    'paid_amount' => $sale->total_amount,
                    'remaining_amount' => 0,
                    'payment_status' => 'paye',
                    'payment_method' => 'espece',
                    'status' => 'livree',
                ]);
            });

            return redirect()
                ->route('sales.index')
                ->with('success', 'Livraison validée et vente payée avec succès.');
        } catch (\Throwable $e) {
            return redirect()
                ->route('sales.index')
                ->with('error', $e->getMessage());
        }
    }

    public function cancel(Sale $sale): RedirectResponse
    {
        try {
            DB::transaction(function () use ($sale) {
                $sale = Sale::query()
                    ->with('items')
                    ->lockForUpdate()
                    ->findOrFail($sale->id);

                if ($sale->status === 'annulee') {
                    throw new \Exception('Cette vente est déjà annulée.');
                }

                if ($sale->status !== 'en_attente') {
                    throw new \Exception('Impossible d’annuler une vente déjà payée, livrée ou validée.');
                }

                if ($sale->items->isEmpty()) {
                    throw new \Exception('Impossible d’annuler une vente sans produit.');
                }

                $this->restoreReservedStock($sale, 'annulation_vente');

                SalePayment::query()
                    ->where('sale_id', $sale->id)
                    ->delete();

                $sale->update([
                    'status' => 'annulee',
                    'paid_amount' => 0,
                    'remaining_amount' => $sale->total_amount,
                    'payment_status' => 'non_paye',
                ]);
            });

            return redirect()
                ->route('sales.index')
                ->with('success', 'Vente annulée avec succès. Le stock des produits annulés a été restauré.');
        } catch (\Throwable $e) {
            return redirect()
                ->route('sales.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy(Sale $sale): RedirectResponse
    {
        try {
            DB::transaction(function () use ($sale) {
                $sale = Sale::query()
                    ->with('items')
                    ->lockForUpdate()
                    ->findOrFail($sale->id);

                if (!in_array($sale->status, ['en_attente', 'annulee'], true)) {
                    throw new \Exception('Impossible de supprimer une vente déjà payée, livrée ou validée.');
                }

                if ($sale->status === 'en_attente') {
                    $this->restoreReservedStock($sale, 'suppression_vente');
                }

                $sale->items()->delete();
                $sale->delete();
            });

            return redirect()
                ->route('sales.index')
                ->with('success', 'Vente supprimée avec succès.');
        } catch (\Throwable $e) {
            return redirect()
                ->route('sales.index')
                ->with('error', $e->getMessage());
        }
    }

    private function restoreReservedStock(Sale $sale, string $reason): void
    {
        $alreadyReturned = StockMovement::query()
            ->where('sale_id', $sale->id)
            ->where('type', 'entree')
            ->where('reason', $reason)
            ->exists();

        if ($alreadyReturned) {
            return;
        }

        foreach ($sale->items as $item) {
            $product = Product::query()
                ->lockForUpdate()
                ->find($item->product_id);

            if (!$product) {
                continue;
            }

            $stockBefore = (int) $product->stock_quantity;
            $stockAfter = $stockBefore + (int) $item->quantity;

            $product->update([
                'stock_quantity' => $stockAfter,
                'status' => $this->getProductStatus(
                    $stockAfter,
                    (int) $product->alert_quantity
                ),
            ]);

            StockMovement::query()->create([
                'product_id' => $product->id,
                'user_id' => Auth::id(),
                'sale_id' => $sale->id,
                'type' => 'entree',
                'quantity' => (int) $item->quantity,
                'stock_before' => $stockBefore,
                'stock_after' => $stockAfter,
                'reason' => $reason,
                'notes' => 'Restauration du stock pour la vente ' . $sale->reference,
            ]);
        }
    }

    private function reserveStockForExistingSale(Sale $sale): void
    {
        foreach ($sale->items as $item) {
            $product = Product::query()
                ->lockForUpdate()
                ->findOrFail($item->product_id);

            if ($product->stock_quantity < $item->quantity) {
                throw new \Exception("Stock insuffisant pour {$product->name}.");
            }

            $stockBefore = (int) $product->stock_quantity;
            $stockAfter = $stockBefore - (int) $item->quantity;

            $product->update([
                'stock_quantity' => $stockAfter,
                'status' => $this->getProductStatus(
                    $stockAfter,
                    (int) $product->alert_quantity
                ),
            ]);

            StockMovement::query()->create([
                'product_id' => $product->id,
                'user_id' => Auth::id(),
                'sale_id' => $sale->id,
                'type' => 'sortie',
                'quantity' => (int) $item->quantity,
                'stock_before' => $stockBefore,
                'stock_after' => $stockAfter,
                'reason' => 'commande',
                'notes' => 'Stock réservé pour ancienne vente ' . $sale->reference,
            ]);
        }
    }

    private function getClients()
    {
        return Client::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'phone', 'email']);
    }

    private function getProducts()
    {
        return Product::query()
            ->whereIn('status', ['disponible', 'faible_stock'])
            ->where('stock_quantity', '>', 0)
            ->orderBy('name')
            ->get([
                'id',
                'reference',
                'name',
                'selling_price',
                'stock_quantity',
                'alert_quantity',
                'image',
            ])
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'reference' => $product->reference,
                    'name' => $product->name,
                    'selling_price' => (float) $product->selling_price,
                    'stock_quantity' => $product->stock_quantity,
                    'alert_quantity' => $product->alert_quantity,
                    'image' => $product->image ? Storage::url($product->image) : null,
                ];
            });
    }

    private function generateReference(): string
    {
        $lastId = Sale::withTrashed()->max('id') ?? 0;

        return 'VNT-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);
    }

    private function generatePaymentReference(): string
    {
        $lastId = SalePayment::withTrashed()->max('id') ?? 0;

        return 'PAY-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);
    }

    private function getProductStatus(int $stockQuantity, int $alertQuantity): string
    {
        if ($stockQuantity <= 0) {
            return 'rupture';
        }

        if ($stockQuantity <= $alertQuantity) {
            return 'faible_stock';
        }

        return 'disponible';
    }
}