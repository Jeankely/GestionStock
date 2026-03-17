import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    ShoppingCart,
    Search,
    Plus,
    CalendarRange,
    Wallet,
    BadgeCheck,
    Clock3,
} from "lucide-react";

export default function Index() {
    const sales = [
        {
            ref: "VNT-1001",
            client: "Entreprise Nova",
            date: "12/03/2026",
            total: "1 850 000 Ar",
            status: "Payé",
        },
        {
            ref: "VNT-1002",
            client: "Rija Service",
            date: "13/03/2026",
            total: "670 000 Ar",
            status: "En attente",
        },
        {
            ref: "VNT-1003",
            client: "Mada Print",
            date: "14/03/2026",
            total: "2 400 000 Ar",
            status: "Payé",
        },
        {
            ref: "VNT-1004",
            client: "Toky Informatique",
            date: "15/03/2026",
            total: "980 000 Ar",
            status: "Livré",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Ventes" />

            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <ShoppingCart className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Gestion des ventes
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Suivi des transactions et commandes clients.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une vente..."
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                            >
                                <Plus className="h-4 w-4" />
                                Nouvelle vente
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Chiffre du mois</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">18 750 000 Ar</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <BadgeCheck className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Ventes payées</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">54</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Clock3 className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">En attente</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">8</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-5 flex items-center gap-3">
                        <CalendarRange className="h-10 w-10 rounded-2xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300" />
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Historique des ventes
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Liste des opérations enregistrées
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Référence</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Client</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Total</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-slate-100 dark:border-slate-800/60"
                                    >
                                        <td className="px-3 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                            {sale.ref}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                            {sale.client}
                                        </td>
                                        <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                            {sale.date}
                                        </td>
                                        <td className="px-3 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                            {sale.total}
                                        </td>
                                        <td className="px-3 py-4">
                                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300">
                                                {sale.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}