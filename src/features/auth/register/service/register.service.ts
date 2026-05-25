import { mapRegisterStateToPayload } from "../helper/register.mapper";
import { RegisterState } from "../types/register.types";

export async function registerUser(state: RegisterState) {
  const payload = mapRegisterStateToPayload(state);

  const formData = new FormData();

  formData.append("nomor_kk", payload.nomor_kk);
  formData.append("nik", payload.nik);
  formData.append("nama_lengkap", payload.nama_lengkap);
  formData.append("tempat_lahir", payload.tempat_lahir);
  formData.append("tanggal_lahir", payload.tanggal_lahir);
  formData.append("jenis_kelamin", String(payload.jenis_kelamin));
  formData.append("agama", String(payload.agama));
  formData.append("alamat", payload.alamat);
  formData.append("rt", String(payload.rt));
  formData.append("rw", String(payload.rw));
  formData.append("email", payload.email);
  formData.append("no_hp", payload.no_hp);
  formData.append("password", payload.password);

  formData.append("kk_file", payload.kk_file);
  formData.append("ktp_file", payload.ktp_file);

  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: formData,
  });

  let data: unknown;

  try {
    data = await res.json();
  } catch {
    throw new Error("Response bukan JSON valid");
  }

  if (!res.ok) {
    throw data;
  }
  
  return data;
}