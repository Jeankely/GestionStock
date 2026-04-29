<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Categorie;
use App\Models\SaleItem;
use App\Models\StockMovement;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'reference',
        'name',
        'slug',
        'description',
        'purchase_price',
        'selling_price',
        'stock_quantity',
        'alert_quantity',
        'status',
        'image',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'alert_quantity' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }

    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function getProfitAttribute()
    {
        return $this->selling_price - $this->purchase_price;
    }

    public function isLowStock(): bool
    {
        return $this->stock_quantity > 0
            && $this->stock_quantity <= $this->alert_quantity;
    }

    public function isOutOfStock(): bool
    {
        return $this->stock_quantity <= 0;
    }
}