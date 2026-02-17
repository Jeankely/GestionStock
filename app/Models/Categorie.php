<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\Produit; //importation modele active (Produit)

class Categorie extends Model
{
    protected $fillable = ['nom_categorie'];// appelation attribut av @table vers model

    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
}
