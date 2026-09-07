import type { Meeting } from "./meeting";

export interface DashboardStat {
  label: string;
  value: string;
  detail: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  nextMeeting: Meeting | null;
  upcomingMeetings: Meeting[];
}
