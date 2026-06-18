import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

const BASE_URL =
  process.env.LIGHTHOUSE_BASE_URL!;

runRenderingTest({
  testName:
    "dashboard-admin",

  pages: [
    {
      name: "csr",

      role: "admin",

      url:
        `${BASE_URL}/admin/dashboard-csr`,
    },

    {
      name: "ssr",

      role: "admin",

      url:
        `${BASE_URL}/admin/dashboard-ssr`,
    },

    {
      name: "ssg",

      role: "admin",

      url:
        `${BASE_URL}/admin/dashboard-ssg`,
    },
  ],
}).catch(console.error);