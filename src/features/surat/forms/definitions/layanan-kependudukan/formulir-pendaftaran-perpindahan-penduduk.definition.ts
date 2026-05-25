import { SectionDefinition } from "../../dynamic-form/types/form.types";
import { pendaftaranPerpindahanPendudukSchema } from "../../schemas/layanan-kependudukan/formulir-pendaftaran-perpindahan-penduduk.schema";
import { SubmitSchema } from "../../schemas/submit-schema";

export const pendaftaranPerpindahanPendudukSchemaWithSubmit = pendaftaranPerpindahanPendudukSchema.merge(SubmitSchema);
export { pendaftaranPerpindahanPendudukSchema };

const optionsSHDK = [
  { label: "Kepala Keluarga", value: "kepala-keluarga" },
  { label: "Suami",           value: "suami"           },
  { label: "Istri",           value: "istri"           },
  { label: "Anak",            value: "anak"            },
  { label: "Menantu",         value: "menantu"         },
  { label: "Cucu",            value: "cucu"            },
  { label: "Orang Tua",       value: "orang-tua"       },
  { label: "Mertua",          value: "mertua"          },
  { label: "Famili Lain",     value: "famili-lain"     },
  { label: "Pembantu",        value: "pembantu"        },
  { label: "Lainnya",         value: "lainnya"         },
];

const optionsStatusKK = [
  { label: "Numpang KK",   value: "numpang-kk"   },
  { label: "Buat KK Baru", value: "buat-kk-baru" },
];

