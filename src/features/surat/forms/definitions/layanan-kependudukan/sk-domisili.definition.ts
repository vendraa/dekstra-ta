import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { domisiliSchema } from "../../schemas/layanan-kependudukan/sk-domisili.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const domisiliSchemaWithSubmit = domisiliSchema.merge(SubmitSchema);
export { domisiliSchema };

export const domisiliSections: SectionDefinition[] = [
  {
    title: "Data Pemohon",
    fields: [
      {
        name:     "nama_lengkap",
        label:    "Nama Lengkap",
        type:     "text",
        required: true,
        placeholder: "Masukkan nama lengkap sesuai KTP",
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
        name:        "tempat_lahir",
        label:       "Tempat Lahir",
        type:        "text",
        required:    true,
        placeholder: "Masukkan tempat lahir sesuai KTP",
      },
      {
        name:     "tanggal_lahir",
        label:    "Tanggal Lahir",
        type:     "date",
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
      },
      {
        name:     "agama",
        label:    "Agama",
        type:     "select",
        required: true,
        options: [
          { label: "Islam",    value: "islam"    },
          { label: "Kristen",  value: "kristen"  },
          { label: "Katolik",  value: "katolik"  },
          { label: "Hindu",    value: "hindu"    },
          { label: "Buddha",   value: "buddha"   },
          { label: "Konghucu", value: "konghucu" },
          { label: "Kepercayaan Terhadap Tuhan Yang Maha Esa", value: "kepercayaan-terhadap-tuhan-yang-maha-esa" },
        ],
      },
      {
        name:        "pekerjaan",
        label:       "Pekerjaan",
        type:        "text",
        required:    true,
        placeholder: "Contoh: Wiraswasta, PNS, Pelajar",
      },
      {
        name:     "status_perkawinan",
        label:    "Status Perkawinan",
        type:     "select",
        required: true,
        options: [
          { label: "Belum Kawin", value: "belum-kawin"  },
          { label: "Kawin",       value: "kawin"        },
          { label: "Cerai Hidup", value: "cerai-hidup"  },
          { label: "Cerai Mati",  value: "cerai-mati"   },
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
      },
      {
        name:     "alamat",
        label:    "Alamat",
        type:     "textarea",
        required: true,
        rows:     3,
        placeholder: "Masukkan alamat lengkap sesuai KTP",
      },
      {
        name:        "nomor_kk",
        label:       "Nomor Kartu Keluarga (KK)",
        type:        "text",
        required:    true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit Nomor KK",
      },
      {
        name:        "nama_kepala_keluarga",
        label:       "Nama Kepala Keluarga",
        type:        "text",
        required:    true,
        placeholder: "Masukkan nama kepala keluarga",
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