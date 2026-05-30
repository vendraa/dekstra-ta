import { LetterRequest } from "../types/types";

export async function getRiwayatPengajuanStatic(): Promise<LetterRequest[]> {
  return [
    {
      id: "1",
      nomorPermohonan: "PMH-001",
      nik: "3322000000000001",
      name: "Warga Demo",
      letterType: "Surat Keterangan Domisili",
      lifecycle: "IN_PROGRESS",
      currentStep: "RW_REVIEW",
      approvals: [],
      createdAt: "2025-01-10",
      updatedAt: "2025-01-10",
      publicToken: "dummy-token-1",
    },

    {
      id: "2",
      nomorPermohonan: "PMH-002",
      nik: "3322000000000002",
      name: "Warga Demo",
      letterType: "Surat Keterangan Usaha",
      lifecycle: "IN_PROGRESS",
      currentStep: "ADMIN_REVIEW",
      approvals: [],
      createdAt: "2025-01-12",
      updatedAt: "2025-01-12",
      publicToken: "dummy-token-2",
    },
  ];
}