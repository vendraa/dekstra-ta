/* =========================
   TYPES
========================= */
export interface ProgressItem {
  label: string;
  value: number;
  max:   number;
  color: string; // hex color, e.g. "#F97316"
}

export interface ProgressBarProps {
  items:   ProgressItem[];
  spacing?: "sm" | "md" | "lg";
}

/* =========================
   PROGRESS BAR ITEM
========================= */
function ProgressBarItem({ label, value, max, color }: ProgressItem) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="space-y-1.5">
      {/* Label — pakai inline style agar warna dinamis dari hex */}
      <p className="text-xs font-bold" style={{ color }}>
        {label}
      </p>

      {/* Bar + Value */}
      <div className="flex items-center gap-3">
        {/* Track */}
        <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
          {/* Fill */}
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width:           `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>

        {/* Value */}
        <span className="text-sm font-bold text-foreground w-8 text-right shrink-0">
          {value}
        </span>
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
========================= */
const spacingMap = {
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
};

export function ProgressBar({
  items,
  spacing = "md",
}: ProgressBarProps) {
  return (
    <div className={spacingMap[spacing]}>
      {items.map((item) => (
        <ProgressBarItem key={item.label} {...item} />
      ))}
    </div>
  );
}