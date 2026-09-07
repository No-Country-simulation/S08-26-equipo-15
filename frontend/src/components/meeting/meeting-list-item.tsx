import { CalendarDays, Users } from "lucide-react";

import type { Meeting } from "../../types/meeting";

interface MeetingListItemProps {
  meeting: Meeting;
  showDivider?: boolean;
}

export function MeetingListItem({ meeting, showDivider = false }: MeetingListItemProps) {
  return (
    <div
      className={[
        "flex flex-wrap items-center gap-4 p-5",
        showDivider ? "border-b border-divider" : "",
      ].join(" ")}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
        <CalendarDays size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-txt">{meeting.title}</h3>

        <p className="mt-1 text-xs text-txt-secondary">
          {meeting.startAt} · {meeting.durationMinutes} min
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-txt-secondary">
        <Users size={15} />
        {meeting.participants} participantes
      </div>
    </div>
  );
}
