"use client";

import Modal from "@/components/ui/Modal/Modal";
import { X } from "lucide-react";
import { LetterRequest } from "@/features/requests/types/types";
import {
  Clock,
  Send,
  XCircle,
  CheckCircle,
  ClipboardCheck,
  PenLine,
} from "lucide-react";

import StatusBadge from "@/components/ui/Badge/StatusBadge";
import { useEffect, useState } from "react";
import {
  getDetailPengajuan,
  RequestDetailData,
} from "@/features/requests/services/riwayat-pengajuan-detail.service";

/* ================= ICON ================= */

type HistoryIconConfig = {
  icon: React.ReactNode;
  bgClass: string;
};

const historyIconConfig: Record<string, HistoryIconConfig> = {
  "Pengajuan Dikirim": { icon: <Send size={14} />, bgClass: "bg-orange-400 text-white" },
  "Pengajuan Ditolak": { icon: <XCircle size={14} />, bgClass: "bg-danger text-white" },
  "Pengajuan Disetujui": { icon: <CheckCircle size={14} />, bgClass: "bg-primary text-white" },
  "Diverifikasi RT": { icon: <ClipboardCheck size={14} />, bgClass: "bg-yellow-500 text-white" },
  "Diverifikasi RW": { icon: <ClipboardCheck size={14} />, bgClass: "bg-blue-500 text-white" },
  "Diverifikasi Admin": { icon: <ClipboardCheck size={14} />, bgClass: "bg-purple-500 text-white" },
  "Menunggu Persetujuan Kades": { icon: <PenLine size={14} />, bgClass: "bg-indigo-500 text-white" },
};

function HistoryIcon({ status }: { status: string }) {
  const config = historyIconConfig[status];

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config?.bgClass || "bg-muted"}`}>
      {config?.icon || <Clock size={14} />}
    </div>
  );
}

/* ================= STATUS ================= */

function getStatusPresentation(status: string) {
  if (status === "REJECTED") return { label: "Ditolak", className: "status-rejected" };
  if (status === "COMPLETED") return { label: "Disetujui", className: "status-approved" };

  switch (status) {
    case "RT_REVIEW": return { label: "Menunggu Verifikasi RT", className: "status-rt-review" };
    case "RW_REVIEW": return { label: "Menunggu Verifikasi RW", className: "status-rw-review" };
    case "ADMIN_REVIEW": return { label: "Menunggu Verifikasi Admin", className: "status-admin-review" };
    case "KADES_SIGN": return { label: "Menunggu Persetujuan Kades", className: "status-kades-sign" };
    default: return { label: "-", className: "status-default" };
  }
}

/* ================= COMPONENT ================= */

interface Props {
  open: boolean;
  onClose: () => void;
  request: LetterRequest | null;
}

export function RequestDetailModal({ open, onClose, request }: Props) {
  const [data, setData] = useState<RequestDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !request || !request.nomorPermohonan) return;

    let active = true;

    (async () => {
      try {
        setLoading(true);

        const res = await getDetailPengajuan(request.nomorPermohonan);

        if (active) setData(res);
      } catch (err) {
        console.error("gagal ambil detail:", err);
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [open, request]);

  if (!request) return null;

  const presentation = getStatusPresentation(
    data?.currentStatus ?? request.currentStep ?? "UNKNOWN"
  );

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h2 className="font-heading font-bold text-foreground">
              {data?.letterType || "-"}
            </h2>
            <p className="text-sm text-foreground/50 mt-0.5">
              {request.nomorPermohonan}
            </p>
          </div>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* STATUS */}
        <div className="border-y border-border py-4 flex flex-col items-center gap-2">
          <span className="text-sm font-heading font-semibold text-foreground">
            Status
          </span>
          <StatusBadge {...presentation} />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-sm text-muted">
            Memuat...
          </div>
        )}

        {/* HISTORY */}
        {!loading && data && (
          <div className="flex flex-col gap-0">
            {data.history.map((item, index) => {
              const isLast = index === data.history.length - 1;

              return (
                <div key={index} className="flex gap-4">

                  {/* ICON + LINE */}
                  <div className="flex flex-col items-center">
                    <HistoryIcon status={item.status} />

                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-border my-1 min-h-6" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className={`flex flex-col gap-0.5 ${isLast ? "pb-0" : "pb-5"}`}>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">
                        {item.status}
                      </span>

                      <span className="text-xs text-foreground/40">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {item.description}
                    </p>

                    {item.actor && (
                      <span className="text-xs text-foreground/40 mt-0.5">
                        oleh {item.actor}
                      </span>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </Modal>
  );
}