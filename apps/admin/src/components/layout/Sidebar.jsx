import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
  { to: "/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/users", icon: Users, label: "Users" },
  { to: "/analytics", icon: BarChart2, label: "Analytics" },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();
  const { isOpen, toggle } = useSidebar();
  const navigate = useNavigate();

  const initials = admin?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-slate-950 flex flex-col z-50 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        {isOpen && (
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo-without-background.png"
              alt="TechNest"
              className="w-8 h-8 object-contain shrink-0"
            />
            <div>
              <p className="text-white font-bold text-sm leading-none">
                TechNest
              </p>
              <p className="text-slate-500 text-xs mt-0.5">Admin Dashboard</p>
            </div>
          </div>
        )}
        {!isOpen && (
          <img
            src="/logo-without-background.png"
            alt="TechNest"
            className="w-8 h-8 object-contain mx-auto"
          />
        )}
        <button
          onClick={toggle}
          className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition shrink-0"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isOpen ? "" : "justify-center"
              } ${isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`
            }
            title={!isOpen ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div className="px-2 py-4 border-t border-slate-800 space-y-1">
        {isOpen && (
          <button
            onClick={() => navigate("/account")}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-xl hover:bg-slate-800 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-white text-sm font-semibold truncate">
                {admin?.name}
              </p>
              <p className="text-slate-500 text-xs truncate">{admin?.email}</p>
            </div>
          </button>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all w-full ${!isOpen ? "justify-center" : ""}`}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
