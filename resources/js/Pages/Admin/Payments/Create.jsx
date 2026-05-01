import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    ArrowLeft,
    CreditCard,
    Save,
    Wallet,
    UserCircle2,
    Receipt,
    XCircle,
} from "lucide-react";

const formatMoney = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(Number(amount || 0)) + " Ar";
};

export default function Create({ sale }) {
    const { flash } = usePage().props;

    const today = new Date().toISOString().slice(0, 10);

    const { data, setData, post, processing, errors } = useForm({
        payment_date: today,
        amount: sale?.remaining_amount || "",
        method: "espece",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("payments.store", sale.id), {
            preserveScroll: true,
        });
    };

    const inputClass = (hasError = false) =>
        `h-12 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
            hasError
                ? "border-red-400"
                : "border-slate-200 dark:border-slate-700"
        }`;

    const textareaClass = (hasError = false) =>
        `w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-cyan-900/30 ${
            hasError
                ? "border-red-400"
                : "border-slate-200 dark:border-slate-700"
        }`;

    return (
        <AuthenticatedLayout>
            <Head title="Nouveau paiement" />

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

            <div className="mx-auto max-w-5xl space-y-6">
                <section className="rounded-3xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 p-6 text-white shadow-xl sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                <CreditCard className="h-7 w-7" />
                            </div>

                            <div>
                                <p className="text-sm text-cyan-100">
                                    Gestion des paiements
                                </p>

                                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                                    Ajouter un paiement
                                </h1>

                                <p className="mt-2 text-sm text-cyan-100">
                                    Enregistrez un paiement en espèce pour cette vente.
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route("sales.index")}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Receipt className="h-10 w-10 rounded-2xl bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Référence
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {sale.reference}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <UserCircle2 className="h-10 w-10 rounded-2xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Client
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {sale.client}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center gap-3">
                            <Wallet className="h-10 w-10 rounded-2xl bg-amber-50 p-2 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300" />

                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Reste à payer
                                </p>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {formatMoney(sale.remaining_amount)}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                <form
                    onSubmit={submit}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
                >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="payment_date"
                                value="Date du paiement"
                                className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                            />

                            <TextInput
                                id="payment_date"
                                type="date"
                                value={data.payment_date}
                                onChange={(e) =>
                                    setData("payment_date", e.target.value)
                                }
                                className={inputClass(errors.payment_date)}
                            />

                            <InputError
                                message={errors.payment_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="amount"
                                value="Montant payé"
                                className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                            />

                            <TextInput
                                id="amount"
                                type="number"
                                min="1"
                                step="0.01"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className={inputClass(errors.amount)}
                            />

                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel
                                value="Mode de paiement"
                                className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                            />

                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 dark:bg-slate-900 dark:text-emerald-300">
                                        <CreditCard className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                                            Espèce
                                        </p>

                                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                            Pour commencer, les paiements sont enregistrés uniquement en espèce.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel
                                htmlFor="notes"
                                value="Note"
                                className="mb-2 font-semibold text-slate-700 dark:text-slate-200"
                            />

                            <textarea
                                id="notes"
                                rows="4"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className={textareaClass(errors.notes)}
                                placeholder="Remarque, reçu, information de caisse..."
                            />

                            <InputError
                                message={errors.notes}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route("sales.index")}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Annuler
                        </Link>

                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold normal-case tracking-normal text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:text-white"
                        >
                            {processing ? (
                                "Enregistrement..."
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Enregistrer le paiement
                                </>
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}