import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="
            border-t border-gray-800
            bg-black
            text-gray-400
            text-sm
            mt-10
        "
        >
            <div
                className="
                max-w-7xl mx-auto
                px-6 py-6
                flex flex-col md:flex-row
                justify-between
                items-center
                gap-4
            "
            >
                <p>
                    © {new Date().getFullYear()} SecureVault —
                    Encrypted File Storage
                </p>

                <div className="flex gap-6">

                    <Link to="/about" className="hover:text-white transition">
                        About
                    </Link>

                    <Link to="/faq" className="hover:text-white transition">
                        FAQ
                    </Link>

                    <Link to="/contact" className="hover:text-white transition">
                        Contact
                    </Link>

                </div>
            </div>
        </footer>
    );
}
