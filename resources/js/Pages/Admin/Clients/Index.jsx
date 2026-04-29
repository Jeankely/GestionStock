import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Users,
    Search,
    UserCircle2,
    Phone,
    Mail,
    MapPin,
    BadgeDollarSign,
    Pencil,
    Trash2,
    Building2,
    Power,
    PowerOff,
    ShoppingCart,
} from "lucide-react";
import { useMemo, useState } from "react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const typeLabel = (type) => {
    const labels = {
        particulier: "Particulier",
        entreprise: "Entreprise",
    };

    return labels[type] || type;
};

export default function Index({ clients = [], stats = {} }) {
    const [search, setSearch] = useState("");

    const filteredClients = useMemo(() => {
        return clients.filter((client) => {
            const text = `${client.name || ""} ${client.email || ""} ${
                client.phone || ""
            } ${client.address || ""} ${client.type || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [clients, search]);

    const deleteClient = (client) => {
        if (
            confirm(
                `Voulez-vous vraiment supprimer le client "${client.name}" ?`
            )
        ) {
            router.delete(route("clients.destroy", client.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Clients" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block" />

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <Users className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Relation client
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Gestion des clients
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Consultez les clients enregistrés depuis les commandes,
                                        leurs coordonnées et leur historique commercial.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Users className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total clients
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.total || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Power className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
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
                            <PowerOff className="h-10 w-10 rounded-2xl bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300" />
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

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Building2 className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Entreprises
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.companies || 0}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Liste des clients
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredClients.length} client(s) trouvé(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un client..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-900/30"
                            />
                        </div>
                    </div>
                </section>

                {filteredClients.length > 0 ? (
                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        {filteredClients.map((client) => (
                            <article
                                key={client.id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                            {client.type === "entreprise" ? (
                                                <Building2 className="h-7 w-7" />
                                            ) : (
                                                <UserCircle2 className="h-7 w-7" />
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {client.name}
                                                </h2>

                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    {typeLabel(client.type)}
                                                </span>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        client.is_active
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                            : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                                    }`}
                                                >
                                                    {client.is_active
                                                        ? "Actif"
                                                        : "Inactif"}
                                                </span>
                                            </div>

                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                    <Mail className="h-4 w-4" />
                                                    {client.email || "Aucun email"}
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                    <Phone className="h-4 w-4" />
                                                    {client.phone || "Aucun téléphone"}
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                    <MapPin className="h-4 w-4" />
                                                    {client.address || "Aucune adresse"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                            <BadgeDollarSign className="h-4 w-4" />
                                            Total achats
                                        </div>
                                        <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                            {formatMoney(client.total_purchases)}
                                        </p>

                                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                            <ShoppingCart className="h-4 w-4" />
                                            {client.sales_count || 0} vente(s)
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                    <Link
                                        href={route("clients.edit", client.id)}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Modifier
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => deleteClient(client)}
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
                        <Users className="mx-auto h-10 w-10 text-slate-400" />
                        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                            Aucun client trouvé
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Les clients apparaîtront ici lorsqu’ils passent une commande.
                        </p>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}