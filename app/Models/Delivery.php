<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Sale;
use App\Models\User;

class Delivery extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id',
        'livreur_id',
        'delivery_address',
        'delivery_phone',
        'status',
        'scheduled_date',
        'delivered_at',
        'notes',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'delivered_at' => 'datetime',
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function livreur()
    {
        return $this->belongsTo(User::class, 'livreur_id');
    }
}