import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    ShoppingCart,
    Search,
    CheckCircle2,
    Trash2,
    Pencil,
    Wallet,
    Clock,
    Ban,
    Receipt,
    UserCircle2,
    CalendarDays,
    CreditCard,
    Package,
    XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const statusLabel = (status) => {
    const labels = {
        en_attente: "En attente",
        validee: "Validée",
        payee: "Payée",
        livree: "Livrée",
        annulee: "Annulée",
    };

    return labels[status] || status;
};

const statusClass = (status) => {
    if (status === "validee" || status === "payee" || status === "livree") {
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
    }

    if (status === "annulee") {
        return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
    }

    return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
};

const paymentLabel = (status) => {
    const labels = {
        paye: "Payé",
        partiel: "Partiel",
        non_paye: "Non payé",
    };

    return labels[status] || status;
};

const paymentClass = (status) => {
    if (status === "paye") {
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
    }

    if (status === "partiel") {
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300";
};

const paymentMethodLabel = (method) => {
    const labels = {
        espece: "Espèce",
        mobile_money: "Mobile Money",
        carte: "Carte bancaire",
        virement: "Virement",
        cheque: "Chèque",
    };

    return labels[method] || method;
};

const canCancelSale = (status) => {
    return status === "en_attente";
};

const canDeleteSale = (status) => {
    return status === "en_attente" || status === "annulee";
};

export default function Index({ sales = [], stats = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");

    const filteredSales = useMemo(() => {
        return sales.filter((sale) => {
            const text = `${sale.reference || ""} ${sale.client || ""} ${
                sale.status || ""
            } ${sale.payment_status || ""} ${sale.payment_method || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [sales, search]);

    const confirmSale = (sale) => {
        if (
            confirm(
                `Valider la livraison et le paiement de la vente ${sale.reference} ? Le stock est déjà réservé depuis la commande.`
            )
        ) {
            router.post(
                route("sales.confirm", sale.id),
                {},
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        router.visit(route("sales.index"), {
                            preserveScroll: true,
                            replace: true,
                        });
                    },
                }
            );
        }
    };

    const cancelSale = (sale) => {
        if (
            confirm(
                `Annuler la vente ${sale.reference} ? Le stock des produits commandés sera remis automatiquement.`
            )
        ) {
            router.post(
                route("sales.cancel", sale.id),
                {},
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        router.visit(route("sales.index"), {
                            preserveScroll: true,
                            replace: true,
                        });
                    },
                }
            );
        }
    };

    const deleteSale = (sale) => {
        if (confirm(`Supprimer définitivement la vente ${sale.reference} ?`)) {
            router.delete(route("sales.destroy", sale.id), {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.visit(route("sales.index"), {
                        preserveScroll: true,
                        replace: true,
                    });
                },
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ventes" />

            {flash?.success && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-emerald-200 bg-white p-4 shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Succès
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {flash.success}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="fixed right-4 top-24 z-50 max-w-md rounded-3xl border border-red-200 bg-white p-4 shadow-2xl dark:border-red-900 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <XCircle className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                Erreur
                            </h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                {flash.error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 shadow-xl">
                    <div className="relative p-6 text-white sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                    <ShoppingCart className="h-7 w-7" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-cyan-100">
                                        Module de vente
                                    </p>
                                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Gestion des ventes
                                    </h1>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-cyan-100">
                                        Consultez les ventes passées par les clients,
                                        validez les ventes en attente ou annulez-les si nécessaire.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Receipt className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Total ventes
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.total || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Clock className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    En attente
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.pending || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Validées
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stats.confirmed || 0}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-10 w-10 rounded-2xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300" />
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Chiffre d’affaires
                                </p>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {formatMoney(stats.turnover)}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Liste des ventes
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredSales.length} vente(s) trouvée(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher une vente..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-900/30"
                            />
                        </div>
                    </div>
                </section>

                {filteredSales.length > 0 ? (
                    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                        {filteredSales.map((sale) => (
                            <article
                                key={sale.id}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {sale.reference}
                                            </h3>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                                                    sale.status
                                                )}`}
                                            >
                                                {statusLabel(sale.status)}
                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentClass(
                                                    sale.payment_status
                                                )}`}
                                            >
                                                {paymentLabel(sale.payment_status)}
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <UserCircle2 className="h-4 w-4" />
                                                {sale.client}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <CalendarDays className="h-4 w-4" />
                                                {sale.sale_date}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <CreditCard className="h-4 w-4" />
                                                {paymentMethodLabel(
                                                    sale.payment_method
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-right dark:bg-cyan-900/20">
                                        <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                            Total vente
                                        </p>
                                        <p className="mt-1 text-xl font-bold text-cyan-800 dark:text-cyan-200">
                                            {formatMoney(sale.total_amount)}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            Payé : {formatMoney(sale.paid_amount)}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Reste :{" "}
                                            {formatMoney(sale.remaining_amount)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        <Package className="h-4 w-4" />
                                        Produits commandés
                                    </div>

                                    <div className="space-y-2">
                                        {sale.items && sale.items.length > 0 ? (
                                            sale.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm dark:bg-slate-900"
                                                >
                                                    <span className="font-medium text-slate-700 dark:text-slate-200">
                                                        {item.product}
                                                    </span>
                                                    <span className="text-slate-500 dark:text-slate-400">
                                                        x{item.quantity} —{" "}
                                                        {formatMoney(
                                                            item.total_price
                                                        )}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Aucun produit dans cette vente.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                                    {sale.status === "en_attente" && (
                                        <>
                                            <Link
                                                href={route(
                                                    "sales.edit",
                                                    sale.id
                                                )}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Modifier
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => confirmSale(sale)}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Livrer et payer
                                            </button>
                                        </>
                                    )}

                                    {canCancelSale(sale.status) && (
                                        <button
                                            type="button"
                                            onClick={() => cancelSale(sale)}
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-amber-50 px-5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30"
                                        >
                                            <Ban className="h-4 w-4" />
                                            Annuler
                                        </button>
                                    )}

                                    {canDeleteSale(sale.status) && (
                                        <button
                                            type="button"
                                            onClick={() => deleteSale(sale)}
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Supprimer
                                        </button>
                                    )}

                                    {sale.status === "annulee" && (
                                        <div className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                            <XCircle className="h-4 w-4" />
                                            Vente annulée
                                        </div>
                                    )}

                                    {(sale.status === "payee" ||
                                        sale.status === "livree") && (
                                        <div className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-emerald-100 px-5 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Vente verrouillée
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
                        <ShoppingCart className="mx-auto h-10 w-10 text-slate-400" />
                        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                            Aucune vente trouvée
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Les ventes apparaîtront ici lorsqu’un client passe une commande.
                        </p>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}