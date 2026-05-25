"use client";

import { useState } from "react";
import { Mail, CheckCheck } from "lucide-react";
import { Notifikasi, tandaiDibaca } from "../services/notifikasi.service";
import NotificationItem from "@/components/ui/Notification/NotificationItem";
import Button from "@/components/ui/Button/Button";

type FilterType = "semua" | "belum-dibaca" | "sudah-dibaca";
type UserRole = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "Semua", value: "semua" },
  { label: "Belum Dibaca", value: "belum-dibaca" },
  { label: "Sudah Dibaca", value: "sudah-dibaca" },
];

interface Props {
  notifications: Notifikasi[];
  role: UserRole;
  onRead?: (id: number) => void;
}

export function RiwayatNotifikasiList({
  notifications: initial,
  role,
  onRead,
}: Props) {
  const [notifications, setNotifications] = useState(initial);
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("semua");

  // 🔹 Tandai semua dibaca
  const handleMarkAllRead = async () => {
    try {
      // ambil notif yang belum dibaca saja
      const unreadNotifications = notifications.filter(
        (n) => !n.sudah_dibaca
      );

      await Promise.all(
        unreadNotifications.map((notif) =>
          tandaiDibaca(notif.id)
        )
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          sudah_dibaca: true,
          dibaca_at: new Date().toISOString(),
        }))
      );
    } catch (error) {
      console.error("Gagal tandai semua notifikasi:", error);
    }
  };

  // 🔹 Klik notifikasi
  const handleRead = (id: number) => {
    onRead?.(id);

    // optimistic update lokal
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              sudah_dibaca: true,
              dibaca_at: new Date().toISOString(),
            }
          : n
      )
    );
  };

  // 🔹 Filter logic
  const filtered = notifications.filter((n) => {
    if (activeFilter === "belum-dibaca") return !n.sudah_dibaca;
    if (activeFilter === "sudah-dibaca") return n.sudah_dibaca;
    return true;
  });

  const hasUnread = notifications.some((n) => !n.sudah_dibaca);

  return (
    <div className="space-y-4">
      {/* ── TOOLBAR ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200
                ${
                  activeFilter === f.value
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {hasUnread && (
          <Button
            type="button"
            size="md"
            onClick={handleMarkAllRead}
            className="bg-primary text-white gap-2 hover:bg-primary/80 transition-colors"
          >
            <CheckCheck size={14} />
            <span>Tandai semua dibaca</span>
          </Button>
        )}
      </div>

      {/* ── LIST ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Mail className="w-10 h-10 mb-3 opacity-40" />
          <p className="text-sm">Tidak ada notifikasi</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 rounded-2xl overflow-hidden">
          {filtered.map((notif) => (
            <NotificationItem
              key={notif.id}
              notif={notif}
              role={role}
              onRead={handleRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}