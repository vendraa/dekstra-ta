import { DashboardResponse } from "../types/dashboard.types";

export async function getDashboardClient():
  Promise<DashboardResponse> {

  const res = await fetch(
    "/api/dashboard",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const error =
      await res
        .json()
        .catch(() => ({}));

    throw new Error(
      error?.message ??
      "Failed to fetch dashboard"
    );
  }

  return res.json();
}