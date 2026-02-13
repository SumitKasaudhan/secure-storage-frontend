import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);

    const storeToken = (token) => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        if (remember) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Enter email & password");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password,
            });

            storeToken(res.data.token);

            toast.success("Login successful");

            navigate("/app", { replace: true });

        } catch {
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative px-4">

            <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                className="absolute inset-0 w-full h-full object-cover blur-sm"
                alt=""
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden">

                <div className="hidden md:block relative">
                    <img
                        src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-6 left-6 text-white font-bold text-3xl">
                        EXPLORE.<br />LEARN.<br />GROW.
                    </div>
                </div>

                <div className="p-8 text-white flex flex-col justify-center">

                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Welcome Back
                    </h1>

                    <input
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded bg-black/40 border border-gray-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-3 rounded bg-black/40 border border-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-3 text-gray-400"
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <label className="flex items-center gap-2 text-sm mb-6">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                        />
                        Remember me
                    </label>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-indigo-600 py-3 rounded font-semibold mb-4 hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* ✅ Modern Google login */}
                    <div className="mb-4 flex justify-center">
                        <GoogleLogin
                            onSuccess={async (res) => {
                                try {
                                    const response = await api.post("/auth/google", {
                                        credential: res.credential
                                    });

                                    storeToken(response.data.token);

                                    toast.success("Google login successful");

                                    navigate("/app", { replace: true });

                                } catch (err) {
                                    toast.error("Google login failed");
                                }
                            }}
                            onError={() => toast.error("Google login failed")}
                        />
                    </div>

                    <p className="text-center text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-indigo-400 hover:underline">
                            Create account
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;
