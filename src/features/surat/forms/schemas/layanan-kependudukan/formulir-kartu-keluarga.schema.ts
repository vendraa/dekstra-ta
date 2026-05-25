import { z } from "zod";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema);

const requiredEnum = <
  T extends [string, ...string[]]
>(
  values: T,
  message: string
) =>
  z.enum(values, {
    error: message,
  });

const numericString = (
  message: string
) =>
  z
    .string()
    .min(1, message)
    .regex(
      /^\d+$/,
      "Hanya boleh berisi angka"
    );

const anggotaKeluargaSchema = z.object({
  /* 1. Nama Lengkap */
  nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),

  /* 2. Gelar */
  jenis_gelar: z.enum(
    [
      "-",
      "akademis",
      "kebangsawanan",
      "keagamaan",
    ],
    {
      error: "Jenis gelar wajib dipilih",
    }
  ),

  gelar: z.string().optional(),

  /* 3. Nomor KTP */
  no_ktp: z
    .string()
    .length(16, "Nomor KTP harus 16 digit")
    .regex(/^\d+$/, "Nomor KTP hanya angka"),

  /* 4. Alamat Sebelumnya */
  alamat_sebelumnya: z.string().optional(),

  /* 5-6. Paspor */
  nomor_paspor:          z.string().optional(),
  tanggal_berakhir_paspor: z.string().optional(),

  /* 7. Jenis Kelamin */
  jenis_kelamin: z
    .string()
    .min(1, "Jenis kelamin wajib dipilih")
    .refine(
      (val) => ["laki-laki", "perempuan"].includes(val),
      "Jenis kelamin tidak valid"
  ),

  /* 8-10. Lahir & Umur */
  tempat_lahir:  z.string().min(1, "Tempat lahir wajib diisi"),
  tanggal_lahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  umur:          z.number({ error: "Umur wajib diisi" }).min(0).max(150),

  /* 11-12. Akta Lahir */
  akta_lahir: requiredEnum(
    ["ada", "tidak-ada"],
    "Akta lahir wajib dipilih"
  ),
  nomor_akta_kelahiran:   z.string().optional(),

  /* 13. Golongan Darah */
  golongan_darah: requiredEnum(
    [
      "a",
      "b",
      "ab",
      "o",
      "a+",
      "b+",
      "b-",
      "ab+",
      "ab-",
      "o+",
      "o-",
      "tidak-tahu",
    ],
    "Golongan darah wajib dipilih"
  ),

  /* 14. Agama */
  agama: requiredEnum(
    [
      "islam",
      "kristen",
      "katolik",
      "hindu",
      "buddha",
      "konghucu",
      "kepercayaan-terhadap-tuhan-yang-maha-esa",
    ],
    "Agama wajib dipilih"
  ),

  /* 15. Status Perkawinan */
  status_perkawinan: requiredEnum(
    [
      "belum-kawin",
      "kawin",
      "cerai-hidup",
      "cerai-mati",
    ],
    "Status perkawinan wajib dipilih"
  ),

  /* 16-18. Akta Perkawinan — hanya jika status "kawin" */
  akta_perkawinan: emptyToUndefined(
    requiredEnum(
      ["ada", "tidak-ada"],
      "Akta perkawinan wajib dipilih"
    ).optional()
  ),
  nomor_akta_perkawinan:   z.string().optional(),
  tanggal_perkawinan:      z.string().optional(),

  /* 19-21. Akta Perceraian — hanya jika status "cerai-hidup" */
  akta_perceraian: emptyToUndefined(
    requiredEnum(
      ["ada", "tidak-ada"],
      "Akta perceraian wajib dipilih"
    ).optional()
  ),
  nomor_akta_perceraian:   z.string().optional(),
  tanggal_perceraian:      z.string().optional(),

  /* 22. Status Hubungan Keluarga */
  status_hubungan_keluarga: requiredEnum(
    [
      "kepala-keluarga",
      "suami",
      "istri",
      "anak",
      "menantu",
      "cucu",
      "orang-tua",
      "mertua",
      "famili",
      "pembantu",
      "lainnya",
    ],
    "Status hubungan keluarga wajib dipilih"
  ),

  /* 23-24. Kelainan Fisik Mental */
  kelainan_fisik_mental: requiredEnum(
    ["ada", "tidak-ada"],
    "Kelainan fisik mental wajib dipilih"
  ),
  penyandang_cacat: emptyToUndefined(
    requiredEnum(
      [
        "cacat-fisik",
        "cacat-netra",
        "cacat-rungu-wicara",
        "cacat-mental",
        "cacat-fisik-mental",
        "cacat-lainnya",
      ],
      "Jenis penyandang cacat wajib dipilih"
    ).optional()
  ),

  /* 25. Pendidikan Terakhir */
  pendidikan_terakhir: requiredEnum(
    [
      "tidak-belum-sekolah",
      "belum-tamat-sd",
      "tamat-sd",
      "sltp",
      "slta",
      "diploma-1-2",
      "diploma-3",
      "diploma-4-s1",
      "s2",
      "s3",
    ],
    "Pendidikan terakhir wajib dipilih"
  ),
  /* 26. Pekerjaan */
  pekerjaan: requiredEnum(
    [
      "belum-tidak-bekerja",
      "mengurus-rumah-tangga",
      "pelajar-mahasiswa",
      "pensiunan",

      "pegawai-negeri-sipil-pns",
      "tentara-nasional-indonesia-tni",
      "kepolisian-ri-polri",

      "perdagangan",
      "petani-pekebun",
      "peternak",
      "nelayan-perikanan",
      "industri",
      "konstruksi",
      "transportasi",
      "karyawan-swasta",
      "karyawan-bumn",
      "karyawan-bumd",
      "karyawan-honorer",

      "buruh-harian-lepas",
      "buruh-tani-perkebunan",
      "buruh-nelayan-perikanan",
      "buruh-peternakan",
      "pembantu-rumah-tangga",

      "tukang-cukur",
      "tukang-listrik",
      "tukang-batu",
      "tukang-kayu",
      "tukang-sol-sepatu",
      "tukang-las-pandan",
      "tukang-jahit",
      "penata-rambut",
      "penata-rias",
      "penata-busana",

      "mekanik",
      "seniman",
      "tabib",
      "paraji",
      "perancang-busana",
      "penterjemah",
      "imam-masjid",
      "pendeta",
      "pastor",
      "wartawan",
      "ustadz-mubaligh",
      "juru-masak",
      "promotor-acara",
      "anggota-dpr-ri",
      "anggota-dpd",
      "anggota-bpk",
      "presiden",
      "wakil-presiden",
      "anggota-mahkamah-konstitusi",
      "anggota-kabinet-kementerian",
      "duta-besar",
      "gubernur",
      "wakil-gubernur",
      "bupati",
      "wakil-bupati",
      "walikota",
      "wakil-walikota",
      "anggota-dprd-provinsi",
      "anggota-dprd-kabupaten-kota",
      "dosen",
      "guru",
      "pilot",
      "pengacara",
      "notaris",
      "arsitek",
      "akuntan",
      "konsultan",
      "dokter",
      "bidan",
      "perawat",
      "apoteker",
      "psikiater-psikolog",
      "penyiar-televisi",
      "penyiar-radio",
      "pelaut",
      "peneliti",
      "sopir",
      "pialang",
      "paranormal",
      "pedagang",
      "perangkat-desa",
      "kepala-desa",
      "biarawati",
      "wiraswasta",

      "lainnya",
    ],
    "Pekerjaan wajib dipilih"
  ),
  pekerjaan_lainnya: z.string().optional(),

  /* 27-30. Data Orang Tua */
  nik_ibu:    z.string().length(16, "NIK ibu harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  nama_ibu:   z.string().min(1, "Nama ibu wajib diisi"),
  nik_ayah:   z.string().length(16, "NIK ayah harus 16 digit").regex(/^\d+$/, "NIK hanya angka"),
  nama_ayah:  z.string().min(1, "Nama ayah wajib diisi"),

}).superRefine((data, ctx) => {
if (
  [
    "akademis",
    "kebangsawanan",
    "keagamaan",
  ].includes(data.jenis_gelar) &&
  !data.gelar?.trim()
) {
    ctx.addIssue({
      code:    z.ZodIssueCode.custom,
      path:    ["gelar"],
      message: "Gelar wajib diisi jika jenis gelar dipilih",
    });
  }
  // Akta kelahiran ada → nomor wajib
  if (data.akta_lahir === "ada" && !data.nomor_akta_kelahiran) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nomor_akta_kelahiran"], message: "Nomor akta kelahiran wajib diisi" });
  }
  // Status kawin → akta perkawinan wajib
  if (data.status_perkawinan === "kawin") {
    if (!data.akta_perkawinan) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["akta_perkawinan"], message: "Akta perkawinan wajib dipilih" });
    }
    if (data.akta_perkawinan === "ada" && !data.nomor_akta_perkawinan) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nomor_akta_perkawinan"], message: "Nomor akta perkawinan wajib diisi" });
    }
  }
  // Status cerai hidup → akta perceraian wajib
  if (data.status_perkawinan === "cerai-hidup") {
    if (!data.akta_perceraian) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["akta_perceraian"], message: "Akta perceraian wajib dipilih" });
    }
    if (data.akta_perceraian === "ada" && !data.nomor_akta_perceraian) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["nomor_akta_perceraian"], message: "Nomor akta perceraian wajib diisi" });
    }
  }
  // Kelainan fisik ada → penyandang cacat wajib
  if (data.kelainan_fisik_mental === "ada" && !data.penyandang_cacat) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["penyandang_cacat"], message: "Jenis penyandang cacat wajib dipilih" });
  }
  // Pekerjaan lainnya → keterangan wajib
  if (data.pekerjaan === "lainnya" && !data.pekerjaan_lainnya) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["pekerjaan_lainnya"], message: "Keterangan pekerjaan wajib diisi" });
  }
});

