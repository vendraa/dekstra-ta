import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { pengantarBarangSchema } from "../../schemas/layanan-umum/sk-pengantar-barang.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const pengantarBarangSchemaWithSubmit = pengantarBarangSchema.merge(SubmitSchema);
export { pengantarBarangSchema };

export const pengantarBarangSections: SectionDefinition[] = [
  {
    title: "Data Pemilik Barang",
    fields: [
      {
        name: "pemilik_nama_lengkap",
        label: "Nama Lengkap",
        type: "text",
        required: true,
      },
      {
        name: "pemilik_nik",
        label: "NIK",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name: "pemilik_tempat_lahir",
        label: "Tempat Lahir",
        type: "text",
        required: true,
      },
      {
        name: "pemilik_tanggal_lahir",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name: "pemilik_jenis_kelamin",
        label: "Jenis Kelamin",
        type: "select",
        required: true,
        options: [
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ],
      },
      {
        name: "pemilik_pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
      },
      {
        name: "pemilik_alamat",
        label: "Alamat",
        type: "textarea",
        required: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Data Pengantar Barang",
    fields: [
      {
        name: "pengantar_nama_lengkap",
        label: "Nama Lengkap",
        type: "text",
        required: true,
      },
      {
        name: "pengantar_nik",
        label: "NIK",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name: "pengantar_tempat_lahir",
        label: "Tempat Lahir",
        type: "text",
        required: true,
      },
      {
        name: "pengantar_tanggal_lahir",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name: "pengantar_jenis_kelamin",
        label: "Jenis Kelamin",
        type: "select",
        required: true,
        options: [
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ],
      },
      {
        name: "pengantar_pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
      },
      {
        name: "pengantar_alamat",
        label: "Alamat",
        type: "textarea",
        required: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Data Barang",
    fields: [
      {
        name: "asal_barang",
        label: "Asal Barang",
        type: "text",
        required: true,
      },
      {
        name: "tujuan_barang",
        label: "Tujuan Barang",
        type: "text",
        required: true,
      },
      {
        name: "daftar_barang",
        label: "Daftar Barang",
        type: "array",
        required: true,
        defaultItem: {
          jenis_barang:    "",
          jumlah_barang:   undefined,
          jenis_kendaraan: "",
          nomor_polisi:    "",
          nama_supir:      "",
        },
        columns: [
          { name: "jenis_barang",    label: "Jenis Barang",    type: "text",            placeholder: "Masukkan jenis barang" },
          { name: "jumlah_barang",   label: "Jumlah Barang",   type: "number", min: 1,  placeholder: "Masukkan jumlah barang" },
          { name: "jenis_kendaraan", label: "Jenis Kendaraan", type: "text",            placeholder: "Masukkan jenis kendaraan" },
          { name: "nomor_polisi",    label: "Nomor Polisi",    type: "text",            placeholder: "Masukkan nomor polisi" },
          { name: "nama_supir",      label: "Nama Supir",      type: "text",            placeholder: "Masukkan nama supir" },
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