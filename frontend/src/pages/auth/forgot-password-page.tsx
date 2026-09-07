import { useState } from "react";
import type { SyntheticEvent } from "react";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { AuthLayout } from "../../layouts/auth-layout";
import { useAuth } from "../../hooks/use-auth";

export function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setError("");

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (forgotPasswordError) {
      setError(
        forgotPasswordError instanceof Error
          ? forgotPasswordError.message
          : "No fue posible procesar la solicitud",
      );
    }
  }

  return (
    <AuthLayout>
      {/* Card */}
      <div className="rounded-2xl border border-border bg-surface p-7 shadow-lg shadow-black/5 sm:p-9 lg:p-10">
        {/* Encabezado */}
        <div className="mb-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            {isSubmitted ? (
              <Check size={18} className="text-primary" />
            ) : (
              <Mail size={18} className="text-primary" />
            )}
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-txt">
            {isSubmitted ? "Revisa tu correo" : "Recuperar contraseña"}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-txt-secondary">
            {isSubmitted
              ? "Si existe una cuenta con ese correo, recibirás instrucciones para restablecer tu contraseña."
              : "Ingresa tu correo electrónico y te enviaremos las instrucciones para recuperar tu cuenta."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Formulario */}
        {!isSubmitted && (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-txt">
                Correo electrónico
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-secondary"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@empresa.com"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-xl border border-border bg-app-bg pl-10 pr-4 text-sm text-txt shadow-sm outline-none transition-all placeholder:text-txt-secondary/60 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </button>
          </form>
        )}

        {/* Regresar al login */}
        <div className="pt-7 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <ArrowLeft size={16} />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
