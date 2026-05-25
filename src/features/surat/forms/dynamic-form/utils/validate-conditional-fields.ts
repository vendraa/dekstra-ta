import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FieldDefinition, SectionDefinition } from "../types/form.types";

/**
 * Validate conditional fields berdasarkan metadata
 */
export function validateConditionalFields<T extends FieldValues>(
  methods: UseFormReturn<T>,
  currentFieldNames: string[],
  sections: SectionDefinition[]
): boolean {
  const values = methods.getValues();
  let isValid = true;

  // Collect all fields dengan conditional validation
  const conditionalFields: FieldDefinition[] = [];

  sections.forEach((section) => {
    section.fields?.forEach((field) => {
      if (field.conditionalValidation) {
        conditionalFields.push(field);
      }
    });

    section.groups?.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.conditionalValidation) {
          conditionalFields.push(field);
        }
      });
    });
  });

  // Validate each conditional field yang ada di current step
  conditionalFields.forEach((field) => {
    // Skip jika field tidak ada di current step
    if (!currentFieldNames.includes(field.name)) {
      return;
    }

    const { conditionalValidation } = field;
    if (!conditionalValidation) return;

    const { when, is, then } = conditionalValidation;

    // Get value dari field yang dicek
    const watchedValue = values[when as keyof T];

    // Check apakah condition terpenuhi
    const conditionMet = Array.isArray(is)
      ? is.includes(String(watchedValue))
      : String(watchedValue) === is;

    // Jika condition terpenuhi dan field required
    if (conditionMet && then.required) {
      const fieldValue = values[field.name as keyof T];
      const isEmpty =
        !fieldValue || String(fieldValue).trim() === "";

      if (isEmpty) {
        methods.setError(field.name as Path<T>, {
          type: "manual",
          message: then.message,
        });
        isValid = false;
      } else {
        methods.clearErrors(field.name as Path<T>);
      }
    }
  });

  return isValid;
}

/**
 * Check apakah step memiliki conditional fields
 */
export function hasConditionalValidation(
  currentFieldNames: string[],
  sections: SectionDefinition[]
): boolean {
  const conditionalFieldNames: string[] = [];

  sections.forEach((section) => {
    section.fields?.forEach((field) => {
      if (field.conditionalValidation) {
        conditionalFieldNames.push(field.name);
      }
    });

    section.groups?.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.conditionalValidation) {
          conditionalFieldNames.push(field.name);
        }
      });
    });
  });

  return currentFieldNames.some((field) =>
    conditionalFieldNames.includes(field)
  );
}