import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Truck, XCircle } from "lucide-react";

export default function AssignDeliveryModal({
    show = false,
    assignForm,
    setAssignForm,
    livreurs = [],
    errors = {},
    onClose,
    onSubmit,
}) {
    if (!show) {
        return null;
    }

    const inputClass =
        "h-12 w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-cyan-300 focus:bg-slate-950/60 focus:ring-4 focus:ring-cyan-400/20 dark:border-white/20 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-white/60 dark:focus:border-cyan-300 dark:focus:bg-slate-950/60 dark:focus:ring-cyan-400/20";

    const selectClass =
        "h-12 w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 text-sm text-white outline-none transition focus:border-cyan-300 focus:bg-slate-950/60 focus:ring-4 focus:ring-cyan-400/20";

    const textareaClass =
        "w-full resize-none rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-cyan-300 focus:bg-slate-950/60 focus:ring-4 focus:ring-cyan-400/20";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-slate-900 p-6 text-white shadow-2xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-white">
                            Assigner une livraison
                        </h2>

                        <p className="mt-1 text-sm text-white/80">
                            Sélectionnez un livreur pour cette vente.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl p-2 text-white transition hover:bg-white/10"
                    >
                        <XCircle className="h-5 w-5 text-white" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <InputLabel
                            htmlFor="livreur_id"
                            value="Livreur"
                            className="mb-2 font-semibold text-white dark:text-white"
                        />

                        <select
                            id="livreur_id"
                            value={assignForm.livreur_id}
                            onChange={(e) =>
                                setAssignForm((current) => ({
                                    ...current,
                                    livreur_id: e.target.value,
                                }))
                            }
                            className={selectClass}
                        >
                            <option value="" className="bg-slate-900 text-white">
                                Sélectionner un livreur
                            </option>

                            {livreurs.map((livreur) => (
                                <option
                                    key={livreur.id}
                                    value={livreur.id}
                                    className="bg-slate-900 text-white"
                                >
                                    {livreur.name}
                                    {livreur.phone
                                        ? ` - ${livreur.phone}`
                                        : ""}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.livreur_id}
                            className="mt-2 text-red-300 dark:text-red-300"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="scheduled_date"
                            value="Date prévue"
                            className="mb-2 font-semibold text-white dark:text-white"
                        />

                        <TextInput
                            id="scheduled_date"
                            type="date"
                            value={assignForm.scheduled_date}
                            onChange={(e) =>
                                setAssignForm((current) => ({
                                    ...current,
                                    scheduled_date: e.target.value,
                                }))
                            }
                            className={inputClass}
                        />

                        <InputError
                            message={errors.scheduled_date}
                            className="mt-2 text-red-300 dark:text-red-300"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="delivery_phone"
                            value="Téléphone de livraison"
                            className="mb-2 font-semibold text-white dark:text-white"
                        />

                        <TextInput
                            id="delivery_phone"
                            type="text"
                            value={assignForm.delivery_phone}
                            onChange={(e) =>
                                setAssignForm((current) => ({
                                    ...current,
                                    delivery_phone: e.target.value,
                                }))
                            }
                            placeholder="Téléphone du client ou du destinataire"
                            className={inputClass}
                        />

                        <InputError
                            message={errors.delivery_phone}
                            className="mt-2 text-red-300 dark:text-red-300"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="delivery_address"
                            value="Adresse de livraison"
                            className="mb-2 font-semibold text-white dark:text-white"
                        />

                        <textarea
                            id="delivery_address"
                            rows="3"
                            value={assignForm.delivery_address}
                            onChange={(e) =>
                                setAssignForm((current) => ({
                                    ...current,
                                    delivery_address: e.target.value,
                                }))
                            }
                            placeholder="Adresse de livraison..."
                            className={textareaClass}
                        />

                        <InputError
                            message={errors.delivery_address}
                            className="mt-2 text-red-300 dark:text-red-300"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="notes"
                            value="Notes"
                            className="mb-2 font-semibold text-white dark:text-white"
                        />

                        <textarea
                            id="notes"
                            rows="3"
                            value={assignForm.notes}
                            onChange={(e) =>
                                setAssignForm((current) => ({
                                    ...current,
                                    notes: e.target.value,
                                }))
                            }
                            placeholder="Notes pour le livreur..."
                            className={textareaClass}
                        />

                        <InputError
                            message={errors.notes}
                            className="mt-2 text-red-300 dark:text-red-300"
                        />
                    </div>

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                            Annuler
                        </button>

                        <PrimaryButton
                            type="submit"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold normal-case tracking-normal text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:text-white"
                        >
                            <Truck className="h-4 w-4 text-white" />
                            Assigner
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}