import { FieldDefinition } from "@/features/surat/forms/dynamic-form/types/form.types";

function formatSelectValue(value: string): string {
  // khusus singkatan uppercase
  const upperCases = ["wni", "wna", "rt", "rw"];

  if (upperCases.includes(value.toLowerCase())) {
    return value.toUpperCase();
  }

  // default: capitalize per kata + handle "-"
  return value
    .split("-")
    .map((word) =>
      word
        .split(" ")
        .map(
          (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join(" ")
    )
    .join(" - ");
}

export function resolveDisplayValue(field: FieldDefinition, value: unknown): string {
  if (value === undefined || value === null || value === "") return "-";

  // Checkbox
  if (field.type === "checkbox") {
    return value === true ? "Ya" : "Tidak";
  }

  // Array
  if (field.type === "array" && Array.isArray(value)) {
    return `${value.length} item`;
  }

  // Date
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // 🔥 SELECT / ENUM / STRING FORMAT
  if (typeof value === "string") {
    return formatSelectValue(value);
  }

  return String(value);
}