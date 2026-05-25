import { FieldDefinition } from "@/features/surat/forms/dynamic-form/types/form.types";
import { resolveDisplayValue } from "./helper/format-select-value";

interface Props {
  field: FieldDefinition;
  value: unknown;
}

export function DetailPengajuanField({ field, value }: Props) {
  // Array field ditampilkan sebagai tabel sederhana
  if (field.type === "array" && Array.isArray(value) && field.columns) {
    return (
      <div className="md:col-span-2 space-y-2">
        <p className="text-xs text-muted-foreground">{field.label}</p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {field.columns.map((col) => (
                  <th
                    key={col.name}
                    className="text-left px-4 py-2.5 text-xs font-semibold
                               text-muted-foreground whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {field.columns!.map((col) => (
                    <td
                      key={col.name}
                      className="px-4 py-2.5 text-sm text-foreground"
                    >
                      {String((row as Record<string, unknown>)[col.name] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Textarea ditampilkan full width
  const isFullWidth = field.type === "textarea" || field.type === "array";

  return (
    <div className={isFullWidth ? "md:col-span-2" : ""}>
      <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
      <p className={`text-sm font-heading font-semibold text-foreground
        ${field.type === "textarea"
          ? "whitespace-pre-wrap leading-relaxed"
          : ""
        }`}
      >
        {resolveDisplayValue(field, value)}
      </p>
    </div>
  );
}