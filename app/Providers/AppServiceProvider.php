<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Schema::defaultStringLength(191); //nampiana

        ResetPassword::toMailUsing(function (User $user, string $token) {
            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $user->email,
            ], false));

            return (new MailMessage)
                ->subject('Réinitialisation de votre mot de passe')
                ->greeting('Bonjour ' . $user->name . ' !')
                ->line('Vous recevez cet email parce qu’une demande de réinitialisation de mot de passe a été effectuée pour votre compte.')
                ->action('Réinitialiser mon mot de passe', $url)
                ->line('Ce lien de réinitialisation expirera dans 60 minutes.')
                ->line('Si vous n’avez pas demandé cette réinitialisation, aucune action n’est nécessaire.');
        });

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Vérification de votre adresse email')
                ->greeting('Bonjour ' . $notifiable->name . ' !')
                ->line('Merci de vous être inscrit. Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email.')
                ->action('Vérifier mon adresse email', $url)
                ->line('Si vous n’avez pas créé de compte, ignorez simplement cet email.');
        });
    }
}
