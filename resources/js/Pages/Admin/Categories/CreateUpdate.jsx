import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    FolderTree,
    Save,
    XCircle,
    FileText,
    BadgeCheck,
    Sparkles,
} from "lucide-react";

export default function CreateUpdate({ categorie = null, mode = "create" }) {
    const isEdit = mode === "edit";

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: categorie?.name || "",
        description: categorie?.description || "",
        icon: categorie?.icon || "FolderTree",
        is_active: categorie?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("categories.update", categorie.id), {
                preserveScroll: true,
            });
        } else {
            post(route("categories.store"), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Modifier une catégorie" : "Nouvelle catégorie"} />

            <div className="mx-auto max-w-5xl space-y-6">
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
                                        Gestion des catégories
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        {isEdit
                                            ? "Modifier la catégorie"
                                            : "Créer une nouvelle catégorie"}
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Organisez vos produits informatiques par familles :
                                        ordinateurs, imprimantes, composants, stockage,
                                        réseaux ou sécurité.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("categories.index")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Retour
                            </Link>
                        </div>
                    </div>
                </section>

                <form onSubmit={submit} className="space-y-6">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <FileText className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Informations de la catégorie
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Remplissez les informations nécessaires.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div className="lg:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Nom de la catégorie
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Ex : Ordinateurs"
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.name
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Icône
                                </label>

                                <select
                                    value={data.icon}
                                    onChange={(e) => setData("icon", e.target.value)}
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30"
                                >
                                    <option value="FolderTree">Catégorie</option>
                                    <option value="Monitor">Ordinateurs</option>
                                    <option value="Printer">Imprimantes</option>
                                    <option value="Cpu">Composants</option>
                                    <option value="HardDrive">Stockage</option>
                                    <option value="Wifi">Réseaux</option>
                                    <option value="ShieldCheck">Sécurité</option>
                                </select>

                                {errors.icon && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.icon}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Statut
                                </label>

                                <select
                                    value={data.is_active ? "1" : "0"}
                                    onChange={(e) =>
                                        setData("is_active", e.target.value === "1")
                                    }
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30"
                                >
                                    <option value="1">Actif</option>
                                    <option value="0">Inactif</option>
                                </select>

                                {errors.is_active && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.is_active}
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Description
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows="5"
                                    placeholder="Ex : PC portables, PC de bureau et accessoires liés..."
                                    className={`w-full resize-none rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.description
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.description && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300">
                                    <BadgeCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Validation
                                    </h3>

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Vérifiez les informations avant d’enregistrer.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={route("categories.index")}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? (
                                        <>
                                            <Sparkles className="h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            {isEdit ? "Modifier" : "Enregistrer"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}