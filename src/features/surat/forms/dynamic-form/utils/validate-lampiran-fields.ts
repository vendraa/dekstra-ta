import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { SectionDefinition } from "../types/form.types";

/**
 * Cek apakah step saat ini memiliki field lampiran_
 */
export function hasLampiranGroup(fieldNames: string[]): boolean {
  return fieldNames.some((name) => name.startsWith("lampiran_"));
}

/**
 * Validasi group lampiran — minimal satu harus dicentang.
 * Jika tidak valid, set error manual pada field lampiran pertama
 * sebagai anchor untuk menampilkan pesan error.
 *
 * Mengembalikan true jika valid, false jika tidak.
 */
export function validateLampiranFields<
  T extends FieldValues
>(
  methods: UseFormReturn<T>,
  fieldNames: string[],
  sections: SectionDefinition[]
): boolean {
  const values =
    methods.getValues() as Record<
      string,
      unknown
    >;

  // Ambil semua field lampiran_
  const lampiranFieldNames =
    fieldNames.filter((name) =>
      name.startsWith("lampiran_")
    );

  if (lampiranFieldNames.length === 0)
    return true;

  // Cek apakah ada yang dicentang
  const hasAnyChecked =
    lampiranFieldNames.some(
      (name) => values[name] === true
    );

  /* =========================
   * VALID
   * ======================= */

  if (hasAnyChecked) {
    lampiranFieldNames.forEach((name) => {
      methods.clearErrors(name as Path<T>);
    });

    return true;
  }

  /* =========================
   * INVALID
   * ======================= */

  lampiranFieldNames.forEach((name) => {
    methods.setError(name as Path<T>, {
      type: "manual",
      message:
        "Minimal pilih satu persyaratan yang dilampirkan",
    });
  });

  return false;
}