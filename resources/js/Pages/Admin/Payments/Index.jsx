import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    CreditCard,
    Wallet,
    Receipt,
    CalendarDays,
    Trash2,
    UserCircle2,
    Search,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

const methodLabel = (method) => {
    const labels = {
        espece: "Espèce",
        mobile_money: "Mobile Money",
        carte: "Carte bancaire",
        virement: "Virement",
        cheque: "Chèque",
    };

    return labels[method] || method;
};

export default function Index({ payments = [], stats = {} }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");

    const filteredPayments = useMemo(() => {
        return payments.filter((payment) => {
            const text = `${payment.reference || ""} ${
                payment.sale?.reference || ""
            } ${payment.sale?.client || ""} ${payment.method || ""}`.toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [payments, search]);

    const deletePayment = (payment) => {
        if (confirm(`Supprimer le paiement ${payment.reference} ?`)) {
            router.delete(route("payments.destroy", payment.id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Paiements" />

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
                <section className="rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 p-6 text-white shadow-xl sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                            <CreditCard className="h-7 w-7" />
                        </div>
                        <div>
                            <p className="text-sm text-cyan-100">
                                Finances
                            </p>
                            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                Gestion des paiements
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-cyan-100">
                                Suivez les paiements partiels et complets des ventes.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <Wallet className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Total encaissé
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {formatMoney(stats.total_received)}
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <Receipt className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Nombre paiements
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {stats.payments_count || 0}
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <CalendarDays className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Aujourd’hui
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {formatMoney(stats.today_amount)}
                        </h3>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <CreditCard className="h-10 w-10 rounded-2xl bg-violet-50 p-2 text-violet-600 dark:bg-violet-900/20 dark:text-violet-300" />
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Ventes non soldées
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                            {stats.unpaid_sales || 0}
                        </h3>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Historique des paiements
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {filteredPayments.length} paiement(s)
                            </p>
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un paiement..."
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {filteredPayments.map((payment) => (
                        <article
                            key={payment.id}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {payment.reference}
                                    </h3>

                                    <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Receipt className="h-4 w-4" />
                                            Vente : {payment.sale?.reference}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <UserCircle2 className="h-4 w-4" />
                                            {payment.sale?.client}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4" />
                                            {payment.payment_date}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-right dark:bg-cyan-900/20">
                                    <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                                        Montant payé
                                    </p>
                                    <p className="mt-1 text-xl font-bold text-cyan-800 dark:text-cyan-200">
                                        {formatMoney(payment.amount)}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                        {methodLabel(payment.method)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => deletePayment(payment)}
                                    className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}