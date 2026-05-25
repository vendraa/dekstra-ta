// detail-pengajuan-timeline.tsx

import {
  Send, XCircle,
  ClipboardCheck, PenLine,
} from "lucide-react";
import { ApprovalLog, RequestLifecycle } from "../../types/types";

interface Props {
  lifecycle:  RequestLifecycle;
  approvals:  ApprovalLog[];
  createdAt:  string;
}

/* Label dan urutan kolom timeline */
const TIMELINE_STEPS = [
  { key: "SENT",        label: "Pengajuan Dikirim"          },
  { key: "RT_REVIEW",   label: "Diverifikasi RT"            },
  { key: "RW_REVIEW",   label: "Diverifikasi RW"            },
  { key: "ADMIN_REVIEW", label: "Diverifikasi Admin"        },
  { key: "KADES_SIGN",  label: "Disetujui Kades"            },
] as const;

type StepKey = typeof TIMELINE_STEPS[number]["key"];

interface TimelineCell {
  status:   "done" | "rejected" | "pending";
  date?:    string;
  note?:    string;
  actedBy?: string;
}

/* Map approval role ke step key */
const roleToStep: Record<string, StepKey> = {
  RT:    "RT_REVIEW",
  RW:    "RW_REVIEW",
  ADMIN: "ADMIN_REVIEW",
  KADES: "KADES_SIGN",
};

function buildCells(
  lifecycle:  RequestLifecycle,
  approvals:  ApprovalLog[],
  createdAt:  string,
): Record<StepKey, TimelineCell> {
  const cells: Partial<Record<StepKey, TimelineCell>> = {};

  // Pengajuan Dikirim — selalu ada
  cells["SENT"] = { status: "done", date: createdAt };

  approvals.forEach((log) => {
    const step = roleToStep[log.role];
    if (!step) return;

    cells[step] = {
      status:   log.status === "APPROVED" ? "done" : "rejected",
      date:     log.actedAt,
      note:     log.note,
      actedBy:  log.actedBy,
    };
  });

  return cells as Record<StepKey, TimelineCell>;
}

const stepIcon: Record<string, React.ReactNode> = {
  SENT:         <Send          size={13} />,
  RT_REVIEW:    <ClipboardCheck size={13} />,
  RW_REVIEW:    <ClipboardCheck size={13} />,
  ADMIN_REVIEW: <ClipboardCheck size={13} />,
  KADES_SIGN:   <PenLine        size={13} />,
};

const statusColor: Record<TimelineCell["status"], string> = {
  done:     "bg-primary text-white",
  rejected: "bg-danger  text-white",
  pending:  "bg-muted   text-muted-foreground",
};

export function DetailPengajuanTimeline({ lifecycle, approvals, createdAt }: Props) {
  const cells = buildCells(lifecycle, approvals, createdAt);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Riwayat Proses
      </p>

      {/* Scroll horizontal di mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-140 text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              {TIMELINE_STEPS.map((step, i) => {
                const cell = cells[step.key];
                const hasData = !!cell;

                return (
                  <th
                    key={step.key}
                    className={`
                      px-3 py-2.5 text-left text-xs font-semibold
                      border-t border-b border-border
                      ${i === 0 ? "border-l rounded-tl-xl rounded-bl-xl" : ""}
                      ${i === TIMELINE_STEPS.length - 1 ? "border-r rounded-tr-xl rounded-br-xl" : ""}
                      ${hasData && cell.status === "done"     ? "bg-primary/10 text-primary"   : ""}
                      ${hasData && cell.status === "rejected" ? "bg-danger/10  text-danger"    : ""}
                      ${!hasData                              ? "bg-muted/40   text-muted-foreground" : ""}
                    `}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`
                        w-5 h-5 rounded-full flex items-center justify-center shrink-0
                        ${hasData ? statusColor[cell.status] : "bg-muted text-muted-foreground"}
                      `}>
                        {hasData && cell.status === "rejected"
                          ? <XCircle size={11} />
                          : stepIcon[step.key]
                        }
                      </span>
                      {step.label}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            <tr>
              {TIMELINE_STEPS.map((step, i) => {
                const cell = cells[step.key];

                return (
                  <td
                    key={step.key}
                    className={`
                      px-3 py-3 align-top text-xs
                      border-b border-border
                      ${i === 0 ? "border-l" : ""}
                      ${i === TIMELINE_STEPS.length - 1 ? "border-r" : ""}
                    `}
                  >
                    {cell ? (
                      <div className="space-y-0.5">
                        <p className="text-foreground font-medium">{cell.date ?? "-"}</p>
                        {/*
                        {cell.actedBy && (
                          <p className="text-muted-foreground">oleh {cell.actedBy}</p>
                        )}
                        */}
                        {cell.note && (
                          <p className={`leading-snug
                            ${cell.status === "rejected" ? "text-danger" : "text-muted-foreground"}
                          `}>
                            {cell.note}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground/50">—</p>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}