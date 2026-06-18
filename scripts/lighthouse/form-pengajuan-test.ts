import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

runRenderingTest({
  testName: "form-pengajuan",

  pages: [
    {
      name: "csr",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-csr/formulir-pendaftaran-perpindahan-penduduk`,
    },

    {
      name: "ssr",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-ssr/formulir-pendaftaran-perpindahan-penduduk`,
    },

    {
      name: "ssg",

      role: "warga",

      url:
        `${BASE_URL}/pengajuan-baru-ssg/formulir-pendaftaran-perpindahan-penduduk`,
    },
  ],
}).catch(console.error);