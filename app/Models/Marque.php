<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\Produit;

class Marque extends Model
{
    protected $fillable = ['nom_marque'];

    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
}
