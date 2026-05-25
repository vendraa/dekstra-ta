import { LucideIcon } from "lucide-react";
import { BaseCard } from "./BaseCard";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <BaseCard
      className={`
        rounded-2xl
        p-6
        flex flex-col
        justify-between
        min-h-40
        border border-border
      `}
    >
      <p className="text-sm font-heading font-bold text-foreground/60">
        {label}
      </p>

      <div className="flex items-end justify-between mt-4">
        <span className="text-4xl font-bold text-primary">
          {typeof value === "number"
            ? value.toLocaleString("id-ID")
            : value}
        </span>

        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={28} className="text-primary" />
        </div>
      </div>
    </BaseCard>
  );
}