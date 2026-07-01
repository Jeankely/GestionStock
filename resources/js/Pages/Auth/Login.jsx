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

            <section
                className="relative min-h-screen overflow-hidden flex items-center justify-center"
                style={{
                    backgroundImage: "url('/images/fondlogin.jpg')", // fond login image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay foncé pour lisibilité */}
                <div className="absolute inset-50 bg-cyan-900/30 backdrop-blur-sm"></div>

                {/* Effets décoratifs */}
                <div className="absolute inset-200 opacity-90">
                    <div className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-cyan-900 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-900 blur-3xl" />
                </div>

                {/* FORMULAIRE CENTRÉ */}
                <div className="relative z-10 w-full max-w-md px-4">
                    <div className="rounded-3xl border border-cyan/20 bg-cyan-800/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:bg-slate-900/90">

                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                <ApplicationLogo className="h-8 w-8 fill-current" />
                            </div>

                            <h1 className="mt-4 text-2xl font-extrabold text-white dark:text-cyan-400">
                                JK TechStore
                            </h1>

                            <h2 className="text-3xl font-extrabold text-white dark:text-white">
                                Connexion
                            </h2>

                            <p className="mt-2 text-sm text-white dark:text-slate-400">
                                Connectez-vous pour accéder à votre espace.
                            </p>
                        </div>

                        {/* STATUS */}
                        {status && (
                            <div className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">

                            {/* EMAIL */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-white" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-2 w-full rounded-2xl"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="entrer votre email.com"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <InputLabel htmlFor="password" value="Mot de passe" className="text-white" />
                                <div className="relative mt-2">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={data.password}
                                        className="w-full rounded-2xl pr-12"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* OPTIONS */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2" >
                                    <Checkbox
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="text-white">Se souvenir de moi</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-cyan-600 hover:text-cyan-700"
                                    >
                                        <span className="text-white">Mot de passe oublié ?</span>
                                    </Link>
                                )}
                            </div>

                            {/* BUTTON */}
                            <PrimaryButton
                                disabled={processing}
                                className="w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 py-3 text-white font-semibold hover:scale-[1.02] transition"
                            >
                                <LogIn className="mr-2 h-5 w-5" />
                                {processing ? "Connexion..." : "Se connecter"}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}