import { DashboardResponse } from "../types/dashboard.types";

export async function getDashboardBuild():
  Promise<DashboardResponse | null> {

  try {
    const token =
      process.env.SSG_STATIC_TOKEN;

    if (!token) {
      console.warn(
        "[SSG] SSG_STATIC_TOKEN tidak ditemukan"
      );

      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`,
      {
        method: "GET",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch {
    return null;
  }
}