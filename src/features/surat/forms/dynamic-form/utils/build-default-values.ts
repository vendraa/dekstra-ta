import { DefaultValues, FieldValues } from "react-hook-form";

import {
  SectionDefinition,
  FieldDefinition,
} from "../types/form.types";

export function buildDefaultValues<
  T extends FieldValues
>(
  sections: SectionDefinition<T>[]
): DefaultValues<T> {
  const values: Record<string, unknown> = {};

  const setFieldDefault = (
    field: FieldDefinition<T>
  ) => {
    switch (field.type) {
      case "checkbox":
        values[field.name] = false;
        break;

      case "number":
        values[field.name] = undefined;
        break;

      case "date":
        values[field.name] = "";
        break;

      case "time":
        values[field.name] = "";
        break;

      case "select":
        values[field.name] = "";
        break;

      /* ================= FIX ARRAY ================= */

      case "array":
        values[field.name] = field.defaultItem
          ? [{ ...field.defaultItem }]
          : [];
        break;

      default:
        values[field.name] = "";
    }
  };

  sections.forEach((section) => {
    section.fields?.forEach(setFieldDefault);

    section.groups?.forEach((group) => {
      group.fields.forEach(setFieldDefault);
    });
  });

  return values as DefaultValues<T>;
}