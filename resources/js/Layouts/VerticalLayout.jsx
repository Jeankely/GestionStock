import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    FolderTree,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    User,
    LogOut,
    X,
    MonitorSmartphone,
    ChevronRight,
    ShieldCheck,
} from "lucide-react";

export default function VerticalLayout({
    children,
    mobileOpen,
    setMobileOpen,
}) {
    const { props } = usePage();
    const user = props.auth.user;

    const menu = [
        { name: "Dashboard", route: "dashboard", icon: LayoutDashboard },
        { name: "Catégories", route: "categories.index", icon: FolderTree },
        { name: "Produits", route: "dashboard", icon: Package },
        { name: "Ventes", route: "dashboard", icon: ShoppingCart },
        { name: "Clients", route: "dashboard", icon: Users },
        { name: "Rapports", route: "dashboard", icon: BarChart3 },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <aside className="hidden w-72 flex-col justify-between border-r border-slate-200 bg-white px-6 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
                <div>
                    {/* Brand */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                            <MonitorSmartphone className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                JK TechStore
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Panneau d’administration
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {menu.map((item, index) => {
                            const Icon = item.icon;
                            const active = route().current(item.route);

                            return (
                                <Link
                                    key={index}
                                    href={route(item.route)}
                                    className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                        active
                                            ? "bg-cyan-600 text-white shadow-lg"
                                            : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </div>

                                    <ChevronRight
                                        className={`h-4 w-4 transition ${
                                            active
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Small info card */}
                    <div className="mt-8 rounded-3xl bg-gradient-to-br from-cyan-700 to-slate-900 p-5 text-white shadow-lg">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-white/10 p-3">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    Gestion sécurisée
                                </h3>
                                <p className="mt-1 text-sm text-cyan-100">
                                    Surveillez vos opérations commerciales dans un espace administrateur moderne.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom profile */}
                <div className="mt-8 border-t border-slate-200 pt-5 dark:border-slate-800">
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Compte connecté
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <User className="h-4 w-4" />
                            Profil
                        </Link>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="h-4 w-4" />
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85%] flex-col justify-between bg-white px-5 py-6 shadow-2xl transition-transform duration-300 dark:bg-slate-900 md:hidden ${
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                                <MonitorSmartphone className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Menu Admin
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Navigation rapide
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {menu.map((item, index) => {
                            const Icon = item.icon;
                            const active = route().current(item.route);

                            return (
                                <Link
                                    key={index}
                                    href={route(item.route)}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                                        active
                                            ? "bg-cyan-600 text-white shadow-lg"
                                            : "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Compte connecté
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Link
                            href={route("profile.edit")}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <User className="h-4 w-4" />
                            Profil
                        </Link>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="h-4 w-4" />
                            Déconnexion
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
                <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}