export const pendaftaranPerpindahanPendudukSections: SectionDefinition[] = [
  {
    title: "Data Pemohon",
    fields: [
      {
        name:        "nomor_kk",
        label:       "Nomor Kartu Keluarga",
        type:        "text",
        required:    true,
        numericOnly: true,
        placeholder: "Masukkan 16 digit Nomor KK",
      },
      {
        name:        "nama_lengkap",
        label:       "Nama Lengkap Pemohon",
        type:        "text",
        required:    true,
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
      // FIX: ganti jenis_permohonan → jenis_pemohon sesuai template
      {
        name:     "jenis_pemohon",
        label:    "Jenis Pemohon",
        type:     "select",
        required: true,
        options: [
          { label: "Surat Keterangan Pindah (WNI)",                         value: "skp-wni"         },
          { label: "Surat Keterangan Pindah Luar Negeri (SKPLN)",           value: "skpln"           },
          { label: "Surat Keterangan Tempat Tinggal (SKTT) — Orang Asing",  value: "sktt-orang-asing"},
        ],
      },
    ],
  },
  {
    title: "Alamat Asal",
    fields: [
      { name: "asal_rt",             label: "RT",               type: "text", required: true, placeholder: "Contoh: 001", numericOnly: true },
      { name: "asal_rw",             label: "RW",               type: "text", required: true, placeholder: "Contoh: 002", numericOnly: true },
      { name: "asal_desa_kelurahan", label: "Desa/Kelurahan",   type: "text", required: true },
      { name: "asal_kecamatan",      label: "Kecamatan",        type: "text", required: true },
      { name: "asal_kabupaten_kota", label: "Kabupaten/Kota",   type: "text", required: true },
      { name: "asal_provinsi",       label: "Provinsi",         type: "text", required: true },
      { name: "asal_kode_pos",       label: "Kode Pos",         type: "text", required: true, placeholder: "Contoh: 50271", numericOnly: true },
    ],
  },
  {
    // FIX: sesuai template field 6: "Klarifikasi Kepindahan"
    title: "Klarifikasi & Alasan Kepindahan",
    fields: [
      {
        name:     "jenis_perpindahan",
        label:    "Klarifikasi Kepindahan",
        type:     "select",
        required: true,
        options: [
          { label: "Dalam Satu Desa/Kelurahan",                          value: "dalam-desa-kelurahan"  },
          { label: "Antar Desa/Kelurahan dalam Satu Kecamatan",          value: "antar-desa-kelurahan"  },
          { label: "Antar Kecamatan dalam Satu Kabupaten/Kota",          value: "antar-kecamatan"       },
          { label: "Antar Kabupaten/Kota dalam Satu Provinsi",           value: "antar-kabupaten-kota"  },
          { label: "Antar Provinsi",                                     value: "antar-provinsi"        },
        ],
      },
      {
        name:     "alasan_pindah",
        label:    "Alasan Pindah",
        type:     "select",
        required: true,
        options: [
          { label: "Pekerjaan",  value: "pekerjaan"  },
          { label: "Pendidikan", value: "pendidikan" },
          { label: "Keamanan",   value: "keamanan"   },
          { label: "Kesehatan",  value: "kesehatan"  },
          { label: "Perumahan",  value: "perumahan"  },
          { label: "Keluarga",   value: "keluarga"   },
          { label: "Lainnya",    value: "lainnya"    },
        ],
      },
      {
        name:        "alasan_pindah_lainnya",
        label:       "Keterangan Alasan Lainnya",
        type:        "text",
        required:    false,
        placeholder: "Sebutkan alasan pindah",
        dependsOn:   { field: "alasan_pindah", value: "lainnya" },
      },
      {
        name:     "jenis_kepindahan",
        label:    "Jenis Kepindahan",
        type:     "select",
        required: true,
        options: [
          { label: "Kepala Keluarga",                                      value: "kepala-keluarga"                   },
          { label: "Kepala Keluarga dan Sebagian Anggota Keluarga",        value: "kepala-keluarga-sebagian-anggota"  },
          { label: "Kepala Keluarga dan Seluruh Anggota Keluarga",         value: "kepala-keluarga-seluruh-anggota"   },
          { label: "Anggota Keluarga",                                     value: "anggota-keluarga"                  },
        ],
      },
    ],
  },
  {
    title: "Alamat Pindah",
    fields: [
      { name: "tujuan_rt",             label: "RT",             type: "text", required: true, placeholder: "Contoh: 001", numericOnly: true },
      { name: "tujuan_rw",             label: "RW",             type: "text", required: true, placeholder: "Contoh: 002", numericOnly: true },
      { name: "tujuan_desa_kelurahan", label: "Desa/Kelurahan", type: "text", required: true },
      { name: "tujuan_kecamatan",      label: "Kecamatan",      type: "text", required: true },
      { name: "tujuan_kabupaten_kota", label: "Kabupaten/Kota", type: "text", required: true },
      { name: "tujuan_provinsi",       label: "Provinsi",       type: "text", required: true },
      { name: "tujuan_kode_pos",       label: "Kode Pos",       type: "text", required: true, placeholder: "Contoh: 50271", numericOnly: true },
    ],
  },
  {
    title: "Status Nomor KK",
    fields: [
      {
        name:     "status_kk_tidak_pindah",
        label:    "Anggota Keluarga Tidak Pindah",
        type:     "select",
        required: true,
        options:  optionsStatusKK,
      },
      {
        name:     "status_kk_pindah",
        label:    "Anggota Keluarga yang Pindah",
        type:     "select",
        required: true,
        options:  optionsStatusKK,
      },
    ],
  },
  {
    // FIX: anggota yang pindah sebagai array
    title: "Daftar Anggota Keluarga yang Pindah",
    fields: [
      {
        name:        "daftar_anggota_pindah",
        label:       "Daftar Anggota yang Pindah",
        type:        "array",
        required:    true,
        layout:      "table",
        defaultItem: {
          anggota_nik:          "",
          anggota_nama_lengkap: "",
          anggota_shdk:         "",
        },
        columns: [
          { name: "anggota_nik",          label: "NIK",                                    type: "text",   placeholder: "16 digit NIK", numericOnly: true },
          { name: "anggota_nama_lengkap", label: "Nama Lengkap",                           type: "text",   placeholder: "Masukkan nama lengkap" },
          { name: "anggota_shdk",         label: "Status Hubungan dalam Keluarga (SHDK)",  type: "select", options: optionsSHDK },
        ],
      },
    ],
  },
  {
    // FIX: section untuk Orang Asing (SKTT) — field 13-16
    title: "Data Sponsor (Orang Asing)",
    fields: [
      {
        name:     "tipe_sponsor",
        label:    "Tipe Sponsor",
        type:     "select",
        required: false,
        options: [
          { label: "Tanpa Sponsor",            value: "tanpa-sponsor"            },
          { label: "Organisasi Internasional", value: "organisasi-internasional" },
          { label: "Pemerintah",               value: "pemerintah"               },
          { label: "Perusahaan",               value: "perusahaan"               },
          { label: "Perorangan",               value: "perorangan"               },
        ],
      },
      {
        name:        "nama_sponsor",
        label:       "Nama Sponsor",
        type:        "text",
        required:    false,
        placeholder: "Isi jika ada sponsor",
      },
      {
        name:        "alamat_sponsor",
        label:       "Alamat Sponsor",
        type:        "textarea",
        required:    false,
        rows:        3,
        placeholder: "Isi jika ada sponsor",
      },
      // FIX: tambah nomor & masa berlaku KITAS/KITAP sesuai field 16 template
      {
        name:        "nomor_kitas_kitap",
        label:       "Nomor KITAS / KITAP",
        type:        "text",
        required:    false,
        placeholder: "Isi jika memiliki KITAS/KITAP",
      },
      {
        name:     "masa_berlaku_kitas_kitap",
        label:    "Masa Berlaku KITAS / KITAP",
        type:     "date",
        required: false,
      },
    ],
  },
  {
    // FIX: section untuk SKPLN — field 17-18 template
    title: "Data Pindah ke Luar Negeri",
    fields: [
      {
        name:        "negara_tujuan",
        label:       "Negara Tujuan",
        type:        "text",
        required:    false,
        placeholder: "Isi jika pindah ke luar negeri",
      },
      {
        name:        "alamat_tujuan_luar_negeri",
        label:       "Alamat Tujuan di Negara Tujuan",
        type:        "textarea",
        required:    false,
        rows:        3,
        placeholder: "Isi jika pindah ke luar negeri",
      },
    ],
  },
  {
    title: "Data Kepindahan",
    fields: [
      {
        name:        "penanggung_jawab",
        label:       "Penanggung Jawab",
        type:        "text",
        required:    true,
        placeholder: "Masukkan nama penanggung jawab",
      },
      {
        name:     "rencana_tanggal_pindah",
        label:    "Rencana Tanggal Pindah",
        type:     "date",
        required: true,
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