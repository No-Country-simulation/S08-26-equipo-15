import type { LucideIcon } from "lucide-react";

import type { DashboardStat } from "../../types/dashboard";

interface StatCardProps {
  stat: DashboardStat;
  icon: LucideIcon;
}

export function StatCard({ stat, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-divider bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-txt-secondary">
            {stat.label}
          </p>

          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-txt">
            {stat.value}
          </p>

          <p className="mt-1 text-xs text-txt-secondary">
            {stat.detail}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <Icon size={19} />
        </div>
      </div>
    </article>
  );
}