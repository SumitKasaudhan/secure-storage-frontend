import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { getToken } from "../utils/auth";

export default function PublicLayout() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "dark"
    );

    const isLoggedIn = !!getToken();

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">

            {/* NAVBAR */}
            <nav className="
                sticky top-0 z-50
                flex flex-col md:flex-row md:justify-between md:items-center
                px-6 md:px-10 py-6 gap-4
                bg-white/70 dark:bg-black/70 backdrop-blur-xl
                border-b border-gray-200 dark:border-gray-800
            ">

                <Link
                    to="/"
                    className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                >
                    SecureVault
                </Link>

                <div className="flex gap-4 justify-center md:justify-end">

                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="
                            p-2 border border-gray-400 dark:border-gray-600
                            rounded hover:bg-gray-200 dark:hover:bg-gray-800
                            transition
                        "
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* ✅ hide login/signup if already logged in */}
                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/login"
                                className="
                                    px-4 py-2 border border-gray-400 dark:border-gray-600
                                    rounded hover:bg-gray-200 dark:hover:bg-gray-800
                                    transition
                                "
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="
                                    px-4 py-2 bg-purple-600 text-white
                                    rounded hover:brightness-110 transition
                                "
                            >
                                Signup
                            </Link>
                        </>
                    )}

                </div>
            </nav>

            {/* PAGE */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="
                bg-gray-100 dark:bg-[#0f0f0f]
                border-t border-gray-200 dark:border-gray-800
                px-6 md:px-10 py-12
            ">

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

                    <div>
                        <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                            SecureVault
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Secure encrypted storage for modern users.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <div className="space-y-2 text-gray-600 dark:text-gray-400">

                            <Link to="/about" className="block hover:text-purple-500">
                                About
                            </Link>

                            <Link to="/faq" className="block hover:text-purple-500">
                                FAQ
                            </Link>

                            <Link to="/contact" className="block hover:text-purple-500">
                                Contact
                            </Link>

                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} SecureVault
                            <br />
                            All rights reserved.
                        </p>
                    </div>

                </div>
            </footer>

        </div>
    );
}
