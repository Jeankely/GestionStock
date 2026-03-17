import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
} from "lucide-react";

export default function Index() {
    const categories = [
        {
            name: "Ordinateurs",
            description: "PC portables, PC de bureau et accessoires liés",
            products: 48,
            icon: Monitor,
        },
        {
            name: "Imprimantes",
            description: "Imprimantes laser, jet d’encre et multifonctions",
            products: 19,
            icon: Printer,
        },
        {
            name: "Composants",
            description: "Processeurs, cartes mères, RAM, boîtiers",
            products: 64,
            icon: Cpu,
        },
        {
            name: "Stockage",
            description: "SSD, HDD, clés USB et cartes mémoire",
            products: 37,
            icon: HardDrive,
        },
        {
            name: "Réseaux",
            description: "Routeurs, switches, modems et câbles réseau",
            products: 26,
            icon: Wifi,
        },
        {
            name: "Sécurité",
            description: "Onduleurs, antivirus, équipements de protection",
            products: 14,
            icon: ShieldCheck,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Catégories" />

            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <FolderTree className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Gestion des catégories
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Organisez vos outils informatiques par catégories.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une catégorie..."
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                            >
                                <Plus className="h-4 w-4" />
                                Nouvelle catégorie
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        {category.products} produits
                                    </span>
                                </div>

                                <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                                    {category.name}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {category.description}
                                </p>

                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                                        Voir détails
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        REF-CAT-{index + 1}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}