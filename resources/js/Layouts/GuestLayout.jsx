import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

            {/* HEADER GLOBAL */}
            <header className="bg-cyan-700 text-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-4">
        
        <Link href="/" className="flex items-center space-x-2">
            <ApplicationLogo className="h-10 w-10 fill-current text-white" />
            <span className="text-xl font-bold">
                Gestion Vente - Matériel Informatique
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
    ))}

</nav>

    </div>
</header>

            {/* CONTENU DES PAGES */}
            <main className="flex-1">
                {children}
            </main>

        </div>
    );
}