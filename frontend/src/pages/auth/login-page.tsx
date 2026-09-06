import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Eye, EyeOff, Lock, Mail, User, Video } from "lucide-react";

import { AuthLayout } from "../../layouts/auth-layout";
import { useAuth } from "../../hooks/use-auth";

export function LoginPage() {
  const { login, register, isLoading } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validateRegisterForm(): string | null {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return "Por favor completa todos los campos";
    }

    if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }

    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una mayúscula";
    }

    if (!/[0-9]/.test(password)) {
      return "La contraseña debe contener al menos un número";
    }

    if (!/[!@#$%^&*(),.?":{}|<>_-]/.test(password)) {
      return "La contraseña debe contener al menos un carácter especial";
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    if (!acceptTerms) {
      return "Debes aceptar los términos y condiciones";
    }

    return null;
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isRegistering) {
      const validationError = validateRegisterForm();

      if (validationError) {
        setError(validationError);
        return;
      }

      setError("");

      try {
        await register(name, email, password);
      } catch (registerError) {
        setError(
          registerError instanceof Error ? registerError.message : "No fue posible crear la cuenta",
        );
      }

      return;
    }

    if (!email.trim() || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    setError("");

    try {
      await login(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No fue posible iniciar sesión");
    }
  }

  function handleModeChange() {
    setIsRegistering((current) => !current);
    setError("");
  }

  return (
    <AuthLayout>
      {/* Card de autenticación */}
      <div className="rounded-2xl border border-border bg-surface p-7 shadow-lg shadow-black/5 sm:p-9 lg:p-10">
        {/* Encabezado */}
        <div className="mb-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            {isRegistering ? (
              <User size={18} className="text-primary" />
            ) : (
              <Video size={18} className="text-primary" />
            )}
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-txt">
            {isRegistering ? "Crear cuenta" : "Bienvenido de nuevo"}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-txt-secondary">
            {isRegistering
              ? "Crea tu cuenta de MeetCore"
              : "Inicia sesión en tu cuenta de MeetCore"}
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
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nombre */}
          {isRegistering && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-txt">
                Nombre completo
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-secondary"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  required
                  className="h-11 w-full rounded-xl border border-border bg-app-bg pl-10 pr-4 text-sm text-txt shadow-sm outline-none transition-all placeholder:text-txt-secondary/60 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          )}

          {/* Correo electrónico */}
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

          {/* Contraseña */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="password" className="block text-sm font-medium text-txt">
                Contraseña
              </label>

              {!isRegistering && (
                <a
                  href="/forgot-password"
                  className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  ¿Olvidaste la contraseña?
                </a>
              )}
            </div>

            <div className="relative">
              <Lock
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-secondary"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Tu contraseña"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
                className="h-11 w-full rounded-xl border border-border bg-app-bg pl-10 pr-11 text-sm text-txt shadow-sm outline-none transition-all placeholder:text-txt-secondary/60 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
              />

              {/* Mostrar / ocultar contraseña */}
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-txt-secondary transition-colors hover:text-txt"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          {isRegistering && (
            <div className="space-y-1.5">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-txt">
                Confirmar contraseña
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-secondary"
                />

                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  required
                  className="h-11 w-full rounded-xl border border-border bg-app-bg pl-10 pr-4 text-sm text-txt shadow-sm outline-none transition-all placeholder:text-txt-secondary/60 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          )}

          {/* Recordar sesión */}
          {!isRegistering && (
            <label className="flex cursor-pointer items-center gap-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded accent-primary"
              />

              <span className="text-sm text-txt-secondary">Recordar sesión</span>
            </label>
          )}

          {/* Términos */}
          {isRegistering && (
            <label className="flex cursor-pointer items-start gap-2">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(event) => setAcceptTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-primary"
              />

              <span className="text-sm leading-relaxed text-txt-secondary">
                Acepto los términos y condiciones de MeetCore.
              </span>
            </label>
          )}

          {/* Botón principal */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                {isRegistering ? "Creando cuenta..." : "Iniciando sesión..."}
              </>
            ) : isRegistering ? (
              "Crear cuenta"
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        {/* Separador */}
        {!isRegistering && (
          <>
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-divider" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-surface px-3 text-xs text-txt-secondary">O continúa con</span>
              </div>
            </div>

            {/* Proveedores externos */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-divider bg-surface text-sm font-medium text-txt-secondary shadow-sm transition-all hover:border-border hover:bg-app-bg hover:text-txt"
              >
                <span className="font-bold text-blue-500">G</span>
                Google
              </button>

              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-divider bg-surface text-sm font-medium text-txt-secondary shadow-sm transition-all hover:border-border hover:bg-app-bg hover:text-txt"
              >
                <span className="font-bold text-blue-600">M</span>
                Microsoft
              </button>
            </div>
          </>
        )}

        {/* Registro / Login */}
        <p className="pt-7 text-center text-sm text-txt-secondary">
          {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={handleModeChange}
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {isRegistering ? "Iniciar sesión" : "Regístrate gratis"}
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
