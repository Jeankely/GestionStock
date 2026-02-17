<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\Categorie;
use app\Models\Marque;

class Produit extends Model
{
     protected $fillable = [
        'prix',
        'stock',
        'marque_id',
        'categorie_id'
    ];

    public function marque()
    {
        return $this->belongsTo(Marque::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
}
