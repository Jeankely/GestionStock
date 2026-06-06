<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class AdministrateurController extends Controller
{
    private function ensureAdmin(): ?RedirectResponse
    {
        if (! Auth::check() || ! Auth::user()->hasRole('admin')) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'Accès refusé. Seul l’admin peut gérer les administrateurs.');
        }

        return null;
    }

    public function index(): Response|RedirectResponse
    {
        if ($redirect = $this->ensureAdmin()) {
            return $redirect;
        }

        $admins = User::role('admin')
            ->latest()
            ->get()
            ->map(function ($admin) {
                return [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'phone' => $admin->phone,
                    'address' => $admin->address,
                    'is_active' => $admin->is_active ?? true,
                    'created_at' => $admin->created_at?->format('d/m/Y'),
                ];
            });

        return Inertia::render('Admin/Administrateurs/Index', [
            'admins' => $admins,
            'stats' => [
                'total' => User::role('admin')->count(),
                'active' => User::role('admin')
                    ->where('is_active', true)
                    ->count(),
                'inactive' => User::role('admin')
                    ->where('is_active', false)
                    ->count(),
            ],
        ]);
    }

    public function create(): Response|RedirectResponse
    {
        if ($redirect = $this->ensureAdmin()) {
            return $redirect;
        }

        return Inertia::render('Admin/Administrateurs/Create');
    }

    public function store(StoreAdminRequest $request): RedirectResponse
    {
        if ($redirect = $this->ensureAdmin()) {
            return $redirect;
        }

        $data = $request->validated();

        Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $admin = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
            'is_active' => true,
            'password' => $data['password'],
        ]);

        $admin->assignRole('admin');

        return redirect()
            ->route('administrateurs.index')
            ->with('success', 'Administrateur ajouté avec succès.');
    }
}