export interface AccountDTO {  id: number;

  nomor_kk: string;
  nik: string;

  nama_lengkap: string;
  jenis_kelamin: number;

  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;

  no_hp: string;
  email: string;

  status_verifikasi: number;

  created_at: string;
  updated_at?: string;

  ktp_file?: string;
  kk_file?: string;
}