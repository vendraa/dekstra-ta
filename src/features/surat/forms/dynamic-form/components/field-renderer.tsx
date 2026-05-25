import { FieldDefinition } from "../types/form.types";

import { TextField } from "../../fields/text-field";
import { TextareaField } from "../../fields/textarea-field";
import { SelectField } from "../../fields/select-field";
import { DateField } from "../../fields/date-field";
import { TimeField } from "../../fields/time-field";
import { NumberField } from "../../fields/number-field";
import { CheckboxField } from "../../fields/checkbox-field";
import { ArrayField } from "../../fields/array-field";

export function renderField(
  field: FieldDefinition
): React.ReactNode {
  switch (field.type) {
    case "text":
      return (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          numericOnly={field.numericOnly}
        />
      );

    case "textarea":
      return (
        <TextareaField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows}
          disabled={field.disabled}
        />
      );

    case "select":
      return (
        <SelectField
          key={field.name}
          name={field.name}
          label={field.label}
          options={field.options ?? []}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
        />
      );

    case "date":
      return (
        <DateField
          key={field.name}
          name={field.name}
          label={field.label}
          required={field.required}
          disabled={field.disabled}
        />
      );

    case "time":
      return (
        <TimeField
          key={field.name}
          name={field.name}
          label={field.label}
          required={field.required}
          disabled={field.disabled}
        />
      );

    case "number":
      return (
        <NumberField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          prefix={field.prefix}
          suffix={field.suffix}
          min={field.min}
          max={field.max}
          disabled={field.disabled}
        />
      );

    case "checkbox":
      return (
        <CheckboxField
          key={field.name}
          name={field.name}
          label={field.label}
          disabled={field.disabled}
        />
      );

    case "array":
      return (
        <ArrayField
          key={field.name}
          name={field.name}
          label={field.label}
          columns={field.columns ?? []}
          defaultItem={field.defaultItem ?? {}}
          required={field.required}
          layout={field.layout ?? "table"}
        />
      );

    default:
      return null;
  }
}

export function fieldWrapperClass(field: FieldDefinition): string {
  return field.type === "textarea" || field.type === "array"
    ? "md:col-span-2"
    : "";
}