import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Package,
    Save,
    XCircle,
    FileText,
    BadgeCheck,
    Sparkles,
    ImagePlus,
} from "lucide-react";
import { useEffect, useState } from "react";

const getAutomaticStatus = (stockQuantity, alertQuantity) => {
    const stock = Number(stockQuantity || 0);
    const alert = Number(alertQuantity || 0);

    if (stock <= 0) {
        return "rupture";
    }

    if (stock <= alert) {
        return "faible_stock";
    }

    return "disponible";
};

const statusLabels = {
    disponible: "Disponible",
    faible_stock: "Faible stock",
    rupture: "Rupture",
};

const statusClasses = {
    disponible:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
    faible_stock:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
    rupture:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300",
};

export default function CreateUpdate({
    product = null,
    categories = [],
    mode = "create",
}) {
    const isEdit = mode === "edit";
    const [previewImage, setPreviewImage] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform,
    } = useForm({
        category_id: product?.category_id || "",
        name: product?.name || "",
        description: product?.description || "",
        purchase_price: product?.purchase_price || "",
        selling_price: product?.selling_price || "",
        stock_quantity: product?.stock_quantity ?? 0,
        alert_quantity: product?.alert_quantity ?? 5,
        status: getAutomaticStatus(
            product?.stock_quantity ?? 0,
            product?.alert_quantity ?? 5
        ),
        image: null,
    });

    const automaticStatus = getAutomaticStatus(
        data.stock_quantity,
        data.alert_quantity
    );

    useEffect(() => {
        if (data.status !== automaticStatus) {
            setData("status", automaticStatus);
        }
    }, [data.stock_quantity, data.alert_quantity, automaticStatus]);

    useEffect(() => {
        if (!data.image) {
            setPreviewImage(null);
            return;
        }

        const objectUrl = URL.createObjectURL(data.image);
        setPreviewImage(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [data.image]);

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            transform((formData) => ({
                ...formData,
                status: automaticStatus,
                _method: "put",
            }));

            post(route("products.update", product.id), {
                preserveScroll: true,
                forceFormData: true,
            });
        } else {
            transform((formData) => ({
                ...formData,
                status: automaticStatus,
            }));

            post(route("products.store"), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setPreviewImage(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Modifier un produit" : "Nouveau produit"} />

            <div className="mx-auto max-w-6xl space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block" />

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <Package className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Catalogue informatique
                                    </p>

                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        {isEdit
                                            ? "Modifier le produit"
                                            : "Créer un nouveau produit"}
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Ajoutez vos matériels informatiques avec leur
                                        catégorie, prix, stock, seuil d’alerte et image.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("products.index")}
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
                                    Informations du produit
                                </h2>

                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    La référence sera générée automatiquement après l’enregistrement.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Catégorie
                                </label>

                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.category_id
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                >
                                    <option value="">
                                        Sélectionner une catégorie
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Nom du produit
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Ex : HP EliteBook 840"
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
                                    Prix d’achat
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.purchase_price}
                                    onChange={(e) =>
                                        setData("purchase_price", e.target.value)
                                    }
                                    placeholder="Ex : 1800000"
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.purchase_price
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.purchase_price && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.purchase_price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Prix de vente
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.selling_price}
                                    onChange={(e) =>
                                        setData("selling_price", e.target.value)
                                    }
                                    placeholder="Ex : 2100000"
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.selling_price
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.selling_price && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.selling_price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.stock_quantity}
                                    onChange={(e) =>
                                        setData("stock_quantity", e.target.value)
                                    }
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.stock_quantity
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.stock_quantity && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.stock_quantity}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Stock minimum avant alerte
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.alert_quantity}
                                    onChange={(e) =>
                                        setData("alert_quantity", e.target.value)
                                    }
                                    className={`h-12 w-full rounded-2xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30 ${
                                        errors.alert_quantity
                                            ? "border-red-400"
                                            : "border-slate-200 dark:border-slate-700"
                                    }`}
                                />

                                {errors.alert_quantity && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.alert_quantity}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Statut automatique
                                </label>

                                <div
                                    className={`flex h-12 w-full items-center rounded-2xl border px-4 text-sm font-bold ${
                                        statusClasses[automaticStatus] ||
                                        statusClasses.disponible
                                    }`}
                                >
                                    {statusLabels[automaticStatus] || "Disponible"}
                                </div>

                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    Le statut est calculé automatiquement selon le stock disponible.
                                </p>

                                {errors.status && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    Image du produit
                                </label>

                                <label
                                    className={`group relative flex min-h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed bg-slate-50 transition hover:border-cyan-500 hover:bg-cyan-50/40 dark:bg-slate-950 dark:hover:bg-cyan-950/20 ${
                                        errors.image
                                            ? "border-red-400"
                                            : "border-slate-300 dark:border-slate-700"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            if (file) {
                                                setData("image", file);
                                            }
                                        }}
                                        className="sr-only"
                                    />

                                    {previewImage ? (
                                        <>
                                            <img
                                                src={previewImage}
                                                alt="Prévisualisation"
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-black/35 opacity-0 transition group-hover:opacity-100" />

                                            <div className="relative z-10 hidden rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-lg group-hover:flex dark:bg-slate-900/90 dark:text-white">
                                                Changer l’image
                                            </div>
                                        </>
                                    ) : isEdit && product?.image ? (
                                        <>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-black/35 opacity-0 transition group-hover:opacity-100" />

                                            <div className="relative z-10 hidden rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-lg group-hover:flex dark:bg-slate-900/90 dark:text-white">
                                                Changer l’image
                                            </div>
                                        </>
                                    ) : (
                                        <div className="px-6 text-center">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                                <ImagePlus className="h-8 w-8" />
                                            </div>

                                            <p className="mt-4 text-sm font-bold text-slate-800 dark:text-white">
                                                Cliquez pour choisir une image
                                            </p>

                                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                Formats acceptés : JPG, PNG, WEBP.
                                                Taille maximale : 2 Mo.
                                            </p>
                                        </div>
                                    )}
                                </label>

                                {data.image && (
                                    <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                        Image sélectionnée : {data.image.name}
                                    </p>
                                )}

                                {errors.image && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.image}
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
                                    placeholder="Description du produit..."
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
                                    href={route("products.index")}
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
                                            {isEdit
                                                ? "Modifier"
                                                : "Enregistrer"}
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