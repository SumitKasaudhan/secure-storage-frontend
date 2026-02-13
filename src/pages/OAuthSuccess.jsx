import { useEffect } from "react";

export default function OAuthSuccess() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
        }

        // hard replace once, no React routing involved
        window.location.replace("/app");

    }, []);

    return <p>Signing you in…</p>;
}
