import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

const SLUG =
  "6-2026-06-B02-6";

runRenderingTest({
  testName:
    "detail-verifikasi-rt",

  pages: [
    {
      name: "csr",

      role: "rt",

      url:
        `${BASE_URL}/rt/surat/verifikasi-csr/${SLUG}`,
    },

    {
      name: "ssr",

      role: "rt",

      url:
        `${BASE_URL}/rt/surat/verifikasi-ssr/${SLUG}`,
    },

    {
      name: "ssg",

      role: "rt",

      url:
        `${BASE_URL}/rt/surat/verifikasi-ssg/${SLUG}`,
    },
  ],
}).catch(console.error);