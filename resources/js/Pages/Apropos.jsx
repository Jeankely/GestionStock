import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Apropos() {
    return (
        <GuestLayout>
            <Head title="À propos" />

            <div className="container mx-auto py-16 px-6">

                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">

                    <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
                        À propos du projet
                    </h1>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        Ce projet est une application web de gestion de vente de matériel informatique
                        permettant d'optimiser la gestion des produits, des ventes, des clients et des stocks.
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-4">
                        L’objectif principal de ce système est d’aider les entreprises à automatiser
                        leurs processus de vente afin d’améliorer la performance commerciale et la
                        traçabilité des transactions.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                        Cette application est développée avec le framework Laravel côté backend
                        et React avec Inertia côté frontend.
                    </p>

                </div>
            </div>

        </GuestLayout>
    );
}