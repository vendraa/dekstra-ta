import { SectionDefinition } from "@/features/surat/forms/dynamic-form/types/form.types";
import { DetailPengajuanField } from "./detail-pengajuan-field";

interface Props {
  section: SectionDefinition;
  data:    Record<string, unknown>;
}

export function DetailPengajuanSection({ section, data }: Props) {
  // Skip section "Kirim Pengajuan" — tidak perlu ditampilkan
  if (!section.fields?.length && !section.groups?.length) return null;

  return (
    <div className="space-y-4">
      {/* Section title */}
      <div className="border-b border-border pb-2">
        <h3 className="text-sm font-heading font-bold text-foreground">
          {section.title}
        </h3>
      </div>

      {/* Fields */}
      {section.fields && section.fields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {section.fields.map((field) => (
            <DetailPengajuanField
              key={field.name}
              field={field}
              value={data[field.name]}
            />
          ))}
        </div>
      )}

      {/* Groups */}
      {section.groups && section.groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {section.groups.map((group, i) => (
            <div key={i} className="flex flex-col gap-5">
              {group.fields.map((field) => (
                <DetailPengajuanField
                  key={field.name}
                  field={field}
                  value={data[field.name]}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}