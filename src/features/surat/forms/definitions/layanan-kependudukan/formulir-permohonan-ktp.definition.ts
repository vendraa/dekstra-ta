import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { 
  formulirPermohonanKtpSchema 
} from "../../schemas/layanan-kependudukan/formulir-permohonan-ktp.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const formulirPermohonanKtpSchemaWithSubmit = formulirPermohonanKtpSchema.merge(SubmitSchema);
export { formulirPermohonanKtpSchema };

const optionJenisPermohonanKTP = [
  { label: "Baru", value: "baru" },
  { label: "Perpanjangan", value: "perpanjangan" },
  { label: "Penggantian", value: "penggantian"},
];

export const formulirPermohonanKtpSections: SectionDefinition[] = [
  {
    title: "Data Wilayah",
    fields: [
      {
        name: "nama_provinsi",
        label: "Nama Pemerintah Provinsi",
        type: "text",
        required: true,
        placeholder: "Contoh: Jawa Tengah",
      },
      {
        name: "nama_kabupaten_kota",
        label: "Nama Pemerintah Kabupaten/Kota",
        type: "text",
        required: true,
        placeholder: "Contoh: Kota Semarang",
      },
      {
        name: "nama_kecamatan",
        label: "Nama Kecamatan",
        type: "text",
        required: true,
        placeholder: "Contoh: Semarang Tengah",
      },
      {
        name: "nama_kelurahan_desa",
        label: "Nama Kelurahan/Desa",
        type: "text",
        required: true,
        placeholder: "Contoh: Miroto",
      },
    ],
  },
  {
    title: "Jenis Permohonan KTP",
    fields: [
      {
        name: "jenis_permohonan_ktp",
        label: "Permohonan KTP",
        type: "select",
        options: optionJenisPermohonanKTP,
        required: true,
        placeholder: "Pilih jenis permohonan KTP",
      },
    ],
  },
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
        name: "nik",
        label: "NIK",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit NIK",
      },
      {
        name: "nomor_kk",
        label: "Nomor Kartu Keluarga",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit Nomor KK",
      },
      {
        name: "nomor_telepon",
        label: "Nomor Telepon",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 08123456789",
      },
      {
        name: "alamat",
        label: "Alamat Pemohon",
        type: "textarea",
        required: true,
        rows: 3,
      },
      {
        name: "rt",
        label: "RT",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 001",
      },
      {
        name: "rw",
        label: "RW",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 002",
      },
      {
        name: "kode_pos",
        label: "Kode Pos",
        type: "text",
        required: true,
        numericOnly: true,
        placeholder: "Contoh: 50271",
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