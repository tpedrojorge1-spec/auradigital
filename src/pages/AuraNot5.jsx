import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "../components/aura/AdminSidebar";
import AdminDashboard from "../components/aura/AdminDashboard";
import AdminTemplatesGrid from "../components/aura/AdminTemplatesGrid";
import AdminDesignSystem from "../components/aura/AdminDesignSystem";
import { useTheme } from "@/lib/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a1519af3c5bfa671071c0e7/af02c3015_WhatsAppImage2026-05-26at001502.jpeg";

const PAGE_TITLES = {
  dashboard: "Admin / Dashboard",
  templates: "Admin / Templates",
  users: "Admin / Users",
  analytics: "Admin / Analytics",
  categories: "Admin / Categories",
  featured: "Admin / Featured",
  submissions: "Admin / Submissions",
  settings: "Admin / Settings",
  "design-system": "Admin / Design System",
};

const CARD_STYLE = `
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(12px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes shimmerBadge {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      onLogin();
    } else {
      setError("Invalid credentials. Try admin / admin123");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-8 shadow-lg"
      >
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="Aura" className="h-14 w-14 rounded-2xl object-cover mx-auto mb-4" />
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">Aura NOT 5</h1>
          <p className="text-sm text-neutral-500 mt-1">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            defaultValue="admin"
            readOnly
            className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-500 cursor-not-allowed"
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 pr-10 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors">
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <button type="submit" className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-center text-xs text-neutral-400 mt-4">Use: admin / admin123</p>
      </motion.div>
    </div>
  );
}

export default function AuraNot5() {
  const [authed, setAuthed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { theme, setTheme } = useTheme();

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const renderPage = () => {
    if (activePage === "dashboard") return <AdminDashboard />;
    if (activePage === "templates") return <AdminTemplatesGrid />;
    if (activePage === "design-system") return <AdminDesignSystem />;
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-400 text-sm">Section "{activePage}" coming soon</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950">
      <style>{CARD_STYLE}</style>
      <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col min-h-screen ml-[260px]">
        {/* Admin Header */}
        <header className="fixed top-0 left-[260px] right-0 z-40 h-[60px] bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800 px-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500">{PAGE_TITLES[activePage] || "Admin"}</p>
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <div className="flex items-center gap-1">
              {[{k:"light",I:Sun},{k:"system",I:Monitor},{k:"dark",I:Moon}].map(({k,I}) => (
                <button key={k} onClick={() => setTheme(k)}
                  className={`p-1.5 rounded-lg transition-colors ${theme === k ? "bg-violet-100 dark:bg-violet-950/50 text-violet-600" : "text-neutral-400 hover:text-neutral-700 dark:hover:text-white"}`}>
                  <I className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
            <span className="text-xs font-medium bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400 px-2 py-0.5 rounded-md">ADMIN</span>
            <div className="relative">
              <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
              </button>
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-violet-600 rounded-full text-[9px] text-white flex items-center justify-center">3</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-medium flex items-center justify-center">AD</div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 mt-[60px]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}