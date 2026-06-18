import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

const SLUG =
  "18-2026-06-B02-18";

runRenderingTest({
  testName:
    "detail-verifikasi-rw",

  pages: [
    {
      name: "csr",

      role: "rw",

      url:
        `${BASE_URL}/rw/surat/verifikasi-csr/${SLUG}`,
    },

    {
      name: "ssr",

      role: "rw",

      url:
        `${BASE_URL}/rw/surat/verifikasi-ssr/${SLUG}`,
    },

    {
      name: "ssg",

      role: "rw",

      url:
        `${BASE_URL}/rw/surat/verifikasi-ssg/${SLUG}`,
    },
  ],
}).catch(console.error);