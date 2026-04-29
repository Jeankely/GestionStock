import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    TrendingUp,
    Wallet,
    AlertTriangle,
    Boxes,
    ArrowUpRight,
    ArrowDownRight,
    Laptop,
} from "lucide-react";

const iconMap = {
    Wallet,
    Package,
    Users,
    ShoppingCart,
};

export default function Dashboard({
    stats = [],
    recentSales = [],
    stockAlerts = [],
    topProducts = [],
    summary = {},
}) {
    const maxSales = Math.max(...topProducts.map((item) => item.sales || 0), 1);

    const statusClass = (status) => {
        if (status === "Payé" || status === "Livré" || status === "Validée") {
            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
        }

        if (status === "En attente") {
            return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
        }

        if (status === "Annulé") {
            return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
        }

        return "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300";
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <section className="rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 p-6 text-white shadow-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-cyan-100">
                                Tableau de bord
                            </p>

                            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                                Gestion de vente des outils informatiques
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm text-cyan-100 sm:text-base">
                                Suivez vos ventes, votre stock, vos clients et vos
                                performances commerciales depuis une seule interface.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                            <Laptop className="h-8 w-8" />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = iconMap[item.icon] || Wallet;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-4">
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

                                <div className="mt-4 flex items-center gap-2">
                                    {item.positive ? (
                                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                                    )}

                                    <span
                                        className={`text-sm font-medium ${
                                            item.positive
                                                ? "text-emerald-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {item.change}
                                    </span>

                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        par rapport à la période précédente
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Ventes récentes
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Dernières transactions enregistrées
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                                <ShoppingCart className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                            </div>
                        </div>

                        {recentSales.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800">
                                            <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Référence
                                            </th>
                                            <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Client
                                            </th>
                                            <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Produit
                                            </th>
                                            <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Montant
                                            </th>
                                            <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                                Statut
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentSales.map((sale, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-slate-100 dark:border-slate-800/60"
                                            >
                                                <td className="px-3 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                                    {sale.id}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                    {sale.client}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                    {sale.product}
                                                </td>

                                                <td className="px-3 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                    {sale.amount}
                                                </td>

                                                <td className="px-3 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                                                            sale.status
                                                        )}`}
                                                    >
                                                        {sale.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                                <ShoppingCart className="mx-auto h-10 w-10 text-slate-400" />
                                <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                                    Aucune vente récente
                                </h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Les dernières ventes apparaîtront ici.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Alertes stock
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Produits à réapprovisionner
                                    </p>
                                </div>
                            </div>

                            {stockAlerts.length > 0 ? (
                                <div className="space-y-3">
                                    {stockAlerts.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
                                        >
                                            <span className="line-clamp-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {item.name}
                                            </span>

                                            <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                                {item.stock} restants
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-800/60">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Aucun produit en faible stock.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    <TrendingUp className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Top produits
                                    </h2>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Produits les plus vendus
                                    </p>
                                </div>
                            </div>

                            {topProducts.length > 0 ? (
                                <div className="space-y-4">
                                    {topProducts.map((item, index) => (
                                        <div key={index}>
                                            <div className="mb-2 flex items-center justify-between gap-4">
                                                <span className="line-clamp-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                                                    {item.name}
                                                </span>

                                                <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">
                                                    {item.sales} ventes
                                                </span>
                                            </div>

                                            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                                    style={{
                                                        width: `${
                                                            (item.sales / maxSales) *
                                                            100
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-800/60">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Aucun produit vendu pour le moment.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300">
                                <BarChart3 className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Bénéfice estimé
                                </p>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {summary.profit || "0 Ar"}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300">
                                <Boxes className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Catégories
                                </p>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {summary.categories || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <Package className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Produits disponibles
                                </p>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {summary.availableProducts || 0}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}