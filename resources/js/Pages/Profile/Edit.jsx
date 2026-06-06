import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import {
    UserCircle2,
    ShieldCheck,
    Truck,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
} from "lucide-react";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const isAdmin =
        user?.is_admin === true || user?.roles?.includes("admin");

    const isLivreur =
        user?.is_livreur === true || user?.roles?.includes("livreur");

    return (
        <AuthenticatedLayout>
            <Head title="Mon profil" />

            {flash?.success && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Succès
                            </h3>

                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-6xl space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
                                    <UserCircle2 className="h-9 w-9" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Paramètres du compte
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Mon profil
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Gérez vos informations personnelles,
                                        votre adresse email et votre mot de passe.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                                        {isAdmin ? (
                                            <ShieldCheck className="h-6 w-6" />
                                        ) : isLivreur ? (
                                            <Truck className="h-6 w-6" />
                                        ) : (
                                            <UserCircle2 className="h-6 w-6" />
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-cyan-100">
                                            Rôle connecté
                                        </p>

                                        <p className="text-sm font-bold text-white">
                                            {isAdmin
                                                ? "Administrateur"
                                                : isLivreur
                                                ? "Livreur"
                                                : "Utilisateur"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Mail className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Email
                                </p>

                                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user.email}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Phone className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Téléphone
                                </p>

                                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user.phone || "Non renseigné"}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-10 w-10 rounded-2xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Adresse
                                </p>

                                <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user.address || "Non renseignée"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <UpdatePasswordForm />
                    </section>
                </div>

                {isAdmin && (
                    <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/40 dark:bg-slate-900 sm:p-8">
                        <DeleteUserForm />
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}