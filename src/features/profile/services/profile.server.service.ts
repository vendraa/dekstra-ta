import { cookies } from "next/headers";

import {
  Profile,
  UserProfile,
} from "../types/profile.types";

import { mapProfileToUserProfile } from "../mapper/profile.mapper";

export async function getProfileServer(
  cache: RequestCache = "no-store"
): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("access_token")?.value;

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profil/`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        cache,
      }
    );

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    const data =
      (await res.json()) as Profile;

    return mapProfileToUserProfile(data);

  } catch (error) {
    console.error(
      "Failed to fetch profile:",
      error
    );

    return null;
  }
}