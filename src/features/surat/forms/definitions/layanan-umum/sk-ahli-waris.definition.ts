import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { ahliWarisSchema } from "../../schemas/layanan-umum/sk-ahli-waris.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const ahliWarisSchemaWithSubmit = ahliWarisSchema.merge(SubmitSchema);
export { ahliWarisSchema };

export const ahliWarisSections: SectionDefinition[] = [
  {
    title: "Data Ahli Waris",
    fields: [
      {
        name: "daftar_ahli_waris",
        label: "Daftar Ahli Waris",
        type: "array",
        required: true,
        defaultItem: {
          nama_lengkap:  "",
          nik:           "",
          tempat_lahir:  "",
          tanggal_lahir: "",
          alamat:        "",
        },
        columns: [
          {
            name:        "nama_lengkap",
            label:       "Nama Lengkap",
            type:        "text",
            placeholder: "Masukkan nama lengkap",
          },
          {
            name:        "nik",
            label:       "NIK",
            type:        "text",
            numericOnly: true,
            placeholder: "Masukkan 16 digit NIK",
          },
          {
            name:        "tempat_lahir",
            label:       "Tempat Lahir",
            type:        "text",
            placeholder: "Masukkan tempat lahir",
          },
          {
            name:        "tanggal_lahir",
            label:       "Tanggal Lahir",
            type:        "date",
            placeholder: "Masukkan tanggal lahir",
          },
          {
            name:        "alamat",
            label:       "Alamat",
            type:        "text",
            placeholder: "Masukkan alamat lengkap",
          },
        ],
      },
    ],
  },
  {
    title: "Data Pewaris",
    fields: [
      {
        name:     "nama_pewaris",
        label:    "Nama Pewaris",
        type:     "text",
        required: true,
      },
      {
        name:        "nama_warisan",
        label:       "Keterangan Warisan",
        type:        "textarea",
        required:    true,
        rows:        3,
        placeholder: "Contoh: sebidang tanah seluas 500m² di Desa ...",
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