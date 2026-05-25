"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

import { useSidebarStore } from "./sidebar.store";
import {
  SidebarItem as SidebarItemType,
  UserRole,
} from "./sidebar.types";

interface Props {
  item: SidebarItemType;
  pathname: string;
  role: UserRole;
  isChild?: boolean;
  isCollapsed?: boolean;
}

export default function SidebarItem({
  item,
  pathname,
  role,
  isChild = false,
  isCollapsed = false,
}: Props) {

  const isActive = item.href
    ? pathname === item.href ||
      pathname.startsWith(item.href + "/")
    : false;

  const hasActiveChild =
    item.children?.some(
      (child) =>
        child.href &&
        pathname.startsWith(child.href)
    );

  const isOpen = useSidebarStore(
    (state) =>
      state.dropdownOpen[role]?.[item.label]
  );

  const toggleDropdown = useSidebarStore(
    (state) => state.toggleDropdown
  );

  const setDropdownOpen = useSidebarStore(
    (state) => state.setDropdownOpen
  );

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    if (hasActiveChild) {
      setDropdownOpen(
        role,
        item.label,
        true
      );
    }

    hasInitialized.current = true;
  }, [
    hasActiveChild,
    role,
    item.label,
    setDropdownOpen,
  ]);

  /* ─────────────────────────────
   * ITEM DENGAN CHILDREN
   * ───────────────────────────── */
  if (item.children) {

    /**
     * COLLAPSED
     * hanya icon
     */
    if (isCollapsed) {
      return (
        <div className="relative">
          {/* Accent bar */}
          {hasActiveChild && (
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
          )}

          <button
            onClick={() =>
              toggleDropdown(role, item.label)
            }
            className={clsx(
              "w-full flex items-center justify-center p-2.5 rounded-xl transition-colors duration-150",
              hasActiveChild
                ? "bg-primary/10 text-primary"
                : "text-foreground/60 hover:text-foreground hover:bg-surface"
            )}
          >
            {item.icon && (
              <item.icon size={20} />
            )}
          </button>
        </div>
      );
    }

    /**
     * EXPANDED
     */
    return (
      <div>
        <div className="relative">
          {/* Accent bar */}
          {hasActiveChild && (
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
          )}

          <button
            onClick={() =>
              toggleDropdown(role, item.label)
            }
            className={clsx(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
              hasActiveChild
                ? "bg-primary/10 text-primary"
                : "text-foreground/60 hover:text-foreground hover:bg-surface"
            )}
          >
            {/* Icon */}
            {item.icon && (
              <span
                className={clsx(
                  "shrink-0 w-5 h-5",
                  hasActiveChild
                    ? "text-primary"
                    : "text-foreground/50"
                )}
              >
                <item.icon size={18} />
              </span>
            )}

            {/* Label */}
            <span className="flex-1 text-left truncate">
              {item.label}
            </span>

            {/* Chevron */}
            <ChevronDown
              size={14}
              className={clsx(
                "shrink-0 transition-transform duration-200",
                hasActiveChild
                  ? "text-primary"
                  : "text-foreground/40",
                isOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Children */}
        {isOpen && (
          <div className="ml-8 mt-0.5 space-y-0.5">
            {item.children.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                pathname={pathname}
                role={role}
                isChild={true}
                isCollapsed={false}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────
   * CHILD ITEM
   * ───────────────────────────── */
  if (isChild) {
    return (
      <Link
        href={item.href || "#"}
        className={clsx(
          "flex items-center px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-lg",
          isActive
            ? "text-primary"
            : "text-foreground/50 hover:text-foreground"
        )}
      >
        <span className="truncate">
          {item.label}
        </span>
      </Link>
    );
  }

  /* ─────────────────────────────
   * PARENT ITEM BIASA
   * ───────────────────────────── */

  /**
   * COLLAPSED
   */
  if (isCollapsed) {
    return (
      <div className="relative">
        {/* Accent bar */}
        {isActive && (
          <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
        )}

        <Link
          href={item.href || "#"}
          className={clsx(
            "flex items-center justify-center p-2.5 rounded-xl transition-colors duration-150",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-foreground/60 hover:text-foreground hover:bg-surface"
          )}
        >
          {item.icon && (
            <item.icon size={20} />
          )}
        </Link>
      </div>
    );
  }

  /**
   * EXPANDED
   */
  return (
    <div className="relative">
      {/* Accent bar */}
      {isActive && (
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
      )}

      <Link
        href={item.href || "#"}
        className={clsx(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground/60 hover:text-foreground hover:bg-surface"
        )}
      >
        {/* Icon */}
        {item.icon && (
          <span
            className={clsx(
              "shrink-0",
              isActive
                ? "text-primary"
                : "text-foreground/50"
            )}
          >
            <item.icon size={18} />
          </span>
        )}

        {/* Label */}
        <span className="truncate">
          {item.label}
        </span>
      </Link>
    </div>
  );
}