export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-6 mt-10">
            <div className="container mx-auto px-6 text-center">
                <p
                    className="text-2xl"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                    © {new Date().getFullYear()} JK TechStore à Antsohihy.
                    Tous droits réservés.
                </p>

                <div
                    className="mt-3 space-x-6 text-2xl"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                    <a href="/" className="hover:underline">
                        Accueil
                    </a>
                    <a href="/about" className="hover:underline">
                        À propos
                    </a>
                    <a href="/contact" className="hover:underline">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}