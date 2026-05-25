export enum AccountStatus {
  PENDING_VERIFICATION = 1,
  REJECTED             = 2,
  VERIFIED             = 3,
}

export interface Account {
  id: string;

  nik: string;
  kkNumber: string;
  fullName: string;

  birthPlace: string;
  birthDate: string;

  address: string;
  phone: string;
  email: string;

  gender?: string;
  religion?: string;

  rt?: string;
  rw?: string;

  ktpUrl?: string;
  kkUrl?: string;

  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAccountResult {
  data:      Account[];
  totalRows: number;
}

export interface DetailAkunResponse {
  id: number;
  nik: string;
  nomor_kk: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: number;
  jenis_kelamin_display: string;
  agama: number;
  agama_display: string;
  alamat: string;
  email: string;
  no_hp: string;
  status_verifikasi: number;
  status_verifikasi_display: string;
  rt: string;
  rw: string;
  kk_file?: string;
  ktp_file?: string;
  kk_file_url?: string;
  ktp_file_url?: string;
  created_at: string;
}