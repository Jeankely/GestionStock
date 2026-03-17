<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // importation package Inertia

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Clients/Index');
    }

    public function apropos()
    {
        return Inertia::render('Apropos');
    }
    
    public function contact()
    {

        return Inertia::render('Contact');
    }
}
