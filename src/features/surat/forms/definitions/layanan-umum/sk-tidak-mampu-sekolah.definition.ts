import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { tidakMampuSekolahSchema } from "../../schemas/layanan-umum/sk-tidak-mampu-sekolah.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const tidakMampuSekolahSchemaWithSubmit = tidakMampuSekolahSchema.merge(SubmitSchema);
export { tidakMampuSekolahSchema };

export const tidakMampuSekolahSections: SectionDefinition[] = [
  {
    title: "Data Orang Tua",
    fields: [
      {
        name: "nama_orang_tua",
        label: "Nama Orang Tua",
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
        name: "penghasilan",
        label: "Penghasilan Orang Tua",
        type: "number",
        required: true,
        prefix: "Rp",
        placeholder: "Contoh: 1500000",
      },
      {
        name: "keperluan",
        label: "Keperluan",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Jelaskan keperluan pengajuan surat keterangan tidak mampu",
      },
    ],
  },
  {
    title: "Data Anak",
    fields: [
      {
        name: "nama_anak",
        label: "Nama Anak",
        type: "text",
        required: true,
      },
      {
        name: "tempat_lahir_anak",
        label: "Tempat Lahir",
        type: "text",
        required: true,
      },
      {
        name: "tanggal_lahir_anak",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name: "asal_sekolah",
        label: "Asal Sekolah",
        type: "text",
        required: true,
        placeholder: "Contoh: SDN 01 Semarang",
      },
      {
        name: "kelas",
        label: "Kelas",
        type: "text",
        required: true,
        placeholder: "Contoh: 5A, 3B",
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