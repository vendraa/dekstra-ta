import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

runRenderingTest({
  testName: "dashboard-warga",

  pages: [
    {
      name: "csr",

      role: "warga",

      url:
        `${BASE_URL}/dashboard-csr`,
    },

    {
      name: "ssr",

      role: "warga",

      url:
        `${BASE_URL}/dashboard-ssr`,
    },

    {
      name: "ssg",

      role: "warga",

      url:
        `${BASE_URL}/dashboard-ssg`,
    },
  ],
}).catch(console.error);