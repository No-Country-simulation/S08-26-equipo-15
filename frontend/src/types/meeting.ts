export type MeetingStatus = "scheduled" | "completed" | "cancelled";

export interface Meeting {
  id: string;
  title: string;
  startAt: string;
  durationMinutes: number;
  participants: number;
  status: MeetingStatus;
}
