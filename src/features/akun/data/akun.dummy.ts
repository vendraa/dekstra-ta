import { AccountStatus, Account } from "../types/akun.types";

export const dummyAccounts: Account[] = [
  {
    id: "1",
    kkNumber: "3374010101010001",
    nik: "3374010101010002",
    fullName: "Budi Santoso",
    gender: "L",
    birthPlace: "Semarang",
    birthDate: "1998-01-01",
    address: "Mugassari, Semarang",
    phone: "08123456789",
    email: "budi@example.com",
    status: AccountStatus.PENDING_VERIFICATION,
    createdAt: "2026-03-01",
    updatedAt: "2026-03-01",
    ktpUrl: "/images/dummy-images/dummy-ktp.jpg",
    kkUrl: "/images/dummy-images/dummy-kk.jpg",
  },
  {
    id: "2",
    kkNumber: "3374010101010003",
    nik: "3374010101010004",
    fullName: "Siti Aminah",
    gender: "P",
    birthPlace: "Solo",
    birthDate: "1995-06-12",
    address: "Banjarsari, Solo",
    phone: "08129876543",
    email: "siti@example.com",
    status: AccountStatus.PENDING_VERIFICATION,
    createdAt: "2026-02-25",
    updatedAt: "2026-02-27",
    ktpUrl: "/images/dummy-images/dummy-ktp.jpg",
    kkUrl: "/images/dummy-images/dummy-kk.jpg",
  },
  {
    id: "3",
    kkNumber: "3374010101010005",
    nik: "3374010101010006",
    fullName: "Ahmad Fauzi",
    gender: "L",
    birthPlace: "Magelang",
    birthDate: "1992-09-20",
    address: "Mertoyudan, Magelang",
    phone: "08134567890",
    email: "ahmad@example.com",
    status: AccountStatus.PENDING_VERIFICATION,
    createdAt: "2026-02-20",
    updatedAt: "2026-02-22",
    ktpUrl: "/images/dummy-images/dummy-ktp.jpg",
    kkUrl: "/images/dummy-images/dummy-kk.jpg",
  },
  {
    id: "4",
    kkNumber: "3374010101010007",
    nik: "3374010101010008",
    fullName: "Rina Lestari",
    gender: "P",
    birthPlace: "Kendal",
    birthDate: "2000-11-05",
    address: "Weleri, Kendal",
    phone: "081377788899",
    email: "rina@example.com",
    status: AccountStatus.PENDING_VERIFICATION,
    createdAt: "2026-02-15",
    updatedAt: "2026-02-18",
    ktpUrl: "/images/dummy-images/dummy-ktp.jpg",
    kkUrl: "/images/dummy-images/dummy-kk.jpg",
  },
  {
    id: "5",
    kkNumber: "3374010101010009",
    nik: "3374010101010010",
    fullName: "Dewi Anggraini",
    gender: "P",
    birthPlace: "Demak",
    birthDate: "1999-04-17",
    address: "Mranggen, Demak",
    phone: "081399988877",
    email: "dewi@example.com",
    status: AccountStatus.PENDING_VERIFICATION,
    createdAt: "2026-03-02",
    updatedAt: "2026-03-02",
    ktpUrl: "/images/dummy-images/dummy-ktp.jpg",
    kkUrl: "/images/dummy-images/dummy-kk.jpg",
  },
];

export type GetAccountsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: AccountStatus;
};

export type PaginatedResult<T> = {
  data: T[];
  totalRows: number;
};

export class DummyAccountRepository {
  async getAccounts(
    params?: GetAccountsParams
  ): Promise<PaginatedResult<Account>> {
    let result = [...dummyAccounts];

    if (params?.status) {
      result = result.filter((a) => a.status === params.status);
    }

    if (params?.search) {
      const keyword = params.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.fullName.toLowerCase().includes(keyword) ||
          a.nik.includes(keyword)
      );
    }

    const totalRows = result.length;

    if (params?.page && params?.limit) {
      const start = (params.page - 1) * params.limit;
      result = result.slice(start, start + params.limit);
    }

    await new Promise((r) => setTimeout(r, 300));

    return { data: result, totalRows };
  }
}