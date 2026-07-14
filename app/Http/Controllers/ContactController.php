<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function send(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email:rfc', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ], [
            'name.required' => 'Veuillez saisir votre nom.',
            'name.min' => 'Le nom doit contenir au moins 2 caractères.',
            'email.required' => 'Veuillez saisir votre adresse email.',
            'email.email' => 'Veuillez saisir une adresse email valide.',
            'message.required' => 'Veuillez saisir votre message.',
            'message.min' => 'Le message doit contenir au moins 10 caractères.',
        ]);

        try {
            Mail::to(config('mail.contact_to'))->send(
                new ContactMessageMail(
                    name: $validated['name'],
                    email: $validated['email'],
                    contactMessage: $validated['message'],
                )
            );
        } catch (Throwable $exception) {
            Log::error('Échec de l’envoi du formulaire de contact.', [
                'exception' => $exception,
            ]);

            return back()->withErrors([
                'mail' => 'Le message n’a pas pu être envoyé. Veuillez réessayer plus tard.',
            ])->withInput();
        }

        return back()->with('success', 'Votre message a été envoyé avec succès.');
    }
}
