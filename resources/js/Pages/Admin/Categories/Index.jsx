import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    FolderTree,
    Plus,
    Search,
    Monitor,
    Printer,
    Cpu,
    HardDrive,
    Wifi,
    ShieldCheck,
    Pencil,
    Trash2,
    Boxes,
    Power,
    PowerOff,
} from "lucide-react";
import { useMemo, useState } from "react";

const iconMap = {
    FolderTree,
    Monitor,
    Printer,
    Cpu,
    HardDrive,
    Wifi,
    ShieldCheck,
};

export default function Index({ categories = [] }) {
    const [search, setSearch] = useState("");

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const text = `${category.name || ""} ${category.icon || ""} ${
                category.description || ""
            }`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [categories, search]);

    const deleteCategorie = (category) => {
        if (
            confirm(
                `Voulez-vous vraiment supprimer la catégorie "${category.name}" ?`
            )
        ) {
            router.delete(route("categories.destroy", category.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block" />

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <FolderTree className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Catalogue informatique
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Gestion des catégories
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Organisez vos produits informatiques par
                                        catégories pour faciliter la vente, le stock
                                        et les rapports.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("categories.create")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                            >
                                <Plus className="h-4 w-4" />
                                Nouvelle catégorie
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <FolderTree className="h-11 w-11 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total catégories
                                </p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {categories.length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Power className="h-11 w-11 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Actives
                                </p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {
                                        categories.filter(
                                            (item) => item.is_active === true
                                        ).length
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <PowerOff className="h-11 w-11 rounded-2xl bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Inactives
                                </p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {
                                        categories.filter(
                                            (item) => item.is_active === false
                                        ).length
                                    }
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Boxes className="h-11 w-11 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Produits liés
                                </p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {categories.reduce(
                                        (total, item) =>
                                            total + Number(item.products_count || 0),
                                        0
                                    )}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Liste des catégories
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredCategories.length} catégorie(s) trouvée(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher par nom, icône ou description..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30"
                            />
                        </div>
                    </div>
                </section>

                {filteredCategories.length > 0 ? (
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredCategories.map((category) => {
                            const Icon = iconMap[category.icon] || FolderTree;

                            return (
                                <div
                                    key={category.id}
                                    className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-900/20 dark:text-cyan-300">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                category.is_active
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                            }`}
                                        >
                                            {category.is_active ? "Actif" : "Inactif"}
                                        </span>
                                    </div>

                                    <div className="mt-5">
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {category.name}
                                        </h2>

                                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                            <Icon className="h-3.5 w-3.5" />
                                            {category.icon || "FolderTree"}
                                        </div>
                                    </div>

                                    <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {category.description ||
                                            "Aucune description disponible."}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            Produits
                                        </span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {category.products_count || 0}
                                        </span>
                                    </div>

                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            href={route(
                                                "categories.edit",
                                                category.id
                                            )}
                                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Modifier
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteCategorie(category)
                                            }
                                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                            <FolderTree className="h-8 w-8" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                            Aucune catégorie trouvée
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Commencez par créer une nouvelle catégorie pour organiser vos produits.
                        </p>

                        <Link
                            href={route("categories.create")}
                            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                        >
                            <Plus className="h-4 w-4" />
                            Nouvelle catégorie
                        </Link>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}