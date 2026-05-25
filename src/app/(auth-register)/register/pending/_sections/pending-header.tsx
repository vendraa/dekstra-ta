import { MailCheck, Clock } from "lucide-react";

export function PendingHeader() {
  return (
    <>
      {/* Icon */}
      <div className="relative">
        <div className={`w-20 h-20 rounded-full bg-primary/10
                        flex items-center justify-center`}>
          <MailCheck className="w-10 h-10 text-primary" />
        </div>
        <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full
                        bg-amber-100 flex items-center justify-center
                        border-2 border-white`}>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          Pendaftaran Berhasil!
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Akun Anda sedang dalam proses verifikasi oleh Admin.
          Proses ini biasanya memakan waktu{" "}
          <span className="font-medium text-foreground">1x24 jam</span>{" "}
          pada hari kerja.
        </p>
      </div>
    </>
  );
}