<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;//importation du model categorie
use Inertia\Inertia;//importation du composant Inertia pour la redirection vers les vues
class CategorieController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Categorie::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_categorie' => 'required|string|max:255',
        ]);

        Categorie::create($request->all());

        return redirect()->route('categories.index');
    }
}
