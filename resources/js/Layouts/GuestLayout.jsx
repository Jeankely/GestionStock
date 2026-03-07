import ApplicationLogo from '@/Components/ApplicationLogo';// importation du composant ApplicationLogo
import { Link } from '@inertiajs/react';// importation du composant ApplicationLogo
import Footer from "@/Components/Footer";// importation du composant Footer

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

            {/* HEADER GLOBAL */}
            <header className="bg-cyan-700 text-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-6">

        <Link href="/" className="flex items-center space-x-4 group">
            <ApplicationLogo className="h-14 w-14 fill-current text-white 
            transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />

            <span className="text-3xl md:text-4xl font-extrabold 
            bg-gradient-to-r from-white via-cyan-200 to-white 
            bg-clip-text text-transparent
            animate-pulse tracking-wide
            transition-all duration-500">
                Jk TechStore 
                <br />
                <span className="text-lg md:text-xl font-semibold tracking-normal text-white">
                Matériel Informatique
                </span>
            </span>
        </Link>

                    <nav className="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">

                        {[
                            { label: "Accueil", href: route("home") },
                            { label: "À propos", href: route("about") },
                            { label: "Contact", href: route("contact") }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="px-4 py-2 rounded-lg transition-all duration-300
                    hover:bg-cyan-600 hover:text-white hover:shadow-md"
                            >
                                {item.label}
                            </Link>
                        ))
                        }
                    </nav>

                </div>
            </header>

            {/* CONTENU DES PAGES */}
            <main className="flex-1">
                {children}
            </main>
            <Footer />

        </div>
    );
}