import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { lainnyaSchema } from "../../schemas/layanan-umum/sk-lainnya.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const lainnyaSchemaWithSubmit = lainnyaSchema.merge(SubmitSchema);
export { lainnyaSchema };

export const lainnyaSections: SectionDefinition[] = [
  {
    title: "Data Pemohon",
    fields: [
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
      },
      {
        name: "tempat_lahir",
        label: "Tempat Lahir",
        type: "text",
        required: true,
      },
      {
        name: "tanggal_lahir",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name: "jenis_kelamin",
        label: "Jenis Kelamin",
        type: "select",
        required: true,
        options: [
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ],
      },
      {
        name: "agama",
        label: "Agama",
        type: "select",
        required: true,
        options: [
          { label: "Islam",    value: "islam" },
          { label: "Kristen",  value: "kristen" },
          { label: "Katolik",  value: "katolik" },
          { label: "Hindu",    value: "hindu" },
          { label: "Buddha",   value: "buddha" },
          { label: "Konghucu", value: "konghucu" },
          { label: "Kepercayaan terhadap Tuhan Yang Maha Esa", value: "kepercayaan-terhadap-tuhan-yang-maha-esa" },
        ],
      },
      {
        name: "pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
      },
      {
        name: "alamat",
        label: "Alamat",
        type: "textarea",
        required: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Keterangan Surat",
    fields: [
      {
        name: "tujuan_surat",
        label: "Tujuan Surat",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Jelaskan keperluan pembuatan surat keterangan ini",
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