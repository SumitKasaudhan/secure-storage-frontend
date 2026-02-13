import { useEffect, useState } from "react";
import api from "../services/api";

function Logs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.get("/files/logs").then(res => {
            setLogs(res.data);
        });
    }, []);

    return (
        <div className="max-w-4xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Activity Logs
            </h1>

            {logs.length === 0 && (
                <p className="text-gray-400">
                    No activity yet.
                </p>
            )}

            <div className="space-y-4">

                {logs.map(log => (
                    <div
                        key={log._id}
                        className="
                            bg-card
                            p-4 sm:p-6
                            rounded-lg
                            break-words
                            overflow-hidden
                        "
                    >
                        <p className="font-semibold text-sm sm:text-base break-all">
                            {log.action.toUpperCase()} — {log.filename}
                        </p>

                        <p className="text-gray-400 text-xs sm:text-sm mt-2">
                            {new Date(log.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Logs;
