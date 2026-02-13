import { useEffect, useState } from "react";
import api from "../services/api";

function APIKeys() {
    const [keys, setKeys] = useState([]);
    const [newKey, setNewKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchKeys = async () => {
        try {
            const res = await api.get("/keys");

            console.log("API response:", res.data);

            const list = Array.isArray(res.data)
                ? res.data
                : res.data.keys || [];

            setKeys(list);
        } catch (err) {
            console.error(err);
            setError("Failed to load API keys");
            setKeys([]);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const generate = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.post("/keys");
            setNewKey(res.data.fullKey);

            await fetchKeys();
        } catch (err) {
            console.error(err);
            setError("Failed to generate key");
        } finally {
            setLoading(false);
        }
    };

    const revoke = async (id) => {
        try {
            if (!id) return;

            await api.delete(`/keys/${id}`);

            // refresh list after revoke
            await fetchKeys();

        } catch (err) {
            console.error(err);
            setError("Failed to revoke key");
        }
    };

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                API Access Tokens
            </h1>

            {error && (
                <div className="bg-red-800 p-3 mb-4 rounded">
                    {error}
                </div>
            )}

            <button
                onClick={generate}
                disabled={loading}
                className="bg-purple-600 px-6 py-3 rounded mb-6"
            >
                {loading ? "Generating..." : "Generate Key"}
            </button>

            {newKey && (
                <div className="bg-green-900 p-4 rounded mb-6 break-all">
                    <p className="mb-2 font-bold">
                        Copy this key now. You will not see it again.
                    </p>
                    {newKey}
                </div>
            )}

            {keys.length === 0 && (
                <p className="text-gray-400">
                    No API keys generated yet.
                </p>
            )}

            {keys.map((k) => (
                <div
                    key={k._id}
                    className="bg-gray-800 p-4 rounded mb-2 flex justify-between"
                >
                    <div>
                        <p>ID: {k.publicId || "Unknown"}</p>

                        <p className="text-sm text-gray-400">
                            Created: {k.createdAt
                                ? new Date(k.createdAt).toLocaleString()
                                : "—"}
                        </p>

                        <p className="text-sm text-gray-400">
                            Last used: {k.lastUsed || "Never"}
                        </p>
                    </div>

                    {!k.revoked ? (
                        <button
                            onClick={() => revoke(k._id)}
                            className="bg-red-600 px-3 py-1 rounded"
                        >
                            Revoke
                        </button>
                    ) : (
                        <span className="text-red-400">
                            Revoked
                        </span>
                    )}
                </div>
            ))}

        </div>
    );
}

export default APIKeys;
