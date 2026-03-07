<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController; //pacckage pour client contoller
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategorieController; //pacckage pour categorie contoller

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //route controller categorie// elle prend en charge la methode get; est utiliseé pour la page Categorie; et renvoi la categorie page
    Route::get('/categories', [CategorieController::class, 'index'])->name('categories.index');
});
   //route controler contact et apropos
Route::get('/about', [ClientController::class, 'apropos'])->name('about');
Route::get('/contact', [ClientController::class, 'contact'])->name('contact');

require __DIR__ . '/auth.php';
