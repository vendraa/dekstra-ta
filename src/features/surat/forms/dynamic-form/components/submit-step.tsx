"use client";

import { CheckCircle2 } from "lucide-react";
import { CheckboxField } from "../../fields/checkbox-field";

interface SubmitStepProps {
  steps:      { key: string; label: string }[];
  onGoToStep: (index: number) => void;
}

const HIGHLIGHTS = [
  "Periksa kembali setiap data yang telah Anda isi sebelum mengirim pengajuan.",
  "Pastikan tidak ada kesalahan dalam pengisian data. Kesalahan pengisian tidak dapat diperbaiki setelah pengajuan dikirim.",
  "Jika ingin memperbaiki data, klik kartu di bawah untuk kembali ke langkah tertentu.",
];

export function SubmitStep({ steps, onGoToStep }: SubmitStepProps) {
  return (
    <div className="space-y-6">

      {/* ── HIGHLIGHT BULLETS ── */}
      <ul className="space-y-2 rounded-lg bg-secondary/10 px-4 py-3">
        {HIGHLIGHTS.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-secondary" />
            <span className="text-sm text-secondary font-medium leading-snug">
              {point}
            </span>
          </li>
        ))}
      </ul>

      {/* ── CARD BUTTON STEP ── */}
      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <button
            key={step.key}
            type="button"
            onClick={() => onGoToStep(index)}
            className="flex items-center justify-between gap-3 px-4 py-4
                       bg-primary text-white rounded-xl min-h-16
                       hover:bg-primary/90 hover:cursor-pointer active:scale-[0.98]
                       transition-all duration-200 text-sm font-medium
                       min-w-35 flex-1"
          >
            <div className="flex items-center gap-3">
              {/* Nomor step */}
              <span className="flex size-6 shrink-0 items-center justify-center
                               rounded-full bg-white/20 text-xs font-bold">
                {index + 1}
              </span>
              <span>{step.label}</span>
            </div>
            <CheckCircle2 size={18} className="shrink-0 text-white/80" />
          </button>
        ))}
      </div>

      {/* ── PERNYATAAN ── */}
      <div className="space-y-3 pt-2">
        <CheckboxField
          name="pernyataan_kebenaran_data"
          label="Saya Menyatakan Data Yang Saya Kirim Sudah Benar dan Jika Kemudian Hari Terjadi Masalah Hukum Maka Saya Siap Mempertanggungjawabkan Data Yang Saya Kirim"
        />
        <CheckboxField
          name="pernyataan_proses_data"
          label="Saya Menyetujui Bahwa Permohonan Data Akan Diproses Pada Hari dan Jam Kerja, Apabila Permohonan Data Diajukan Di Luar Hari dan Jam Kerja Maka Permohonan Akan Diproses Pada Hari dan Jam Kerja Berikutnya"
        />
      </div>

    </div>
  );
}