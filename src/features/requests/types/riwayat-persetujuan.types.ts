import { Role } from "./types";
import { ApprovalStatus } from "./types";
import { DetailPermohonan } from "./detail-persetujuan.types";
import { formatDateTime } from "@/lib/date-formatter";

// Backend response (raw)
export interface RiwayatItem {
  status: string;
  actor?: string;
  timestamp: string;
  description?: string;
}

export interface RiwayatPersetujuanResponse {
  id: number;
  nomor_permohonan: string;
  jenis_surat: {
    nama: string;
  };
  pemohon: {
    nik: string;
    nama: string;
    rt?: string;
    rw?: string;
  };
  data: Record<string, unknown>;
  status: number;
  diajukan_at: string;
  riwayat_tahap: number;
  riwayat_aksi: number;
  public_token: string;

  riwayat: RiwayatItem[];
}

enum StatusBE {
  DIAJUKAN = 1,
  DITOLAK = 2,  
  SELESAI = 3,
}

// Mapping ke domain FE
import { 
    LetterRequest,
    RequestLifecycle,
    RequestStep,
} from "./types";

function normalize(value?: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase().replace(/\s+/g, "_");
  }

  if (typeof value === "number") {
    return String(value); // fallback
  }

  return "";
}

function mapActorToRole(actor?: unknown): Role {
  // handle number dari backend
  if (typeof actor === "number") {
    switch (actor) {
      case 2: return "RT";
      case 3: return "RW";
      case 4: return "ADMIN";
      case 5: return "KADES";
      default: return "WARGA";
    }
  }

  // handle string
  const a = normalize(actor);

  switch (a) {
    case "RT": return "RT";
    case "RW": return "RW";
    case "ADMIN": return "ADMIN";
    case "KEPALA_DESA":
    case "KADES": return "KADES";
    default: return "WARGA";
  }
}

function mapStatus(status?: string): ApprovalStatus {
  const s = normalize(status);

  switch (s) {
    case "SETUJU":
    case "APPROVED":
      return "APPROVED";

    case "TOLAK":
    case "REJECTED":
      return "REJECTED";

    default:
      return "PENDING";
  }
}

// mapping status BE → lifecycle FE
export function mapStatusToLifecycle(status: number): RequestLifecycle {
  switch (status) {
    case StatusBE.DITOLAK:
      return "REJECTED";

    case StatusBE.SELESAI:
      return "COMPLETED";

    case StatusBE.DIAJUKAN:
      return "IN_PROGRESS";

    default:
      return "DRAFT";
  }
}

// mapping step sederhana (bisa diperbaiki nanti)
export function mapToStep(
  status: number,
  tahap: number | null
): RequestStep | undefined {

  if (status === 4 || status === 5) {
    return "DONE";
  }

  switch (tahap) {
    case 1:
      return "RT_REVIEW";

    case 2:
      return "RW_REVIEW";

    case 3:
      return "ADMIN_REVIEW";

    case 4:
      return "KADES_SIGN";

    default:
      return "RT_REVIEW";
  }
}

export function mapToLetterRequest(
  item: RiwayatPersetujuanResponse
): LetterRequest {
  return {
    id: String(item.id),

    nomorPermohonan: item.nomor_permohonan ?? "-",

    nik: item.pemohon?.nik ?? "-",
    name: item.pemohon?.nama ?? "-",

    letterType: item.jenis_surat?.nama ?? "-",

    rt: item.pemohon?.rt,
    rw: item.pemohon?.rw,

    lifecycle: mapStatusToLifecycle(item.status),

    currentStep: mapToStep(
      item.status,
      item.riwayat_tahap
    ),

    approvals: item.riwayat?.map((history, index) => ({
      revision: index + 1,

      role: mapActorToRole(history.actor),

      status: mapStatus(history.status),

      note: history.description ?? undefined,

      actedAt: history.timestamp,

      actedBy: history.actor ?? "-",
    })) ?? [],

    createdAt: item.diajukan_at,
    updatedAt: item.diajukan_at,

    publicToken: item.public_token,
  };
}

export function mapDetailToLetterRequest(
  item: DetailPermohonan
): LetterRequest {
  return {
    id: String(item.id),

    nomorPermohonan: item.nomor_permohonan ?? "-",

    nik: item.pemohon?.nik ?? "-",
    name: item.pemohon?.nama ?? "-",

    letterType: item.jenis_surat?.nama ?? "-",

    rt: undefined,
    rw: undefined,

    lifecycle: mapStatusToLifecycle(item.status),

    currentStep: mapToStep(item.status, item.riwayat_tahap),

    approvals: item.riwayat?.map((history: RiwayatItem, index: number) => ({
      revision: index + 1,

      role: mapActorToRole(history.actor),
      status: mapStatus(history.status),

      note: history.description ?? undefined,

      actedAt: formatDateTime(history.timestamp),
      actedBy: history.actor ?? "-",
    })) ?? [],

    createdAt: item.diajukan_at,
    updatedAt: item.diajukan_at,

    publicToken: undefined,
  };
}