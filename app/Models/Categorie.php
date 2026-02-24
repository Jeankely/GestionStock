<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\Produit; //importation modele active (leh table jiab managn lien table categorie )

class Categorie extends Model
{
    protected $fillable = ['nom_categorie'];// appelation attribut av @table vers model

    public function produits()
    {
        return $this->hasMany(Produit::class); //Cela veut dire que Un Categorie peut contenir plusieurs Produit
    }
}