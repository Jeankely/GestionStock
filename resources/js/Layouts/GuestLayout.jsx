import ApplicationLogo from "@/Components/ApplicationLogo";
import Footer from "@/Components/Footer";
import { Link, usePage } from "@inertiajs/react";
import {
    House,
    Info,
    Phone,
    Menu,
    X,
    MonitorSmartphone,
    ShoppingBag,
    LogIn,
    LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

export default function GuestLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { auth, url } = usePage().props;
    const user = auth?.user;

    const navItems = [
        { label: "Accueil", href: route("home"), icon: House },
        { label: "Produits", href: route("shop.index"), icon: ShoppingBag },
        { label: "À propos", href: route("about"), icon: Info },
        { label: "Contact", href: route("contact"), icon: Phone },
    ];

    const authButton = user
        ? {
            label: "Tableau de bord",
            href: route("dashboard"),
            icon: LayoutDashboard,
        }
        : {
            label: "Connexion",
            href: route("login"),
            icon: LogIn,
        };

    const AuthIcon = authButton.icon;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 shadow-md backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">

                        {/* LOGO */}
                        <Link href={route("home")} className="group flex items-center gap-3 sm:gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                                <ApplicationLogo className="h-8 w-8 fill-current text-cyan-700 dark:text-cyan-400 sm:h-10 sm:w-10" />
                            </div>

                            <div className="leading-tight">
                                <div className="flex items-center gap-2">
                                    <h1
                                        className="text-2xl font-extrabold tracking-wide text-black dark:text-white sm:text-4xl"
                                        style={{ fontFamily: "'Times New Roman', Times, serif" }}
                                    >
                                        JK TechStore
                                    </h1>

                                    <MonitorSmartphone className="hidden h-5 w-5 text-cyan-600 dark:text-cyan-400 sm:block" />
                                </div>

                                <p
                                    className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm"
                                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                                >
                                    La performance au cœur du matériel informatique
                                </p>
                            </div>
                        </Link>

                        {/* MENU */}
                        <div className="hidden items-center gap-3 md:flex">
                            <nav className="flex items-center gap-2">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = url === item.href;

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition-all duration-300
                                                ${isActive
                                                    ? "bg-cyan-600 text-white shadow-lg scale-105"
                                                    : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 hover:scale-105 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                                                }
                                            `}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* AUTH BUTTON */}
                            <Link
                                href={authButton.href}
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <AuthIcon className="h-4 w-4" />
                                {authButton.label}
                            </Link>
                        </div>

                        {/* Bouton pour mobile */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* MOBILE MENU */}
                    {mobileMenuOpen && (
                        <div className="pb-4 md:hidden">
                            <div className="mt-2 space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = url === item.href;

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-extrabold transition
                                                ${isActive
                                                    ? "bg-cyan-600 text-white"
                                                    : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                                                }
                                            `}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}

                                <Link
                                    href={authButton.href}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <AuthIcon className="h-4 w-4" />
                                    {authButton.label}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
}