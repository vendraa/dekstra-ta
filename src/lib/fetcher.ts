export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Terjadi kesalahan");
  }

  return data;
};