"use client";

type DateRange = {
  from?: string;
  to?: string;
};

interface Props {
  value?: DateRange;
  onChange: (value?: DateRange) => void;
}

export function TableDateRangeFilter({
  value,
  onChange,
}: Props) {
  const range = value ?? {};

  const update = (key: keyof DateRange, val: string) => {
    const next = {
      ...range,
      [key]: val || undefined,
    };

    if (!next.from && !next.to) {
      onChange(undefined);
      return;
    }

    onChange(next);
  };

  return (
    <div className="flex items-center gap-3">

      <input
        type="date"
        className="border border-border rounded-md px-3 py-2 text-sm w-full"
        value={range.from ?? ""}
        onChange={(e) => update("from", e.target.value)}
      />

      <span className="text-muted-foreground text-sm">
        -
      </span>

      <input
        type="date"
        className="border border-border rounded-md px-3 py-2 text-sm w-full"
        value={range.to ?? ""}
        onChange={(e) => update("to", e.target.value)}
      />

    </div>
  );
}