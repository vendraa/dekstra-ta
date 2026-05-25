"use client";

import { useEffect } from "react";
import { setupAutoLogout, useLogout } from "@/features/auth/logout/hooks/useLogout";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { logout } = useLogout();

  useEffect(() => {
    setupAutoLogout(logout);
  }, [logout]);

  return <>{children}</>;
}