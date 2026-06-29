import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ApplicationLogo from '@/Components/ApplicationLogo';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Mail,
    Lock,
    LogIn,
    ShieldCheck,
    Eye,
    EyeOff,
} from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-slate-900">
                {/* Effets d'arrière-plan */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid w-full items-center gap-10 lg:grid-cols-2">
                        {/* Partie gauche de connexion */}
                        <div className="hidden text-white lg:block">

                            <h1 className="mt-6 text-3xl font-extrabold leading-tight xl:text-5xl"
                                style={{ fontFamily: "'Times New Roman', Times, serif" }}
                            >
                                Connectez-vous à votre espace de gestion
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-8 text-cyan-50">
                                Accédez à votre plateforme de gestion de vente de
                                matériel informatique pour suivre vos produits,
                                vos ventes, vos stocks et vos clients dans une
                                interface moderne et professionnelle.
                            </p>
                        </div>


                        {/* Formulaire */}
                        <div className="mx-auto w-full max-w-md">
                            <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
                                <div className="mb-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <ApplicationLogo className="h-8 w-8 fill-current text-cyan-700 dark:text-cyan-400 sm:h-10 sm:w-10" />
                                    </div>

                                    <h1 className="mt-4 text-2xl font-extrabold text-cyan-700 dark:text-cyan-400">
                                    JK TechStore
                                    </h1>
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        Connexion
                                    </h2>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        Connectez-vous pour accéder à votre espace de travail.
                                    </p>
                                </div>

                                {/* Message de succès */}
                                {status && (
                                    <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                                        {status}
                                    </div>
                                )}

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
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm transition focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Entrez votre adresse email"
                                            />
                                        </div>

                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <InputLabel htmlFor="password" value="Mot de passe" />

                                        <div className="relative mt-2">
                                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm transition focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Entrez votre mot de passe"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-600 dark:hover:text-cyan-400"
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

                                    {/* Options */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />

                                            <span className="ms-2 text-sm text-slate-600 dark:text-slate-400">
                                                Se souvenir de moi
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
                                            >
                                                Mot de passe oublié ?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Bouton */}
                                    <PrimaryButton
                                        className="w-full justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:from-cyan-700 hover:to-blue-800"
                                        disabled={processing}
                                    >
                                        <LogIn className="me-2 h-5 w-5" />

                                        {processing ? "Connexion en cours..." : "Se connecter"}
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