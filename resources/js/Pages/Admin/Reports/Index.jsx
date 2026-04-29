import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    BarChart3,
    TrendingUp,
    Wallet,
    ShoppingBag,
    Users,
    Package,
    CalendarDays,
    Layers3,
    Star,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const formatNumber = (number) => {
    return new Intl.NumberFormat("fr-FR").format(Number(number || 0));
};

export default function Index({
    reports = {},
    monthlyData = [],
    summary = {},
}) {
    const maxAmount = Math.max(
        ...monthlyData.map((item) => Number(item.amount || 0)),
        1
    );

    const growthRate = Number(summary.growth_rate || 0);
    const isPositiveGrowth = growthRate >= 0;

    const reportCards = [
        {
            title: "Chiffre d’affaires mensuel",
            value: formatMoney(reports.monthly_turnover),
            description: "Ventes validées, payées ou livrées",
            icon: Wallet,
            style: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300",
        },
        {
            title: "Produits vendus",
            value: formatNumber(reports.sold_products_count),
            description: "Quantité totale vendue",
            icon: ShoppingBag,
            style: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300",
        },
        {
            title: "Nouveaux clients",
            value: formatNumber(reports.new_clients_count),
            description: "Clients créés ce mois",
            icon: Users,
            style: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300",
        },
        {
            title: "Stock total",
            value: formatNumber(reports.stock_total),
            description: "Quantité restante en stock",
            icon: Package,
            style: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Rapports" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-14 left-20 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl" />

                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <BarChart3 className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Analyse commerciale
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Rapports et statistiques
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Suivez le chiffre d’affaires, les produits vendus,
                                        les nouveaux clients et l’évolution mensuelle depuis
                                        les vraies données de la base.
                                    </p>
                                </div>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                                <CalendarDays className="h-4 w-4" />
                                Année en cours
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {reportCards.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>

                                        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h3>

                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.style}`}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    <TrendingUp className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Évolution mensuelle
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Chiffre d’affaires des ventes validées, payées ou livrées
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${
                                    isPositiveGrowth
                                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                }`}
                            >
                                {isPositiveGrowth ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4" />
                                )}
                                {isPositiveGrowth ? "+" : ""}
                                {growthRate}%
                            </div>
                        </div>

                        {monthlyData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <div className="flex min-w-[620px] items-end gap-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-800/60">
                                    {monthlyData.map((item, index) => {
                                        const amount = Number(item.amount || 0);
                                        const height = Math.max(
                                            (amount / maxAmount) * 240,
                                            12
                                        );

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-1 flex-col items-center gap-3"
                                            >
                                                <div className="flex h-[260px] w-full items-end justify-center rounded-2xl bg-white p-2 shadow-sm dark:bg-slate-900">
                                                    <div
                                                        className="w-full rounded-xl bg-gradient-to-t from-cyan-600 to-blue-500"
                                                        style={{
                                                            height: `${height}px`,
                                                        }}
                                                        title={formatMoney(amount)}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                        {item.month}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        {formatMoney(amount)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/60">
                                <div>
                                    <BarChart3 className="mx-auto h-12 w-12 text-slate-400" />
                                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                                        Aucune donnée mensuelle
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        Les graphiques apparaîtront lorsque des ventes seront validées, payées ou livrées.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                    <Activity className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Résumé rapide
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Indicateurs principaux
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Layers3 className="h-4 w-4" />
                                        Meilleure catégorie
                                    </div>

                                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                                        {summary.best_category || "Aucune donnée"}
                                    </h3>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Star className="h-4 w-4" />
                                        Produit vedette
                                    </div>

                                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                                        {summary.top_product || "Aucune donnée"}
                                    </h3>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <TrendingUp className="h-4 w-4" />
                                        Taux de croissance
                                    </div>

                                    <h3
                                        className={`mt-2 text-lg font-bold ${
                                            isPositiveGrowth
                                                ? "text-emerald-600 dark:text-emerald-300"
                                                : "text-red-600 dark:text-red-300"
                                        }`}
                                    >
                                        {isPositiveGrowth ? "+" : ""}
                                        {growthRate}%
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Statuts comptabilisés
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Les rapports comptent uniquement les ventes avec les statuts :
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    Validée
                                </span>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    Payée
                                </span>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    Livrée
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}