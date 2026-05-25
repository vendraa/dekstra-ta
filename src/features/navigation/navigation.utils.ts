import { SidebarItem, Permission, UserRole } from "@/components/layouts/Sidebar/sidebar.types";

export function filterSidebarByPermissions(
  menus: SidebarItem[],
  permissions: Permission[]
): SidebarItem[] {
  return menus
    .filter((menu) =>
      !menu.permissions ||
      menu.permissions.some((p) => permissions.includes(p))
    )
    .map((menu) => {
      const filteredChildren = menu.children
        ? filterSidebarByPermissions(menu.children, permissions)
        : undefined;

      return {
        ...menu,
        children: filteredChildren?.length ? filteredChildren : undefined,
      };
    });
}

export function injectRolePrefix(
  menus: SidebarItem[],
  role: UserRole
): SidebarItem[] {
  const prefix = `/${role}`;

  return menus.map((menu) => ({
    ...menu,
    href: menu.href ? `${prefix}${menu.href}` : undefined,
    children: menu.children
      ? injectRolePrefix(menu.children, role)
      : undefined,
  }));
}