import { useState, useTransition } from "react";
import { useForm, FieldValues, Path, DefaultValues, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { FieldDefinition, SectionDefinition } from "../types/form.types";
import { buildDefaultValues } from "../utils/build-default-values";
import { submitSurat, uploadMultipleBerkas } from "@/features/surat/services/surat.service";
import { UploadedDocument } from "../types/document-upload-step.types";
import { getKodeFromSlug } from "@/features/surat/constants/surat-kode-map";
import {
  validateConditionalFields,
  hasConditionalValidation,
} from "../utils/validate-conditional-fields";
import { hasLampiranGroup, validateLampiranFields } from "../utils/validate-lampiran-fields";

interface UseDynamicFormProps<T extends FieldValues> {
  slug: string;
  sections: SectionDefinition[];
  schema: z.ZodSchema<T>;
}

export function useDynamicForm<T extends FieldValues>({
  slug,
  sections,
  schema,
}: UseDynamicFormProps<T>) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [submitError, setSubmitError] = useState<string>("");

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === sections.length - 1;
  const currentSection = sections[currentStepIndex];

  const methods = useForm<T>({
    resolver: zodResolver(schema as never),
    mode: "all",
    shouldUnregister: false,
    defaultValues: buildDefaultValues(sections) as DefaultValues<T>,
  });

  const steps = sections.map((section, index) => ({
    key: String(index),
    label: section.title,
  }));

  /* ---------- NAVIGATION ---------- */

  const handleNext = async () => {
    const values = methods.getValues();

    console.log("STEP:", currentStepIndex);
    console.log("VALUES:", values);

    /* =========================
     * GET CURRENT STEP FIELD NAMES
     * ======================= */

    const currentFieldNames: string[] = [];
    const hiddenFieldNames: string[] = [];

    const collectFieldNames = (field: FieldDefinition) => {
      /* =========================
       * CHECK DEPENDENCY
       * ======================= */

      if (field.dependsOn) {
        const watchedValue = values[field.dependsOn.field as keyof T];

        const isVisible = Array.isArray(field.dependsOn.value)
          ? field.dependsOn.value.includes(String(watchedValue))
          : watchedValue === field.dependsOn.value;

        /* =========================
         * HANDLE HIDDEN FIELD
         * ======================= */

        if (!isVisible) {
          hiddenFieldNames.push(field.name);

          // Clear value untuk hidden field
          methods.setValue(
            field.name as Path<T>,
            "" as PathValue<T, Path<T>>,
            {
              shouldValidate: false,
              shouldDirty: false,
            }
          );

          // Clear error untuk hidden field
          methods.clearErrors(field.name as Path<T>);

          return;
        }
      }

      /* =========================
       * NORMAL FIELD
       * ======================= */

      currentFieldNames.push(field.name);

      /* =========================
       * ARRAY FIELD
       * ======================= */

      if (field.type === "array") {
        const arrayValues = values[field.name as keyof T] as
          | Record<string, unknown>[]
          | undefined;

        if (Array.isArray(arrayValues)) {
          arrayValues.forEach((_, index) => {
            field.columns?.forEach((column) => {
              currentFieldNames.push(`${field.name}.${index}.${column.name}`);
            });
          });
        }
      }
    };

    /* =========================
     * COLLECT ALL CURRENT FIELDS
     * ======================= */

    currentSection?.fields?.forEach(collectFieldNames);

    currentSection?.groups?.forEach((group) => {
      group.fields.forEach(collectFieldNames);
    });

    /* =========================
    * GROUP VALIDATION
    * ======================= */

    console.log("VISIBLE FIELDS:", currentFieldNames);
    console.log("HIDDEN FIELDS:", hiddenFieldNames);

    /* =========================
    * GROUP VALIDATION — LAMPIRAN
    * ======================= */

    const hasLampiran = hasLampiranGroup(currentFieldNames);

    if (hasLampiran) {
      const lampiranValid = validateLampiranFields(
        methods,
        currentFieldNames,
        sections
      );

      if (!lampiranValid) {
        const firstLampiran = currentFieldNames.find((f) =>
          f.startsWith("lampiran_")
        );
        if (firstLampiran) {
          methods.setFocus(firstLampiran as Path<T>);
        }
        return; 
      }
    }

    /* =========================
     * VALIDATE CURRENT STEP
     * ======================= */

    let isValid = false;

    // Check apakah step ini punya conditional validation
    const hasConditional = hasConditionalValidation(currentFieldNames, sections);

    if (hasConditional) {
      // 1. Validate non-conditional fields dulu
      const nonConditionalFields = currentFieldNames.filter((fieldName) => {
        // Check apakah field ini punya conditionalValidation
        let hasCondValidation = false;

        sections.forEach((section) => {
          section.fields?.forEach((field) => {
            if (field.name === fieldName && field.conditionalValidation) {
              hasCondValidation = true;
            }
          });
          section.groups?.forEach((group) => {
            group.fields.forEach((field) => {
              if (field.name === fieldName && field.conditionalValidation) {
                hasCondValidation = true;
              }
            });
          });
        });

        return !hasCondValidation;
      });

      const nonConditionalValid =
        nonConditionalFields.length > 0
          ? await methods.trigger(nonConditionalFields as Path<T>[], {
              shouldFocus: true,
            })
          : true;

      console.log("NON-CONDITIONAL VALID:", nonConditionalValid);

      // 2. Validate conditional fields menggunakan utility
      const conditionalValid = validateConditionalFields(
        methods,
        currentFieldNames,
        sections
      );

      console.log("CONDITIONAL VALID:", conditionalValid);

      isValid = nonConditionalValid && conditionalValid;
    } else {
      // Untuk step tanpa conditional, validate biasa
      isValid = await methods.trigger(currentFieldNames as Path<T>[], {
        shouldFocus: true,
      });
    }

    console.log("IS VALID:", isValid);

    /* =========================
     * SHOW ERRORS IF INVALID
     * ======================= */

    if (!isValid) {
      const errors = methods.formState.errors;

      console.log("VALIDATION ERRORS:", errors);

      // Scroll ke error pertama di current step
      const firstErrorField = currentFieldNames.find((fieldName) => {
        const keys = fieldName.split(".");

        let error: unknown = errors;

        for (const key of keys) {
          if (typeof error === "object" && error !== null && key in error) {
            error = (error as Record<string, unknown>)[key];
          } else {
            error = undefined;
            break;
          }
        }

        return error !== undefined;
      });

      if (firstErrorField) {
        console.log("FIRST ERROR FIELD:", firstErrorField);
        methods.setFocus(firstErrorField as Path<T>);
      }

      return;
    }

    /* =========================
     * NEXT STEP
     * ======================= */

    setCurrentStepIndex((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStepIndex((prev) => prev - 1);

  /* ---------- SUBMIT ---------- */

  const kode = getKodeFromSlug(slug);

  if(!kode) {
    throw new Error("Kode surat tidak ditemukan")
  }

  const onValidSubmit = async (values: T) => {
    setSubmitError("");

    startTransition(async () => {
      try {
        // Step 1: Submit surat
        const suratResponse = await submitSurat({
          jenis_surat: kode,
          data: values,
        });

        console.log("Surat submitted:", suratResponse);

        // Step 2: Upload berkas jika ada
        if (documents.length > 0) {
          const files = documents.map((doc) => doc.file);

          try {
            await uploadMultipleBerkas(suratResponse.nomor_permohonan, files);
            console.log("Berkas uploaded successfully");
          } catch (uploadError: unknown) {
            console.error("Upload berkas error:", uploadError);
            // Continue even if upload fails
          }
        }

        // Step 3: Redirect ke halaman sukses atau dashboard
        router.push(`/dashboard`);
      } catch (error: unknown) {
        console.error("Submit error:", error);

        if (typeof error === "object" && error !== null) {
          const err = error as Record<string, unknown>;

          Object.entries(err).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              methods.setError(field as Path<T>, {
                type: "server",
                message: String(messages[0]),
              });
            }
          });

          setSubmitError(
            "Terdapat kesalahan pada form. Silakan periksa kembali."
          );
        } else {
          setSubmitError("Terjadi kesalahan saat mengirim pengajuan");
        }
      }
    });
  };

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    methods,
    steps,
    currentStepIndex,
    currentSection,
    isFirstStep,
    isLastStep,
    isPending,
    documents,
    setDocuments,
    submitError,
    handleNext,
    handleBack,
    onValidSubmit,
    goToStep,
  };
}