import { RegisterState, RegisterPayload } from "../types/register.types";

export function mapRegisterStateToPayload(
  state: RegisterState
): RegisterPayload {
  if (!state.kkFile?.file) {
    throw new Error("KK file belum diupload");
  }

  if (!state.ktpFile?.file) {
    throw new Error("KTP file belum diupload");
  }

  if (!state.gender) {
    throw new Error("Jenis kelamin belum dipilih");
  }

  if (!state.agama) {
    throw new Error("Agama belum dipilih");
  }

  return {
    nomor_kk: state.kkNumber,
    nik: state.nik,
    nama_lengkap: state.fullName,
    tempat_lahir: state.birthPlace,
    tanggal_lahir: state.birthDate,
    jenis_kelamin: state.gender,
    agama: state.agama,
    alamat: state.address,
    rt: Number(state.rt),
    rw: Number(state.rw),
    email: state.email,
    no_hp: state.phone,
    password: state.password,
    kk_file: state.kkFile.file,
    ktp_file: state.ktpFile.file,
  };
}