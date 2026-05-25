"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { LogOut, User, MoreVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { useLogout } from "@/features/auth/logout/hooks/useLogout";
import { useProfile } from "@/features/profile/hooks/useProfile";

export interface SidebarUserProfileProps {
  name: string;
  email: string;
  avatar?: string;
  role?: "warga" | "rt" | "rw" | "admin" | "kades";
  isCollapsed?: boolean;
}

export function SidebarUserProfile({
  avatar,
  role = "warga",
  isCollapsed = false,
}: SidebarUserProfileProps) {
  const { profile } = useProfile();

  const name = profile?.name ?? "Loading...";
  const email = profile?.email ?? "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const { logout } = useLogout();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const profileUrl =
    role === "warga" ? "/profile" : `/${role}/profile`;

  /* ── Hitung posisi berdasarkan mode ── */
  const updateMenuPos = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    if (isCollapsed) {
      setMenuPos({
        top: rect.top,
        left: rect.right + 8,
      });
    } else {
      setMenuPos({
        top: rect.top - 8,
        left: rect.left,
      });
    }
  }, [isCollapsed]);

  const handleToggle = () => {
    updateMenuPos();
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  /* ── Klik luar ── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      )
        return;

      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Recalculate posisi ── */
  useEffect(() => {
    if (!menuOpen) return;

    const handler = () => updateMenuPos();

    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [menuOpen, updateMenuPos]);

  /* ── Menu content ── */
  const menuContent = (
    <div
      ref={menuRef}
      className="bg-white border border-border rounded-xl shadow-lg overflow-hidden min-w-50"
    >
      <div className="px-4 py-3 border-b border-border">
        <p className="text-xs font-bold text-foreground truncate">
          {name}
        </p>
        <p className="text-[11px] text-foreground/50 truncate">
          {email}
        </p>
      </div>

      <div className="py-1">
        <Link
          href={profileUrl}
          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-foreground/70 hover:bg-surface hover:text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          <User size={14} />
          Profil Saya
        </Link>

        <button
          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={14} />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="px-3 py-3">
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={clsx(
          "w-full flex items-center gap-2.5 bg-primary rounded-xl px-3 py-2.5 transition-opacity",
          menuOpen && "opacity-90"
        )}
      >
        <AvatarContent avatar={avatar} name={name} />

        {!isCollapsed && (
          <div className="flex-1 min-w-0 text-left">
            <p className="text-white text-xs font-bold truncate">
              {name}
            </p>
            <p className="text-white/70 text-[10px] truncate">
              {email}
            </p>
          </div>
        )}

        <ThreeDotsIcon />
      </button>

      {/* Portal Menu */}
      {menuOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed z-9999"
            style={{
              top: menuPos.top,
              left: menuPos.left,
              transform: isCollapsed
                ? "none"
                : "translateY(-100%)",
            }}
          >
            {menuContent}
          </div>,
          document.body
        )}
    </div>
  );
}

/* ── Sub-komponen ── */

import InitialAvatar from "@/components/ui/Avatar/InitialAvatar";

function AvatarContent({
  avatar,
  name,
}: {
  avatar?: string;
  name: string;
}) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
      {avatar ? (
        <Image
          src={avatar}
          alt={name}
          width={32}
          height={32}
          className="object-cover w-full h-full"
        />
      ) : (
        <InitialAvatar name={name} size={32} />
      )}
    </div>
  );
}

function ThreeDotsIcon() {
  return <MoreVertical size={14} className="text-white/70 shrink-0" />;
}