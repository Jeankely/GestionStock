<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $todaySalesAmount = Sale::query()
            ->whereDate('sale_date', $today)
            ->whereIn('status', ['payee', 'livree', 'validee'])
            ->sum('total_amount');

        $yesterdaySalesAmount = Sale::query()
            ->whereDate('sale_date', $yesterday)
            ->whereIn('status', ['payee', 'livree', 'validee'])
            ->sum('total_amount');

        $productsInStock = Product::query()
            ->where('stock_quantity', '>', 0)
            ->sum('stock_quantity');

        $previousProductsInStock = $productsInStock;

        $activeClients = Client::query()
            ->where('is_active', true)
            ->count();

        $ordersCount = Sale::query()->count();

        $previousOrdersCount = Sale::query()
            ->whereDate('created_at', '<', $today)
            ->count();

        $recentSales = Sale::query()
            ->with(['client', 'items.product'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($sale) {
                return [
                    'id' => $sale->reference,
                    'client' => $sale->client?->name ?? 'Client inconnu',
                    'product' => $sale->items
                        ->pluck('product.name')
                        ->filter()
                        ->take(2)
                        ->join(', ') ?: 'Aucun produit',
                    'amount' => $this->formatMoney($sale->total_amount),
                    'status' => $this->formatStatus($sale->status),
                ];
            });

        $stockAlerts = Product::query()
            ->whereColumn('stock_quantity', '<=', 'alert_quantity')
            ->where('stock_quantity', '>', 0)
            ->orderBy('stock_quantity')
            ->limit(5)
            ->get()
            ->map(function ($product) {
                return [
                    'name' => $product->name,
                    'stock' => $product->stock_quantity,
                ];
            });

        $topProducts = SaleItem::query()
            ->select(
                'products.id',
                'products.name',
                DB::raw('SUM(sale_items.quantity) as sales')
            )
            ->join('products', 'products.id', '=', 'sale_items.product_id')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->whereIn('sales.status', ['payee', 'livree', 'validee'])
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('sales')
            ->limit(5)
            ->get()
            ->map(function ($product) {
                return [
                    'name' => $product->name,
                    'sales' => (int) $product->sales,
                ];
            });

        $totalProfit = SaleItem::query()
            ->join('products', 'products.id', '=', 'sale_items.product_id')
            ->join('sales', 'sales.id', '=', 'sale_items.sale_id')
            ->whereIn('sales.status', ['payee', 'livree', 'validee'])
            ->selectRaw('SUM((sale_items.unit_price - products.purchase_price) * sale_items.quantity) as profit')
            ->value('profit') ?? 0;

        $categoriesCount = Categorie::query()->count();

        $availableProducts = Product::query()
            ->where('stock_quantity', '>', 0)
            ->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                [
                    'title' => 'Ventes du jour',
                    'value' => $this->formatMoney($todaySalesAmount),
                    'change' => $this->calculateChange($todaySalesAmount, $yesterdaySalesAmount),
                    'positive' => $todaySalesAmount >= $yesterdaySalesAmount,
                    'icon' => 'Wallet',
                ],
                [
                    'title' => 'Produits en stock',
                    'value' => number_format($productsInStock, 0, ',', ' '),
                    'change' => '+0%',
                    'positive' => true,
                    'icon' => 'Package',
                ],
                [
                    'title' => 'Clients actifs',
                    'value' => number_format($activeClients, 0, ',', ' '),
                    'change' => '+0%',
                    'positive' => true,
                    'icon' => 'Users',
                ],
                [
                    'title' => 'Commandes',
                    'value' => number_format($ordersCount, 0, ',', ' '),
                    'change' => $this->calculateChange($ordersCount, $previousOrdersCount),
                    'positive' => $ordersCount >= $previousOrdersCount,
                    'icon' => 'ShoppingCart',
                ],
            ],

            'recentSales' => $recentSales,
            'stockAlerts' => $stockAlerts,
            'topProducts' => $topProducts,

            'summary' => [
                'profit' => $this->formatMoney($totalProfit),
                'categories' => $categoriesCount,
                'availableProducts' => $availableProducts,
            ],
        ]);
    }

    private function formatMoney($amount): string
    {
        return number_format((float) $amount, 0, ',', ' ') . ' Ar';
    }

    private function calculateChange($current, $previous): string
    {
        if ((float) $previous === 0.0) {
            return (float) $current > 0 ? '+100%' : '0%';
        }

        $change = (($current - $previous) / $previous) * 100;

        return ($change >= 0 ? '+' : '') . number_format($change, 1, ',', ' ') . '%';
    }

    private function formatStatus(?string $status): string
    {
        return match ($status) {
            'en_attente' => 'En attente',
            'validee' => 'Validée',
            'payee' => 'Payé',
            'livree' => 'Livré',
            'annulee' => 'Annulé',
            default => ucfirst($status ?? 'Inconnu'),
        };
    }
}