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

                    <h3 className="text-3xl text-blue-700 mb-6 text-left">
                        "Developpeur de cette application web"
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4">
                    Monsieur RANDRIAMILAMINA Jean Kely, vient de Betaimboraka,
                    commune rural d'Ambararata , District de Befandriana-Nord, Region de la Sofia.
                    Je suis un etudiant sortant de l'Ecole Normale Supperieur pour l'Enseignement Technique (ENSET) à Antsiranana,
                     dans le parcours MSI (Management Sécurité en Informtique).
                    </p>

                    <p className="text-gray-600 leading-relaxed mb-4">
                       Cette application web est abouti entre la collaboration de moi même
                        et mon encadreur Docteur RALAHADY Bruno Bakys , enseignant de l'université d'Antsiranana.
                    </p>


                    <p className="text-gray-600 leading-relaxed mb-4">
                        L’objectif principal de ce système : Ce projet est une application web de gestion de vente de matériel informatique
                        permettant d'optimiser la gestion des produits, des ventes, des clients et des stocks. est d’aider les entreprises à automatiser
                        leurs processus de vente afin d’améliorer la performance commerciale et la
                        traçabilité des transactions.
                    </p>

                </div>
            </div>

        </GuestLayout>
    );
}