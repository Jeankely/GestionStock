<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // importation package Inertia

class ClientController extends Controller
{// pour la fonction apropos
    public function apropos()
    {
        return Inertia::render('Apropos');
    }
    
// pour la fonction contact
    public function contact()
    {

        return Inertia::render('Contact');
    }
}
