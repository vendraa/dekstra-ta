import { LetterRequest } from "../types/types";
import { Role } from "../types/types";

type StepStatusConfig = {
  className: string;
  labels: Partial<Record<Role, string>>;
};

type RequestStep =
  | "RT_REVIEW"
  | "RW_REVIEW"
  | "ADMIN_REVIEW"
  | "KADES_SIGN"
  | "DONE";

export type StatusPresentation = { 
  label: string; 
  className: string; 
};

const STEP_STATUS_CONFIG: Record<RequestStep, StepStatusConfig> = {
  RT_REVIEW: {
    className: "status-rt-review",
    labels: {
      WARGA: "Menunggu Verifikasi RT",
      RT: "Perlu Verifikasi RT",
      RW: "Menunggu Verifikasi RT",
      ADMIN: "Menunggu Verifikasi RT",
      KADES: "Menunggu Verifikasi RT",
    },
  },

  RW_REVIEW: {
    className: "status-rw-review",
    labels: {
      WARGA: "Menunggu Verifikasi RW",
      RT: "Menunggu Verifikasi RW", // 🔥 FIX (hapus “Sudah Diverifikasi RT”)
      RW: "Perlu Verifikasi RW",
      ADMIN: "Menunggu Verifikasi RW",
      KADES: "Menunggu Verifikasi RW",
    },
  },

  ADMIN_REVIEW: {
    className: "status-admin-review",
    labels: {
      WARGA: "Menunggu Verifikasi Admin",
      RT: "Menunggu Verifikasi Admin",
      RW: "Menunggu Verifikasi Admin",
      ADMIN: "Perlu Verifikasi Admin",
      KADES: "Menunggu Verifikasi Admin",
    },
  },

  KADES_SIGN: {
    className: "status-kades-sign",
    labels: {
      WARGA: "Menunggu Persetujuan Kades",
      RT: "Menunggu Persetujuan Kades",
      RW: "Menunggu Persetujuan Kades",
      ADMIN: "Menunggu Persetujuan Kades",
      KADES: "Perlu Persetujuan Kades", // 🔥 konsisten
    },
  },

  DONE: {
    className: "status-approved",
    labels: {
      WARGA: "Selesai",
      RT: "Selesai",
      RW: "Selesai",
      ADMIN: "Selesai",
      KADES: "Selesai",
    },
  },
};

export function getRequestStatusPresentation(
  request: LetterRequest,
  role: Role
): StatusPresentation {
  
  // 🔴 PRIORITAS 1: lifecycle override
  if (request.lifecycle === "REJECTED") {
    return {
      label: "Ditolak",
      className: "status-rejected",
    };
  }

  if (request.lifecycle === "COMPLETED") {
    return {
      label: "Disetujui",
      className: "status-approved",
    };
  }

  // 🔴 PRIORITAS 2: gunakan currentStep (WAJIB ADA)
  if (request.currentStep) {
    const config = STEP_STATUS_CONFIG[request.currentStep];

    if (!config) {
      console.warn("Unknown step:", request.currentStep);
      return {
        label: "Status tidak dikenal",
        className: "status-error",
      };
    }

    return {
      label: config.labels[role] ?? "Diproses",
      className: config.className,
    };
  }

  // 🔴 PRIORITAS 3: fallback minimal (harus jarang terjadi)
  return {
    label: "Sedang Diproses",
    className: "status-in-progress",
  };
}