"use client";

import { useEffect, useState } from "react";
import {
  getNotifikasi,
  tandaiDibaca,
  Notifikasi,
} from "../services/notifikasi.service";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notifikasi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadNotifications() {
    try {
      setLoading(true);
      setError(null);

      const data = await getNotifikasi();

      setNotifications(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (n) => !n.sudah_dibaca
  ).length;

  async function markAsRead(id: number) {
    try {
      await tandaiDibaca(id);

      // optimistic update
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id
            ? {
                ...notif,
                sudah_dibaca: true,
                dibaca_at: new Date().toISOString(),
              }
            : notif
        )
      );
    } catch (err) {
      console.error("Gagal tandai notifikasi:", err);
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    reload: loadNotifications,
    markAsRead,
  };
}