import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { pindahSchema } from "../../schemas/layanan-kependudukan/sk-pindah.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const pindahSchemaWithSubmit = pindahSchema.merge(SubmitSchema);
export { pindahSchema };

const optionsStatusPerkawinan = [
  { label: "Belum Menikah", value: "belum-menikah" },
  { label: "Menikah",       value: "menikah" },
  { label: "Cerai Hidup",   value: "cerai-hidup" },
  { label: "Cerai Mati",    value: "cerai-mati" },
];

const optionsSHDK = [
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

export const pindahSections: SectionDefinition[] = [
  {
    title: "Data Daerah Asal",
    fields: [
      {
        name: "nomor_kk",
        label: "Nomor Kartu Keluarga",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit Nomor KK",
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
        name: "nama_lengkap",
        label: "Nama Lengkap",
        type: "text",
        required: true,
        placeholder: "Masukkan nama lengkap sesuai KTP"
      },
      {
        name: "tempat_lahir",
        label: "Tempat Lahir",
        type: "text",
        required: true,
        placeholder: "Masukkan tempat lahir sesuai KTP"
      },
      {
        name: "tanggal_lahir",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name:     "jenis_kelamin",
        label:    "Jenis Kelamin",
        type:     "select",
        required: true,
        options: [
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ],
        placeholder: "Pilih jenis kelamin Anda"
      },
      {
        name: "pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
        placeholder: "Masukkan pekerjaan Anda"
      },
      {
        name: "status",
        label: "Status Perkawinan",
        type: "select",
        required: true,
        options: optionsStatusPerkawinan,
        placeholder: "Pilih status perkawinan Anda"
      },
      {
        name:     "kewarganegaraan",
        label:    "Kewarganegaraan",
        type:     "select",
        required: true,
        options: [
          { label: "WNI", value: "wni" },
          { label: "WNA", value: "wna" },
        ],
        placeholder: "Pilih kewarganegaraan Anda"
      },
      {
        name: "alamat",
        label: "Alamat Lengkap",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Masukkan alamat Anda sebelum pindah"
      },
      {
        name: "jumlah_anggota_keluarga_pindah",
        label: "Jumlah Anggota Keluarga yang Pindah",
        type: "number",
        required: true,
        suffix: "Orang",
      },
      {
        name: "alasan_pindah",
        label: "Alasan Pindah",
        type: "select",
        required: true,
        options: [
          { label: "Pekerjaan",         value: "pekerjaan" },
          { label: "Pendidikan",        value: "pendidikan" },
          { label: "Keamanan",          value: "keamanan" },
          { label: "Kesehatan",         value: "kesehatan" },
          { label: "Ikut Suami/Istri",  value: "ikut-suami-istri" },
          { label: "Ikut Orang Tua",    value: "ikut-orang-tua" },
          { label: "Lainnya",           value: "lainnya" },
        ],
      },
    ],
  },
  {
    title: "Anggota Keluarga yang Ikut Pindah",
    fields: [
      {
        name: "anggota_keluarga_pindah",
        label: "Daftar Anggota Keluarga",
        type: "array",
        required: true,
        defaultItem: {
          anggota_nik:     "",
          anggota_nama:    "",
          anggota_jenis_kelamin: "",
          anggota_shdk:    "",
        },
        columns: [
          {
            name: "anggota_nik",
            label: "NIK",
            type: "text",
            numericOnly: true,
            placeholder: "Masukkan 16 digit NIK",
          },
          {
            name: "anggota_nama",
            label: "Nama",
            type: "text",
            placeholder: "Masukkan nama lengkap sesuai KTP"
          },
          {
            name:     "anggota_jenis_kelamin",
            label:    "Jenis Kelamin",
            type:     "select",
            options: [
              { label: "Laki-laki", value: "laki-laki" },
              { label: "Perempuan", value: "perempuan" },
            ],
            placeholder: "Pilih jenis kelamin Anda"
          },
          {
            name: "anggota_shdk",
            label: "Status Hubungan Dalam Keluarga (SHDK)",
            type: "select",
            options: optionsSHDK,
            placeholder: "Pilih status hubungan dalam keluarga"
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