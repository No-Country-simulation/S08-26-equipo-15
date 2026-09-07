import { CalendarDays, Clock3, LayoutDashboard, LogOut, Settings, Video, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Reuniones",
    to: "/meetings",
    icon: Video,
  },
  {
    label: "Calendario",
    to: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Historial",
    to: "/history",
    icon: Clock3,
  },
  {
    label: "Configuración",
    to: "/settings",
    icon: Settings,
  },
];

export function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const { user, logout } = useAuth();

  function handleLogout(): void {
    logout();
  }

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar",
        "transform transition-transform duration-200",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      {/* Branding */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Video size={18} className="text-white" />
          </div>

          <span className="font-display text-lg font-bold tracking-tight text-white">MeetCore</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-sidebar-hover hover:text-white lg:hidden"
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-5" aria-label="Navegación principal">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Principal
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                    "transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-sidebar-hover hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={19} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Usuario */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-2 flex items-center gap-3 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-blue-300">
            {getInitials(user?.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{user?.name ?? "Usuario"}</p>

            <p className="truncate text-xs text-slate-400">{user?.email ?? ""}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-sidebar-hover hover:text-white"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

function getInitials(name: string | undefined): string {
  if (!name) {
    return "MC";
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "MC";
}
