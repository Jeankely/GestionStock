import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Mail,
    Lock,
    ShieldCheck,
    KeyRound,
    Eye,
    EyeOff,
    BadgeCheck,
} from 'lucide-react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Réinitialisation du mot de passe" />

            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-slate-900">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-2">
                        {/* Bloc gauche */}
                        <div className="hidden text-white lg:block">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <ShieldCheck className="h-4 w-4" />
                                Réinitialisation sécurisée
                            </div>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight xl:text-5xl">
                                Définissez un nouveau mot de passe
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-8 text-cyan-50">
                                Créez un nouveau mot de passe pour récupérer
                                l’accès à votre espace de gestion de vente de
                                matériel informatique.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Protection du compte
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        Choisissez un mot de passe fort pour
                                        renforcer la sécurité de votre compte.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Accès rapide
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        Une fois validé, votre nouveau mot de passe
                                        vous permettra de vous reconnecter
                                        immédiatement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Formulaire */}
                        <div className="mx-auto w-full max-w-lg">
                            <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
                                <div className="mb-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <KeyRound className="h-8 w-8" />
                                    </div>

                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        Réinitialiser le mot de passe
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        Renseignez vos informations pour définir un
                                        nouveau mot de passe
                                    </p>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    {/* Email */}
                                    <div>
                                        <InputLabel htmlFor="email" value="Adresse email" />

                                        <div className="relative mt-2">
                                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Entrez votre adresse email"
                                            />
                                        </div>

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <InputLabel htmlFor="password" value="Nouveau mot de passe" />

                                        <div className="relative mt-2">
                                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                autoComplete="new-password"
                                                isFocused={true}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Entrez le nouveau mot de passe"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>

                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Password confirmation */}
                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirmer le mot de passe"
                                        />

                                        <div className="relative mt-2">
                                            <BadgeCheck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <TextInput
                                                id="password_confirmation"
                                                type={showPasswordConfirmation ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData('password_confirmation', e.target.value)
                                                }
                                                placeholder="Confirmez le nouveau mot de passe"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPasswordConfirmation(!showPasswordConfirmation)
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                                            >
                                                {showPasswordConfirmation ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>

                                        <InputError
                                            message={errors.password_confirmation}
                                            className="mt-2"
                                        />
                                    </div>

                                    <PrimaryButton
                                        className="w-full justify-center rounded-2xl bg-cyan-700 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Réinitialisation...'
                                            : 'Réinitialiser le mot de passe'}
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}