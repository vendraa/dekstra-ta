import { UserProfile } from "../types/profile.types";

export async function getProfileStatic(): Promise<UserProfile> {
  return {
    id: "1",

    nik: "3322000000000001",

    kk: "3322000000000000",

    name: "Test User",

    birthPlace: "Semarang",

    birthDate: "1990-01-01",

    address: "Jl. Kenari No. 123, Semarang",

    email: "demo@dekstra.id",

    phone: "081234567890",

    role: "WARGA",
  };
}