import { SectionDefinition } from "../../dynamic-form/types/form.types";
import {
  pendaftaranPeristiwaKependudukanSchema,
} from "../../schemas/layanan-kependudukan/formulir-pendaftaran-peristiwa-kependudukan.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const pendaftaranPeristiwaKependudukanSchemaWithSubmit = pendaftaranPeristiwaKependudukanSchema.merge(SubmitSchema);
export { pendaftaranPeristiwaKependudukanSchema };

export const pendaftaranPeristiwaKependudukanSections: SectionDefinition[] = [
  {
    title: "Data Pemohon",
    fields: [
      {
        name:     "nama_lengkap",
        label:    "Nama Lengkap",
        type:     "text",
        required: true,
        placeholder: "Masukkan nama lengkap sesuai KTP",
      },
      {
        name:        "nik",
        label:       "NIK",
        type:        "text",
        required:    true,
        placeholder: "Masukkan 16 digit NIK",
        numericOnly: true,
      },
      {
        name:        "nomor_kk",
        label:       "Nomor Kartu Keluarga",
        type:        "text",
        required:    true,
        placeholder: "Masukkan 16 digit Nomor KK",
        numericOnly: true,
      },
      // FIX: ganti dari nomor_telepon + email → nomor_hp_wa
      {
        name:        "nomor_hp_wa",
        label:       "Nomor HP dan WA",
        type:        "text",
        required:    true,
        placeholder: "Contoh: 08123456789",
        numericOnly: true,
      },
    ],
  },
  {
    title: "Jenis Permohonan",
    fields: [
      // Langkah 1: pilih kategori utama
      {
        name:     "kategori_permohonan",
        label:    "Kategori Permohonan",
        type:     "select",
        required: true,
        options: [
          { label: "Kartu Keluarga",  value: "kartu-keluarga"  },
          { label: "KTP-el",         value: "ktp-el"          },
          { label: "Kartu Identitas Anak (KIA)", value: "kia" },
          { label: "Perubahan Data", value: "perubahan-data"  },
        ],
      },

      // Langkah 2a: sub-pilihan KK — muncul jika kategori = kartu-keluarga
      {
        name:      "jenis_kk",
        label:     "Jenis Permohonan Kartu Keluarga",
        type:      "select",
        required:  false,
        dependsOn: { field: "kategori_permohonan", value: "kartu-keluarga" },
        conditionalValidation: {
          when: "kategori_permohonan",
          is: "kartu-keluarga",
          then: {
            required: true,
            message: "Jenis permohonan Kartu Keluarga wajib dipilih",
          },
        },
        options: [
          { label: "Baru — Membentuk Keluarga Baru",           value: "kk-baru-membentuk-keluarga" },
          { label: "Baru — Pergantian Kepala Keluarga",        value: "kk-baru-pergantian-kepala"  },
          { label: "Baru — Pisah KK",                          value: "kk-baru-pisah-kk"           },
          { label: "Baru — Pindah Datang",                     value: "kk-baru-pindah-datang"      },
          { label: "Baru — WNI dari LN Karena Pindah",         value: "kk-baru-wni-dari-ln"        },
          { label: "Baru — Rentan Adminduk",                   value: "kk-baru-rentan-adminduk"    },
          { label: "Perubahan Data — Menumpang dalam KK",      value: "kk-ubah-menumpang"          },
          { label: "Perubahan Data — Peristiwa Penting",       value: "kk-ubah-peristiwa-penting"  },
          { label: "Perubahan Data — Perubahan Elemen Data KK", value: "kk-ubah-elemen-data"       },
          { label: "Hilang / Rusak — Hilang",                  value: "kk-hilang"                  },
          { label: "Hilang / Rusak — Rusak",                   value: "kk-rusak"                   },
        ],
      },

      // Langkah 2b: sub-pilihan KTP-el
      {
        name:      "jenis_ktp",
        label:     "Jenis Permohonan KTP-el",
        type:      "select",
        required:  false,
        dependsOn: { field: "kategori_permohonan", value: "ktp-el" },
        conditionalValidation: {
          when: "kategori_permohonan",
          is: "ktp-el",
          then: {
            required: true,
            message: "Jenis permohonan KTP-el wajib dipilih",
          },
        },
        options: [
          { label: "Baru",                              value: "ktp-baru"                        },
          { label: "Pindah Datang",                     value: "ktp-pindah-datang"               },
          { label: "Hilang / Rusak — Hilang",        value: "ktp-hilang"                      },
          { label: "Hilang / Rusak — Rusak",         value: "ktp-rusak"                       },
          { label: "Perpanjangan ITAP",                 value: "ktp-perpanjangan-itap"            },
          { label: "Perubahan Status Kewarganegaraan",  value: "ktp-perubahan-status-kewarganegaraan" },
          { label: "Luar Domisili",                     value: "ktp-luar-domisili"               },
          { label: "Transmigrasi",                      value: "ktp-transmigrasi"                },
        ],
      },

      // Langkah 2c: sub-pilihan KIA
      {
        name:      "jenis_kia",
        label:     "Jenis Permohonan KIA",
        type:      "select",
        required:  false,
        dependsOn: { field: "kategori_permohonan", value: "kia" },
        conditionalValidation: {
          when: "kategori_permohonan",
          is: "kia",
          then: {
            required: true,
            message: "Jenis permohonan KIA wajib dipilih",
          },
        },
        options: [
          { label: "Baru",                value: "kia-baru"                },
          { label: "Hilang",              value: "kia-hilang"              },
          { label: "Rusak",               value: "kia-rusak"               },
          { label: "Perpanjangan ITAP",   value: "kia-perpanjangan-itap"   },
          { label: "Lainnya",             value: "kia-lainnya"             },
        ],
      },

      // Langkah 2d: sub-pilihan Perubahan Data
      {
        name:      "jenis_perubahan_data",
        label:     "Jenis Perubahan Data",
        type:      "select",
        required:  false,
        dependsOn: { field: "kategori_permohonan", value: "perubahan-data" },
        conditionalValidation: {
          when: "kategori_permohonan",
          is: "perubahan-data",
          then: {
            required: true,
            message: "Jenis perubahan data wajib dipilih",
          },
        },
        options: [
          { label: "KK",     value: "ubah-kk"  },
          { label: "KTP-el", value: "ubah-ktp" },
          { label: "KIA",    value: "ubah-kia" },
        ],
      },
    ],
  },
  {
    title: "Persyaratan yang Dilampirkan",
    fields: [
      {
        name:  "lampiran_kk_lama",
        label: "KK Lama / KK Rusak",
        type:  "checkbox",
      },
      {
        name:  "lampiran_buku_nikah",
        label: "Buku Nikah / Kutipan Akta Perkawinan",
        type:  "checkbox",
      },
      {
        name:  "lampiran_akta_perceraian",
        label: "Kutipan Akta Perceraian",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_pindah",
        label: "Surat Keterangan Pindah",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_pindah_luar_negeri",
        label: "Surat Keterangan Pindah Luar Negeri",
        type:  "checkbox",
      },
      {
        name:  "lampiran_ktp_rusak",
        label: "KTP-el Rusak",
        type:  "checkbox",
      },
      {
        name:  "lampiran_dokumen_perjalanan",
        label: "Dokumen Perjalanan",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_keterangan_hilang",
        label: "Surat Keterangan Hilang dari Kepolisian",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_keterangan_perubahan",
        label: "Surat Keterangan / Bukti Perubahan Peristiwa Kependudukan dan Peristiwa Penting",
        type:  "checkbox",
      },
      {
        name:  "lampiran_sptjm",
        label: "SPTJM Perkawinan / Perceraian Belum Tercatat",
        type:  "checkbox",
      },
      {
        name:  "lampiran_akta_kematian",
        label: "Akta Kematian",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_pernyataan_hilang_rusak",
        label: "Surat Pernyataan Penyebab Terjadinya Hilang atau Rusak",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_pindah_perwakilan_ri",
        label: "Surat Keterangan Pindah dari Perwakilan RI",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_pernyataan_anggota",
        label: "Surat Pernyataan Bersedia Menerima sebagai Anggota Keluarga",
        type:  "checkbox",
      },
      {
        name:  "lampiran_surat_kuasa_pengasuhan",
        label: "Surat Kuasa Pengasuh Anak dari Orang Tua / Wali",
        type:  "checkbox",
      },
      {
        name:  "lampiran_kartu_izin_tinggal_tetap",
        label: "Kartu Izin Tinggal Tetap",
        type:  "checkbox",
      },
    ],
  },
  {
    title:  "Upload Dokumen",
    fields: [],
  },
  {
    title: "Kirim Pengajuan",
    fields: [],
  },
];