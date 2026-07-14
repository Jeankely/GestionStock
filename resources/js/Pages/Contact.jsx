import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    User,
    MessageSquare,
    ShieldCheck,
} from "lucide-react";

export default function Contact() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const submit = (event) => {
        event.preventDefault();
        clearErrors();

        post(route("contact.send"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact" />

            <section className="relative overflow-hidden text-white"
                style={{
                    backgroundImage: "url('/images/fond3.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                            Contactez-nous
                        </h1>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Infos de contact */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Nos coordonnées
                            </h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                Vous pouvez nous joindre par les moyens suivants.
                            </p>

                            <div className="mt-6 space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            Email
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            jeansmall409from@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            Téléphone
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            +261 34 87 117 64
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            Adresse
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Befandriana-Nord,Région SOFIA, Madagascar
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Support professionnel
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Envoyez-nous un message
                                </h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">
                                    Remplissez le formulaire ci-dessous et nous vous
                                    répondrons dès que possible.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Nom complet
                                        </label>
                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(event) =>
                                                    setData("name", event.target.value)
                                                }
                                                placeholder="Votre nom"
                                                autoComplete="name"
                                                required
                                                aria-invalid={Boolean(errors.name)}
                                                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/40"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Adresse email
                                        </label>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(event) =>
                                                    setData("email", event.target.value)
                                                }
                                                placeholder="Votre email"
                                                autoComplete="email"
                                                required
                                                aria-invalid={Boolean(errors.email)}
                                                className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/40"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Message
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={data.message}
                                            onChange={(event) =>
                                                setData("message", event.target.value)
                                            }
                                            placeholder="Votre message"
                                            rows="6"
                                            maxLength={5000}
                                            required
                                            aria-invalid={Boolean(errors.message)}
                                            className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/40"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing
                                        ? "Envoi en cours..."
                                        : "Envoyer le message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}