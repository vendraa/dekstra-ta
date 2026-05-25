import { mapAccount } from "../utils/akun.mapper";

export interface GetAccountsParams {
  page?:      number;
  page_size?: number;
  status?:    number;
  search?:    string;
}

export interface GetAccountsResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  import("../types/akun.types").Account[];
}

export async function getVerifikasiAccounts(
  params: GetAccountsParams = {}
): Promise<GetAccountsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) searchParams.set("page_size", String(params.page_size));
  if (params.status) searchParams.set("status", String(params.status));
  if (params.search) searchParams.set("search", params.search);

  const res = await fetch(
    `/api/verifikasi/pendaftaran-akun?${searchParams.toString()}`,
    {
      method:  "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,

    // 🔥 APPLY MAPPER DI SINI
    results: data.results.map(mapAccount),
  };
}