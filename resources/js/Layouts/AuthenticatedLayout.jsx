import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import VerticalLayout from "@/Layouts/VerticalLayout";
import { Menu, Bell, Search, Sun, Moon } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { props } = usePage();
    const user = props.auth.user;

    return (
        <div className="h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
            <VerticalLayout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
                {/* Topbar */}
                <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                    <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            {/* Left block */}
                            <div className="flex min-w-0 items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(true)}
                                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>

                                <div className="min-w-0">
                                    <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl lg:text-2xl">
                                        Bonjour, {user.name}
                                    </h1>
                                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                                        Bienvenue dans votre espace d’administration
                                    </p>
                                </div>
                            </div>

                            {/* Right block */}
                            <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center xl:w-auto">
                                {/* Search */}
                                <div className="relative w-full xl:w-[340px]">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher..."
                                        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-cyan-900/30"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex w-full items-center justify-between gap-2 sm:justify-end lg:w-auto">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <Bell className="h-5 w-5" />
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                        >
                                            <Sun className="h-5 w-5 dark:hidden" />
                                            <Moon className="hidden h-5 w-5 dark:block" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </VerticalLayout>
        </div>
    );
}