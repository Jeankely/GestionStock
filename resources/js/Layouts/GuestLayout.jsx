import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';
import {
    House,
    Info,
    Phone,
    Menu,
    X,
    MonitorSmartphone,
} from 'lucide-react';
import { useState } from 'react';

export default function GuestLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Accueil', href: route('home'), icon: House },
        { label: 'À propos', href: route('about'), icon: Info },
        { label: 'Contact', href: route('contact'), icon: Phone },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-950/85">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo + Brand */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3 sm:gap-4"
                        >
                            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-cyan-600/10 ring-1 ring-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
                                <ApplicationLogo className="h-8 w-8 sm:h-10 sm:w-10 fill-current text-cyan-700 dark:text-cyan-400" />
                            </div>

                            <div className="leading-tight">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        <h1 className="text-4xl font-extrabold text-black tracking-wide drop-shadow-lg">
                                            JK TechStore
                                        </h1>
                                    </span>
                                    <MonitorSmartphone className="hidden sm:block h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                    La performance au coeur en matériel informatique
                                </p>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-sm dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Mobile nav */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4">
                            <div className="mt-2 space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* PAGE CONTENT */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}