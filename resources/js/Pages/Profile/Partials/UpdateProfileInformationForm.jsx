import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    ShieldCheck,
    Truck,
    CheckCircle2,
} from "lucide-react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;

    const isAdmin =
        user?.is_admin === true || user?.roles?.includes("admin");

    const isLivreur =
        user?.is_livreur === true || user?.roles?.includes("livreur");

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
        });
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
        <section>
            <header>
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                        {isAdmin ? (
                            <ShieldCheck className="h-5 w-5" />
                        ) : isLivreur ? (
                            <Truck className="h-5 w-5" />
                        ) : (
                            <User className="h-5 w-5" />
                        )}
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Informations du profil
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Modifiez vos informations personnelles.
                        </p>
                    </div>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
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
                            required
                            isFocused
                            autoComplete="name"
                            className={inputClass(errors.name)}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.name} />
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
                            required
                            autoComplete="username"
                            className={inputClass(errors.email)}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.email} />
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

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
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
                            placeholder="Votre adresse..."
                            className={textareaClass(errors.address)}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.address} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            Votre adresse email n’est pas vérifiée.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="font-semibold underline"
                            >
                                Renvoyer l’email de vérification
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Un nouveau lien de vérification a été envoyé.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-semibold normal-case tracking-normal text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-blue-600 dark:text-white"
                    >
                        <Save className="h-4 w-4" />
                        Enregistrer
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" />
                            Enregistré.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}