import ResetPasswordForm from "@/features/auth/reset-password/components/ResetPasswordForm";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;

  if (!params.email) {
    redirect("/forgot-password");
  }

  return <ResetPasswordForm />;
}