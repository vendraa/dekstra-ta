"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { UserRole } from "../Sidebar/sidebar.types";
import { useSidebarStore } from "../Sidebar/sidebar.store";
import NotificationMenu from "@/components/ui/Notification/NotificationMenu";

/* =========================
   TYPES
========================= */
type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

/* =========================
   ROLE TITLE MAP
========================= */
const ROLE_TITLES: Record<UserRole, string> = {
  admin: "Admin",
  kades: "Kades",
  rt: "RT",
  rw: "RW",
};

/* =========================
   PAGE TITLE MAP
========================= */
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/manajemen-surat": "Manajemen Surat",
  "/data-penduduk": "Data Penduduk",
};

/* =========================
   HELPER
========================= */
function mapUserRoleToNotificationRole(role: UserRole): Role {
  switch (role) {
    case "admin":
      return "ADMIN";
    case "rt":
      return "RT";
    case "rw":
      return "RW";
    case "kades":
      return "KADES";
    default:
      return "WARGA";
  }
}

function getPageTitle(pathname: string, role: UserRole): string {
  if (PAGE_TITLES[pathname]) {
    const pageTitle = PAGE_TITLES[pathname];

    if (pathname === "/dashboard") {
      return `${ROLE_TITLES[role]} ${pageTitle}`;
    }

    return pageTitle;
  }

  const matched = Object.keys(PAGE_TITLES)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  return matched
    ? PAGE_TITLES[matched]
    : `${ROLE_TITLES[role]} Dashboard`;
}

/* =========================
   COMPONENT
========================= */
interface TopBarProps {
  role: UserRole;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export default function TopBar({
  role,
}: TopBarProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname, role);
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
  const notificationRole = mapUserRoleToNotificationRole(role);

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between shrink-0">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-surface transition"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-xl font-bold text-primary whitespace-nowrap">
          {title}
        </h1>
      </div>

      {/* RIGHT */}
      <NotificationMenu
        buttonClassName="border border-border hover:bg-gray-100"
        iconClassName="text-dark"
        role={notificationRole} 
      />
    </header>
  );
}