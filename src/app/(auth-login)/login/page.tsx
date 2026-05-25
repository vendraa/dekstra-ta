import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/features/auth/login/components/LoginForm";
import AuthFooterLink from "@/components/auth/AuthFooterLink";

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader 
        title="Masuk ke Akun Anda" 
      />
      <LoginForm />
      <AuthFooterLink
        text="Belum punya akun?"
        linkLabel="Daftar"
        href="/register"
      />
    </AuthCard>
  );
}


