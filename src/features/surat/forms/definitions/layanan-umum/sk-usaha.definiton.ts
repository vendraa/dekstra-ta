import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { usahaSchema } from "../../schemas/layanan-umum/sk-usaha.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const usahaSchemaWithSubmit = usahaSchema.merge(SubmitSchema);
export { usahaSchema };

export const usahaSections: SectionDefinition[] = [
  {
    title: "Data Pemohon",
    fields: [
      {
        name: "nik",
        label: "Nomor Induk Kependudukan (NIK)",
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
          { label: "Islam", value: "islam" },
          { label: "Kristen", value: "kristen" },
          { label: "Katolik", value: "katolik" },
          { label: "Hindu", value: "hindu" },
          { label: "Buddha", value: "buddha" },
          { label: "Konghucu", value: "konghucu" },
          { label: "Kepercayaan Terhadap Tuhan Yang Maha Esa", value: "kepercayaan-terhadap-tuhan-yang-maha-esa" },
        ],
      },
      {
        name: "pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
      },
      {
        name: "no_hp",
        label: "Nomor HP",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 081234567890",
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
    title: "Data Usaha",
    fields: [
      {
        name: "nama_usaha",
        label: "Nama Usaha",
        type: "text",
        required: true,
      },
      {
        name: "jenis_usaha",
        label: "Jenis Usaha",
        type: "text",
        required: true,
        placeholder: "Contoh: Perdagangan, Jasa, Pertanian",
      },
      {
        name: "tujuan_pengajuan",
        label: "Tujuan Pengajuan",
        type: "textarea",
        required: true,
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