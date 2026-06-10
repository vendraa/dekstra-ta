import { getRiwayatPengajuanServer} from "./riwayat=pengajuan.server.service"

export async function getRiwayatPengajuanStatic() {
  return getRiwayatPengajuanServer(
    "force-cache"
  );
}