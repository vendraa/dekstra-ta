import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Profile, UserProfile } from "../types/profile.types";
import { mapProfileToUserProfile } from "../mapper/profile.mapper";

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR<Profile>(
    "/api/profile",
    fetcher
  );

  const profile: UserProfile | null = data
    ? mapProfileToUserProfile(data)
    : null;

  return {
    profile,
    loading: isLoading,
    error: error?.message || null,
    refetch: mutate, 
  };
};