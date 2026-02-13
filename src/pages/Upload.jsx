import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Upload() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            toast.error("Select a file first");
            return;
        }

        const form = new FormData();
        form.append("file", file);

        try {
            setLoading(true);

            await api.post("/files/upload", form);

            toast.success("Upload successful");

            setTimeout(() => {
                navigate("/app");
            }, 800);

        } catch (err) {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Upload File
            </h1>

            <div className="bg-card p-10 rounded-lg max-w-xl">

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-6"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="bg-primary px-6 py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>

            </div>

        </div>
    );
}

export default Upload;
