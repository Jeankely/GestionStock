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
    CreditCard,
} from "lucide-react";

export default function VerticalLayout({
    children,
    mobileOpen,
    setMobileOpen,
}) {
    const { props } = usePage();
    const user = props.auth.user;

    const menu = [
        {
            name: "Dashboard",
            route: "dashboard",
            activeRoutes: ["dashboard"],
            icon: LayoutDashboard,
        },
        {
            name: "Catégories",
            route: "categories.index",
            activeRoutes: ["categories.*"],
            icon: FolderTree,
        },
        {
            name: "Produits",
            route: "products.index",
            activeRoutes: ["products.*"],
            icon: Package,
        },
        {
            name: "Ventes",
            route: "sales.index",
            activeRoutes: ["sales.*"],
            icon: ShoppingCart,
        },
        {
            name: "Paiements",
            route: "payments.index",
            activeRoutes: ["payments.*"],
            icon: CreditCard,
        },
        {
            name: "Clients",
            route: "clients.index",
            activeRoutes: ["clients.*"],
            icon: Users,
        },
        {
            name: "Rapports",
            route: "reports.index",
            activeRoutes: ["reports.*"],
            icon: BarChart3,
        },
    ];

    const isActiveRoute = (item) => {
        if (item.activeRoutes && item.activeRoutes.length > 0) {
            return item.activeRoutes.some((routeName) =>
                route().current(routeName)
            );
        }

        return route().current(item.route);
    };

    const MenuItem = ({ item, mobile = false }) => {
        const Icon = item.icon;
        const active = isActiveRoute(item);

        return (
            <Link
                href={route(item.route)}
                onClick={mobile ? () => setMobileOpen(false) : undefined}
                className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-3 py-3.5 text-sm font-medium transition-all duration-200 ${
                    active
                        ? "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                }`}
            >
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                            active
                                ? "bg-white/15 text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700"
                        }`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    <span className="truncate">{item.name}</span>
                </div>

                <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                        active
                            ? "translate-x-0 opacity-100"
                            : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                />
            </Link>
        );
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
            <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 lg:flex lg:flex-col">
                <div className="flex h-full flex-col">
                    <div className="border-b border-slate-200/80 px-6 py-6 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                                <MonitorSmartphone className="h-6 w-6" />
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    JK TechStore
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Panneau d’administration
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-5">
                        <div className="mb-4 px-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                Navigation
                            </p>
                        </div>

                        <nav className="space-y-2">
                            {menu.map((item, index) => (
                                <MenuItem key={index} item={item} />
                            ))}
                        </nav>
                    </div>

                    <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">
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
                </div>
            </aside>

            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-80 max-w-[86%] flex-col bg-white/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 dark:bg-slate-900/95 lg:hidden ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="border-b border-slate-200/80 px-5 py-5 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white shadow-lg">
                                <MonitorSmartphone className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                                    Menu Admin
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Navigation rapide
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5">
                    <div className="mb-4 px-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                            Navigation
                        </p>
                    </div>

                    <nav className="space-y-2">
                        {menu.map((item, index) => (
                            <MenuItem key={index} item={item} mobile />
                        ))}
                    </nav>
                </div>

                <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">
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

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}