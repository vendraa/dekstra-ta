"use client";

import { useState, useRef, useEffect } from "react";
import NotificationButton from "./NotificationButton";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

interface Props {
  buttonClassName?: string;
  iconClassName?: string;
  role: Role;
}

export default function NotificationMenu({
  buttonClassName,
  iconClassName,
  role,
}: Props) {
  const { notifications, unreadCount } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <NotificationButton
        unreadCount={unreadCount}
        onClick={() => setIsOpen((prev) => !prev)}
        className={buttonClassName}
        iconClassName={iconClassName}
      />

      <NotificationDropdown
        notifications={notifications}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        role={role}
      />
    </div>
  );
}