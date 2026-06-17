import { cookies } from "next/headers";
import { DashboardResponse } from "../types/dashboard.types";

type ErrorResponse = {
  message?: string;
};

export async function getDashboardServer(
  cache: RequestCache = "no-store"
): Promise<DashboardResponse> {

  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "access_token"
      )?.value;

    if (!token) {
      throw new Error(
        "Unauthorized"
      );
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

        cache,
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      throw new Error(
        data?.message ??
        "Failed to fetch dashboard"
      );
    }

    return data;

  } catch (error) {
    const err =
      error as ErrorResponse;

    throw new Error(
      err?.message ??
      "Failed to fetch dashboard"
    );
  }
}