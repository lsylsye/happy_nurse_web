import { HashRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { FindPassword } from "./pages/FindPassword";
import { Handover } from "./pages/Handover";

// Happynurse EMR System
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/handover" element={<Handover />} />
      </Routes>
    </HashRouter>
  );
}
