// ===============================
// WORKFLOW TYPES
// ===============================

export type RequestLifecycle =
  | "DRAFT"
  | "IN_PROGRESS"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export type RequestStep =
  | "RT_REVIEW"
  | "RW_REVIEW"
  | "ADMIN_REVIEW"
  | "KADES_SIGN"
  | "DONE";

export type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";


// ===============================
// MAIN REQUEST
// ===============================

export interface LetterRequest {
  id: string;
  nomorPermohonan: string;

  nik: string;
  name: string;
  letterType: string;

  rt?: string;
  rw?: string;

  lifecycle: RequestLifecycle;

  currentStep?: RequestStep;

  approvals?: ApprovalLog[];

  createdAt: string;
  updatedAt: string;

  publicToken?: string;
}

export interface ApprovalLog {
  revision: number;
  role: Role;
  status: ApprovalStatus;

  note?: string;

  actedAt: string;
  actedBy: string;
}