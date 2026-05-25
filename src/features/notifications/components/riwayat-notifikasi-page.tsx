import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Card from "@/components/ui/Card/Card";
import { RiwayatNotifikasiList } from "./riwayat-notifikasi-list";
import { cookies } from "next/headers";
import {
  getNotifikasiServer,
  Notifikasi,
} from "../services/notifikasi.service";

type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

interface Props {
  role: Role;
}

function getDashboardPath(role: Role): string {
  switch (role) {
    case "RT":
      return "/rt/dashboard";
    case "RW":
      return "/rw/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    case "KADES":
      return "/kades/dashboard";
    case "WARGA":
    default:
      return "/dashboard";
  }
}

export async function RiwayatNotifikasiPage({ role }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const notifications: Notifikasi[] =
    await getNotifikasiServer(token);

  const unreadCount = notifications.filter(
    (n) => !n.sudah_dibaca
  ).length;

  const homeHref = getDashboardPath(role);

  return (
    <div className="space-y-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Riwayat Notifikasi
        </h1>

        {unreadCount > 0 && (
          <span className="text-xs font-medium text-primary bg-white px-2.5 py-1 rounded-full">
            {unreadCount} belum dibaca
          </span>
        )}
      </div>

      <Breadcrumb
        homeHref={homeHref}
        items={[{ label: "Riwayat Notifikasi" }]}
      />

      <Card className="p-5">
        <RiwayatNotifikasiList notifications={notifications} role={role} />
      </Card>
    </div>
  );
}