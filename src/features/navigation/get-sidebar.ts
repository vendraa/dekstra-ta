import { SIDEBAR_MENUS } from "./sidebar.menus";
import { rolePermissions } from "./role-permissions";
import {
  filterSidebarByPermissions,
  injectRolePrefix,
} from "./navigation.utils";
import { UserRole } from "@/components/layouts/Sidebar/sidebar.types";

export function getSidebar(role: UserRole) {
  const permissions = rolePermissions[role];

  const filtered = filterSidebarByPermissions(
    SIDEBAR_MENUS,
    permissions
  );

  return injectRolePrefix(filtered, role);
}