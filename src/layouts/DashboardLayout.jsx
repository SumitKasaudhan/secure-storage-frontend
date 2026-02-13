import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/auth";
import { FaUserCircle } from "react-icons/fa";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

    const location = useLocation();
    const navigate = useNavigate();

    // auto close sidebar on navigation
    useEffect(() => setOpen(false), [location]);

    // auth check
    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    // lock body scroll when sidebar open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    // listen for avatar updates
    useEffect(() => {
        const handler = () => {
            setAvatar(localStorage.getItem("avatar"));
        };

        window.addEventListener("avatarUpdated", handler);
        return () => window.removeEventListener("avatarUpdated", handler);
    }, []);

    const navItem = (to, label) => (
        <Link
            to={to}
            className={`block px-4 py-2 rounded-lg transition ${location.pathname === to
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                    : "hover:bg-white/10"
                }`}
        >
            {label}
        </Link>
    );

    return (
        <div className="flex h-screen w-screen bg-black text-white overflow-hidden">

            {/* backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            {/* sidebar */}
            <aside
                className={`
                    fixed lg:relative z-50
                    w-72 h-full bg-[#0f0f12] border-r border-gray-800
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <div className="h-full flex flex-col p-6">

                    <h1 className="text-xl font-bold mb-6">SecureVault</h1>

                    <nav className="space-y-2 text-sm flex-1 overflow-y-auto">
                        {navItem("/app", "Dashboard")}
                        {navItem("/app/upload", "Upload")}
                        {navItem("/app/logs", "Activity")}
                        {navItem("/app/shredder", "Digital Shredder")}
                        {navItem("/app/metadata", "Metadata Cleaner")}
                        {navItem("/app/profile", "Profile")}
                        {navItem("/app/apikeys", "API Keys")}
                    </nav>

                </div>
            </aside>

            {/* main content */}
            <div className="flex-1 flex flex-col h-full">

                {/* navbar */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0f0f12]">

                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden text-2xl"
                    >
                        ☰
                    </button>

                    <h2 className="font-semibold">Dashboard</h2>

                    {/* avatar dropdown */}
                    <div className="relative">

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="w-12 h-12 rounded-full overflow-hidden border border-gray-700 hover:opacity-80 transition flex items-center justify-center bg-gray-800"
                        >
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="text-4xl" />
                            )}
                        </button>

                        {menuOpen && (
                            <div className="
                                absolute right-0 mt-2 w-44
                                bg-[#0f0f12] border border-gray-800
                                rounded-lg shadow-xl
                                overflow-hidden z-50
                            ">
                                <button
                                    onClick={() => navigate("/app/profile")}
                                    className="w-full text-left px-4 py-3 hover:bg-white/10"
                                >
                                    Profile
                                </button>

                                <button
                                    onClick={() => {
                                        clearToken();
                                        navigate("/login", { replace: true });
                                    }}
                                    className="
                                        w-full text-left px-4 py-3
                                        hover:bg-red-600/20
                                        text-red-500
                                    "
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>

                </header>

                {/* page area */}
                <div className="flex flex-col flex-1 overflow-y-auto">

                    <main className="flex-1 p-6 bg-black">
                        <Outlet />
                    </main>

                    <Footer />

                </div>

            </div>
        </div>
    );
}
