import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import { AppSidebar } from "./app-sidebar";
import { useAuth } from "../hooks/use-auth";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  function closeSidebar(): void {
    setIsSidebarOpen(false);
  }

  function toggleSidebar(): void {
    setIsSidebarOpen((current) => !current);
  }

  return (
    <div className="min-h-screen bg-app-bg text-txt">
      <AppSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          aria-label="Cerrar menú"
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-divider bg-surface/95 px-5 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-txt-secondary transition-colors hover:bg-app-bg hover:text-txt lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={isSidebarOpen}
          >
            <Menu size={20} />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-txt-secondary transition-colors hover:bg-app-bg hover:text-txt"
              aria-label="Notificaciones"
            >
              <Bell size={19} />
              <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-primary" />
            </button>

            <div className="hidden h-8 w-px bg-divider sm:block" />

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {getInitials(user?.name)}
              </div>

              <span className="text-sm font-medium text-txt">{user?.name ?? "Usuario"}</span>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] p-5 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
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
