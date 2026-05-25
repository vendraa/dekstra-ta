import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { formulirPerubahanKkSchema } from "../../schemas/layanan-kependudukan/formulir-perubahan-kk.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const formulirPerubahanKkSchemaWithSubmit = formulirPerubahanKkSchema.merge(SubmitSchema);
export { formulirPerubahanKkSchema };

const optionAlasanPermohonan = [
  { label: "Penambahan Anggota Keluarga(Kelahiran/Kedatangan)", value: "penambahan-anggota-keluarga" },
  { label: "Pengurangan Anggota Keluarga(Kematian/Kepindahan)",           value: "pengurangan-anggota-keluarga" },
  { label: "Lainnya",           value: "lainnya" },
];

const optionsHubunganKeluarga = [
  { label: "Kepala Keluarga", value: "kepala-keluarga" },
  { label: "Suami",           value: "suami" },
  { label: "Istri",           value: "istri" },
  { label: "Anak",            value: "anak" },
  { label: "Menantu",         value: "menantu" },
  { label: "Cucu",            value: "cucu" },
  { label: "Orang Tua",       value: "orang-tua" },
  { label: "Mertua",          value: "mertua" },
  { label: "Famili Lain",     value: "famili-lain" },
  { label: "Pembantu",        value: "pembantu" },
  { label: "Lainnya",         value: "lainnya" },
];

export const formulirPerubahanKkSections: SectionDefinition[] = [
  {
    title: "Data Wilayah",
    fields: [
      { name: "nama_provinsi",       label: "Nama Pemerintah Provinsi",        type: "text", required: true, placeholder: "Contoh: Jawa Tengah"      },
      { name: "nama_kabupaten_kota", label: "Nama Pemerintah Kabupaten/Kota",  type: "text", required: true, placeholder: "Contoh: Kota Semarang"     },
      { name: "nama_kecamatan",      label: "Nama Kecamatan",                  type: "text", required: true, placeholder: "Contoh: Semarang Tengah"   },
      { name: "nama_kelurahan_desa", label: "Nama Kelurahan/Desa",             type: "text", required: true, placeholder: "Contoh: Miroto"            },
    ],
  },
  {
    title: "Data Pemohon",
    fields: [
      { name: "nama_lengkap",   label: "Nama Lengkap Pemohon", type: "text", required: true,  placeholder: "Masukkan nama lengkap sesuai KTP" },
      { name: "nik",            label: "NIK Pemohon",          type: "text", required: true,  placeholder: "Masukkan 16 digit NIK", numericOnly: true },         
      { name: "nomor_telepon",  label: "Nomor Telepon",        type: "text", required: true,  placeholder: "Contoh: 08123456789", numericOnly: true },           
    ],
  },
  {
    // FIX: section terpisah untuk KK yang akan diikuti
    title: "Data KK yang Diikuti",
    fields: [
      { name: "nama_kepala_keluarga", label: "Nama Kepala Keluarga",  type: "text",     required: true, placeholder: "Nama kepala keluarga yang diikuti"    },
      { name: "nomor_kk",             label: "Nomor KK",              type: "text",     required: true,  placeholder: "Nomor KK yang diikuti", numericOnly: true },             
      { name: "alamat",               label: "Alamat",                type: "textarea", required: true,  rows: 3                                            },
      { name: "rt",                   label: "RT",                    type: "text",     required: true,  placeholder: "Contoh: 001", numericOnly: true },                       
      { name: "rw",                   label: "RW",                    type: "text",     required: true,  placeholder: "Contoh: 002", numericOnly: true   },
      { name: "desa_kelurahan",       label: "Desa/Kelurahan",        type: "text",     required: true                                                      },
      { name: "kecamatan",            label: "Kecamatan",             type: "text",     required: true                                                      },
      { name: "kabupaten_kota",       label: "Kabupaten/Kota",        type: "text",     required: true                                                      },
      { name: "provinsi",             label: "Provinsi",              type: "text",     required: true                                                      },
      { name: "kode_pos",             label: "Kode Pos",              type: "text",     required: true,  placeholder: "Contoh: 50271", numericOnly: true                       },
    ],
  },
  {
    // FIX: section terpisah untuk KK lama
    title: "Data KK Lama",
    fields: [
      { name: "nama_kepala_keluarga_lama", label: "Nama Kepala Keluarga Lama", type: "text",     required: false, placeholder: "Nama kepala keluarga yang lama"    },
      { name: "nomor_kk_lama",             label: "Nomor KK Lama",             type: "text",     required: true,  placeholder: "Nomor KK yang lama", numericOnly: true               },
      { name: "alamat_lama",               label: "Alamat",                    type: "textarea", required: true,  rows: 3                                          },
      { name: "rt_lama",                   label: "RT",                        type: "text",     required: true,  placeholder: "Contoh: 001", numericOnly: true                       },
      { name: "rw_lama",                   label: "RW",                        type: "text",     required: true,  placeholder: "Contoh: 002", numericOnly: true                       },
      { name: "desa_kelurahan_lama",       label: "Desa/Kelurahan",            type: "text",     required: true                                                    },
      { name: "kecamatan_lama",            label: "Kecamatan",                 type: "text",     required: true                                                    },
      { name: "kabupaten_kota_lama",       label: "Kabupaten/Kota",            type: "text",     required: true                                                    },
      { name: "provinsi_lama",             label: "Provinsi",                  type: "text",     required: true                                                    },
      { name: "kode_pos_lama",             label: "Kode Pos",                  type: "text",     required: true,  placeholder: "Contoh: 50271", numericOnly: true                     },
    ],
  },
  {
    title: "Keterangan Permohonan",
    fields: [
      {
        name:     "alasan_permohonan",
        label:    "Alasan Permohonan",
        type:     "select",
        required: true,
        options:  optionAlasanPermohonan,
      },
      {
        name:     "jumlah_anggota_keluarga",
        label:    "Jumlah Anggota Keluarga",
        type:     "number",
        required: true,
        suffix:   "Orang",
        min:      1,
      },
    ],
  },
  {
    title: "Data Anggota Keluarga",
    fields: [
      {
        name:        "anggota_keluraga",
        label:       "Daftar Anggota Keluarga",
        type:        "array",
        required:    true,
        defaultItem: {
          anggota_nama_lengkap:             "",
          anggota_nik:                      "",
          anggota_status_hubungan_keluarga: "",
        },
        columns: [
          { name: "anggota_nama_lengkap",             label: "Nama Lengkap",                   type: "text",   placeholder: "Masukkan nama lengkap" },
          { name: "anggota_nik",                      label: "NIK",                            type: "text",   placeholder: "Masukkan 16 digit NIK", numericOnly: true },
          { name: "anggota_status_hubungan_keluarga", label: "Status Hubungan dalam Keluarga", type: "select", options: optionsHubunganKeluarga     },
        ],
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