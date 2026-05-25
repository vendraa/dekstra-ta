import { FieldValues, Path } from "react-hook-form";
import { ArrayColumn } from "../../fields/array-field";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "date"
  | "time"
  | "number"
  | "checkbox"
  | "array";

export interface FieldDefinition<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  numericOnly?: boolean;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  rows?: number;
  disabled?: boolean;
  columns?: ArrayColumn[];
  defaultItem?: Record<string, unknown>;

  dependsOn?: {
    field: Path<T>;
    value: string;
  };

  conditionalValidation?: {
    when: string; 
    is: string | string[]; 
    then: {
      required: boolean;
      message: string;
    };
  };

  layout?: "table" | "card";
}

export interface FieldGroup<T extends FieldValues = FieldValues> {
  fields: FieldDefinition<T>[];
}

export interface SectionDefinition<T extends FieldValues = FieldValues> {
  title: string;
  fields?: FieldDefinition<T>[];
  groups?: FieldGroup<T>[];
}

export type { ArrayColumn };