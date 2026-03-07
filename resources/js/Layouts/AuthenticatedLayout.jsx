import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import VerticalLayout from "@/Layouts/VerticalLayout";
import {
    Menu,
    Bell,
    Search,
    Sun,
    Moon,
} from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { props } = usePage();
    const user = props.auth.user;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <VerticalLayout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
                {/* Topbar */}
                <header className="sticky top-0 mb-6 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileOpen(true)}
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </button>

                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                                    Bonjour, {user.name}
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Bienvenue dans votre espace d’administration
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Search */}
                            <div className="relative w-full sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-900/30"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <Bell className="h-5 w-5" />
                                </button>

                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <Sun className="h-5 w-5 dark:hidden" />
                                    <Moon className="hidden h-5 w-5 dark:block" />
                                </button>

                                <Link
                                    href={route("profile.edit")}
                                    className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline">
                                        Mon profil
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {children}
            </VerticalLayout>
        </div>
    );
}