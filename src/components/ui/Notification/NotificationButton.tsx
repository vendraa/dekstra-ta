"use client";

import { Bell } from "lucide-react";
import clsx from "clsx";

interface Props {
  unreadCount: number;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}
export default function NotificationButton({
  unreadCount,
  onClick,
  className,
  iconClassName,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative w-10 h-10 flex items-center justify-center rounded-full transition cursor-pointer", 
        className
      )}
    >
      <Bell className={clsx(
          "w-5 h-5", 
          iconClassName
        )} 
      />

      {unreadCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 
          min-w-4.5 h-4.5 px-1
          flex items-center justify-center
          text-[10px] font-semibold text-white
          bg-red-500 rounded-full`}
        >
          {unreadCount}
        </span>
      )}
    </button>
  );
}