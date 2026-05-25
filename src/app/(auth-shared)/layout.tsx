import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-[url('/images/background/bg-login.png')]
          bg-cover bg-center
          opacity-45
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {children}
      </div>

    </main>
  );
}

