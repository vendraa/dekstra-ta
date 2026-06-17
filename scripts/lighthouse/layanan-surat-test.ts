import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

runRenderingTest({
  testName: "layanan-surat",

  pages: [
    {
      name: "csr",
      url:
        "http://localhost:3000/pengajuan-baru-csr",
    },

    {
      name: "ssr",
      url:
        "http://localhost:3000/pengajuan-baru-ssr",
    },

    {
      name: "ssg",
      url:
        "http://localhost:3000/pengajuan-baru-ssg",
    },
  ],
}).catch(console.error);