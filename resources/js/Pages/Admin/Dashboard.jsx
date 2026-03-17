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

export default function Dashboard() {
    const stats = [
        {
            title: "Ventes du jour",
            value: "3 450 000 Ar",
            change: "+12.5%",
            positive: true,
            icon: Wallet,
        },
        {
            title: "Produits en stock",
            value: "1 248",
            change: "+4.2%",
            positive: true,
            icon: Package,
        },
        {
            title: "Clients actifs",
            value: "326",
            change: "+8.1%",
            positive: true,
            icon: Users,
        },
        {
            title: "Commandes",
            value: "89",
            change: "-2.4%",
            positive: false,
            icon: ShoppingCart,
        },
    ];

    const recentSales = [
        { id: "VNT-001", client: "Rabe Toky", product: "Laptop HP EliteBook", amount: "2 100 000 Ar", status: "Payé" },
        { id: "VNT-002", client: "Sarah Tech", product: "Clavier mécanique", amount: "280 000 Ar", status: "En attente" },
        { id: "VNT-003", client: "Mada Bureautique", product: "Écran Dell 24 pouces", amount: "950 000 Ar", status: "Payé" },
        { id: "VNT-004", client: "Ando Service", product: "Imprimante Canon", amount: "670 000 Ar", status: "Livré" },
    ];

    const stockAlerts = [
        { name: "Souris Logitech M185", stock: 4 },
        { name: "SSD Kingston 512 Go", stock: 3 },
        { name: "Routeur TP-Link", stock: 2 },
        { name: "RAM DDR4 8 Go", stock: 5 },
    ];

    const topProducts = [
        { name: "Laptop Lenovo ThinkPad", sales: 32 },
        { name: "Onduleur APC 650VA", sales: 27 },
        { name: "Écran Samsung 22 pouces", sales: 24 },
        { name: "Disque SSD 1 To", sales: 19 },
    ];

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
                                Suivez vos ventes, votre stock, vos clients et
                                vos performances commerciales depuis une seule
                                interface.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                            <Laptop className="h-8 w-8" />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

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
                    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
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
                                                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300">
                                                    {sale.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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

                            <div className="space-y-3">
                                {stockAlerts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
                                    >
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            {item.name}
                                        </span>
                                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                            {item.stock} restants
                                        </span>
                                    </div>
                                ))}
                            </div>
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

                            <div className="space-y-4">
                                {topProducts.map((item, index) => (
                                    <div key={index}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {item.name}
                                            </span>
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {item.sales} ventes
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                                style={{
                                                    width: `${(item.sales / 32) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                    1 280 000 Ar
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
                                    12
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
                                    247
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}