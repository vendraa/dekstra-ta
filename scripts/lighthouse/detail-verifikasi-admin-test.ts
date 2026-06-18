import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

const SLUG =
  "40-2026-06-B02-40";

runRenderingTest({
  testName:
    "detail-verifikasi-admin",

  pages: [
    {
      name: "csr",

      role: "admin",

      url:
        `${BASE_URL}/admin/surat/verifikasi-csr/${SLUG}`,
    },

    {
      name: "ssr",

      role: "admin",

      url:
        `${BASE_URL}/admin/surat/verifikasi-ssr/${SLUG}`,
    },

    {
      name: "ssg",

      role: "admin",

      url:
        `${BASE_URL}/admin/surat/verifikasi-ssg/${SLUG}`,
    },
  ],
}).catch(console.error);