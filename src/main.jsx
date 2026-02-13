import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext"; // ✅ add this
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="392237648881-gfgmtjea3anrpf5k86cd9urjdtpkut0n.apps.googleusercontent.com">

      {/* ✅ global user context */}
      <UserProvider>
        <App />
        <Toaster position="top-right" />
      </UserProvider>

    </GoogleOAuthProvider>
  </StrictMode>
);
