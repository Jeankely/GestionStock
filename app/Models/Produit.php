<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use app\Models\Categorie;// Nous avons importé tables categorie & marques satria izy roa samy managn lien @table Produit 
use app\Models\Marque;// Nous avons importé table marque
class Produit extends Model
{
     protected $fillable = [
        'prix',
        'stock',
        'marque_id',
        'categorie_id',
    ];
// Règle de metier du model "Produit" fo miasa (association et cardinalité avy @MCD)
    public function marque()
    {
        return $this->belongsTo(Marque::class); //Cela veut dire que Un Prod a une seule Marque
    }

    public function categorie() //Cela veut dire que Un Prod a une seule catégorie
    {
        return $this->belongsTo(Categorie::class);
    }
}
