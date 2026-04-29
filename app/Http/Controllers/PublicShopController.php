<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicOrderRequest;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\StockMovement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PublicShopController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with('category:id,name,icon')
            ->whereIn('status', ['disponible', 'faible_stock'])
            ->where('stock_quantity', '>', 0)
            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'reference' => $product->reference,
                    'name' => $product->name,
                    'description' => $product->description,
                    'selling_price' => (float) $product->selling_price,
                    'stock_quantity' => $product->stock_quantity,
                    'category_name' => $product->category?->name ?? 'Sans catégorie',
                    'image' => $product->image ? Storage::url($product->image) : null,
                ];
            });

        return Inertia::render('Shop/Index', [
            'products' => $products,
        ]);
    }

    public function store(StorePublicOrderRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $client = $this->findOrCreateClient($data);

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

                if ($quantity <= 0) {
                    throw ValidationException::withMessages([
                        'items' => 'La quantité demandée est invalide.',
                    ]);
                }

                if ($quantity > $product->stock_quantity) {
                    throw ValidationException::withMessages([
                        'items' => "Stock insuffisant pour le produit {$product->name}. Stock disponible : {$product->stock_quantity}.",
                    ]);
                }

                $unitPrice = (float) $product->selling_price;
                $totalPrice = $unitPrice * $quantity;

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
                    'discount' => 0,
                    'total_price' => $totalPrice,
                ];

                $movementsData[] = [
                    'product_id' => $product->id,
                    'user_id' => null,
                    'type' => 'sortie',
                    'quantity' => $quantity,
                    'stock_before' => $stockBefore,
                    'stock_after' => $stockAfter,
                    'reason' => 'commande',
                    'notes' => null,
                ];
            }

            $sale = Sale::create([
                'client_id' => $client->id,
                'user_id' => null,
                'reference' => $this->generateReference(),
                'sale_date' => now()->toDateString(),
                'sub_total' => $subTotal,
                'discount' => 0,
                'tax' => 0,
                'total_amount' => $subTotal,

                // La commande n’est pas encore payée.
                'paid_amount' => 0,
                'remaining_amount' => $subTotal,
                'payment_status' => 'non_paye',

                // En attente de livraison / validation admin.
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
                    'notes' => 'Stock réservé lors de la commande ' . $sale->reference,
                ]);
            }
        });

        return redirect()
            ->route('shop.index')
            ->with('success', 'Votre commande a été envoyée avec succès. Le stock est réservé. Paiement après validation de la livraison.');
    }

    private function findOrCreateClient(array $data): Client
    {
        $client = Client::withTrashed()
            ->where(function ($query) use ($data) {
                if (!empty($data['email'])) {
                    $query->where('email', $data['email']);
                }

                if (!empty($data['phone'])) {
                    if (!empty($data['email'])) {
                        $query->orWhere('phone', $data['phone']);
                    } else {
                        $query->where('phone', $data['phone']);
                    }
                }
            })
            ->first();

        if ($client) {
            if ($client->trashed()) {
                $client->restore();
            }

            $client->update([
                'name' => $data['name'],
                'email' => $data['email'] ?? $client->email,
                'phone' => $data['phone'],
                'address' => $data['address'] ?? $client->address,
                'type' => $data['type'] ?? $client->type,
                'is_active' => true,
            ]);

            return $client;
        }

        return Client::create([
            'name' => $data['name'],
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'],
            'address' => $data['address'] ?? null,
            'type' => $data['type'] ?? 'particulier',
            'is_active' => true,
        ]);
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

    private function generateReference(): string
    {
        $lastId = Sale::withTrashed()->max('id') ?? 0;

        return 'VNT-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);
    }
}