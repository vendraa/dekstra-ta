"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

import { getSidebar } from "@/features/navigation/get-sidebar";

import { UserRole } from "./sidebar.types";
import { useSidebarStore } from "./sidebar.store";

import {
  SidebarUserProfile,
  SidebarUserProfileProps,
} from "./SidebarUserProfile";

import SidebarItem from "./SidebarItem";

interface Props {
  role: UserRole;
  user: SidebarUserProfileProps;
}

export default function Sidebar({
  role,
  user,
}: Props) {
  const pathname = usePathname();

  const isCollapsed = useSidebarStore(
    (s) => s.isSidebarCollapsed
  );

  const hasHydrated = useSidebarStore(
    (s) => s.hasHydrated
  );

  /**
   * Hover state untuk temporary expand
   */
  const [isHovered, setIsHovered] =
    useState(false);

  /**
   * Sidebar akan expand jika:
   * - tidak collapsed
   * - atau sedang dihover
   */
  const isExpanded =
    !isCollapsed || isHovered;

  const menus = useMemo(
    () => getSidebar(role),
    [role]
  );

  if (!hasHydrated) {
    return null;
  }

  return (
    <aside
      onMouseEnter={() => {
        if (isCollapsed) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (isCollapsed) {
          setIsHovered(false);
        }
      }}
      className={clsx(
        "h-screen bg-white border-r border-border flex flex-col shrink-0 transition-all duration-300 overflow-hidden",
        isExpanded ? "w-70" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-5 py-5">
        <Image
          src={
            isExpanded
              ? "/images/logo/main-logo.png"
              : "/images/logo/logo.png"
          }
          alt="Dekstra"
          width={isExpanded ? 256 : 128}
          height={64}
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {menus.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            pathname={pathname}
            role={role}
            isCollapsed={!isExpanded}
          />
        ))}
      </nav>

      {/* User Profile */}
      <SidebarUserProfile
        name={user.name}
        email={user.email}
        avatar={user.avatar}
        role={role}
        isCollapsed={!isExpanded}
      />
    </aside>
  );
}