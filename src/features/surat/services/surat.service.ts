import { 
    SubmitSuratRequest,
    SubmitSuratResponse,
    UploadBerkasRequest,
    UploadBerkasResponse,
    SuratErrorResponse,
} from "../forms/dynamic-form/types/surat-api.types";
/**
 * Submit pengajuan surat
 */
export async function submitSurat(
  payload: SubmitSuratRequest
): Promise<SubmitSuratResponse> {
  // Get token from localStorage
  const token = localStorage.getItem("access_token");

  const res = await fetch("/api/surat/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as SuratErrorResponse;
  }

  return data as SubmitSuratResponse;
}

/**
 * Upload berkas pendukung
 */
export async function uploadBerkas(
  payload: UploadBerkasRequest
): Promise<UploadBerkasResponse> {
  const token = localStorage.getItem("access_token");

  const formData = new FormData();
  formData.append("nomor_permohonan", payload.nomor_permohonan);
  formData.append("file_berkas", payload.file_berkas);

  const res = await fetch("/api/surat/upload-berkas", {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data as SuratErrorResponse;
  }

  return data as UploadBerkasResponse;
}

/**
 * Upload multiple berkas
 */
export async function uploadMultipleBerkas(
  nomorPermohonan: string,
  files: File[]
): Promise<UploadBerkasResponse[]> {
  const uploadPromises = files.map((file) =>
    uploadBerkas({
      nomor_permohonan: nomorPermohonan,
      file_berkas: file,
    })
  );

  return Promise.all(uploadPromises);
}