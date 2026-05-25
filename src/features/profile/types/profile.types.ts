export interface UserProfile {
  id: string
  name: string
  email: string
  role: string

  nik: string
  kk: string

  birthPlace: string
  birthDate: string

  address: string
  phone: string
  
  rt?: string | null;
  rw?: string | null
}

export interface Profile {
  nik: string;
  nomor_kk: string | null;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string; // ISO string
  alamat: string | null;
  email: string;
  nomor_telepon: string;
  peran: string;
  rt: string | null;
  rw: string | null;
}