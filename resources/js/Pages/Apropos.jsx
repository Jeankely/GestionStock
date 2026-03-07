import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import {
    Info,
    User,
    GraduationCap,
    Briefcase,
    Target,
    ShieldCheck,
    Wrench,
} from "lucide-react";

export default function Apropos() {
    return (
        <GuestLayout>
            <Head title="À propos" />

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                            <Info className="h-4 w-4" />
                            Présentation du projet
                        </div>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl">
                            À propos de l’application
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-cyan-50 sm:text-lg">
                            Découvrez le contexte, le développeur et l’objectif de ce
                            système de gestion de vente de matériel informatique.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Colonne gauche */}
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                <User className="h-6 w-6" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Développeur
                            </h2>

                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">
                                RANDRIAMILAMINA Jean Kely
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                <GraduationCap className="h-6 w-6" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Formation
                            </h2>

                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">
                                Étudiant sortant de l’École Normale Supérieure pour
                                l’Enseignement Technique (ENSET) à Antsiranana, dans le
                                parcours MSI (Management de la Sécurité Informatique).
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                <Briefcase className="h-6 w-6" />
                            </div>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Encadrement
                            </h2>

                            <p className="mt-3 text-slate-600 leading-7 dark:text-slate-400">
                                Cette application web a été réalisée avec
                                l’accompagnement de Docteur RALAHADY Bruno Bakys,
                                enseignant à l’Université d’Antsiranana.
                            </p>
                        </div>
                    </div>

                    {/* Colonne droite */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Présentation du développeur
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Informations personnelles et académiques
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-8 dark:text-slate-400">
                                Monsieur <span className="font-semibold text-slate-900 dark:text-white">RANDRIAMILAMINA Jean Kely</span>,
                                originaire de Betaimboraka, commune rurale d’Ambararata,
                                district de Befandriana-Nord, région Sofia, est le
                                développeur de cette application web.
                            </p>

                            <p className="mt-4 text-slate-600 leading-8 dark:text-slate-400">
                                Il est étudiant sortant de l’École Normale Supérieure
                                pour l’Enseignement Technique (ENSET) à Antsiranana,
                                dans le parcours <span className="font-semibold text-slate-900 dark:text-white">MSI</span>
                                {" "}(
                                Management de la Sécurité Informatique).
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                    <Wrench className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Réalisation du projet
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Collaboration académique et technique
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-8 dark:text-slate-400">
                                Cette application web a été conçue grâce à une
                                collaboration entre le développeur lui-même et son
                                encadreur,
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {" "}Docteur RALAHADY Bruno Bakys
                                </span>,
                                enseignant à l’Université d’Antsiranana.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                    <Target className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Objectif principal
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Finalité et utilité du système
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-600 leading-8 dark:text-slate-400">
                                Ce projet est une application web de gestion de vente
                                de matériel informatique permettant d’optimiser la
                                gestion des produits, des ventes, des clients et des
                                stocks.
                            </p>

                            <p className="mt-4 text-slate-600 leading-8 dark:text-slate-400">
                                Son objectif principal est d’aider les entreprises à
                                automatiser leurs processus de vente afin d’améliorer
                                la performance commerciale, l’organisation interne et la
                                traçabilité des transactions.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        Vision du projet
                                    </h3>
                                    <p className="mt-2 text-slate-600 leading-7 dark:text-slate-400">
                                        Offrir une solution moderne, fiable et efficace
                                        pour la gestion commerciale dans le domaine du
                                        matériel informatique.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}