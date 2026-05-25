import { z } from "zod";

/* =========================================================
 * HELPERS
 * ======================================================= */

const requiredString = (message: string) =>
  z.preprocess(
    (val) => {
      if (
        val === undefined ||
        val === null
      ) {
        return "";
      }

      return String(val).trim();
    },
    z.string().min(1, message)
  );

const optionalString = () =>
  z.preprocess(
    (val) => {
      if (
        val === undefined ||
        val === null
      ) {
        return undefined;
      }

      const trimmed = String(val).trim();

      return trimmed === ""
        ? undefined
        : trimmed;
    },
    z.string().optional()
  );

/* =========================================================
 * SCHEMA
 * ======================================================= */

export const pendaftaranPeristiwaKependudukanSchema =
  z
    .object({
      /* =========================================================
       * DATA PEMOHON
       * ======================================================= */

      nama_lengkap: requiredString(
        "Nama lengkap wajib diisi"
      ),

      nik: z
        .string()
        .trim()
        .length(
          16,
          "NIK harus 16 digit"
        )
        .regex(
          /^\d+$/,
          "NIK hanya boleh berisi angka"
        ),

      nomor_kk: z
        .string()
        .trim()
        .length(
          16,
          "Nomor KK harus 16 digit"
        )
        .regex(
          /^\d+$/,
          "Nomor KK hanya boleh berisi angka"
        ),

      nomor_hp_wa: z
        .string()
        .trim()
        .min(
          10,
          "Nomor HP/WA tidak valid"
        )
        .regex(
          /^\d+$/,
          "Nomor HP/WA hanya boleh berisi angka"
        ),

      /* =========================================================
       * JENIS PERMOHONAN
       * ======================================================= */

      kategori_permohonan: z.enum(
        [
          "kartu-keluarga",
          "ktp-el",
          "kia",
          "perubahan-data",
        ],
        {
          error:
            "Kategori permohonan wajib dipilih",
        }
      ),

      /* =========================================================
       * SUB JENIS PERMOHONAN
       * ======================================================= */

      // dibuat optional biasa
      // validasi conditional dilakukan di superRefine
      jenis_kk: optionalString(),

      jenis_ktp: optionalString(),

      jenis_kia: optionalString(),

      jenis_perubahan_data:
        optionalString(),

      /* =========================================================
       * PERSYARATAN LAMPIRAN
       * ======================================================= */

      lampiran_kk_lama:
        z.boolean().default(false),

      lampiran_buku_nikah:
        z.boolean().default(false),

      lampiran_akta_perceraian:
        z.boolean().default(false),

      lampiran_surat_pindah:
        z.boolean().default(false),

      lampiran_surat_pindah_luar_negeri:
        z.boolean().default(false),

      lampiran_ktp_rusak:
        z.boolean().default(false),

      lampiran_dokumen_perjalanan:
        z.boolean().default(false),

      lampiran_surat_keterangan_hilang:
        z.boolean().default(false),

      lampiran_surat_keterangan_perubahan:
        z.boolean().default(false),

      lampiran_sptjm:
        z.boolean().default(false),

      lampiran_akta_kematian:
        z.boolean().default(false),

      lampiran_surat_pernyataan_hilang_rusak:
        z.boolean().default(false),

      lampiran_surat_pindah_perwakilan_ri:
        z.boolean().default(false),

      lampiran_surat_pernyataan_anggota:
        z.boolean().default(false),

      lampiran_surat_kuasa_pengasuhan:
        z.boolean().default(false),

      lampiran_kartu_izin_tinggal_tetap:
        z.boolean().default(false),
    })

    /* =========================================================
     * CONDITIONAL VALIDATION
     * ======================================================= */

  .superRefine((data, ctx) => {
    /* =========================
     * KARTU KELUARGA
     * ======================= */

    if (
      data.kategori_permohonan ===
        "kartu-keluarga" &&
      !data.jenis_kk
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["jenis_kk"],
        message:
          "Jenis permohonan Kartu Keluarga wajib dipilih",
      });
    }

    /* =========================
     * KTP EL
     * ======================= */

    if (
      data.kategori_permohonan ===
        "ktp-el" &&
      !data.jenis_ktp
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["jenis_ktp"],
        message:
          "Jenis permohonan KTP-el wajib dipilih",
      });
    }

    /* =========================
     * KIA
     * ======================= */

    if (
      data.kategori_permohonan ===
        "kia" &&
      !data.jenis_kia
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["jenis_kia"],
        message:
          "Jenis permohonan KIA wajib dipilih",
      });
    }

    /* =========================
     * PERUBAHAN DATA
     * ======================= */

    if (
      data.kategori_permohonan ===
        "perubahan-data" &&
      !data.jenis_perubahan_data
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [
          "jenis_perubahan_data",
        ],
        message:
          "Jenis perubahan data wajib dipilih",
      });
    }
  });

/* =========================================================
 * TYPES
 * ======================================================= */

export type PendaftaranPeristiwaKependudukanFormValues =
  z.infer<
    typeof pendaftaranPeristiwaKependudukanSchema
  >;