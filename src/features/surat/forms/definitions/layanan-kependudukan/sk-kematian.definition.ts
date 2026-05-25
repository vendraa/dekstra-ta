import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { kematianSchema } from "../../schemas/layanan-kependudukan/sk-kematian.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const kematianSchemaWithSubmit = kematianSchema.merge(SubmitSchema);
export { kematianSchema };

const optionsAgama = [
  { label: "Islam",    value: "islam"    },
  { label: "Kristen",  value: "kristen"  },
  { label: "Katolik",  value: "katolik"  },
  { label: "Hindu",    value: "hindu"    },
  { label: "Buddha",   value: "buddha"   },
  { label: "Konghucu", value: "konghucu" },
  { label: "Kepercayaan Terhadap Tuhan Yang Maha Esa", value: "kepercayaan-terhadap-tuhan-yang-maha-esa" },
];

const optionsKewarganegaraan = [
  { label: "WNI", value: "wni" },
  { label: "WNA", value: "wna" },
];

const optionsStatusHubungan = [
  { label: "Suami",           value: "suami" },
  { label: "Istri",           value: "istri" },
  { label: "Anak",            value: "anak" },
  { label: "Menantu",         value: "menantu" },
  { label: "Cucu",            value: "cucu" },
  { label: "Orang Tua",       value: "orang-tua" },
  { label: "Mertua",          value: "mertua" },
  { label: "Famili Lain",     value: "famili-lain" },
  { label: "Lainnya",         value: "lainnya" },
];

export const kematianSections: SectionDefinition[] = [
  {
    title: "Data Jenazah",
    fields: [
      {
        name:        "nama_lengkap",
        label:       "Nama Lengkap",
        type:        "text",
        required:    true,
        placeholder: "Masukkan nama lengkap almarhum/almarhumah",
      },
      {
        name:        "nik",
        label:       "NIK",
        type:        "text",
        required:    true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name:        "tempat_lahir",
        label:       "Tempat Lahir",
        type:        "text",
        required:    true,
        placeholder: "Sesuai akta kelahiran",
      },
      {
        name:     "tanggal_lahir",
        label:    "Tanggal Lahir",
        type:     "date",
        required: true,
      },
      {
        name:     "agama",
        label:    "Agama",
        type:     "select",
        required: true,
        options:  optionsAgama,
      },
      {
        name:        "pekerjaan",
        label:       "Pekerjaan",
        type:        "text",
        required:    true,
        placeholder: "Contoh: Wiraswasta, PNS, Pelajar",
      },
      {
        name:     "kewarganegaraan",
        label:    "Kewarganegaraan",
        type:     "select",
        required: true,
        options:  optionsKewarganegaraan,
      },
      {
        name:     "alamat",
        label:    "Alamat",
        type:     "textarea",
        required: true,
        rows:     3,
        placeholder: "Masukkan alamat lengkap",
      },
    ],
  },
  {
    title: "Data Kematian",
    fields: [
      {
        name:     "tanggal_meninggal",
        label:    "Tanggal Meninggal",
        type:     "date",
        required: true,
      },
      {
        name:        "tempat_meninggal",
        label:       "Tempat Meninggal",
        type:        "text",
        required:    true,
        placeholder: "Contoh: Rumah Sakit Dr. Kariadi, Rumah Kediaman",
      },
    ],
  },
  {
    // FIX: section baru sesuai template — data pelapor kematian
    title: "Data Pengaju (Pelapor Kematian)",
    fields: [
      {
        name:        "status_hubungan",
        label:       "Status Hubungan dengan Almarhum/Almarhumah",
        type:        "select",
        options:     optionsStatusHubungan,
        required:    true,
        placeholder: "Pilih status hubungan Anda dengan almarhum/almarhumah",
      },
      {
        name:        "nama_pengaju",
        label:       "Nama Lengkap",
        type:        "text",
        required:    true,
        placeholder: "Masukkan nama lengkap pengaju",
      },
      {
        name:        "nik_pengaju",
        label:       "NIK",
        type:        "text",
        required:    true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name:        "tempat_lahir_pengaju",
        label:       "Tempat Lahir",
        type:        "text",
        required:    true,
        placeholder: "Sesuai akta kelahiran",
      },
      {
        name:     "tanggal_lahir_pengaju",
        label:    "Tanggal Lahir",
        type:     "date",
        required: true,
      },
      {
        name:     "agama_pengaju",
        label:    "Agama",
        type:     "select",
        required: true,
        options:  optionsAgama,
      },
      {
        name:        "pekerjaan_pengaju",
        label:       "Pekerjaan",
        type:        "text",
        required:    true,
        placeholder: "Contoh: Wiraswasta, PNS, Pelajar",
      },
      {
        name:     "kewarganegaraan_pengaju",
        label:    "Kewarganegaraan",
        type:     "select",
        required: true,
        options:  optionsKewarganegaraan,
      },
      {
        name:     "alamat_pengaju",
        label:    "Alamat",
        type:     "textarea",
        required: true,
        rows:     3,
        placeholder: "Masukkan alamat lengkap pengaju",
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