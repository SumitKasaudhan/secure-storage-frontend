import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const storeToken = (token) => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.setItem("token", token);
    };

    const handleSignup = async () => {
        if (!email || !password) {
            toast.error("Enter email & password");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/register", {
                email,
                password,
            });

            storeToken(res.data.token);

            toast.success("Account created");

            navigate("/app", { replace: true });

        } catch (err) {
            toast.error("Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative px-4">

            <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                className="absolute inset-0 w-full h-full object-cover blur-sm"
                alt=""
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">

                <div className="hidden md:block relative">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-6 left-6 text-white font-bold text-3xl">
                        BUILD.<br />
                        CREATE.<br />
                        GROW.
                    </div>
                </div>

                <div className="p-8 text-white flex flex-col justify-center">

                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Create Account
                    </h1>

                    <input
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded bg-black/40 border border-gray-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-6 rounded bg-black/40 border border-gray-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="w-full bg-indigo-600 py-3 rounded font-semibold mb-4 hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-400 hover:underline">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Signup;
