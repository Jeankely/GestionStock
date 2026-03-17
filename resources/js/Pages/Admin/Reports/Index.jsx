import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    BarChart3,
    TrendingUp,
    Wallet,
    ShoppingBag,
    Users,
    Package,
    Download,
    CalendarDays,
} from "lucide-react";

export default function Index() {
    const reports = [
        {
            title: "Chiffre d’affaires mensuel",
            value: "18 750 000 Ar",
            icon: Wallet,
        },
        {
            title: "Produits vendus",
            value: "214",
            icon: ShoppingBag,
        },
        {
            title: "Nouveaux clients",
            value: "36",
            icon: Users,
        },
        {
            title: "Stock total",
            value: "1 248",
            icon: Package,
        },
    ];

    const monthlyData = [
        { month: "Jan", amount: 45 },
        { month: "Fév", amount: 60 },
        { month: "Mar", amount: 72 },
        { month: "Avr", amount: 55 },
        { month: "Mai", amount: 80 },
        { month: "Juin", amount: 68 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Rapports" />

            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <BarChart3 className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Rapports et statistiques
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Analysez les performances commerciales de votre activité.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                            >
                                <CalendarDays className="h-4 w-4" />
                                Ce mois
                            </button>

                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                            >
                                <Download className="h-4 w-4" />
                                Exporter
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {reports.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h3>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Évolution mensuelle
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Représentation simplifiée des performances
                                </p>
                            </div>
                        </div>

                        <div className="grid h-[320px] items-end gap-4 grid-cols-6">
                            {monthlyData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-3">
                                    <div className="flex w-full items-end justify-center rounded-2xl bg-slate-100 p-2 dark:bg-slate-800">
                                        <div
                                            className="w-full rounded-xl bg-gradient-to-t from-cyan-600 to-blue-600"
                                            style={{ height: `${item.amount * 3}px` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {item.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Résumé rapide
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Indicateurs principaux
                        </p>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Meilleure catégorie
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                    Ordinateurs
                                </h3>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Produit vedette
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                    HP EliteBook 840
                                </h3>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Taux de croissance
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-300">
                                    +14.8%
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}