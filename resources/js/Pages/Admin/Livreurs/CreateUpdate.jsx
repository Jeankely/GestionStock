import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Truck,
    Save,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    BadgeCheck,
    Sparkles,
} from "lucide-react";

export default function CreateUpdate({ livreur = null, mode = "create" }) {
    const isEdit = mode === "edit";

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: livreur?.name || "",
        email: livreur?.email || "",
        phone: livreur?.phone || "",
        address: livreur?.address || "",
        is_active: livreur?.is_active ?? true,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("livreurs.update", livreur.id), {
                preserveScroll: true,
            });
        } else {
            post(route("livreurs.store"), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
        }
    };

    const inputClass = (hasError = false) =>
        `h-12 w-full rounded-2xl border bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 ${
            hasError
                ? "border-red-400"
                : "border-slate-200 dark:border-slate-700"
        }`;

    const textareaClass = (hasError = false) =>
        `w-full resize-none rounded-2xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 ${
            hasError
                ? "border-red-400"
                : "border-slate-200 dark:border-slate-700"
        }`;

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Modifier un livreur" : "Nouveau livreur"} />

            <div className="mx-auto max-w-5xl space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <Truck className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Gestion des livreurs
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        {isEdit
                                            ? "Modifier le livreur"
                                            : "Créer un nouveau livreur"}
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Créez un compte utilisateur avec le rôle
                                        livreur pour suivre les livraisons.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("livreurs.index")}
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
                                <User className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Informations du livreur
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Le rôle sera automatiquement défini sur livreur.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nom complet"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Ex : Jean Rakoto"
                                        isFocused
                                        className={inputClass(errors.name)}
                                    />
                                </div>

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="livreur@email.com"
                                        className={inputClass(errors.email)}
                                    />
                                </div>

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="phone"
                                    value="Téléphone"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        placeholder="034 00 000 00"
                                        className={inputClass(errors.phone)}
                                    />
                                </div>

                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    value="Statut"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <label className="flex h-12 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
                                    <Checkbox
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span className="font-medium">
                                        {data.is_active
                                            ? "Livreur actif"
                                            : "Livreur inactif"}
                                    </span>
                                </label>

                                <InputError
                                    message={errors.is_active}
                                    className="mt-2"
                                />
                            </div>

                            <div className="lg:col-span-2">
                                <InputLabel
                                    htmlFor="address"
                                    value="Adresse"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />

                                    <textarea
                                        id="address"
                                        rows="3"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Adresse du livreur..."
                                        className={textareaClass(errors.address)}
                                    />
                                </div>

                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Mot de passe"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            isEdit
                                                ? "Laisser vide si inchangé"
                                                : "Mot de passe"
                                        }
                                        className={inputClass(errors.password)}
                                    />
                                </div>

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmation mot de passe"
                                    className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                                />

                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirmer le mot de passe"
                                        className={inputClass(
                                            errors.password_confirmation
                                        )}
                                    />
                                </div>

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
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
                                        Vérifiez les informations avant
                                        d’enregistrer.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={route("livreurs.index")}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Annuler
                                </Link>

                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold normal-case tracking-normal text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:text-white"
                                >
                                    {processing ? (
                                        <>
                                            <Sparkles className="h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            {isEdit
                                                ? "Modifier"
                                                : "Enregistrer"}
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}