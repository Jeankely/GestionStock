<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = Client::query()
            ->withCount('sales')
            ->latest()
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'name' => $client->name,
                    'email' => $client->email,
                    'phone' => $client->phone,
                    'address' => $client->address,
                    'type' => $client->type,
                    'is_active' => $client->is_active,
                    'sales_count' => $client->sales_count,
                    'total_purchases' => (float) $client->total_purchases,
                    'created_at' => $client->created_at?->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Clients/Index', [
            'clients' => $clients,
            'stats' => [
                'total' => Client::query()->count(),
                'active' => Client::query()->where('is_active', true)->count(),
                'inactive' => Client::query()->where('is_active', false)->count(),
                'companies' => Client::query()->where('type', 'entreprise')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Clients/CreateUpdate', [
            'client' => null,
            'mode' => 'create',
        ]);
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        Client::create($request->validated());

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client créé avec succès.');
    }

    public function edit(Client $client): Response
    {
        return Inertia::render('Admin/Clients/CreateUpdate', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'address' => $client->address,
                'type' => $client->type,
                'is_active' => $client->is_active,
            ],
            'mode' => 'edit',
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $client->update($request->validated());

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client modifié avec succès.');
    }

    public function destroy(Client $client): RedirectResponse
    {
        if ($client->sales()->count() > 0) {
            return redirect()
                ->route('clients.index')
                ->with('error', 'Impossible de supprimer ce client car il possède déjà des ventes.');
        }

        $client->delete();

        return redirect()
            ->route('clients.index')
            ->with('success', 'Client supprimé avec succès.');
    }

    public function apropos(): Response
    {
        return Inertia::render('Apropos');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }
}