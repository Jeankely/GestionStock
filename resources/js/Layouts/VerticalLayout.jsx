import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Folder,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    User,
    LogOut,
    X
} from "lucide-react";

export default function VerticalLayout({ children, mobileOpen, setMobileOpen }) {

    const { props } = usePage();
    const user = props.auth.user;

    const menu = [
        { name: "Dashboard", route: "dashboard", icon: LayoutDashboard },
        { name: "Catégories", route: "categories.index", icon: Folder },
        { name: "Produits", route: "dashboard", icon: Package },
        { name: "Ventes", route: "dashboard", icon: ShoppingCart },
        { name: "Clients", route: "dashboard", icon: Users },
        { name: "Rapports", route: "dashboard", icon: BarChart3 },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden md:flex md:flex-col justify-between w-64 bg-white dark:bg-gray-800 shadow-xl p-6">

                {/* TOP */}
                <div className="space-y-8">

                    <h2 className="text-2xl font-extrabold text-indigo-600 tracking-wide">
                        Gestion Vente
                    </h2>

                    <nav className="space-y-2">
                        {menu.map((item, index) => {
                            const Icon = item.icon;
                            const active = route().current(item.route);

                            return (
                                <Link
                                    key={index}
                                    href={route(item.route)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                                    ${active
                                            ? "text-black hover:bg-indigo-100"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 hover:translate-x-1"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* BOTTOM PROFILE */}
                <div className="border-t pt-4 space-y-2">

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {user.name}
                    </div>

                    <Link
                        href={route("profile.edit")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                    >
                        <User size={18} />
                        Profil
                    </Link>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 text-red-600 transition"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </Link>
                </div>
            </aside>


            {/* ================= OVERLAY MOBILE ================= */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                />
            )}


            {/* ================= MOBILE SIDEBAR ================= */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-50 md:hidden
                ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* TOP */}
                <div className="space-y-6">

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-indigo-600">
                            Menu
                        </h2>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-600 dark:text-gray-300"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <nav className="space-y-2 mt-6">
                        {menu.map((item, index) => {
                            const Icon = item.icon;
                            const active = route().current(item.route);

                            return (
                                <Link
                                    key={index}
                                    href={route(item.route)}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                                    ${active
                                            ? "bg-indigo-600 text-white shadow-md"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* BOTTOM PROFILE */}
                <div className="border-t pt-4 space-y-2">

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {user.name}
                    </div>

                    <Link
                        href={route("profile.edit")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                    >
                        <User size={18} />
                        Profil
                    </Link>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 text-red-600 transition"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </Link>
                </div>

            </aside>


            {/* ================= CONTENT ================= */}
            <div className="flex-1 p-6">
                {children}
            </div>

        </div>
    );
}