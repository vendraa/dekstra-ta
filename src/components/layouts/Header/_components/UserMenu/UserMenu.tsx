"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/logout/hooks/useLogout";
import Image from "next/image";
import { ChevronDown, User, LogOut } from "lucide-react";
import InitialAvatar from "../../../../ui/Avatar/InitialAvatar";
import UserMenuDropdown from "./UserMenuDropdown";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { TextSkeleton } from "@/components/ui/Skeleton/TextSkeleton";

interface UserMenuProps {
  name?: string;
  avatarUrl?: string;
  size?: number;
}

export default function UserMenu({
  avatarUrl,
  size = 32,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useLogout();

  const { profile, loading } = useProfile();
  const name = profile?.name ?? "";
  const email = profile?.email ?? "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProfile = () => {
    setIsOpen(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const dropdownItems = [
    { label: "Profile", onClick: goToProfile, icon: <User className="w-4 h-4" /> },
    { label: "Logout",  onClick: handleLogout, icon: <LogOut className="w-4 h-4" />, variant: "danger" as const },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {loading ? (
          <div
            className="rounded-full bg-white/20 animate-pulse"
            style={{
              width: size,
              height: size,
            }}
          />
        ) : avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name} Avatar`}
            width={size}
            height={size}
            className="rounded-full object-cover"
          />
        ) : (
          <InitialAvatar
            name={name}
            size={size}
          />
        )}

        <div className="flex items-center gap-1 text-white font-medium">
          {loading ? (
            <TextSkeleton
              width="w-24"
              height="h-5"
            />
          ) : (
            <span>{name}</span>
          )}

          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <UserMenuDropdown
        isOpen={isOpen}
        triggerRef={menuRef}
        items={dropdownItems}
        userName={name}
        userEmail={email}
        avatarUrl={avatarUrl}
        avatarSize={size}
      />
    </div>
  );
}
