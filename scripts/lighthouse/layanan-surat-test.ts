import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

runRenderingTest({
  testName: "layanan-surat",

  pages: [
    {
      name: "csr",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-csr`,
    },

    {
      name: "ssr",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-ssr`,
    },

    {
      name: "ssg",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-ssg`,
    },
  ],
}).catch(console.error);