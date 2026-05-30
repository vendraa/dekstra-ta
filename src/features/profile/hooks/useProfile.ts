import useSWR from "swr";
import { getProfile } from "../services/profile.service";

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/profile",
    () => getProfile("no-store")
  );

  return {
    profile: data ?? null,
    loading: isLoading,
    error: error?.message || null,
    refetch: mutate,
  };
};