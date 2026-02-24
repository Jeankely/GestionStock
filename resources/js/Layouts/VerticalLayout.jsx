import { Link, usePage } from '@inertiajs/react';

export default function VerticalLayout({ children, mobileOpen, setMobileOpen }) {

    const user = usePage().props.auth.user;

    const menu = [
        { name: 'Dashboard', route: 'dashboard', icon: '📊' },
        { name: 'Produits', route: 'dashboard', icon: '📦' },
        { name: 'Catégories', route: 'dashboard', icon: '🗂' },
        { name: 'Ventes', route: 'dashboard', icon: '🛒' },
        { name: 'Clients', route: 'dashboard', icon: '👥' },
        { name: 'Rapports', route: 'dashboard', icon: '📈' },
    ];

    return (
        <div className="flex min-h-screen">

            {/* ================= DESKTOP SIDEBAR ================= */}
            <aside className="hidden md:flex md:flex-col justify-between w-64 bg-white dark:bg-gray-800 shadow-lg p-6">

                {/* ===== TOP MENU ===== */}
                <div className="space-y-6">

                    <h2 className="text-xl font-bold text-indigo-600">
                        Gestion Vente
                    </h2>

                    <nav className="space-y-2">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={route(item.route)}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
                            >
                                {item.icon} {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* ===== BOTTOM PROFILE + LOGOUT ===== */}
                <div className="border-t pt-4 space-y-2">

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {user.name}
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
                    >
                        Profil
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 text-red-600"
                    >
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
                ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >

                {/* TOP MENU */}
                <div className="space-y-6">

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-indigo-600">
                            Menu
                        </h2>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-600 dark:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="space-y-2 mt-6">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={route(item.route)}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
                            >
                                {item.icon} {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* BOTTOM PROFILE */}
                <div className="border-t pt-4 space-y-2">

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        {user.name}
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="block px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700"
                    >
                        Profil
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-700 text-red-600"
                    >
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