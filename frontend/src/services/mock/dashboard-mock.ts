import type { DashboardData } from "../../types/dashboard";

export const dashboardMock: DashboardData = {
  stats: [
    {
      label: "Reuniones realizadas",
      value: "24",
      detail: "Este mes",
    },
    {
      label: "Próximas reuniones",
      value: "3",
      detail: "Esta semana",
    },
    {
      label: "Horas en reuniones",
      value: "18h 42m",
      detail: "Este mes",
    },
    {
      label: "Participantes únicos",
      value: "86",
      detail: "Este mes",
    },
  ],

  nextMeeting: {
    id: "meeting-1",
    title: "Daily de desarrollo",
    startAt: "2026-09-06T14:00:00",
    durationMinutes: 30,
    participants: 5,
    status: "scheduled",
  },

  upcomingMeetings: [
    {
      id: "meeting-1",
      title: "Daily de desarrollo",
      startAt: "2026-09-06T14:00:00",
      durationMinutes: 30,
      participants: 5,
      status: "scheduled",
    },
    {
      id: "meeting-2",
      title: "Revisión del proyecto",
      startAt: "2026-09-06T16:30:00",
      durationMinutes: 45,
      participants: 8,
      status: "scheduled",
    },
    {
      id: "meeting-3",
      title: "Planning",
      startAt: "2026-09-07T09:00:00",
      durationMinutes: 60,
      participants: 6,
      status: "scheduled",
    },
  ],
};
