import { Account } from "@/features/akun/types/akun.types";
import ReadOnlyField from "@/components/ui/Field/ReadOnlyField";
import { formatDateIndo } from "@/lib/formatDate";

interface Props {
  account: Account;
}

export default function RegistrationDataSection({ account }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">
        Data Pendaftaran
      </h2>

      {/* FIX: Single column — label kiri, value kanan dalam satu baris */}
      <div className="flex flex-col gap-3">
        <ReadOnlyField
          label="Nomor Kartu Keluarga (KK)"
          value={account.kkNumber}
        />
        <ReadOnlyField
          label="Nomor Induk Kependudukan (NIK)"
          value={account.nik}
        />
        <ReadOnlyField
          label="Nama Lengkap"
          value={account.fullName}
        />
        <ReadOnlyField
          label="Tempat Lahir"
          value={account.birthPlace}
        />
        <ReadOnlyField
          label="Tanggal Lahir"
          value={formatDateIndo(account.birthDate)}
        />
        <ReadOnlyField label="Jenis Kelamin" value={account.gender} />
        <ReadOnlyField label="Agama" value={account.religion} />
        <ReadOnlyField
          label="Alamat Lengkap"
          value={account.address}
          multiline
        />
        <ReadOnlyField label="RT" value={account.rt} />
        <ReadOnlyField label="RW" value={account.rw} />
        <ReadOnlyField
          label="Nomor Telepon"
          value={account.phone}
        />
        <ReadOnlyField
          label="Email"
          value={account.email}
        />
      </div>
    </div>
  );
}