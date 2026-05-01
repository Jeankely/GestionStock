<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLivreurRequest;
use App\Http\Requests\UpdateLivreurRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class LivreurController extends Controller
{
    public function index(): Response
    {
        $livreurs = User::role('livreur')
            ->with([
                'deliveries' => function ($query) {
                    $query->with([
                        'sale:id,reference,client_id,total_amount,status,payment_status,sale_date',
                        'sale.client:id,name,phone,email,address',
                    ])->latest();
                },
            ])
            ->withCount([
                'deliveries',
                'deliveries as pending_deliveries_count' => function ($query) {
                    $query->whereIn('status', [
                        'en_attente',
                        'assignee',
                        'en_cours',
                    ]);
                },
                'deliveries as delivered_deliveries_count' => function ($query) {
                    $query->where('status', 'livree');
                },
            ])
            ->latest()
            ->get()
            ->map(function ($livreur) {
                return [
                    'id' => $livreur->id,
                    'name' => $livreur->name,
                    'email' => $livreur->email,
                    'phone' => $livreur->phone,
                    'address' => $livreur->address,
                    'is_active' => $livreur->is_active,
                    'deliveries_count' => $livreur->deliveries_count,
                    'pending_deliveries_count' => $livreur->pending_deliveries_count,
                    'delivered_deliveries_count' => $livreur->delivered_deliveries_count,
                    'created_at' => $livreur->created_at?->format('d/m/Y'),

                    'deliveries' => $livreur->deliveries->map(function ($delivery) {
                        return [
                            'id' => $delivery->id,
                            'status' => $delivery->status,
                            'scheduled_date' => $delivery->scheduled_date?->format('d/m/Y'),
                            'delivered_at' => $delivery->delivered_at?->format('d/m/Y H:i'),
                            'delivery_address' => $delivery->delivery_address,
                            'delivery_phone' => $delivery->delivery_phone,
                            'notes' => $delivery->notes,

                            'sale' => [
                                'id' => $delivery->sale?->id,
                                'reference' => $delivery->sale?->reference,
                                'sale_date' => $delivery->sale?->sale_date?->format('d/m/Y'),
                                'total_amount' => (float) ($delivery->sale?->total_amount ?? 0),
                                'status' => $delivery->sale?->status,
                                'payment_status' => $delivery->sale?->payment_status,
                                'client' => $delivery->sale?->client?->name ?? 'Client inconnu',
                                'client_phone' => $delivery->sale?->client?->phone,
                                'client_email' => $delivery->sale?->client?->email,
                            ],
                        ];
                    }),
                ];
            });

        return Inertia::render('Admin/Livreurs/Index', [
            'livreurs' => $livreurs,
            'stats' => [
                'total' => User::role('livreur')->count(),

                'active' => User::role('livreur')
                    ->where('is_active', true)
                    ->count(),

                'inactive' => User::role('livreur')
                    ->where('is_active', false)
                    ->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Livreurs/CreateUpdate', [
            'livreur' => null,
            'mode' => 'create',
        ]);
    }

    public function store(StoreLivreurRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Role::firstOrCreate([
            'name' => 'livreur',
            'guard_name' => 'web',
        ]);

        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'is_active' => $data['is_active'],
            'password' => $data['password'],
        ]);

        $user->assignRole('livreur');

        return redirect()
            ->route('livreurs.index')
            ->with('success', 'Livreur créé avec succès.');
    }

    public function edit(User $livreur): Response|RedirectResponse
    {
        if (! $livreur->hasRole('livreur')) {
            return redirect()
                ->route('livreurs.index')
                ->with('error', 'Utilisateur invalide.');
        }

        return Inertia::render('Admin/Livreurs/CreateUpdate', [
            'livreur' => [
                'id' => $livreur->id,
                'name' => $livreur->name,
                'email' => $livreur->email,
                'phone' => $livreur->phone,
                'address' => $livreur->address,
                'is_active' => $livreur->is_active,
            ],
            'mode' => 'edit',
        ]);
    }

    public function update(UpdateLivreurRequest $request, User $livreur): RedirectResponse
    {
        if (! $livreur->hasRole('livreur')) {
            return redirect()
                ->route('livreurs.index')
                ->with('error', 'Utilisateur invalide.');
        }

        $data = $request->validated();

        $payload = [
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'is_active' => $data['is_active'],
        ];

        if (!empty($data['password'])) {
            $payload['password'] = $data['password'];
        }

        $livreur->update($payload);

        if (! $livreur->hasRole('livreur')) {
            $livreur->assignRole('livreur');
        }

        return redirect()
            ->route('livreurs.index')
            ->with('success', 'Livreur modifié avec succès.');
    }

    public function destroy(User $livreur): RedirectResponse
    {
        if (! $livreur->hasRole('livreur')) {
            return redirect()
                ->route('livreurs.index')
                ->with('error', 'Utilisateur invalide.');
        }

        if ($livreur->deliveries()->count() > 0) {
            $livreur->update([
                'is_active' => false,
            ]);

            return redirect()
                ->route('livreurs.index')
                ->with('success', 'Ce livreur a déjà des livraisons. Il a été désactivé au lieu d’être supprimé.');
        }

        $livreur->removeRole('livreur');
        $livreur->delete();

        return redirect()
            ->route('livreurs.index')
            ->with('success', 'Livreur supprimé avec succès.');
    }
}