import type { ReactNode } from "react";
import { Check, Shield, Users, Video } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-app-bg">
      <div className="flex min-h-screen">
        {/* Panel de branding */}
        <section className="relative hidden shrink-0 overflow-hidden bg-sidebar p-10 lg:flex lg:w-[40%] lg:p-12 xl:w-[40%]">
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

              <p className="mt-5 max-w-xl text-base leading-relaxed text-txt-muted xl:text-lg">
                MeetCore es una plataforma de reuniones diseñada para que los equipos puedan
                comunicarse, colaborar y mantenerse conectados desde cualquier lugar. Disfruta de
                videollamadas de alta calidad, colaboración en tiempo real, herramientas
                profesionales y una experiencia sencilla que permite organizar tus reuniones y
                trabajar juntos sin importar dónde se encuentre cada integrante del equipo.
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
        <section className="flex min-h-screen flex-1 items-center justify-center overflow-y-auto bg-app-bg px-5 py-8 sm:px-8 lg:w-[60%] lg:px-12">
          <div className="w-full max-w-105 lg:max-w-115 xl:max-w-125 2xl:max-w-135">
            {/* Logo móvil */}
            <div className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/30">
                <Video size={17} className="text-white" />
              </div>

              <span className="font-display text-lg font-bold text-txt">MeetCore</span>
            </div>

            {children}
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
