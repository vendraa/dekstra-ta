import { formatDateTime } from "@/lib/date-formatter";

type RawHistoryItem = {
  status: string;  
  actor?: string;
  timestamp: string;
  description: string;
};

type RawResponse = {
  nomor_permohonan: string;
  jenis_surat: { nama: string };
  riwayat: RawHistoryItem[];
};

export interface RequestDetailData {
  id: string;
  letterType: string;
  currentStatus: string;
  history: {
    status: string;
    timestamp: string;
    description: string;
    actor?: string;
  }[];
}

function normalize(value?: string) {
  return value?.toUpperCase().replace(/\s+/g, "_");
}

function mapHistoryStatus(status: string, actor?: string): string {
  const s = normalize(status);
  const a = normalize(actor);

  if (s === "AJUKAN") return "Pengajuan Dikirim";
  if (s === "TOLAK") return "Pengajuan Ditolak";

  if (s === "SETUJU") {
    switch (a) {
      case "RT": return "Diverifikasi RT";
      case "RW": return "Diverifikasi RW";
      case "ADMIN": return "Diverifikasi Admin";
      case "KEPALA_DESA":
      case "KADES":
        return "Pengajuan Disetujui";
    }
  }

  return "-";
}

function deriveCurrentStatus(riwayat: RawHistoryItem[]): string {
  if (!riwayat.length) return "UNKNOWN";

  const last = riwayat[riwayat.length - 1];

  const status = normalize(last.status);
  const actor = normalize(last.actor);

  if (status === "TOLAK") return "REJECTED";

  if (status === "SETUJU" && (actor === "KEPALA_DESA" || actor === "KADES")) {
    return "COMPLETED";
  }

  if (status === "SETUJU") {
    switch (actor) {
      case "RT": return "RW_REVIEW";
      case "RW": return "ADMIN_REVIEW";
      case "ADMIN": return "KADES_SIGN";
    }
  }

  if (status === "AJUKAN") {
    return "RT_REVIEW";
  }

  return "UNKNOWN";
}

function mapActorLabel(status: string, actor?: string): string | undefined {
  if (status === "Ajukan") return "Saya";

  if (!actor) return undefined;

  switch (actor) {
    case "RT": return "RT";
    case "RW": return "RW";
    case "ADMIN": return "Admin";
    case "KEPALA_DESA": return "Kepala Desa";
    default: return actor;
  }
}

function mapDescription(status: string, actor?: string, description?: string): string {
  const s = normalize(status);
  const a = normalize(actor);

  if (s === "TOLAK") {
    return description || "Pengajuan ditolak tanpa keterangan.";
  }

  if (s === "AJUKAN") {
    return "Pengajuan Anda telah dikirim dan sedang menunggu verifikasi dari RT.";
  }

  if (s === "SETUJU") {
    switch (a) {
      case "RT":
        return "Pengajuan telah diverifikasi oleh RT dan diteruskan ke RW.";
      case "RW":
        return "Pengajuan telah diverifikasi oleh RW dan diteruskan ke Admin.";
      case "ADMIN":
        return "Pengajuan telah diverifikasi oleh Admin dan menunggu persetujuan Kepala Desa.";
      case "KEPALA_DESA":
      case "KADES":
        return "Pengajuan telah disetujui oleh Kepala Desa.";
    }
  }

  return "-";
}

export async function getDetailPengajuan(nomor: string): Promise<RequestDetailData> {
  const res = await fetch(`/api/riwayat-pengajuan/${nomor}`, {
    cache: "no-store",
  });

  const data: unknown = await res.json();

  if (!res.ok) {
    const err = data as { message?: string };
    throw new Error(err.message || "Gagal ambil detail");
  }

  const raw = data as RawResponse;

  const currentStatus = deriveCurrentStatus(raw.riwayat);

  console.log("RAW RIWAYAT:", raw.riwayat);

  return {
    id: raw.nomor_permohonan,
    letterType: raw.jenis_surat.nama,
    currentStatus,

    history: raw.riwayat.map((item) => ({
      status: mapHistoryStatus(item.status, item.actor),
      timestamp: formatDateTime(item.timestamp),
      description: mapDescription(item.status, item.actor, item.description),
      actor: mapActorLabel(item.status, item.actor),
    }))
  };
}