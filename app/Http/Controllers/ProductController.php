<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Categorie;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with('category:id,name,icon')
            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'category_id' => $product->category_id,
                    'category_name' => $product->category?->name ?? 'Sans catégorie',
                    'category_icon' => $product->category?->icon ?? 'Package',
                    'reference' => $product->reference,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->description,
                    'purchase_price' => (float) $product->purchase_price,
                    'selling_price' => (float) $product->selling_price,
                    'stock_quantity' => $product->stock_quantity,
                    'alert_quantity' => $product->alert_quantity,
                    'status' => $product->status,
                    'image' => $product->image ? Storage::url($product->image) : null,
                    'profit' => (float) $product->profit,
                    'created_at' => $product->created_at?->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'stats' => [
                'total' => Product::query()->count(),

                'available' => Product::query()
                    ->where('status', 'disponible')
                    ->count(),

                'low_stock' => Product::query()
                    ->where('status', 'faible_stock')
                    ->count(),

                'out_of_stock' => Product::query()
                    ->where('status', 'rupture')
                    ->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/CreateUpdate', [
            'product' => null,
            'mode' => 'create',
            'categories' => $this->getCategories(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['reference'] = $this->generateReference();
        $data['slug'] = Str::slug($data['name']);

        $data['status'] = $this->resolveProductStatus(
            (int) $data['stock_quantity'],
            (int) $data['alert_quantity']
        );

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Produit créé avec succès.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/CreateUpdate', [
            'product' => [
                'id' => $product->id,
                'category_id' => $product->category_id,
                'reference' => $product->reference,
                'name' => $product->name,
                'description' => $product->description,
                'purchase_price' => (float) $product->purchase_price,
                'selling_price' => (float) $product->selling_price,
                'stock_quantity' => $product->stock_quantity,
                'alert_quantity' => $product->alert_quantity,
                'status' => $product->status,
                'image' => $product->image ? Storage::url($product->image) : null,
            ],
            'mode' => 'edit',
            'categories' => $this->getCategories(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);

        $data['status'] = $this->resolveProductStatus(
            (int) $data['stock_quantity'],
            (int) $data['alert_quantity']
        );

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']);
        }

        $product->update($data);

        return redirect()
            ->route('products.index')
            ->with('success', 'Produit modifié avec succès.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->saleItems()->count() > 0) {
            return redirect()
                ->route('products.index')
                ->with('error', 'Impossible de supprimer ce produit car il est déjà utilisé dans une vente.');
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Produit supprimé avec succès.');
    }

    private function getCategories()
    {
        return Categorie::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'icon']);
    }

    private function resolveProductStatus(int $stockQuantity, int $alertQuantity): string
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
        $lastId = Product::withTrashed()->max('id') ?? 0;

        return 'PRD-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);
    }
}