import { Profile } from "../types/profile.types";

export async function getProfile(): Promise<Profile> {
  const res = await fetch("/api/profile", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Gagal mengambil profile");
  }

  return data;
}