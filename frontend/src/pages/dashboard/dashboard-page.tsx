import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Plus, Users, Video } from "lucide-react";

import { useAuth } from "../../hooks/use-auth";
import { StatCard } from "../../components/dashboard/stat-card";
import { MeetingListItem } from "../../components/meeting/meeting-list-item";
import { dashboardService } from "../../services/dashboard-service";
import type { DashboardData } from "../../types/dashboard";

const statIcons = [Video, Clock3, Users, CalendarDays];

export function DashboardPage() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard(): Promise<void> {
      try {
        setIsLoading(true);
        setError("");

        const data = await dashboardService.getDashboard();

        setDashboard(data);
      } catch (dashboardError) {
        setError(
          dashboardError instanceof Error
            ? dashboardError.message
            : "No fue posible cargar el Dashboard",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  function formatMeetingDate(startAt: string): string {
    const date = new Date(startAt);

    if (Number.isNaN(date.getTime())) {
      return startAt;
    }

    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-txt-secondary">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          Cargando Dashboard...
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <section className="rounded-2xl border border-danger/20 bg-danger-bg p-6">
        <h1 className="font-display text-lg font-semibold text-danger">
          No fue posible cargar el Dashboard
        </h1>

        <p className="mt-2 text-sm text-txt-secondary">{error || "No hay datos disponibles."}</p>
      </section>
    );
  }

  const nextMeeting = dashboard.nextMeeting;

  return (
    <div className="space-y-8">
      {/* Bienvenida */}
      <section>
        <p className="mb-2 text-sm font-medium text-txt-secondary">Domingo, 6 de septiembre</p>

        <h1 className="font-display text-2xl font-bold tracking-tight text-txt sm:text-3xl">
          Buenos días, {user?.name?.split(" ")[0] ?? "usuario"} 👋
        </h1>

        <p className="mt-2 text-sm text-txt-secondary">
          Aquí tienes un resumen de tu actividad en MeetCore.
        </p>
      </section>

      {/* Estadísticas */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat, index) => {
          const Icon = statIcons[index] ?? CalendarDays;

          return <StatCard key={stat.label} stat={stat} icon={Icon} />;
        })}
      </section>

      {/* Próxima reunión + acciones */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <article className="overflow-hidden rounded-2xl bg-sidebar p-6 text-white sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-400">Próxima reunión</p>

              <h2 className="mt-2 text-xl font-bold">
                {nextMeeting?.title ?? "No tienes reuniones próximas"}
              </h2>

              {nextMeeting && (
                <p className="mt-2 text-sm text-slate-400">
                  {formatMeetingDate(nextMeeting.startAt)} · {nextMeeting.durationMinutes} minutos
                </p>
              )}
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Video size={20} />
            </div>
          </div>

          {nextMeeting && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                <Video size={17} />
                Unirse
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Ver detalles
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-divider bg-surface p-6">
          <h2 className="text-base font-semibold text-txt">Acciones rápidas</h2>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-divider p-4 text-left transition-colors hover:bg-app-bg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                <Plus size={19} />
              </span>

              <span>
                <span className="block text-sm font-semibold text-txt">Nueva reunión</span>

                <span className="block text-xs text-txt-secondary">Programa una reunión</span>
              </span>
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-divider p-4 text-left transition-colors hover:bg-app-bg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-info-bg text-info">
                <Video size={19} />
              </span>

              <span>
                <span className="block text-sm font-semibold text-txt">Unirse a reunión</span>

                <span className="block text-xs text-txt-secondary">Usa un código de reunión</span>
              </span>
            </button>
          </div>
        </article>
      </section>

      {/* Próximas reuniones */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-txt">Próximas reuniones</h2>

            <p className="mt-1 text-sm text-txt-secondary">Tus siguientes reuniones programadas.</p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover sm:flex"
          >
            Ver todas
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-divider bg-surface">
          {dashboard.upcomingMeetings.length > 0 ? (
            dashboard.upcomingMeetings.map((meeting, index) => (
              <MeetingListItem
                key={meeting.id}
                meeting={meeting}
                showDivider={index < dashboard.upcomingMeetings.length - 1}
              />
            ))
          ) : (
            <p className="p-5 text-sm text-txt-secondary">No tienes reuniones próximas.</p>
          )}
        </div>
      </section>
    </div>
  );
}
