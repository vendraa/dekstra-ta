import { z } from "zod";

// Helper string wajib
const requiredString = (message: string) =>
  z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : ""),
    z.string().min(1, message)
  );

// Helper date wajib
const requiredDate = (message: string) =>
  z.preprocess(
    (value) => {
      if (value === undefined || value === null) {
        return "";
      }

      return String(value).trim();
    },
    z.string().refine(
      (val) => val !== "",
      {
        message,
      }
    )
  );

const barangItemSchema = z.object({
  jenis_barang: requiredString("Jenis barang wajib diisi"),

  jumlah_barang: z.preprocess(
    (val) => {
      if (val === "" || val === null || Number.isNaN(val)) {
        return undefined;
      }

      return Number(val);
    },
    z
      .number({
        error: "Jumlah barang wajib diisi",
      })
      .min(1, "Minimal 1")
  ),

  jenis_kendaraan: requiredString("Jenis kendaraan wajib diisi"),

  nomor_polisi: requiredString("Nomor polisi wajib diisi"),

  nama_supir: requiredString("Nama supir wajib diisi"),
});

export const pengantarBarangSchema = z.object({
  // =========================
  // Data Pemilik Barang
  // =========================
  pemilik_nama_lengkap: requiredString(
    "Nama lengkap pemilik wajib diisi"
  ),

  pemilik_nik: z
    .string()
    .trim()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  pemilik_tempat_lahir: requiredString(
    "Tempat lahir pemilik wajib diisi"
  ),

  pemilik_tanggal_lahir: requiredDate(
    "Tanggal lahir pemilik wajib diisi"
  ),

  pemilik_jenis_kelamin: z.enum(
    ["laki-laki", "perempuan"],
    {
      error: "Jenis kelamin pemilik wajib dipilih",
    }
  ),

  pemilik_pekerjaan: requiredString(
    "Pekerjaan pemilik wajib diisi"
  ),

  pemilik_alamat: requiredString(
    "Alamat pemilik wajib diisi"
  ),

  // =========================
  // Data Pengantar Barang
  // =========================
  pengantar_nama_lengkap: requiredString(
    "Nama lengkap pengantar wajib diisi"
  ),

  pengantar_nik: z
    .string()
    .trim()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  pengantar_tempat_lahir: requiredString(
    "Tempat lahir pengantar barang wajib diisi"
  ),

  pengantar_tanggal_lahir: requiredDate(
    "Tanggal lahir pengantar wajib diisi"
  ),

  pengantar_jenis_kelamin: z.enum(
    ["laki-laki", "perempuan"],
    {
      error: "Jenis kelamin pengantar wajib dipilih",
    }
  ),

  pengantar_pekerjaan: requiredString(
    "Pekerjaan pengantar wajib diisi"
  ),

  pengantar_alamat: requiredString(
    "Alamat pengantar wajib diisi"
  ),

  // =========================
  // Data Barang
  // =========================
  asal_barang: requiredString(
    "Asal barang wajib diisi"
  ),

  tujuan_barang: requiredString(
    "Tujuan barang wajib diisi"
  ),

  daftar_barang: z
    .array(barangItemSchema)
    .min(1, "Minimal 1 item barang harus diisi"),
});

export type BarangItem = z.infer<typeof barangItemSchema>;

export type PengantarBarangFormValues =
  z.infer<typeof pengantarBarangSchema>;