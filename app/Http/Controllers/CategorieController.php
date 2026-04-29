<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategorieController extends Controller
{
    public function index(): Response
    {
        $categories = Categorie::query()
            ->withCount('products')
            ->latest()
            ->get()
            ->map(function ($categorie) {
                return [
                    'id' => $categorie->id,
                    'name' => $categorie->name,
                    'slug' => $categorie->slug,
                    'description' => $categorie->description,
                    'icon' => $categorie->icon,
                    'is_active' => $categorie->is_active,
                    'products_count' => $categorie->products_count,
                    'created_at' => $categorie->created_at?->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/CreateUpdate', [
            'categorie' => null,
            'mode' => 'create',
        ]);
    }

    public function store(StoreCategorieRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);

        Categorie::create($data);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Catégorie créée avec succès.');
    }

    public function edit(Categorie $categorie): Response
    {
        return Inertia::render('Admin/Categories/CreateUpdate', [
            'categorie' => [
                'id' => $categorie->id,
                'name' => $categorie->name,
                'description' => $categorie->description,
                'icon' => $categorie->icon,
                'is_active' => $categorie->is_active,
            ],
            'mode' => 'edit',
        ]);
    }

    public function update(UpdateCategorieRequest $request, Categorie $categorie): RedirectResponse
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);

        $categorie->update($data);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Catégorie modifiée avec succès.');
    }

    public function destroy(Categorie $categorie): RedirectResponse
    {
        if ($categorie->products()->count() > 0) {
            return redirect()
                ->route('categories.index')
                ->with('error', 'Impossible de supprimer cette catégorie car elle contient des produits.');
        }

        $categorie->delete();

        return redirect()
            ->route('categories.index')
            ->with('success', 'Catégorie supprimée avec succès.');
    }
}