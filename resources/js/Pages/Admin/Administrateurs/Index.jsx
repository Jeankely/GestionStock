import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    ShieldCheck,
    Plus,
    Mail,
    Phone,
    MapPin,
    CalendarDays,
    CheckCircle2,
    XCircle,
    UserCheck,
    UserX,
    Search,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function Index({ admins = [], stats = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");

    const filteredAdmins = useMemo(() => {
        return admins.filter((admin) => {
            const text = `${admin.name || ""} ${admin.email || ""} ${
                admin.phone || ""
            } ${admin.address || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [admins, search]);

    return (
        <AuthenticatedLayout>
            <Head title="Administrateurs" />

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

            {flash?.error && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-red-200 bg-white p-4 shadow-2xl dark:border-red-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <XCircle className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Erreur
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {flash.error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Gestion des accès
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Administrateurs
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Consultez les comptes administrateurs et
                                        ajoutez un nouvel admin.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("administrateurs.create")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter un admin
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total admins
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.total || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <UserCheck className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Actifs
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.active || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <UserX className="h-10 w-10 rounded-2xl bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Inactifs
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.inactive || 0}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Liste des administrateurs
                            </h2>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredAdmins.length} administrateur(s)
                                trouvé(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un admin..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                        </div>
                    </div>
                </section>

                {filteredAdmins.length > 0 ? (
                    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {filteredAdmins.map((admin) => (
                            <article
                                key={admin.id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {admin.name}
                                            </h3>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    admin.is_active
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                                }`}
                                            >
                                                {admin.is_active
                                                    ? "Actif"
                                                    : "Inactif"}
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Mail className="h-4 w-4" />
                                                {admin.email}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Phone className="h-4 w-4" />
                                                {admin.phone || "Aucun téléphone"}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <MapPin className="h-4 w-4" />
                                                {admin.address || "Aucune adresse"}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <CalendarDays className="h-4 w-4" />
                                                Créé le : {admin.created_at}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-center dark:bg-cyan-900/20">
                                        <ShieldCheck className="mx-auto h-6 w-6 text-cyan-600 dark:text-cyan-300" />
                                        <p className="mt-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                            Administrateur
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                        <ShieldCheck className="mx-auto h-10 w-10 text-slate-400" />

                        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                            Aucun administrateur trouvé
                        </h3>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Ajoutez un administrateur pour gérer le système.
                        </p>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}