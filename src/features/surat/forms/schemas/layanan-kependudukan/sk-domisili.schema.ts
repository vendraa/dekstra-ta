import { z } from "zod";

export const domisiliSchema = z.object({

  /* ---- Data Pemohon ---- */
  nama_lengkap:   z.string().min(1, "Nama lengkap wajib diisi"),

  nik:            z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "NIK hanya berisi angka"),

  tempat_lahir:   z.string().min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir:  z.string().min(1, "Tanggal lahir wajib diisi"),

  jenis_kelamin:  z.enum(["laki-laki", "perempuan"], {
    message: "Jenis kelamin wajib dipilih",
  }),

  agama:          z.enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"], {
    message: "Agama wajib dipilih",
  }),

  pekerjaan:      z.string().min(1, "Pekerjaan wajib diisi"),

  status_perkawinan: z.enum(["belum-kawin", "kawin", "cerai-hidup", "cerai-mati"], {
    message: "Status perkawinan wajib dipilih",
  }),

  kewarganegaraan: z.enum(["wni", "wna"], {
    message: "Kewarganegaraan wajib dipilih",
  }),

  alamat:         z.string().min(1, "Alamat wajib diisi"),

  nomor_kk:       z.string().length(16, "Nomor KK harus 16 digit").regex(/^\d+$/, "Nomor KK hanya angka"),

  nama_kepala_keluarga: z.string().min(1, "Nama kepala keluarga wajib diisi"),
});

export type DomisiliFormValues = z.infer<typeof domisiliSchema>;