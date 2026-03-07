import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import {
    Boxes,
    ShoppingCart,
    Warehouse,
    ArrowRight,
    ShieldCheck,
    BarChart3,
    LaptopMinimal,
} from 'lucide-react';

export default function Home() {
    const features = [
        {
            title: 'Gestion des Produits',
            text: 'Ajoutez, modifiez et organisez facilement vos matériels informatiques avec une interface claire et structurée.',
            icon: Boxes,
        },
        {
            title: 'Gestion des Ventes',
            text: 'Suivez les ventes, les factures et l’historique des transactions pour une meilleure maîtrise commerciale.',
            icon: ShoppingCart,
        },
        {
            title: 'Gestion des Stocks',
            text: 'Contrôlez les quantités disponibles en temps réel et évitez les ruptures ou les surstocks.',
            icon: Warehouse,
        },
    ];

    const stats = [
        {
            label: 'Suivi fiable',
            value: '100%',
            icon: ShieldCheck,
        },
        {
            label: 'Gestion rapide',
            value: '24/7',
            icon: BarChart3,
        },
        {
            label: 'Matériel IT',
            value: 'Pro',
            icon: LaptopMinimal,
        },
    ];

    return (
        <GuestLayout>
            <Head title="Accueil" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Texte */}
                        <div className="text-center lg:text-left">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <LaptopMinimal className="h-4 w-4" />
                                Solution moderne pour votre activité informatique
                            </div>

                            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                Système de gestion de vente
                                <span className="block text-cyan-200">
                                    de matériel informatique
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-cyan-50 sm:text-lg lg:mx-0">
                                Gérez vos produits, vos ventes, vos clients et votre
                                stock dans une plateforme professionnelle, rapide
                                et adaptée aux besoins d’un magasin informatique.
                            </p>

                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-cyan-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Commencer
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href={route('about')}
                                    className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        </div>

                        {/* Carte visuelle */}
                        <div className="relative">
                            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-cyan-100">
                                            Tableau de bord
                                        </p>
                                        <h3 className="text-xl font-bold">
                                            JK TechStore
                                        </h3>
                                    </div>
                                    <div className="rounded-2xl bg-white/15 p-3">
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {stats.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10"
                                            >
                                                <Icon className="mb-3 h-5 w-5 text-cyan-200" />
                                                <p className="text-2xl font-bold">
                                                    {item.value}
                                                </p>
                                                <p className="text-sm text-cyan-100">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 rounded-2xl bg-slate-950/30 p-4 ring-1 ring-white/10">
                                    <p className="text-sm text-cyan-100">
                                        Une interface conçue pour :
                                    </p>
                                    <ul className="mt-3 space-y-2 text-sm text-white/90">
                                        <li>• Suivre vos stocks avec précision</li>
                                        <li>• Accélérer l’enregistrement des ventes</li>
                                        <li>• Mieux organiser votre catalogue produit</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-block rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                        Fonctionnalités principales
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        Tout ce qu’il faut pour bien gérer votre activité
                    </h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Une plateforme pensée pour simplifier la vente, le suivi
                        des produits et la gestion du stock dans le domaine
                        informatique.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 transition group-hover:scale-110 dark:bg-cyan-900/30 dark:text-cyan-300">
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </GuestLayout>
    );
}