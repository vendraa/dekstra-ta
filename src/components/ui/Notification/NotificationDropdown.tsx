"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import NotificationItem from "./NotificationItem";
import { Notifikasi } from "@/features/notifications/services/notifikasi.service";

type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

interface Props {
  notifications: Notifikasi[];
  isOpen: boolean;
  onClose: () => void;
  role: Role;
  onRead?: (id: number) => void;
  loading?: boolean;
  error?: string | null;
}

function getNotificationPath(role: Role): string {
  switch (role) {
    case "RT":
      return "/rt/riwayat-notifikasi";
    case "RW":
      return "/rw/riwayat-notifikasi";
    case "ADMIN":
      return "/admin/riwayat-notifikasi";
    case "KADES":
      return "/kades/riwayat-notifikasi";
    case "WARGA":
    default:
      return "/riwayat-notifikasi";
  }
}

export default function NotificationDropdown({
  notifications,
  isOpen,
  onClose,
  role,
  onRead,
  loading = false,
  error = null,
}: Props) {
  const seeAllHref = getNotificationPath(role);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200
          sm:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <div
        className={`
          z-50 bg-white border border-gray-100

          fixed bottom-0 left-0 right-0
          rounded-t-2xl shadow-2xl
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}

          sm:absolute sm:bottom-auto sm:left-auto
          sm:right-0 sm:top-full sm:mt-3
          sm:w-80 sm:rounded-xl sm:shadow-xl
          sm:transition-all sm:duration-200 sm:ease-out sm:origin-top-right
          sm:translate-y-0
          ${
            isOpen
              ? "sm:opacity-100 sm:scale-100"
              : "sm:opacity-0 sm:scale-95 sm:-translate-y-2 sm:pointer-events-none"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/60">
          <span className="font-heading font-bold text-foreground">
            Notifikasi
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center text-sm text-muted-foreground py-10">
              Memuat notifikasi...
            </p>
          ) : error ? (
            <p className="text-center text-sm text-red-500 py-10">
              {error}
            </p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-10">
              Tidak ada notifikasi
            </p>
          ) : (
            notifications.slice(0, 5).map((notif) => (
              <NotificationItem
                key={notif.id}
                notif={notif}
                role={role}
                onRead={onRead} 
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100/50">
          <Link
            href={seeAllHref}
            onClick={onClose}
            className={`block text-center py-3 px-4 text-sm font-medium
                       text-gray-700 bg-white border border-gray-300 rounded-lg
                       hover:bg-gray-50 hover:border-gray-400 transition`}
          >
            Lihat Semua
          </Link>
        </div>
      </div>
    </>
  );
}