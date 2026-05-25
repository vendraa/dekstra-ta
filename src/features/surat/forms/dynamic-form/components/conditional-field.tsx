import { useWatch } from "react-hook-form";
import { FieldDefinition } from "../types/form.types";

interface ConditionalFieldProps {
  field:       FieldDefinition;
  renderField: (field: FieldDefinition) => React.ReactNode;
}

export function ConditionalField({ field, renderField }: ConditionalFieldProps) {
  const watchedValue = useWatch({ name: field.dependsOn!.field }) as string;

  if (String(watchedValue ?? "") !== field.dependsOn!.value) return null;

  return <>{renderField(field)}</>;
}