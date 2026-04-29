<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Client;
use App\Models\User;
use App\Models\SaleItem;
use App\Models\StockMovement;
use App\Models\SalePayment;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id',
        'user_id',
        'reference',
        'sale_date',
        'sub_total',
        'discount',
        'tax',
        'total_amount',
        'paid_amount',
        'remaining_amount',
        'payment_status',
        'status',
        'payment_method',
        'notes',
    ];

    protected $casts = [
        'sale_date' => 'date',
        'sub_total' => 'decimal:2',
        'discount' => 'decimal:2',
        'tax' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'remaining_amount' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function payments()
    {
        return $this->hasMany(SalePayment::class);
    }

    public function calculateTotals(): void
    {
        $subTotal = $this->items()->sum('total_price');

        $total = $subTotal - $this->discount + $this->tax;

        $this->update([
            'sub_total' => $subTotal,
            'total_amount' => $total,
            'remaining_amount' => $total - $this->paid_amount,
            'payment_status' => $this->paid_amount >= $total
                ? 'paye'
                : ($this->paid_amount > 0 ? 'partiel' : 'non_paye'),
        ]);
    }
}