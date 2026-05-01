import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    Truck,
    Plus,
    Search,
    Pencil,
    Trash2,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    XCircle,
    PackageCheck,
    Clock,
    UserCheck,
    UserX,
    CalendarDays,
} from "lucide-react";
import { useMemo, useState } from "react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const deliveryStatusLabel = (status) => {
    const labels = {
        en_attente: "En attente",
        assignee: "Assignée",
        en_cours: "En cours",
        livree: "Livrée",
        annulee: "Annulée",
    };

    return labels[status] || status;
};

const deliveryStatusClass = (status) => {
    if (status === "livree") {
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
    }

    if (status === "annulee") {
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
    }

    if (status === "en_cours" || status === "assignee") {
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300";
    }

    return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
};

export default function Index({ livreurs = [], stats = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");

    const filteredLivreurs = useMemo(() => {
        return livreurs.filter((livreur) => {
            const text = `${livreur.name || ""} ${livreur.email || ""} ${
                livreur.phone || ""
            } ${livreur.address || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [livreurs, search]);

    const deleteLivreur = (livreur) => {
        if (
            confirm(
                `Supprimer le livreur ${livreur.name} ? S’il a déjà des livraisons, il sera seulement désactivé.`
            )
        ) {
            router.delete(route("livreurs.destroy", livreur.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.visit(route("livreurs.index"), {
                        preserveScroll: true,
                        replace: true,
                    });
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Livreurs" />

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
                                    <Truck className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Gestion des livraisons
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Livreurs
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Gérez les comptes livreurs et consultez leurs informations de livraison.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("livreurs.create")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                            >
                                <Plus className="h-4 w-4" />
                                Nouveau livreur
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <UserCheck className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total livreurs
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.total || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
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
                                Liste des livreurs
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredLivreurs.length} livreur(s) trouvé(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un livreur..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                            />
                        </div>
                    </div>
                </section>

                {filteredLivreurs.length > 0 ? (
                    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {filteredLivreurs.map((livreur) => (
                            <article
                                key={livreur.id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {livreur.name}
                                            </h3>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    livreur.is_active
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                                }`}
                                            >
                                                {livreur.is_active
                                                    ? "Actif"
                                                    : "Inactif"}
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Mail className="h-4 w-4" />
                                                {livreur.email}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Phone className="h-4 w-4" />
                                                {livreur.phone || "Aucun téléphone"}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <MapPin className="h-4 w-4" />
                                                {livreur.address || "Aucune adresse"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-right dark:bg-cyan-900/20">
                                        <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                            Livraisons
                                        </p>
                                        <p className="mt-1 text-xl font-bold text-cyan-800 dark:text-cyan-200">
                                            {livreur.deliveries_count}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            En attente :{" "}
                                            {livreur.pending_deliveries_count}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Livrées :{" "}
                                            {livreur.delivered_deliveries_count}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <PackageCheck className="h-4 w-4" />
                                        Informations de livraison
                                    </div>

                                    {livreur.deliveries &&
                                    livreur.deliveries.length > 0 ? (
                                        <div className="space-y-3">
                                            {livreur.deliveries.map(
                                                (delivery) => (
                                                    <div
                                                        key={delivery.id}
                                                        className="rounded-2xl bg-white p-4 dark:bg-slate-900"
                                                    >
                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <p className="font-bold text-slate-900 dark:text-white">
                                                                        {
                                                                            delivery
                                                                                .sale
                                                                                ?.reference
                                                                        }
                                                                    </p>

                                                                    <span
                                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${deliveryStatusClass(
                                                                            delivery.status
                                                                        )}`}
                                                                    >
                                                                        {deliveryStatusLabel(
                                                                            delivery.status
                                                                        )}
                                                                    </span>
                                                                </div>

                                                                <div className="mt-3 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                                                                    <p>
                                                                        Client :{" "}
                                                                        {
                                                                            delivery
                                                                                .sale
                                                                                ?.client
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Téléphone :{" "}
                                                                        {delivery.delivery_phone ||
                                                                            delivery
                                                                                .sale
                                                                                ?.client_phone ||
                                                                            "Aucun"}
                                                                    </p>
                                                                    <p>
                                                                        Adresse :{" "}
                                                                        {delivery.delivery_address ||
                                                                            "Aucune adresse"}
                                                                    </p>
                                                                    <p>
                                                                        Total vente :{" "}
                                                                        {formatMoney(
                                                                            delivery
                                                                                .sale
                                                                                ?.total_amount
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                                                <div className="flex items-center gap-2">
                                                                    <CalendarDays className="h-4 w-4" />
                                                                    {delivery.scheduled_date ||
                                                                        "Date non définie"}
                                                                </div>

                                                                <div className="mt-2 flex items-center gap-2">
                                                                    <Clock className="h-4 w-4" />
                                                                    {delivery.delivered_at ||
                                                                        "Non livrée"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="rounded-2xl bg-white p-4 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                            Aucune livraison assignée à ce livreur.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <Link
                                        href={route(
                                            "livreurs.edit",
                                            livreur.id
                                        )}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Modifier
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteLivreur(livreur)
                                        }
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Supprimer
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                        <Truck className="mx-auto h-10 w-10 text-slate-400" />
                        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                            Aucun livreur trouvé
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Ajoutez un livreur pour commencer à gérer les livraisons.
                        </p>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}