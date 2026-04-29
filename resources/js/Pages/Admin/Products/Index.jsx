import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
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
    Pencil,
    Trash2,
    AlertTriangle,
    ShoppingBag,
    BadgeDollarSign,
    Layers,
} from "lucide-react";
import { useMemo, useState } from "react";

const iconMap = {
    Package,
    Laptop,
    Monitor,
    HardDrive,
    Cpu,
};

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const formatStatus = (status) => {
    const labels = {
        disponible: "Disponible",
        faible_stock: "Faible stock",
        rupture: "Rupture",
        inactif: "Inactif",
    };

    return labels[status] || status;
};

const statusClass = (status) => {
    if (status === "disponible") {
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
    }

    if (status === "faible_stock") {
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
    }

    if (status === "rupture") {
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
    }

    return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
};

export default function Index({ products = [], stats = {} }) {
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const text = `${product.name || ""} ${product.reference || ""} ${
                product.category_name || ""
            } ${product.status || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [products, search]);

    const deleteProduct = (product) => {
        if (
            confirm(
                `Voulez-vous vraiment supprimer le produit "${product.name}" ?`
            )
        ) {
            router.delete(route("products.destroy", product.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Produits" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block" />

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <Package className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Catalogue informatique
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Gestion des produits
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Gérez vos produits, leur prix, leur stock,
                                        leur catégorie et leur disponibilité.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("products.create")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                            >
                                <Plus className="h-4 w-4" />
                                Nouveau produit
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Boxes className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total produits
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.total || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Tag className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Disponibles
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.available || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <HardDrive className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Faible stock
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.low_stock || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-10 w-10 rounded-2xl bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Rupture
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.out_of_stock || 0}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Liste des produits
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredProducts.length} produit(s) trouvé(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un produit..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-900/30"
                            />
                        </div>
                    </div>
                </section>

                {filteredProducts.length > 0 ? (
                    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredProducts.map((product) => {
                            const Icon =
                                iconMap[product.category_icon] || Package;

                            return (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Icon className="h-16 w-16 text-slate-400" />
                                            </div>
                                        )}

                                        <div className="absolute left-4 top-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${statusClass(
                                                    product.status
                                                )}`}
                                            >
                                                {formatStatus(product.status)}
                                            </span>
                                        </div>

                                        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm dark:bg-slate-900/90 dark:text-slate-200">
                                            {product.reference}
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div>
                                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                                                <Layers className="h-4 w-4" />
                                                {product.category_name}
                                            </div>

                                            <h3 className="line-clamp-1 text-lg font-bold text-slate-900 dark:text-white">
                                                {product.name}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">
                                                {product.description ||
                                                    "Aucune description disponible."}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    Prix d’achat
                                                </p>
                                                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                                    {formatMoney(
                                                        product.purchase_price
                                                    )}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-cyan-50 p-3 dark:bg-cyan-900/20">
                                                <p className="text-xs text-cyan-700 dark:text-cyan-300">
                                                    Prix de vente
                                                </p>
                                                <p className="mt-1 text-sm font-bold text-cyan-800 dark:text-cyan-200">
                                                    {formatMoney(
                                                        product.selling_price
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingBag className="h-4 w-4 text-slate-500" />
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        Stock
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                                    {product.stock_quantity}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/60">
                                                <div className="flex items-center gap-2">
                                                    <AlertTriangle className="h-4 w-4 text-slate-500" />
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        Alerte
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                                    {product.alert_quantity}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-900/20">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <BadgeDollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                                                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                                                        Bénéfice estimé
                                                    </span>
                                                </div>

                                                <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                                                    {formatMoney(product.profit)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-1">
                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    product.id
                                                )}
                                                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Modifier
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteProduct(product)
                                                }
                                                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                        <Package className="mx-auto h-10 w-10 text-slate-400" />
                        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                            Aucun produit trouvé
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Commencez par créer un nouveau produit.
                        </p>

                        <Link
                            href={route("products.create")}
                            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                        >
                            <Plus className="h-4 w-4" />
                            Nouveau produit
                        </Link>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}