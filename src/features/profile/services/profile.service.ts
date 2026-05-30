import { apiFetch } from "@/lib/api/api-fetch";
import {
  Profile,
  UserProfile,
} from "../types/profile.types";
import { mapProfileToUserProfile } from "../mapper/profile.mapper";

export async function getProfile(
  cache: RequestCache = "no-store"
): Promise<UserProfile | null> {
  try {
    const data = await apiFetch<Profile>("/api/profile", {
      method: "GET",
      cache,
    });

    return mapProfileToUserProfile(data);
  } catch (error) {
    console.error("Failed to fetch profile:", error);

    return null;
  }
}