"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "access_token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";

    router.replace("/login");
  };

  return { logout };
}

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function setupAutoLogout(logout: () => void) {
  const cookies = document.cookie.split("; ").reduce((acc, cur) => {
    const [key, val] = cur.split("=");
    acc[key] = val;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies["access_token"];

  if (!token) return;

  const decoded = parseJwt(token);

  if (!decoded?.exp) return;

  const expiryTime = decoded.exp * 1000;
  const now = Date.now();

  const timeout = expiryTime - now;

  if (timeout <= 0) {
    logout();
    return;
  }

  setTimeout(() => {
    logout();
  }, timeout);
}