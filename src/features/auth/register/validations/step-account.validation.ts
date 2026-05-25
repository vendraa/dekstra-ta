export type AccountErrors = {
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function isStrongPassword(value: string) {
  return (
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /[0-9]/.test(value)
  );
}

export function validateAccount(data: {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}): AccountErrors {
  const errors: AccountErrors = {};

  if (!data.phone) {
    errors.phone = "Nomor telepon wajib diisi";
  } else if (!/^08\d{8,11}$/.test(data.phone)) {
    errors.phone = "Format nomor telepon tidak valid";
  }

  if (!data.email) {
    errors.email = "Email wajib diisi";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Format email tidak valid";
  }

  if (!data.password) {
    errors.password = "Kata sandi wajib diisi";
  } else if (!isStrongPassword(data.password)) {
    errors.password =
      "Kata sandi minimal 8 karakter, mengandung huruf besar, kecil, dan angka";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Konfirmasi kata sandi wajib diisi";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Kata sandi tidak sama";
  }

  return errors;
}
