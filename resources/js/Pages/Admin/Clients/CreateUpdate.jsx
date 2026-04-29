import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Users,
    Save,
    XCircle,
    FileText,
    BadgeCheck,
    Sparkles,
    UserCircle2,
    Mail,
    Phone,
    MapPin,
    Building2,
} from "lucide-react";

export default function CreateUpdate({ client = null, mode = "create" }) {
    const isEdit = mode === "edit";

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: client?.name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        address: client?.address || "",
        type: client?.type || "particulier",
        is_active: client?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("clients.update", client.id), {
                preserveScroll: true,
            });
        } else {
            post(route("clients.store"), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Modifier un client" : "Nouveau client"} />

            <div className="mx-auto max-w-5xl space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block" />

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <Users className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Relation client
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        {isEdit
                                            ? "Modifier le client"
                                            : "Créer un nouveau client"}
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Enregistrez les informations du client pour
                                        faciliter le suivi des ventes et des paiements.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("clients.index")}
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
                                    Informations du client
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Remplissez les informations nécessaires.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Nom du client
                                </label>

                                <div className="relative">
                                    <UserCircle2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Ex : Entreprise Nova"
                                        className={`h-12 w-full rounded-2xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
                                            errors.name
                                                ? "border-red-400"
                                                : "border-slate-200 dark:border-slate-700"
                                        }`}
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Type de client
                                </label>

                                <div className="relative">
                                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className={`h-12 w-full rounded-2xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
                                            errors.type
                                                ? "border-red-400"
                                                : "border-slate-200 dark:border-slate-700"
                                        }`}
                                    >
                                        <option value="particulier">Particulier</option>
                                        <option value="entreprise">Entreprise</option>
                                    </select>
                                </div>

                                {errors.type && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="exemple@email.com"
                                        className={`h-12 w-full rounded-2xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
                                            errors.email
                                                ? "border-red-400"
                                                : "border-slate-200 dark:border-slate-700"
                                        }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Téléphone
                                </label>

                                <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        placeholder="+261 34 12 345 67"
                                        className={`h-12 w-full rounded-2xl border bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
                                            errors.phone
                                                ? "border-red-400"
                                                : "border-slate-200 dark:border-slate-700"
                                        }`}
                                    />
                                </div>

                                {errors.phone && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Adresse
                                </label>

                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows="4"
                                        placeholder="Adresse du client..."
                                        className={`w-full resize-none rounded-2xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
                                            errors.address
                                                ? "border-red-400"
                                                : "border-slate-200 dark:border-slate-700"
                                        }`}
                                    />
                                </div>

                                {errors.address && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.address}
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
                                        setData(
                                            "is_active",
                                            e.target.value === "1"
                                        )
                                    }
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30"
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
                                    href={route("clients.index")}
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