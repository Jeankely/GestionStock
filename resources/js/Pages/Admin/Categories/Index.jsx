import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, Head } from '@inertiajs/react';
import { useState } from 'react';
import VerticalLayout from '@/Layouts/VerticalLayout';

export default function Index({ categories }) {

    const user = usePage().props.auth.user;
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
            <Head title="Catégories" />
            {/* ================= NAVBAR ================= */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">

                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto text-indigo-600" />
                        </Link>

                            <div className="hidden md:flex space-x-6">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMobileSidebarOpen(true)}
                                className="md:hidden p-2 rounded-md"
                            >
                                ☰
                            </button>

                            <div className="hidden md:flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
                                            {user.name}
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            {/* ================= SIDEBAR + CONTENT ================= */}
            <VerticalLayout
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
            >

                <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-indigo-600">
                            Gestion des Catégories
                        </h1>

                        <Link
                            href=""
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            + Ajouter
                        </Link>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                                <th className="p-3">#</th>
                                <th className="p-3">Nom Catégorie</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((categorie, index) => (
                                <tr key={categorie.id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{categorie.nom_categorie}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </VerticalLayout>
        </div>
    );
}