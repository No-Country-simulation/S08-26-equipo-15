import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ForgotPasswordPage } from "../pages/auth/forgot-password-page";
import { LoginPage } from "../pages/auth/login-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
