export type LoginErrors = {
  identifier?: string;
  password?: string;
};

export function validateLogin(data: {
  identifier: string;
  password: string;
}): LoginErrors {

  const errors: LoginErrors = {};

  if (!data.identifier.trim()) {
    errors.identifier = "Email atau NIK wajib diisi";
  } else {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nikRegex = /^\d{16}$/;

    if (!emailRegex.test(data.identifier) && !nikRegex.test(data.identifier)) {
      errors.identifier = "Format email atau NIK tidak valid";
    }
  }

  if (!data.password) {
    errors.password = "Kata sandi wajib diisi";
  }

  return errors;
}