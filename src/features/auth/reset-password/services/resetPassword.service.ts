import { ResetPasswordPayload, ResetPasswordResponse } from "../types";

export async function resetPasswordService(
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
  // TODO: ganti dengan API call ke backend
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Kata sandi berhasil direset",
  };
}