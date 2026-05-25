import clsx from "clsx";

interface ReadOnlyFieldProps {
  label:      string;
  value?:     string | null;
  multiline?: boolean;
  className?: string;
}

export default function ReadOnlyField({
  label,
  value,
  multiline = false,
  className,
}: ReadOnlyFieldProps) {
  return (
    <div className={clsx("flex items-start gap-4", className)}>

      {/* Label — lebar fixed agar semua value rata kiri */}
      <span className="w-56 shrink-0 text-sm font-medium text-foreground pt-2.5">
        {label}
      </span>

      {/* Value */}
      <div
        className={clsx(
          "flex-1 rounded-lg bg-surface px-4 py-2.5 text-sm text-foreground border border-border",
          multiline && "min-h-24 items-start"
        )}
      >
        {value && value.trim() !== "" ? (
          value
        ) : (
          <span className="text-foreground/40 italic">-</span>
        )}
      </div>
    </div>
  );
}