import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function PublicRoute({ children }) {
    return getToken()
        ? <Navigate to="/app" replace />
        : children;
}
