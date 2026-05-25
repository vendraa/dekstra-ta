// sidebar.types.ts

import { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "rt" | "rw" | "kades";

export type Permission =
  | "view_dashboard"
  | "manage_surat"
  | "manage_akun"
  | "manage_penduduk"
  | "verify_rt"
  | "verify_rw"
  | "approve_kades";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  permissions?: Permission[];
  children?: SidebarItem[];
}