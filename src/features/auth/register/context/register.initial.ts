import { RegisterState } from "../types/register.types";

export const initialRegisterState: RegisterState = {
  step: "PERSONAL IDENTITY",
  direction: "NEXT",

  kkNumber: "",
  nik: "",

  fullName: "",
  gender: null,
  birthPlace: "",
  birthDate: "",
  agama: null,
  address: "",
  rt: "",
  rw: "",

  phone: "",
  email: "",
  password: "",
  confirmPassword: "",

  kkFile: {
    file: null,
    previewUrl: undefined,
  },

  ktpFile: {
    file: null,
    previewUrl: undefined,
  },

  otpChannel: "",
  isSubmitting: false,
};