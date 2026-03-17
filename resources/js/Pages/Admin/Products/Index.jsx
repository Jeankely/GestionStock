import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Package,
    Plus,
    Search,
    Laptop,
    Monitor,
    HardDrive,
    Cpu,
    Tag,
    Boxes,
} from "lucide-react";

export default function Index() {
    const products = [
        {
            name: "HP EliteBook 840",
            category: "Ordinateurs",
            price: "2 100 000 Ar",
            stock: 12,
            status: "Disponible",
            icon: Laptop,
        },
        {
            name: "Écran Dell 24 pouces",
            category: "Écrans",
            price: "950 000 Ar",
            stock: 8,
            status: "Disponible",
            icon: Monitor,
        },
        {
            name: "SSD Kingston 1 To",
            category: "Stockage",
            price: "420 000 Ar",
            stock: 5,
            status: "Faible stock",
            icon: HardDrive,
        },
        {
            name: "Processeur Intel i7",
            category: "Composants",
            price: "1 350 000 Ar",
            stock: 3,
            status: "Faible stock",
            icon: Cpu,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Produits" />

            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <Package className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Gestion des produits
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Gérez votre catalogue d’outils et matériels informatiques.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                            >
                                <Plus className="h-4 w-4" />
                                Nouveau produit
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Boxes className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total produits</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">247</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Tag className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Disponibles</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">198</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <HardDrive className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Faible stock</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">21</h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Package className="h-10 w-10 rounded-2xl bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Rupture</p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">7</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Liste des produits
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Produits enregistrés dans le système
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Produit</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Catégorie</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Prix</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Stock</th>
                                    <th className="px-3 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    const Icon = product.icon;

                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-100 dark:border-slate-800/60"
                                        >
                                            <td className="px-3 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                                                        <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {product.category}
                                            </td>
                                            <td className="px-3 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                                {product.price}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {product.stock}
                                            </td>
                                            <td className="px-3 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        product.status === "Disponible"
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                                                    }`}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}