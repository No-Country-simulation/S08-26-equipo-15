import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Check, Eye, EyeOff, Lock, Mail, Shield, Users, Video } from "lucide-react";

import { useAuth } from "../../hooks/use-auth";

export function LoginPage() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

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

  return (
    <main className="min-h-screen bg-app-bg">
      <div className="flex min-h-screen">
        {/* Panel de branding */}
        <section className="relative hidden w-110 shrink-0 overflow-hidden bg-sidebar p-12 lg:flex xl:w-125">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
          </div>

          <div className="relative z-10 flex w-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
                <Video size={20} className="text-white" />
              </div>

              <span className="font-display text-xl font-bold tracking-tight text-white">
                MeetCore
              </span>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-5 w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <span className="text-xs font-medium text-blue-300">
                  Reuniones para equipos modernos
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
                Colabora sin
                <br />
                <span className="text-blue-400">fronteras</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-txt-muted">
                Videollamadas de alta calidad, colaboración en tiempo real y herramientas
                profesionales para mantener conectado a tu equipo.
              </p>

              {/* Características */}
              <div className="mt-9 space-y-3">
                <Feature text="Videoconferencias de alta calidad" />
                <Feature text="Compartir pantalla y colaborar en tiempo real" />
                <Feature text="Controles avanzados para tus reuniones" />
                <Feature text="Organización e historial de reuniones" />
              </div>

              {/* Indicadores */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <Stat value="HD" label="Video" />

                <Stat value="24/7" label="Acceso" />

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm">
                  <div className="flex justify-center -space-x-1 text-blue-300">
                    <Users size={18} />
                    <Users size={18} />
                    <Users size={18} />
                  </div>

                  <p className="mt-1 text-xs text-[#64748B]">Colaboración</p>
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Shield size={13} />

              <span>Conexiones protegidas y privacidad en tus reuniones</span>
            </div>
          </div>
        </section>

        {/* Área de autenticación */}
        <section className="flex min-h-screen flex-1 items-center justify-center overflow-y-auto bg-app-bg px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-105">
            {/* Logo móvil */}
            <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/30">
                <Video size={17} className="text-white" />
              </div>

              <span className="font-display text-lg font-bold text-txt">MeetCore</span>
            </div>

            {/* Card de inicio de sesión */}
            <div className="rounded-2xl border border-border bg-surface p-7 shadow-lg shadow-black/5 sm:p-9">
              {/* Encabezado */}
              <div className="mb-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Video size={18} className="text-primary" />
                </div>

                <h2 className="font-display text-2xl font-bold tracking-tight text-txt">
                  Bienvenido de nuevo
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-txt-secondary">
                  Inicia sesión en tu cuenta de MeetCore
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

                    <a
                      href="/forgot-password"
                      className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      ¿Olvidaste la contraseña?
                    </a>
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
                      autoComplete="current-password"
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

                {/* Recordar sesión */}
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

                {/* Botón principal */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
              </form>

              {/* Separador */}
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

              {/* Registro */}
              <p className="pt-7 text-center text-sm text-txt-secondary">
                ¿No tienes cuenta?{" "}
                <a
                  href="/register"
                  className="font-semibold text-primary transition-colors hover:text-primary-hover"
                >
                  Regístrate gratis
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

interface FeatureProps {
  text: string;
}

function Feature({ text }: FeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
        <Check size={11} className="text-emerald-400" />
      </div>

      <p className="text-sm text-[#CBD5E1]">{text}</p>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
      <p className="font-display text-lg font-bold text-white">{value}</p>

      <p className="mt-0.5 text-xs text-[#64748B]">{label}</p>
    </div>
  );
}
