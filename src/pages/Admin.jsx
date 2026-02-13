import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";


function Admin() {
    const [files, setFiles] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.get("/files/admin/files").then(res => setFiles(res.data));
        api.get("/files/admin/logs").then(res => setLogs(res.data));
    }, []);

    return (
        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                Admin Panel
            </h1>

            <h2 className="text-xl font-semibold mb-4">
                All Files
            </h2>

            <div className="space-y-2 mb-10">
                {files.map(file => (
                    <div key={file._id} className="bg-card p-4 rounded">
                        {file.filename}
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">
                Global Activity Logs
            </h2>

            <div className="space-y-2">
                {logs.map(log => (
                    <div key={log._id} className="bg-card p-4 rounded">
                        {log.action} — {log.filename}
                    </div>
                ))}
            </div>

        </Layout>
    );
}

export default Admin;
