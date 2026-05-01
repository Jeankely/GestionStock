import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    Boxes,
    ShoppingCart,
    Warehouse,
    ArrowRight,
    ShieldCheck,
    BarChart3,
    LaptopMinimal,
    Monitor,
    Printer,
    Mouse,
    Keyboard,
    Wifi,
    PackageCheck,
    BadgeDollarSign,
    Users,
    Sparkles,
} from "lucide-react";

export default function Home() {
    const features = [
        {
            title: "Gestion des Produits",
            text: "Ajoutez, modifiez et organisez facilement vos matériels informatiques avec une interface claire et structurée.",
            icon: Boxes,
        },
        {
            title: "Gestion des Ventes",
            text: "Suivez les ventes, les factures et l’historique des transactions pour une meilleure maîtrise commerciale.",
            icon: ShoppingCart,
        },
        {
            title: "Gestion des Stocks",
            text: "Contrôlez les quantités disponibles en temps réel et évitez les ruptures ou les surstocks.",
            icon: Warehouse,
        },
    ];

    const stats = [
        {
            label: "Suivi fiable",
            value: "100%",
            icon: ShieldCheck,
        },
        {
            label: "Gestion rapide",
            value: "24/7",
            icon: BarChart3,
        },
        {
            label: "Matériel IT",
            value: "Pro",
            icon: LaptopMinimal,
        },
    ];

    const toolImages = [
        {
            title: "Ordinateurs portables",
            subtitle: "PC modernes et performants",
            image: "/images/home/laptop.jpg",
            icon: LaptopMinimal,
        },
        {
            title: "Claviers",
            subtitle: "Accessoires de saisie",
            image: "/images/home/keyboard.jpg",
            icon: Keyboard,
        },
        {
            title: "Souris",
            subtitle: "Précision et confort",
            image: "/images/home/mouse.jpg",
            icon: Mouse,
        },
        {
            title: "Imprimantes",
            subtitle: "Bureautique et réseau",
            image: "/images/home/printer.jpg",
            icon: Printer,
        },
    ];

    const categories = [
        {
            title: "Moniteurs",
            text: "Écrans et affichages professionnels pour vos clients.",
            image: "/images/home/monitor.jpg",
            icon: Monitor,
        },
        {
            title: "Réseaux",
            text: "Routeurs, accessoires Wi-Fi et équipements connectés.",
            image: "/images/home/router.jpg",
            icon: Wifi,
        },
        {
            title: "Périphériques",
            text: "Claviers, souris, imprimantes et équipements utiles.",
            image: "/images/home/keyboard.jpg",
            icon: PackageCheck,
        },
    ];

    const highlights = [
        {
            title: "Catalogue bien structuré",
            text: "Organisez facilement tous vos produits informatiques.",
            icon: PackageCheck,
        },
        {
            title: "Ventes bien suivies",
            text: "Gardez une trace claire des transactions et paiements.",
            icon: BadgeDollarSign,
        },
        {
            title: "Meilleure relation client",
            text: "Centralisez les informations utiles sur vos clients.",
            icon: Users,
        },
    ];

    return (
        <GuestLayout>
            <Head title="Accueil" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-sky-700 to-slate-950 text-white">
                <div className="absolute inset-0 opacity-25">
                    <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
                    <div className="absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-sky-300 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="text-center lg:text-left">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <Sparkles className="h-4 w-4" />
                                Solution moderne pour votre activité informatique
                            </div>

                            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                                Système de gestion de vente
                                <span className="mt-2 block text-cyan-200">
                                    de matériel informatique
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-cyan-50 sm:text-lg lg:mx-0">
                                Gérez vos produits, vos ventes, vos clients et
                                votre stock dans une plateforme professionnelle,
                                rapide et adaptée aux besoins d’un magasin
                                informatique.
                            </p>

                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                                <Link
                                    href={route("login")}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-cyan-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Commencer
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href={route("about")}
                                    className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                                >
                                    En savoir plus
                                </Link>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {stats.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
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
                        </div>

                        {/* Zone visuelle */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                {toolImages.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={index}
                                            className={`group overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md ${
                                                index === 0
                                                    ? "col-span-2"
                                                    : ""
                                            }`}
                                        >
                                            <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56 dark:bg-slate-800">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

                                                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                                    <Icon className="h-5 w-5 text-white" />
                                                </div>

                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <p className="text-lg font-bold text-white">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-sm text-cyan-100">
                                                        {item.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-md">
                                <p className="text-sm text-cyan-100">
                                    Une interface conçue pour :
                                </p>

                                <ul className="mt-3 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
                                    <li className="rounded-2xl bg-white/5 px-4 py-3">
                                        • Suivre vos stocks avec précision
                                    </li>
                                    <li className="rounded-2xl bg-white/5 px-4 py-3">
                                        • Accélérer l’enregistrement des ventes
                                    </li>
                                    <li className="rounded-2xl bg-white/5 px-4 py-3">
                                        • Organiser votre catalogue produit
                                    </li>
                                    <li className="rounded-2xl bg-white/5 px-4 py-3">
                                        • Gagner du temps au quotidien
                                    </li>
                                </ul>
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
                        Les bases essentielles pour bien gérer votre activité
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

            {/* GALERIE OUTILS */}
            <section className="bg-slate-50 py-16 dark:bg-slate-950/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-semibold text-cyan-700 shadow-sm dark:bg-slate-900 dark:text-cyan-300">
                            Univers informatique
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                            Quelques outils et équipements informatiques
                        </h2>

                        <p className="mt-4 text-slate-600 dark:text-slate-400">
                            Présentez visuellement les catégories de matériels
                            que vous gérez dans votre boutique.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {categories.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

                                        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <div className="absolute bottom-5 left-5 right-5">
                                            <h3 className="text-xl font-bold text-white">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-100">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid gap-6 md:grid-cols-3">
                    {highlights.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
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