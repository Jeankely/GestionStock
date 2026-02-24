import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact" />

            <div className="container mx-auto py-16 px-6">

                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">

                    <h1 className="text-3xl font-bold text-cyan-700 text-center mb-6">
                        Contactez-nous
                    </h1>

                    <p className="text-gray-600 text-center mb-8">
                        Si vous avez des questions concernant le système de gestion de vente,
                        veuillez nous contacter via le formulaire ci-dessous.
                    </p>

                    {/* Formulaire contact */}
                    <form className="space-y-4">

                        <input
                            type="text"
                            placeholder="Votre nom"
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Votre email"
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                        />

                        <textarea
                            placeholder="Votre message"
                            rows="5"
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-cyan-700 text-white py-3 rounded-lg hover:bg-cyan-800 transition"
                        >
                            Envoyer le message
                        </button>

                    </form>

                </div>
            </div>
        </GuestLayout>
    );
}