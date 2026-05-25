import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { pengantarSkckSchema } from "../../schemas/layanan-umum/sk-pengantar-skck.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const pengantarSkckSchemaWithSubmit = pengantarSkckSchema.merge(SubmitSchema);
export { pengantarSkckSchema };

export const pengantarSkckSections: SectionDefinition[] = [
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
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Belum Menikah", value: "belum-menikah" },
          { label: "Menikah",       value: "menikah" },
          { label: "Cerai Hidup",   value: "cerai-hidup" },
          { label: "Cerai Mati",    value: "cerai-mati" },
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
    title: "Keterangan Pengajuan",
    fields: [
      {
        name: "keperluan",
        label: "Keperluan",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Contoh: Melamar pekerjaan, Keperluan administrasi",
      },
      {
        name: "keterangan",
        label: "Keterangan",
        type: "textarea",
        required: false,
        rows: 3,
        placeholder: "Isi jika ada keterangan tambahan",
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