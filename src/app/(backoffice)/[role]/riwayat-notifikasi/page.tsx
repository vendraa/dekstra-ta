import { RiwayatNotifikasiPage } from "@/features/notifications/components/riwayat-notifikasi-page";

type Role = "WARGA" | "RT" | "RW" | "ADMIN" | "KADES";

function mapRoleFromSegment(segment?: string): Role {
  switch (segment) {
    case "rt":
      return "RT";
    case "rw":
      return "RW";
    case "admin":
      return "ADMIN";
    case "kades":
      return "KADES";
    default:
      return "WARGA";
  }
}

interface Props {
  params: Promise<{ role?: string }>; 
}

export default async function BackofficeRiwayatNotifikasiPage({
  params,
}: Props) {
  const resolvedParams = await params;

  const role = mapRoleFromSegment(resolvedParams?.role);

  // 🔥 DEBUG (hapus nanti kalau sudah OK)
  console.log("ROLE SEGMENT:", resolvedParams?.role);
  console.log("MAPPED ROLE:", role);

  return <RiwayatNotifikasiPage role={role} />;
}