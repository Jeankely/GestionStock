<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        $currentYear = now()->year;
        $currentMonth = now()->month;

        $validSaleStatuses = ['validee', 'payee', 'livree'];

        $monthlyTurnover = Sale::query()
            ->whereIn('status', $validSaleStatuses)
            ->whereYear('sale_date', $currentYear)
            ->whereMonth('sale_date', $currentMonth)
            ->sum('total_amount');

        $soldProductsCount = SaleItem::query()
            ->whereHas('sale', function ($query) use ($validSaleStatuses) {
                $query->whereIn('status', $validSaleStatuses);
            })
            ->sum('quantity');

        $newClientsCount = Client::query()
            ->whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->count();

        $stockTotal = Product::query()
            ->sum('stock_quantity');

        $monthlyData = Sale::query()
            ->selectRaw('MONTH(sale_date) as month_number, SUM(total_amount) as amount')
            ->whereIn('status', $validSaleStatuses)
            ->whereYear('sale_date', $currentYear)
            ->groupBy(DB::raw('MONTH(sale_date)'))
            ->orderBy('month_number')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $this->monthName((int) $item->month_number),
                    'amount' => (float) $item->amount,
                ];
            });

        $bestCategory = SaleItem::query()
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->whereIn('sales.status', $validSaleStatuses)
            ->selectRaw('categories.name as name, SUM(sale_items.quantity) as total_quantity')
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total_quantity')
            ->first();

        $topProduct = SaleItem::query()
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->whereIn('sales.status', $validSaleStatuses)
            ->selectRaw('products.name as name, SUM(sale_items.quantity) as total_quantity')
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_quantity')
            ->first();

        $lastMonthTurnover = Sale::query()
            ->whereIn('status', $validSaleStatuses)
            ->whereYear('sale_date', now()->subMonth()->year)
            ->whereMonth('sale_date', now()->subMonth()->month)
            ->sum('total_amount');

        $growthRate = $lastMonthTurnover > 0
            ? (($monthlyTurnover - $lastMonthTurnover) / $lastMonthTurnover) * 100
            : 0;

        return Inertia::render('Admin/Reports/Index', [
            'reports' => [
                'monthly_turnover' => (float) $monthlyTurnover,
                'sold_products_count' => (int) $soldProductsCount,
                'new_clients_count' => (int) $newClientsCount,
                'stock_total' => (int) $stockTotal,
            ],

            'monthlyData' => $monthlyData,

            'summary' => [
                'best_category' => $bestCategory?->name ?? 'Aucune donnée',
                'top_product' => $topProduct?->name ?? 'Aucune donnée',
                'growth_rate' => round($growthRate, 1),
            ],
        ]);
    }

    private function monthName(int $month): string
    {
        return [
            1 => 'Jan',
            2 => 'Fév',
            3 => 'Mar',
            4 => 'Avr',
            5 => 'Mai',
            6 => 'Juin',
            7 => 'Juil',
            8 => 'Août',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Déc',
        ][$month] ?? '';
    }
}