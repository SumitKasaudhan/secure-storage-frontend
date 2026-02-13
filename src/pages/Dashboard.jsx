import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { clearToken } from "../utils/auth";

export default function Dashboard() {
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [folder, setFolder] = useState("all");
    const [activity, setActivity] = useState([]);

    const [previewFile, setPreviewFile] = useState(null);
    const [downloading, setDownloading] = useState(false);

    const logout = () => {
        clearToken();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        api.get("/files")
            .then(res => {
                setFiles(res.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);

                if (err.response?.status === 401) {
                    toast.error("Session expired");
                    clearToken();
                    navigate("/login", { replace: true });
                } else {
                    toast.error("Failed to load files");
                    setLoading(false);
                }
            });

    }, [navigate]);

    const filteredFiles = files
        .filter(f =>
            f.filename.toLowerCase().includes(search.toLowerCase())
        )
        .filter(file => {
            if (folder === "photos")
                return file.filename.match(/\.(jpg|png|jpeg)/i);
            if (folder === "docs")
                return file.filename.match(/\.(pdf|doc|txt)/i);
            return true;
        });

    const logActivity = (text) => {
        const time = new Date().toLocaleTimeString();
        setActivity(prev => [{ text, time }, ...prev.slice(0, 8)]);
    };

    /* DELETE */
    const remove = async (id, name) => {
        if (!window.confirm("Delete file?")) return;

        try {
            await api.delete(`/files/${id}`);
            setFiles(files.filter(f => f._id !== id));
            logActivity(`Deleted ${name}`);
            toast.success("File deleted successfully");
        } catch {
            toast.error("Delete failed");
        }
    };

    /* DOWNLOAD */
    const download = async (id, name) => {
        try {
            setDownloading(true);

            const res = await api.get(`/files/download/${id}`, {
                responseType: "blob",
            });

            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);

            toast.success("Download complete");
            logActivity(`Downloaded ${name}`);
        } catch {
            toast.error("Download failed");
        } finally {
            setDownloading(false);
        }
    };

    /* ✅ FIXED PREVIEW */
    const preview = async (id, name) => {
        try {
            const res = await api.get(`/files/download/${id}`, {
                responseType: "blob"
            });

            const blob = new Blob([res.data], {
                type: res.headers["content-type"]
            });

            const blobUrl = URL.createObjectURL(blob);

            // ✅ if PDF → open new tab
            if (blob.type === "application/pdf") {
                window.open(blobUrl, "_blank");
                return;
            }

            // ✅ otherwise show modal (images etc)
            setPreviewFile({
                name,
                url: blobUrl,
                type: blob.type
            });

            logActivity(`Previewed ${name}`);

        } catch (err) {
            console.error("PREVIEW ERROR:", err);
            toast.error("Preview failed");
        }
    };


    /* RENAME */
    const rename = async (id, oldName) => {
        const newName = prompt("Rename:", oldName);
        if (!newName) return;

        try {
            await api.put(`/files/rename/${id}`, { filename: newName });

            setFiles(
                files.map(f =>
                    f._id === id ? { ...f, filename: newName } : f
                )
            );

            logActivity(`Renamed to ${newName}`);
            toast.success("File renamed");
        } catch {
            toast.error("Rename failed");
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-gray-400">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                <h1 className="text-3xl font-bold">
                    Your Files ({filteredFiles.length})
                </h1>
            </div>

            <div className="border border-dashed border-gray-600 p-6 rounded text-center mb-6 text-gray-400">
                Drop files here for secure encryption
            </div>

            <input
                placeholder="Search..."
                className="mb-6 w-full p-3 bg-black border border-gray-700 rounded"
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredFiles.map(file => (
                    <div
                        key={file._id}
                        className="bg-card p-6 rounded-xl relative overflow-hidden hover:scale-[1.03] transition group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

                        <div className="relative">

                            <div className="flex items-start justify-between gap-3 mb-3">

                                {/* filename */}
                                <h3 className="font-semibold truncate max-w-[60%]">
                                    {file.filename}
                                </h3>

                                {/* badges */}
                                <div className="flex flex-wrap gap-2 justify-end">

                                    <span className="bg-yellow-600 text-xs px-2 py-1 rounded whitespace-nowrap">
                                        AES-256 Protected
                                    </span>

                                    {file.metadataClean ? (
                                        <span className="bg-green-600 text-xs px-2 py-1 rounded whitespace-nowrap">
                                            Clean
                                        </span>
                                    ) : (
                                        <span className="bg-red-600 text-xs px-2 py-1 rounded whitespace-nowrap">
                                            Metadata Risk
                                        </span>
                                    )}

                                </div>

                            </div>


                            <div className="flex gap-2 flex-wrap text-sm">

                                <button
                                    onClick={() => preview(file._id, file.filename)}
                                    className="bg-indigo-600 px-3 py-2 rounded"
                                >
                                    Preview
                                </button>

                                <button
                                    onClick={() => download(file._id, file.filename)}
                                    disabled={downloading}
                                    className="bg-primary px-3 py-2 rounded disabled:opacity-50"
                                >
                                    {downloading ? "Downloading..." : "Download"}
                                </button>

                                <button
                                    onClick={() => rename(file._id, file.filename)}
                                    className="bg-gray-700 px-3 py-2 rounded"
                                >
                                    Rename
                                </button>

                                <button
                                    onClick={() => remove(file._id, file.filename)}
                                    className="bg-red-600 px-3 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* PREVIEW MODAL */}
            {previewFile && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">

                    <div className="bg-[#0f0f12] rounded-xl max-w-5xl w-full h-[80vh] relative flex flex-col">

                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                            <h2 className="font-semibold truncate">
                                {previewFile.name}
                            </h2>

                            <button
                                onClick={() => {
                                    URL.revokeObjectURL(previewFile.url);
                                    setPreviewFile(null);
                                }}
                                className="text-red-500 hover:opacity-80"
                            >
                                Close ✕
                            </button>
                        </div>

                        <div className="flex-1 bg-black">
                            <div className="flex-1 overflow-hidden bg-black">

                                {/* IMAGE preview */}
                                {previewFile.type.startsWith("image/") && (
                                    <img
                                        src={previewFile.url}
                                        alt="preview"
                                        className="w-full h-full object-contain"
                                    />
                                )}

                                {/* PDF preview */}
                                {previewFile.type === "application/pdf" && (
                                    <iframe
                                        src={previewFile.url}
                                        className="w-full h-full"
                                        title="PDF preview"
                                    />
                                )}

                                {/* fallback */}
                                {!previewFile.type.startsWith("image/") &&
                                    previewFile.type !== "application/pdf" && (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            Preview not supported for this file type
                                        </div>
                                    )}
                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
