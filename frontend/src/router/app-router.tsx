import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";
import { AppLayout } from "../layouts/app-layout";
import { ForgotPasswordPage } from "../pages/auth/forgot-password-page";
import { LoginPage } from "../pages/auth/login-page";
import { DashboardPage } from "../pages/dashboard/dashboard-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/meetings" element={<PlaceholderPage title="Reuniones" />} />

            <Route path="/calendar" element={<PlaceholderPage title="Calendario" />} />

            <Route path="/history" element={<PlaceholderPage title="Historial" />} />

            <Route path="/settings" element={<PlaceholderPage title="Configuración" />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

interface PlaceholderPageProps {
  title: string;
}

function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="rounded-2xl border border-divider bg-surface p-8">
      <h1 className="font-display text-2xl font-bold text-txt">{title}</h1>

      <p className="mt-2 text-sm text-txt-secondary">Este módulo será implementado próximamente.</p>
    </section>
  );
}
