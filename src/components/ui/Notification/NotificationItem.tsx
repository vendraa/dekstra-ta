"use client";

import { useState }            from "react";
import { Mail }                from "lucide-react";
import { Notifikasi, tandaiDibaca } from "@/features/notifications/services/notifikasi.service";
import { RequestDetailModal }  from "@/features/requests/ui/modal-detail/RequestDetailModal";
import { LetterRequest, RequestStep } from "@/features/requests/types/types";
import { getDetailPengajuan }  from "@/features/requests/services/riwayat-pengajuan-detail.service";

const VALID_STEPS: RequestStep[] = [
  "RT_REVIEW", "RW_REVIEW", "ADMIN_REVIEW", "KADES_SIGN", "DONE",
];

function toRequestStep(value: string): RequestStep | undefined {
  return VALID_STEPS.includes(value as RequestStep)
    ? (value as RequestStep)
    : undefined;
}

type UserRole = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

interface Props {
  notif:   Notifikasi;
  role:    UserRole;
  onRead?: (id: number) => void;
}

export default function NotificationItem({ notif, role, onRead }: Props) {
  const [modalOpen,       setModalOpen]       = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null);
  const [loading,         setLoading]         = useState(false);

  const [isRead, setIsRead] = useState(notif.sudah_dibaca);

  const isUnread = !isRead;
  const isWarga = role === "WARGA";

  const handleClick = async () => {

    /**
     * Mark as read optimistic update
     */
    if (isUnread) {
      setIsRead(true);

      try {
        await tandaiDibaca(notif.id);

        onRead?.(notif.id);

      } catch (error) {
        setIsRead(false);

        console.error(
          "Gagal menandai notifikasi dibaca:",
          error
        );

        return;
      }
    }

    /**
     * Selain WARGA:
     * cukup mark as read saja
     */
    if (!isWarga) {
      return;
    }

    /**
     * WARGA:
     * buka modal detail pengajuan
     */
    if (!notif.nomor_permohonan) {
      return;
    }

    try {
      setLoading(true);

      const detail =
        await getDetailPengajuan(
          notif.nomor_permohonan
        );

      const mapped: LetterRequest = {
        nomorPermohonan:
          notif.nomor_permohonan,

        letterType:
          detail.letterType,

        currentStep:
          toRequestStep(
            detail.currentStatus
          ),

        lifecycle: "IN_PROGRESS",

        id: "",
        nik: "",
        name: "",
        createdAt: "",
        updatedAt: "",
      };

      setSelectedRequest(mapped);

      setModalOpen(true);

    } catch (error) {
      console.error(
        "Gagal ambil detail pengajuan:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`w-full text-left flex gap-3 px-4 py-3 text-sm transition
          hover:bg-gray-50 active:scale-[0.99]
          ${isUnread ? "bg-green-50" : ""}
          ${loading  ? "opacity-60"  : ""}
          ${notif.nomor_permohonan ? "cursor-pointer" : "cursor-default"}`}
      >
        <div
          className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full
            ${isUnread ? "bg-primary/10" : "bg-gray-100"}`}
        >
          <Mail
            className={`w-5 h-5 ${isUnread ? "text-primary" : "text-gray-500"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className={`font-medium ${isUnread ? "text-gray-900" : "text-gray-600"}`}>
              {notif.judul}
            </span>
            {isUnread && (
              <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-primary" />
            )}
          </div>
          <div className="text-gray-500 text-xs line-clamp-2">{notif.pesan}</div>
          <div className="text-gray-400 text-[11px] mt-1">
            {formatTime(notif.created_at)}
          </div>
        </div>
      </button>

      <RequestDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        request={selectedRequest}
      />
    </>
  );
}

function formatTime(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day:    "numeric",
    month:  "short",
    hour:   "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}