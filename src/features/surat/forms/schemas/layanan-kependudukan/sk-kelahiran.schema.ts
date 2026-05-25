import { z } from "zod";

export const kelahiranSchema = z.object({

  /* ---- Data Kelahiran Anak ---- */
  nama_anak: z
    .string()
    .min(1, "Nama anak wajib diisi"),

  jenis_kelamin_anak: z
    .enum(["laki-laki", "perempuan"])
    .refine((val) => val !== undefined, "Jenis kelamin wajib dipilih"),

  tanggal_lahir_anak: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

  waktu_lahir_anak: z
    .string()
    .min(1, "Waktu lahir wajib diisi"),

  anak_ke: z
    .number({ error: "Anak ke wajib diisi" }),

  /* ---- Data Ayah ---- */
  nama_ayah: z
    .string()
    .min(1, "Nama ayah wajib diisi"),

  nik_ayah: z
    .string()
    .min(1, "NIK ayah wajib diisi")
    .length(16, "NIK harus 16 digit"),

  tempat_lahir_ayah: z
    .string()
    .min(1, "Tempat lahir ayah wajib diisi"),
  
  tanggal_lahir_ayah: z
    .string()
    .min(1, "Tanggal lahir ayah wajib diisi"),

  agama_ayah: z
    .enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"],
      { message: "Agama ayah wajib dipilih" }
    ),

  pekerjaan_ayah: z
    .string()
    .min(1, "Pekerjaan ayah wajib diisi"),

  kewarganegaraan_ayah: z
    .enum(["wni", "wna"],
      { message: "Kewarganegaraan ayah wajib dipilih" }
    ),

  alamat_ayah: z
    .string()
    .min(1, "Alamat ayah wajib diisi"),

  /* ---- Data Ibu ---- */
  nama_ibu: z
    .string()
    .min(1, "Nama ibu wajib diisi"),

  nik_ibu: z
    .string()
    .min(1, "NIK ibu wajib diisi")
    .length(16, "NIK harus 16 digit"),

  tempat_lahir_ibu: z
    .string()
    .min(1, "Tempat lahir ibu wajib diisi"),
  
  tanggal_lahir_ibu: z
    .string()
    .min(1, "Tanggal lahir ibu wajib diisi"),

  agama_ibu: z
    .enum(["islam", "kristen", "katolik", "hindu", "buddha", "konghucu", "kepercayaan-terhadap-tuhan-yang-maha-esa"],
      { message: "Agama ibu wajib dipilih" }
    ),

  pekerjaan_ibu: z
    .string()
    .min(1, "Pekerjaan ibu wajib diisi"),

  kewarganegaraan_ibu: z
    .enum(["wni", "wna"],
      { message: "Kewarganegaraan ibu wajib dipilih" }
    ),

  alamat_ibu: z
    .string()
    .min(1, "Alamat ibu wajib diisi"),
});

export type KelahiranFormValues = z.infer<typeof kelahiranSchema>;