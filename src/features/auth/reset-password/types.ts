export interface ResetPasswordPayload {
  email:           string;
  otp:             string;
  newPassword:     string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}