export const formulirKartuKeluargaSchema = z.object({
  /* ---- Data Kepala Keluarga ---- */
  nama_kepala_keluarga: z.string().min(1, "Nama kepala keluarga wajib diisi"),
  alamat:               z.string().min(1, "Alamat wajib diisi"),
  rt: numericString("RT wajib diisi"),

  rw: numericString("RW wajib diisi"),

  kode_pos: z
    .string()
    .length(5, "Kode pos harus 5 digit")
    .regex(
      /^\d+$/,
      "Kode pos hanya angka"
    ),

  nomor_telepon: z
    .string()
    .min(
      10,
      "Nomor telepon tidak valid"
    )
    .regex(
      /^\d+$/,
      "Nomor telepon hanya angka"
    ),

  /* ---- Data Anggota Keluarga ---- */
  anggota_keluarga: z
    .array(anggotaKeluargaSchema)
    .min(1, "Minimal 1 anggota keluarga wajib diisi"),

  /* ---- Isian Lain ---- */
  nama_ketua_rt: z.string().min(1, "Nama ketua RT wajib diisi"),
  nama_ketua_rw: z.string().min(1, "Nama ketua RW wajib diisi"),
});

export type AnggotaKeluargaValues          = z.infer<typeof anggotaKeluargaSchema>;
export type FormulirKartuKeluargaFormValues = z.infer<typeof formulirKartuKeluargaSchema>;