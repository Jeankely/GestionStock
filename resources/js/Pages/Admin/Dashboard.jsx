import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Package,
    ShoppingCart,
    Users,
    Boxes,
    TrendingUp,
    CircleDollarSign,
    AlertTriangle,
    BarChart3,
    ArrowUpRight,
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        {
            title: 'Produits',
            value: '248',
            description: 'Articles enregistrés',
            icon: Package,
        },
        {
            title: 'Ventes',
            value: '1 024',
            description: 'Transactions effectuées',
            icon: ShoppingCart,
        },
        {
            title: 'Clients',
            value: '312',
            description: 'Clients actifs',
            icon: Users,
        },
        {
            title: 'Stock total',
            value: '5 860',
            description: 'Unités disponibles',
            icon: Boxes,
        },
    ];

    const quickReports = [
        {
            title: 'Chiffre d’affaires',
            value: '12 500 000 Ar',
            icon: CircleDollarSign,
            trend: '+12.4%',
        },
        {
            title: 'Croissance mensuelle',
            value: '8.6%',
            icon: TrendingUp,
            trend: '+2.1%',
        },
        {
            title: 'Produits faibles en stock',
            value: '14',
            icon: AlertTriangle,
            trend: 'À surveiller',
        },
    ];

    const recentActivities = [
        'Nouvelle vente enregistrée pour un ordinateur portable.',
        'Ajout de 12 accessoires dans le stock.',
        'Mise à jour du profil d’un client entreprise.',
        'Facture validée pour une commande importante.',
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Header */}
                <section className="rounded-3xl bg-gradient-to-r from-cyan-700 via-cyan-600 to-slate-900 p-6 text-white shadow-xl sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium text-cyan-100">
                                Tableau de bord administrateur
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Gestion de vente de matériel informatique
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-cyan-50 sm:text-base">
                                Suivez les ventes, les produits, les clients et
                                les stocks depuis une interface moderne et
                                centralisée.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-sm ring-1 ring-white/15">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/10 p-3">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-cyan-100">
                                        Résumé du jour
                                    </p>
                                    <p className="text-lg font-bold">
                                        Activité en temps réel
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h2>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Reports + Activity */}
                <section className="grid gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Indicateurs rapides
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Vue générale de la performance
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                Dernière mise à jour
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {quickReports.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-900">
                                                <Icon className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
                                            </div>

                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                                {item.trend}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                            {item.title}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                                            {item.value}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Activités récentes
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Dernières actions dans le système
                        </p>

                        <div className="mt-6 space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800"
                                >
                                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-600" />
                                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {activity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}