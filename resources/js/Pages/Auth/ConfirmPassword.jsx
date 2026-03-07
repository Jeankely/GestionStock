import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmation du mot de passe" />

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
                                Zone sécurisée
                            </div>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight xl:text-5xl">
                                Confirmation requise
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-8 text-cyan-50">
                                Cette zone de l’application est protégée. Veuillez
                                confirmer votre mot de passe avant de continuer afin
                                de sécuriser l’accès aux actions sensibles.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Vérification d’identité
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        La confirmation garantit que seul
                                        l’utilisateur autorisé peut poursuivre.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Sécurité renforcée
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        Idéal pour protéger les opérations sensibles
                                        dans votre espace d’administration.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Formulaire */}
                        <div className="mx-auto w-full max-w-md">
                            <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
                                <div className="mb-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <CheckCircle2 className="h-8 w-8" />
                                    </div>

                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        Confirmation
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        Confirmez votre mot de passe pour continuer
                                    </p>
                                </div>

                                <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                                    Cette zone de l’application est sécurisée.
                                    Veuillez confirmer votre mot de passe avant de
                                    continuer.
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Mot de passe"
                                        />

                                        <div className="relative mt-2">
                                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="block w-full rounded-2xl border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData('password', e.target.value)
                                                }
                                                placeholder="Entrez votre mot de passe"
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

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <PrimaryButton
                                        className="w-full justify-center rounded-2xl bg-cyan-700 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Confirmation...'
                                            : 'Confirmer le mot de passe'}
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