import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Shredder() {
    const [files, setFiles] = useState([]);
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [done, setDone] = useState(false);

    /* ================= LOAD USER FILES ================= */
    const fetchFiles = async () => {
        try {
            const res = await api.get("/files");
            setFiles(res.data || []);
        } catch {
            toast.error("Failed to load files");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    /* ================= ADD / REMOVE QUEUE ================= */
    const toggleQueue = (file) => {
        if (queue.find(f => f._id === file._id)) {
            setQueue(queue.filter(f => f._id !== file._id));
        } else {
            setQueue([...queue, file]);
        }
    };

    /* ================= SHRED ================= */
    const shred = async () => {
        if (queue.length === 0) {
            toast.error("No files selected");
            return;
        }

        try {
            const ids = queue.map(f => f._id);

            await api.post("/files/shred", { fileIds: ids });

            toast.success("Files permanently destroyed");

            setQueue([]);
            setDone(true);

            fetchFiles(); // reload remaining files

        } catch {
            toast.error("Shred failed");
        }
    };

    /* ================= UI ================= */

    if (loading) {
        return <div className="p-6 text-gray-400">Loading files...</div>;
    }

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Digital Shredder
            </h1>

            <div className="bg-card p-6 rounded-xl mb-6">

                <p className="mb-4">
                    Files shredded here are permanently destroyed.
                    This action cannot be undone.
                </p>

                {/* FILE LIST */}
                <div className="space-y-2 max-h-64 overflow-y-auto">

                    {files.length === 0 && (
                        <p className="text-gray-500">
                            No files available
                        </p>
                    )}

                    {files.map(file => (
                        <button
                            key={file._id}
                            onClick={() => toggleQueue(file)}
                            className={`
                                w-full text-left p-3 rounded border
                                transition
                                ${queue.find(f => f._id === file._id)
                                    ? "bg-red-600 border-red-500"
                                    : "bg-black border-gray-700 hover:border-purple-500"}
                            `}
                        >
                            {file.filename}
                        </button>
                    ))}

                </div>

                {/* SHRED BUTTON */}
                <button
                    onClick={shred}
                    className="mt-6 bg-red-600 px-6 py-3 rounded font-bold hover:opacity-90"
                >
                    SHRED SELECTED FILES
                </button>

                {/* CERTIFICATE */}
                {done && (
                    <div className="mt-4 bg-green-600 p-3 rounded">
                        ✔ Certificate of Destruction generated
                    </div>
                )}

            </div>

        </div>
    );
}

export default Shredder;
