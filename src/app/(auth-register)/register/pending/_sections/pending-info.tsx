import { Mail } from "lucide-react";

const STEPS = [
  "Admin akan memverifikasi data dan dokumen yang Anda kirimkan.",
  "Anda akan mendapatkan notifikasi melalui email yang Anda daftarkan.",
  "Setelah diverifikasi, Anda dapat masuk menggunakan akun yang telah terdaftar.",
];

interface PendingInfoProps {
  maskedEmail: string;
}

export function PendingInfo({ maskedEmail }: PendingInfoProps) {
  return (
    <>
      {/* Email info */}
      <div className={`w-full flex items-center gap-3 bg-primary/5 border
                      border-primary/20 rounded-2xl px-4 py-3`}>
        <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center
                        justify-center shrink-0`}>
          <Mail className="w-4 h-4 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-xs text-muted-foreground">
            Notifikasi akan dikirimkan ke
          </p>
          <p className="text-sm font-semibold text-foreground">
            {maskedEmail}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className={`w-full bg-muted/40 border border-border
                      rounded-2xl px-5 py-4 space-y-2 text-left`}>
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
          Apa yang terjadi selanjutnya?
        </p>
        <ul className="space-y-2">
          {STEPS.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-0.5 w-4 h-4 rounded-full bg-primary/20
                               flex items-center justify-center shrink-0`}>
                <span className="text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
              </span>
              <span className="text-xs text-foreground/70 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Note */}
      <p className="text-xs text-muted-foreground">
        Jika Anda tidak menerima email dalam 24 jam, silakan hubungi
        kantor desa setempat untuk informasi lebih lanjut.
      </p>
    </>
  );
}