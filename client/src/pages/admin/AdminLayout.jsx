import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo.jsx";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
  { to: "/admin/appointments", label: "Appointments", icon: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 5h8v1.5H7V7zm0 3h8v1.5H7V10zm0 3h5v1.5H7V13z" },
  { to: "/admin/patients", label: "Patients", icon: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" },
  { to: "/admin/doctors", label: "Doctors & Schedules", icon: "M10.5 2.75a.75.75 0 00-1.5 0v.42a9 9 0 00-6.04 12.08l-.42.9a.75.75 0 001.32.7l.5-.9h11.28l.5.9a.75.75 0 001.32-.7l-.42-.9A9 9 0 0010.5 3.17v-.42z" },
  { to: "/admin/questionnaires", label: "Questionnaires", icon: "M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm1 7h7v1.5H7V9zm0 3h7v1.5H7V12zm0 3h4v1.5H7V15z" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("irveda_token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("irveda_user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!token) navigate("/admin/login", { replace: true });
  }, [token, navigate]);

  if (!token) return null;

  const logout = () => {
    localStorage.removeItem("irveda_token");
    localStorage.removeItem("irveda_user");
    setToken(null);
    setUser(null);
  };

  const isAdmin = user && ["SUPER_ADMIN", "ADMIN"].includes(user.role);
  const isSuper = user && user.role === "SUPER_ADMIN";

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-leaf-900 text-cream-100 flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-5 py-5 border-b border-white/10">
          <Logo light small />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-saffron-500 text-leaf-950"
                    : "text-cream-100/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5 shrink-0">
                <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
              </svg>
              {item.label}
            </NavLink>
          ))}

          {isSuper && (
            <NavLink
              to="/admin/staff"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-saffron-500 text-leaf-950" : "text-cream-100/75 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5 shrink-0">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Staff
            </NavLink>
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-saffron-500 text-leaf-950 flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0) || "S"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-[11px] text-cream-100/60 uppercase tracking-wide">{user?.role?.replace("_", " ")}</div>
            </div>
            <button onClick={logout} title="Log out" className="text-cream-100/60 hover:text-white">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-60 p-6 lg:p-8 min-w-0">
        <Outlet context={{ user, isAdmin, isSuper }} />
      </main>
    </div>
  );
}
