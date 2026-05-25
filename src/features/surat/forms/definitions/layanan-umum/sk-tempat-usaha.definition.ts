import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { tempatUsahaSchema } from "../../schemas/layanan-umum/sk-tempat-usaha.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const tempatUsahaSchemaWithSubmit = tempatUsahaSchema.merge(SubmitSchema);
export { tempatUsahaSchema };

export const tempatUsahaSections: SectionDefinition[] = [
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
        name: "nib",
        label: "Nomor Induk Berusaha (NIB)",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 13 digit NIB",
      },
      {
        name: "npwp",
        label: "Nomor Pokok Wajib Pajak (NPWP)",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NPWP",
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
        name: "alamat_usaha",
        label: "Alamat Usaha",
        type: "textarea",
        required: true,
        rows: 3,
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