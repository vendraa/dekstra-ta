import { SidebarItem } from "@/components/layouts/Sidebar/sidebar.types";
import {
  LayoutDashboard,
  FileCheck,
  FileText,
  UserCog,
} from "lucide-react";

export const SIDEBAR_MENUS: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permissions: ["view_dashboard"],
  },

  {
    label: "Proses Administrasi Surat",
    icon: FileCheck,
    permissions: ["verify_rt", "verify_rw", "approve_kades"],
    children: [
      {
        label: "Verifikasi Tingkat RT",
        href: "/surat/verifikasi",
        permissions: ["verify_rt"],
      },
      {
        label: "Verifikasi Tingkat RW",
        href: "/surat/verifikasi",
        permissions: ["verify_rw"],
      },
      {
        label: "Verifikasi Administratif",
        href: "/surat/verifikasi",
        permissions: ["manage_surat"],
      },
      {
        label: "Persetujuan Kepala Desa",
        href: "/surat/menunggu-persetujuan",
        permissions: ["approve_kades"],
      },
    ],
  },
  {
    label: "Manajemen Surat",
    icon: FileText,
    permissions: ["manage_surat"],
    children: [
      {
        label: "Verifikasi Administratif",
        href: "/surat/verifikasi",
        permissions: ["manage_surat"],
      },
    ],
  },
  {
    label: "Manajemen Akun",
    icon: UserCog,
    permissions: ["manage_akun"],
    children: [
      {
        label: "Verifikasi Akun",
        href: "/manajemen-akun/verifikasi",
        permissions: ["manage_akun"],
      },
    ],
  },
];