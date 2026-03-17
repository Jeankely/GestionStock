import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Users,
    Search,
    Plus,
    UserCircle2,
    Phone,
    Mail,
    MapPin,
    BadgeDollarSign,
} from "lucide-react";

export default function Index() {
    const clients = [
        {
            name: "Entreprise Nova",
            email: "nova@gmail.com",
            phone: "+261 34 12 345 67",
            address: "Antananarivo",
            total: "8 500 000 Ar",
        },
        {
            name: "Rija Service",
            email: "rija@gmail.com",
            phone: "+261 32 98 765 43",
            address: "Toamasina",
            total: "3 200 000 Ar",
        },
        {
            name: "Mada Print",
            email: "madaprint@gmail.com",
            phone: "+261 33 45 123 98",
            address: "Fianarantsoa",
            total: "6 700 000 Ar",
        },
        {
            name: "Toky Informatique",
            email: "tokyinfo@gmail.com",
            phone: "+261 38 11 222 33",
            address: "Mahajanga",
            total: "2 850 000 Ar",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Clients" />

            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                <Users className="h-7 w-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Gestion des clients
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Consultez vos clients et leur historique commercial.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un client..."
                                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            <button
                                type="button"
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                            >
                                <Plus className="h-4 w-4" />
                                Nouveau client
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300">
                                        <UserCircle2 className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {client.name}
                                        </h2>

                                        <div className="mt-3 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Mail className="h-4 w-4" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <Phone className="h-4 w-4" />
                                                {client.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                                <MapPin className="h-4 w-4" />
                                                {client.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <BadgeDollarSign className="h-4 w-4" />
                                        Total achats
                                    </div>
                                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                        {client.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}