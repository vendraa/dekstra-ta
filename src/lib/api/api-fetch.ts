interface ApiErrorResponse {
  message?: string;
}

interface FetchOptions extends RequestInit {
  cache?: RequestCache;
}

export async function apiFetch<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}${endpoint}`, {
    credentials: "include",
    ...options,
  });

  const data = await res.json();

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const error = data as ApiErrorResponse;

    throw new Error(
      error?.message || "Terjadi kesalahan"
    );
}

  return data as T;
}