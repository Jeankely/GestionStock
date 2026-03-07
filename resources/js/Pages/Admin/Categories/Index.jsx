import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    FolderTree,
    Plus,
    Search,
    ListOrdered,
    Tag,
    ChevronRight,
} from 'lucide-react';

export default function Index({ categories = [] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            <div className="space-y-6">
                {/* Header */}
                <section className="rounded-3xl bg-gradient-to-r from-cyan-700 via-cyan-600 to-slate-900 p-6 text-white shadow-xl sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <FolderTree className="h-4 w-4" />
                                Gestion des catégories
                            </div>

                            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Organisez vos catégories de produits
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50 sm:text-base">
                                Gérez facilement les catégories de matériel
                                informatique pour structurer votre catalogue et
                                améliorer l’organisation des produits.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={route('categories.create')}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-cyan-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter une catégorie
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Card container */}
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    {/* Top actions */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Liste des catégories
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Retrouvez toutes les catégories enregistrées dans
                                votre système.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une catégorie..."
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                <ListOrdered className="h-4 w-4" />
                                {categories.length} catégorie{categories.length > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 md:block">
                        <table className="w-full border-collapse">
                            <thead className="bg-slate-100 dark:bg-slate-800">
                                <tr className="text-left">
                                    <th className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        #
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Nom de la catégorie
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Statut
                                    </th>
                                    <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((categorie, index) => (
                                        <tr
                                            key={categorie.id}
                                            className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                        >
                                            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {index + 1}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                                        <Tag className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-white">
                                                            {categorie.nom_categorie}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                                            Catégorie produit
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <Link
                                                    href={route('categories.show', categorie.id)}
                                                    className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50 dark:text-cyan-300 dark:hover:bg-slate-800"
                                                >
                                                    Voir
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            Aucune catégorie disponible pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-4 md:hidden">
                        {categories.length > 0 ? (
                            categories.map((categorie, index) => (
                                <div
                                    key={categorie.id}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-xl bg-cyan-100 p-2 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                                <Tag className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Catégorie #{index + 1}
                                                </p>
                                                <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
                                                    {categorie.nom_categorie}
                                                </h3>
                                            </div>
                                        </div>

                                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                            Active
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <Link
                                            href={route('categories.show', categorie.id)}
                                            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm transition hover:bg-cyan-50 dark:bg-slate-900 dark:text-cyan-300 dark:hover:bg-slate-800"
                                        >
                                            Voir les détails
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                                <FolderTree className="mx-auto h-10 w-10 text-slate-400" />
                                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                                    Aucune catégorie
                                </h3>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Commencez par ajouter une nouvelle catégorie
                                    pour organiser vos produits.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}