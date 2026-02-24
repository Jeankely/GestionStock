import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import VerticalLayout from '@/Layouts/VerticalLayout';// importation du layout vertical

export default function AuthenticatedLayout({ header, children }) {

    const user = usePage().props.auth.user;

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">

            {/* ================= NAVBAR FIXE ================= */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-16 justify-between items-center">

                        {/* Logo */}
                        <div className="flex items-center gap-4">

                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto text-indigo-600 dark:text-indigo-400" />
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

                        {/* ===== RIGHT SIDE ===== */}
                        <div className="flex items-center gap-4">

                            {/* Hamburger Mobile Sidebar (DROITE) */}
                            <button
                                onClick={() => setMobileSidebarOpen(true)}
                                className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>

                            {/* User Menu Desktop */}
                            <div className="hidden md:flex items-center">

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm">
                                            {user.name}

                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                />
                                            </svg>
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
                {children}
            </VerticalLayout>

        </div>
    );
}