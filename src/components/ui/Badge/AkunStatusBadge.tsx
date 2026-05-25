import StatusBadge from "./StatusBadge";
import { AccountStatus } from "@/features/akun/types/akun.types";

export const AccountStatusConfig = {
  [AccountStatus.PENDING_VERIFICATION]: {
    label: "Menunggu Verifikasi",
    className: "bg-yellow-100 text-yellow-700",
  },
  [AccountStatus.VERIFIED]: {
    label: "Disetujui",
    className: "bg-green-100 text-green-700",
  },
  [AccountStatus.REJECTED]: {
    label: "Ditolak",
    className: "bg-red-100 text-red-700",
  },
};

export function AkunStatusBadge({ status }: { status?: AccountStatus }) {
  const config = AccountStatusConfig[status as AccountStatus];

  if (!config) {
    return (
      <StatusBadge
        label="Unknown"
        className="bg-gray-100 text-gray-500"
      />
    );
  }

  return (
    <StatusBadge
      label={config.label}
      className={config.className}
    />
  );
}