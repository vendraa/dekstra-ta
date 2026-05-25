import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { izinKeramaianSchema } from "../../schemas/layanan-umum/sk-izin-keramaian.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const izinKeramaianSchemaWithSubmit = izinKeramaianSchema.merge(SubmitSchema);
export { izinKeramaianSchema };

export const izinKeramaianSections: SectionDefinition[] = [
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
        name: "umur",
        label: "Umur",
        type: "number",
        required: true,
        suffix: "Tahun",
        min: 17,
        max: 100,
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
    title: "Data Acara",
    fields: [
      {
        name: "hari_acara",
        label: "Hari Acara",
        type: "select",
        required: true,
        options: [
          { label: "Senin",  value: "senin" },
          { label: "Selasa", value: "selasa" },
          { label: "Rabu",   value: "rabu" },
          { label: "Kamis",  value: "kamis" },
          { label: "Jumat",  value: "jumat" },
          { label: "Sabtu",  value: "sabtu" },
          { label: "Minggu", value: "minggu" },
        ],
      },
      {
        name: "tanggal_acara",
        label: "Tanggal Acara",
        type: "date",
        required: true,
      },
      {
        name: "tempat_acara",
        label: "Tempat Acara",
        type: "text",
        required: true,
        placeholder: "Contoh: Balai Desa, Rumah Kediaman",
      },
      {
        name: "keterangan",
        label: "Keterangan",
        type: "textarea",
        required: false,
        placeholder: "Isi jika ada keterangan tambahan mengenai acara",
        rows: 3,
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