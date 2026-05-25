import { z } from "zod";

const anggotaSchema = z.object({
  anggota_nik: z
    .string()
    .length(16, "NIK anggota harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  anggota_nama: z
    .string()
    .min(1, "Nama anggota wajib diisi"),

  anggota_jenis_kelamin: z
    .enum(["laki-laki", "perempuan"],
    {
      message: "Jenis kelamin wajib dipilih",
    }
  ),

  anggota_shdk: z
    .enum([
      "kepala-keluarga",
      "suami",
      "istri",
      "anak",
      "menantu",
      "cucu",
      "orang-tua",
      "mertua",
      "famili-lain",
      "pembantu",
      "lainnya",
    ],
    {
      message: "Status hubungan dalam keluarga wajib dipilih",
    }
  ),
});

export const pindahSchema = z.object({

  /* ---- Data Daerah Asal ---- */
  nomor_kk: z
    .string()
    .length(16, "Nomor KK harus 16 digit")
    .regex(/^\d+$/, "Nomor KK hanya boleh berisi angka"),

  nama_lengkap: z
    .string()
    .min(1, "Nama kepala keluarga wajib diisi"),

  nik: z
    .string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),

  tempat_lahir: z
    .string()
    .min(1, "Tempat lahir wajib diisi"),

  tanggal_lahir: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),

  jenis_kelamin: z
    .enum(["laki-laki", "perempuan"], {
      message: "Jenis kelamin wajib dipilih",
    }),

  pekerjaan: z
    .string()
    .min(1, "Pekerjaan wajib diisi"),

  status: z
    .enum(["belum-menikah", "menikah", "cerai-hidup", "cerai-mati"], {
      message: "Status wajib dipilih",
    }),

  kewarganegaraan: z
    .enum(["wni", "wna"], {
      message: "Kewarganegaraan wajib dipilih",
    }),

  alamat: z
    .string()
    .min(1, "Alamat wajib diisi"),

  jumlah_anggota_keluarga_pindah: z
    .number({ error: "Jumlah anggota keluarga yang pindahwajib diisi" }),

  alasan_pindah: z
    .enum([
      "pekerjaan",
      "pendidikan",
      "keamanan",
      "kesehatan",
      "ikut-suami-istri",
      "ikut-orang-tua",
      "lainnya",
    ], {
      message: "Alasan pindah wajib dipilih",
    }),

  /* ---- Anggota Keluarga yang Ikut Pindah ---- */
  anggota_keluarga_pindah: z
      .array(anggotaSchema)
      .min(1, "Minimal 1 anggota keluarga wajib diisi"),
});

export type PindahFormValues = z.infer<typeof pindahSchema>;