"use client";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  onChange: (value?: string) => void;
  options: Option[];
  label?: string;
}

export function TableSelectFilter({
  value,
  onChange,
  options,
  label,
}: Props) {

  return (
    <div className="flex flex-col gap-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <select
        className={`
          rounded-lg border border-border px-4 py-2 text-sm outline-none transition
          bg-surface text-foreground
        `}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
      >

        <option value="">Semua</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}

      </select>

    </div>
  );
}