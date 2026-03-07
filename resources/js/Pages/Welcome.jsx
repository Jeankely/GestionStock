import React from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";//on utilise le package GuestLayout car même que les clients non cocté vue cette page

export default function Home() {
    return (
        <GuestLayout>
            <Head title="Accueil" />

            {/* Hero Section */}
            <section className="text-center py-20 bg-white">
                <h2 className="text-4xl font-bold text-cyan-700 mb-4">
                    Système de Gestion de Vente
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                    Gérez efficacement vos produits, ventes, clients et stocks
                    de matériel informatique.
                </p>
            </section>

            {/* Features */}
            <section className="container mx-auto py-16 grid md:grid-cols-3 gap-8 px-6">

    {[
        {
            title: "Gestion des Produits",
            text: "Ajouter, modifier et supprimer les matériels informatiques."
        },
        {
            title: "Gestion des Ventes",
            text: "Suivi des ventes, facturation et historique des transactions."
        },
        {
            title: "Gestion des Stocks",
            text: "Contrôle des quantités disponibles en temps réel."
        }
    ].map((item, index) => (
        <div
            key={index}
            className="bg-cyan p-6 rounded-2xl shadow-md hover:shadow-xl
            transition-all duration-300 hover:-translate-y-2"
        >
            <h3 className="text-xl font-semibold mb-3 text-cyan-700">
                {item.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
                {item.text}
            </p>
        </div>
    ))}
     </section>
        </GuestLayout>
    );
}