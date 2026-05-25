import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { 
  kelahiranSchema 
} from "../../schemas/layanan-kependudukan/sk-kelahiran.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const kelahiranSchemaWithSubmit = kelahiranSchema.merge(SubmitSchema);
export { kelahiranSchema };

export const kelahiranSections: SectionDefinition[] = [
  {
    title: "Data Kelahiran Anak",
    fields: [
      {
        name: "nama_anak",
        label: "Nama Anak",
        type: "text",
        placeholder: "Masukkan nama lengkap anak",
        required: true,
      },
      {
        name: "jenis_kelamin_anak",
        label: "Jenis Kelamin Anak",
        type: "select",
        required: true,
        options: [
          { label: "Laki-laki", value: "laki-laki" },
          { label: "Perempuan", value: "perempuan" },
        ],
      },
      {
        name: "tanggal_lahir_anak",
        label: "Tanggal Lahir",
        type: "date",
        required: true,
      },
      {
        name: "waktu_lahir_anak",
        label: "Waktu Lahir",
        type: "time",
        required: true,
      },
      {
        name: "anak_ke",
        label: "Anak Ke",
        type: "number",
        required: true,
      },
    ],
  },
  {
    title: "Data Ayah",
    fields: [
      {
        name: "nama_ayah",
        label: "Nama Ayah",
        type: "text",
        required: true,
      },
      {
        name: "nik_ayah",
        label: "NIK Ayah",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK ayah", 
      },
      {
        name: "tempat_lahir_ayah",
        label: "Tempat Lahir Ayah",
        type: "text",
        required: true,
      },
      {
        name: "tanggal_lahir_ayah",
        label: "Tanggal Lahir Ayah",
        type: "date",
        required: true,
      },
      {
        name: "agama_ayah",
        label: "Agama Ayah",
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
        name: "pekerjaan_ayah",
        label: "Pekerjaan Ayah",
        type: "text",
        required: true,
      },
      {
        name: "kewarganegaraan_ayah",
        label: "Kewarganegaraan Ayah",
        type: "select",
        required: true,
        options: [
          { label: "WNI", value: "wni" },
          { label: "WNA", value: "wna" },
        ],
      },
      {
        name: "alamat_ayah",  
        label: "Alamat Ayah",
        type: "textarea",
        required: true,
        placeholder: "Masukkan alamat lengkap ayah",
        rows: 3,
      },
    ],
  },
  {
    title: "Data Ibu",
    fields: [
      {
        name: "nama_ibu",
        label: "Nama Ibu",
        type: "text",
        required: true,
      },
      {
        name: "nik_ibu",
        label: "NIK Ibu",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK ibu", 
      },
      {
        name: "tempat_lahir_ibu",
        label: "Tempat Lahir Ibu",
        type: "text",
        required: true,
      },
      {
        name: "tanggal_lahir_ibu",
        label: "Tanggal Lahir Ibu",
        type: "date",
        required: true,
      },
      {
        name: "agama_ibu",
        label: "Agama Ibu",
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
        name: "pekerjaan_ibu",
        label: "Pekerjaan Ibu",
        type: "text",
        required: true,
      },
      {
        name: "kewarganegaraan_ibu",
        label: "Kewarganegaraan Ibu",
        type: "select",
        required: true,
        options: [
          { label: "WNI", value: "wni" },
          { label: "WNA", value: "wna" },
        ],
      },
      {
        name: "alamat_ibu",  
        label: "Alamat Ibu",
        type: "textarea",
        required: true,
        placeholder: "Masukkan alamat lengkap ibu",
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