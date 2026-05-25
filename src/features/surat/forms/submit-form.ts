// features/surat/forms/dynamic-form/submit-form.ts

import { getKodeFromSlug } from "../constants/surat-kode-map";
import { submitSurat as submitSuratService } from "../services/surat.service";

export async function submitSurat(
  slug: string,
  formData: Record<string, unknown>
): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
  try {
    // FIX: konversi slug → kode backend
    const jenisSurat = getKodeFromSlug(slug);

    if (!jenisSurat) {
      console.error("Kode tidak ditemukan untuk slug:", slug);
      return {
        success: false,
        errors: { jenis_surat: ["Jenis surat tidak dikenali."] },
      };
    }
    
    await submitSuratService({
      jenis_surat: jenisSurat, // ← kirim kode "A01", "B01", dst
      data: formData,
    });

    return { success: true };

  } catch (err: unknown) {
    if (typeof err === "object" && err !== null) {
      return {
        success: false,
        errors: err as Record<string, string[]>,
      };
    }
    return {
      success: false,
      errors: { detail: ["Terjadi kesalahan tidak terduga."] },
    };
  }
}