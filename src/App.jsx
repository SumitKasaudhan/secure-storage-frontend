import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import PublicRoute from "./components/PublicRoute";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import OAuthSuccess from "./pages/OAuthSuccess";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile";
import Shredder from "./pages/Shredder";
import MetadataCleaner from "./pages/MetadataCleaner";
import APIKeys from "./pages/APIKeys";

import { getToken } from "./utils/auth";

/* ================= PRIVATE ROUTE ================= */
function PrivateRoute({ children }) {
  return getToken()
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* ================= PUBLIC WEBSITE ================= */}
        <Route element={<PublicLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* OAuth return page */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />

        </Route>

        {/* ================= DASHBOARD APP ================= */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="logs" element={<Logs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shredder" element={<Shredder />} />
          <Route path="metadata" element={<MetadataCleaner />} />
          <Route path="apikeys" element={<APIKeys />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
