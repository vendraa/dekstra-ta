import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

const SLUG =
  "44-2026-06-B09-44";

runRenderingTest({
  testName:
    "detail-persetujuan-kades",

  pages: [
    {
      name: "csr",

      role: "kades",

      url:
        `${BASE_URL}/kades/surat/menunggu-persetujuan-csr/${SLUG}`,
    },

    {
      name: "ssr",

      role: "kades",

      url:
        `${BASE_URL}/kades/surat/menunggu-persetujuan-ssr/${SLUG}`,
    },

    {
      name: "ssg",

      role: "kades",

      url:
        `${BASE_URL}/kades/surat/menunggu-persetujuan-ssg/${SLUG}`,
    },
  ],
}).catch(console.error);