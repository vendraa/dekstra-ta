import { z } from "zod";

export const hilangKartuKeluargaSchema = z.object({

  /* ---- Data Pelapor ---- */
  nomor_kk: z
    .string()
    .length(16, "Nomor KK harus 16 digit")
    .regex(/^\d+$/, "Nomor KK hanya boleh berisi angka"),

  nik: z
    .string().
    length(16, "NIK harus 16 digit").
    regex(/^\d+$/, "NIK hanya angka"),

  nama_lengkap: z
    .string()
    .min(1, "Nama lengkap pelapor wajib diisi"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

  jenis_kelamin: z
    .enum(["laki-laki", "perempuan"],
      {
        message: "Jenis kelamin wajib dipilih",
      }
    ),

  agama: z
    .enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"], {
      message: "Agama wajib dipilih",
    }),

  pekerjaan: z
    .string()
    .min(1, "Pekerjaan wajib diisi"),

  alamat_lengkap: z
    .string()
    .min(1, "Alamat lengkap wajib diisi"),
});

export type HilangKartuKeluargaFormValues = z.infer<typeof hilangKartuKeluargaSchema>;