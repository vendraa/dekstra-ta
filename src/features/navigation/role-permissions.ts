import { UserRole, Permission } from "@/components/layouts/Sidebar/sidebar.types";

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "view_dashboard",
    "manage_surat",
    "manage_akun",
    "manage_penduduk",
  ],
  rt: [
    "view_dashboard",
    "verify_rt",
  ],
  rw: [
    "view_dashboard",
    "verify_rw",
  ],
  kades: [
    "view_dashboard",
    "approve_kades",
  ],
};