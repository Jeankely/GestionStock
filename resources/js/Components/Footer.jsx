export default function Footer() {
    return (
        <footer className="bg-cyan-700 text-white py-6 mt-10">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} @copyrigth 2026 Jk TechStore à Befandriana Nord 
                    Tous droits réservés.
                </p>

                <div className="mt-3 space-x-4 text-sm">
                    <a href="/" className="hover:underline">Accueil</a>
                    <a href="/about" className="hover:underline">À propos</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
}