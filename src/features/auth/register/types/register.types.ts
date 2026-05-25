import { FileUploadValue } from "@/components/ui/File-upload/upload.types";

export type RegisterStep =
  | "PERSONAL IDENTITY"
  | "ACCOUNT"
  | "DOCUMENT UPLOAD"
  | "REVIEW"
  | "OTP";

export type StepDirection = "NEXT" | "PREV";

// Sesuai TextChoices di Django
export enum Gender {
  LAKI_LAKI = 1,
  PEREMPUAN = 2,
}

export enum Agama {
  ISLAM       = 1,
  KRISTEN     = 2,
  KATOLIK     = 3,
  HINDU       = 4,
  BUDDHA      = 5,
  KONGHUCU    = 6,
  KEPERCAYAAN = 7,
}

export interface RwOption {
  kode_rw: number;
}

export interface RtOption {
  id:      number;
  kode_rt: number;
}

// UI State
export interface RegisterState {
  step:         RegisterStep;
  direction:    StepDirection;
  isSubmitting: boolean;
  submitError?: string | null;

  // Step 1 – Identitas
  kkNumber:   string;
  nik:        string;
  fullName:   string;
  gender:     Gender | null;
  birthPlace: string;
  birthDate:  string;
  agama:      Agama | null;
  address:    string;
  rt:         string;
  rw:         string;

  // Step 2 – Akun
  phone:           string;
  email:           string;
  password:        string;
  confirmPassword: string;

  // Step 3 – Dokumen Upload
  kkFile:  FileUploadValue;
  ktpFile: FileUploadValue;

  // Step 5 – OTP
  otpChannel: "EMAIL" | "";
}

// API Payload 
export interface RegisterPayload {
  nomor_kk:       string;
  nik:            string;
  nama_lengkap:   string;
  tempat_lahir:   string;
  tanggal_lahir:  string;
  jenis_kelamin:  Gender;  
  agama:          Agama;   
  alamat:         string;
  rt:             number;
  rw:             number;
  email:          string;
  no_hp:          string;
  password:       string;
  kk_file:        File;
  ktp_file:       File;
}