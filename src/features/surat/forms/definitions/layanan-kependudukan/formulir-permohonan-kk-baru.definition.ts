import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { 
  formulirPermohonanKkBaruSchema 
} from "../../schemas/layanan-kependudukan/formulir-permohonan-kk-baru.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const formulirPermohonanKkBaruSchemaWithSubmit = formulirPermohonanKkBaruSchema.merge(SubmitSchema);
export { formulirPermohonanKkBaruSchema };

const optionAlasanPermohonan = [
  { label: "Membentuk Rumah Tangga Baru", value: "rumah-tangga-baru" },
  { label: "Kartu Keluarga Hilang/Rusak",           value: "kk-hilang-rusak" },
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

export const formulirPermohonanKkBaruSections: SectionDefinition[] = [
  {
    title: "Data Wilayah",
    fields: [
      {
        name: "nama_provinsi",
        label: "Nama Pemerintah Provinsi",
        type: "text",
        required: true,
        placeholder: "Contoh: Jawa Tengah",
      },
      {
        name: "nama_kabupaten_kota",
        label: "Nama Pemerintah Kabupaten/Kota",
        type: "text",
        required: true,
        placeholder: "Contoh: Kota Semarang",
      },
      {
        name: "nama_kecamatan",
        label: "Nama Kecamatan",
        type: "text",
        required: true,
        placeholder: "Contoh: Semarang Tengah",
      },
      {
        name: "nama_kelurahan_desa",
        label: "Nama Kelurahan/Desa",
        type: "text",
        required: true,
        placeholder: "Contoh: Miroto",
      },
    ],
  },
  {
    title: "Data Pemohon",
    fields: [
      {
        name: "nama_lengkap",
        label: "Nama Lengkap",
        type: "text",
        required: true,
      },
      {
        name: "nik",
        label: "NIK",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name: "nomor_kk_semula",
        label: "No. KK Semula (Opsional)",
        type: "text",
        required: false,
        numericOnly: true,
        placeholder: "Isi jika sebelumnya sudah memiliki KK",
      },
      {
        name: "nomor_telepon",
        label: "No. Telepon",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 08123456789",
      },
      {
        name: "alamat",
        label: "Alamat",
        type: "textarea",
        required: true,
        rows: 3,
      },
      {
        name: "rt",
        label: "RT",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 001",
      },
      {
        name: "rw",
        label: "RW",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 002",
      },
      {
        name: "desa_kelurahan",
        label: "Desa/Kelurahan",
        type: "text",
        required: true,
      },
      {
        name: "kecamatan",
        label: "Kecamatan",
        type: "text",
        required: true,
      },
      {
        name: "kabupaten_kota",
        label: "Kabupaten/Kota",
        type: "text",
        required: true,
      },
      {
        name: "provinsi",
        label: "Provinsi",
        type: "text",
        required: true,
      },
      {
        name: "kode_pos",
        label: "Kode Pos",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 50271",
      },
    ],
  },
  {
    title: "Keterangan Permohonan",
    fields: [
      {
        name: "alasan_permohonan",
        label: "Alasan Permohonan",
        type: "select",
        required: true,
        options: optionAlasanPermohonan,
      },
      {
        name: "jumlah_anggota_keluarga",
        label: "Jumlah Anggota Keluarga",
        type: "number",
        required: true,
        suffix: "Orang",
        min: 1,
      },
    ],
  },
  {
    title: "Data Anggota Keluarga",
    fields: [
      {
        name: "anggota_keluarga",
        label: "Daftar Anggota Keluarga",
        type: "array",
        required: true,
        defaultItem: {
          anggota_nama_lengkap:    "",
          anggota_nik: "",
          anggota_status_hubungan_keluarga:    "",
        },
        columns: [
          {
            name: "anggota_nama_lengkap",
            label: "Nama Lengkap",
            type: "text",
            placeholder: "Masukkan nama lengkap anggota keluarga",
          },
          {
            name: "anggota_nik",
            label: "NIK",
            type: "text",
            placeholder: "Masukkan 16 digit NIK anggota keluarga",
            numericOnly: true,
          },
          {
            name: "anggota_status_hubungan_keluarga",
            label: "Status Hubungan dalam Keluarga",
            type: "select",
            options: optionsHubunganKeluarga,
          },
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

