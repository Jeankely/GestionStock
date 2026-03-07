import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MailCheck, Send, LogOut, ShieldCheck, BadgeCheck } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification de l’email" />

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
                                Vérification sécurisée
                            </div>

                            <h1 className="mt-6 text-4xl font-extrabold leading-tight xl:text-5xl">
                                Vérifiez votre adresse email
                            </h1>

                            <p className="mt-5 max-w-xl text-base leading-8 text-cyan-50">
                                Avant de commencer à utiliser votre espace de gestion,
                                veuillez confirmer votre adresse email en cliquant sur
                                le lien que nous vous avons envoyé.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Activation du compte
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        La vérification de l’email permet d’activer
                                        correctement votre accès à l’application.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                                    <p className="font-semibold">
                                        Protection renforcée
                                    </p>
                                    <p className="mt-1 text-sm text-cyan-100">
                                        Cette étape aide à sécuriser votre compte et à
                                        confirmer que l’adresse email vous appartient.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Carte */}
                        <div className="mx-auto w-full max-w-md">
                            <div className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
                                <div className="mb-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <MailCheck className="h-8 w-8" />
                                    </div>

                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                        Vérification email
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        Consultez votre boîte mail et cliquez sur le lien
                                        de vérification pour continuer.
                                    </p>
                                </div>

                                <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                                    Merci pour votre inscription. Avant de commencer,
                                    veuillez vérifier votre adresse email en cliquant
                                    sur le lien que nous venons de vous envoyer. Si
                                    vous n’avez pas reçu l’email, vous pouvez demander
                                    un nouvel envoi.
                                </div>

                                {status === 'verification-link-sent' && (
                                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300">
                                        <div className="flex items-start gap-2">
                                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" />
                                            <span>
                                                Un nouveau lien de vérification a été envoyé
                                                à l’adresse email fournie lors de
                                                l’inscription.
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-4">
                                    <PrimaryButton
                                        className="w-full justify-center rounded-2xl bg-cyan-700 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl"
                                        disabled={processing}
                                    >
                                        <Send className="me-2 h-5 w-5" />
                                        {processing
                                            ? 'Envoi en cours...'
                                            : 'Renvoyer l’email de vérification'}
                                    </PrimaryButton>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Déconnexion
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}