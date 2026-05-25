import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { hilangKartuKeluargaSchema } from "../../schemas/layanan-kependudukan/sk-hilang-kartu-keluarga.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const hilangKartuKeluargaSchemaWithSubmit = hilangKartuKeluargaSchema.merge(SubmitSchema);
export { hilangKartuKeluargaSchema };

const optionsJenisKelamin = [
  { label: "Laki-laki", value: "laki-laki" },
  { label: "Perempuan", value: "perempuan" },
];

const optionsAgama = [
  { label: "Islam",    value: "islam" },
  { label: "Kristen",  value: "kristen" },
  { label: "Katolik",  value: "katolik" },
  { label: "Hindu",    value: "hindu" },
  { label: "Buddha",   value: "buddha" },
  { label: "Konghucu", value: "konghucu" },
  { label: "Kepercayaan Terhadap Tuhan Yang Maha Esa", value: "kepercayaan-terhadap-tuhan-yang-maha-esa" },
];

export const hilangKartuKeluargaSections: SectionDefinition[] = [
  {
    title: "Data Pelapor",
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
        name:        "nik",
        label:       "Nomor Induk Kependudukan (NIK)",
        type:        "text",
        required:    true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name: "nama_lengkap",
        label: "Nama Lengkap Pelapor",
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
        options: optionsJenisKelamin,
      },
      {
        name: "agama",
        label: "Agama",
        type: "select",
        required: true,
        options: optionsAgama,
      },
      {
        name: "pekerjaan",
        label: "Pekerjaan",
        type: "text",
        required: true,
      },
      {
        name: "alamat_lengkap",
        label: "Alamat Lengkap",
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