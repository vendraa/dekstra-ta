// reusable type
export type FormValue =
  | string
  | number
  | boolean
  | null
  | File
  | FormValue[]
  | { [key: string]: FormValue };

// Submit Surat Request
export interface SubmitSuratRequest {
  jenis_surat:   string;
  data: Record<string, unknown>
}

// Submit Surat Response
export interface SubmitSuratResponse {
  id: string;
  nomor_permohonan: string;
  jenis_surat: string;
  pemohon: string;
  data: Record<string, FormValue>;
  status: number;
  diajukan_at: string;
}

// Upload Berkas Request
export interface UploadBerkasRequest {
  nomor_permohonan: string;
  file_berkas: File;
}

// Upload Berkas Response
export interface UploadBerkasResponse {
  id: string;
  diunggah_at: string;
}

// Error Response
export interface SuratErrorResponse {
  [key: string]: string[];
}