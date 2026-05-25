import {
  SectionDefinition,
  FieldDefinition,
} from "@/features/surat/forms/dynamic-form/types/form.types";

function formatLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function detectFieldType(value: unknown): FieldDefinition["type"] {
  if (Array.isArray(value)) return "array";
  if (typeof value === "boolean") return "checkbox";
  if (typeof value === "string" && value.length > 100) return "textarea";
  return "text";
}

export function generateSectionsFromData(
  data: Record<string, unknown>
): SectionDefinition[] {
  const fields: FieldDefinition[] = Object.entries(data).map(
    ([key, value]) => ({
      name: key,
      label: formatLabel(key),
      type: detectFieldType(value),
    })
  );

  return [
    {
      title: "Data Pengajuan",
      fields,
    },
  ];
}