import { z } from "zod";

export const SubmitSchema = z.object({
  pernyataan_kebenaran_data: z
    .boolean()
    .refine((val) => val === true, {
      message: "Anda harus menyetujui pernyataan ini sebelum mengirim",
    }),

  pernyataan_proses_data: z
    .boolean()
    .refine((val) => val === true, {
      message: "Anda harus menyetujui pernyataan ini sebelum mengirim",
    }),
});