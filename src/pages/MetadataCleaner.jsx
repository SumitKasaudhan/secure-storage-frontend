import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function MetadataCleaner() {
    const [files, setFiles] = useState([]);
    const [cleanedId, setCleanedId] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const clean = async (id) => {
        try {
            await api.post(`/files/clean/${id}`);
            toast.success("Metadata removed successfully");
            setCleanedId(id);
            fetchFiles();
        } catch {
            toast.error("Cleaning failed");
        }
    };

    if (loading) {
        return <div className="p-6 text-gray-400">Loading files...</div>;
    }

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Metadata Privacy Scanner
            </h1>

            <div className="space-y-4">

                {files.map(file => (
                    <div
                        key={file._id}
                        className="bg-card p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                        <div>
                            <p className="text-yellow-400 mb-2">
                                ⚠ Possible metadata detected
                            </p>

                            <p className="font-semibold">
                                {file.filename}
                            </p>
                        </div>

                        <button
                            onClick={() => clean(file._id)}
                            className="bg-purple-600 px-6 py-3 rounded hover:opacity-90 transition"
                        >
                            Strip Metadata
                        </button>

                        {cleanedId === file._id && (
                            <p className="text-green-400">
                                ✔ Metadata removed
                            </p>
                        )}

                    </div>
                ))}

                {files.length === 0 && (
                    <div className="bg-card p-6 rounded-xl text-gray-400">
                        No files found to scan.
                    </div>
                )}

            </div>

        </div>
    );
}

export default MetadataCleaner;
