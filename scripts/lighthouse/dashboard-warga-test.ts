import { config } from "dotenv";

import {
  runRenderingTest,
} from "../shared/test-runner";

config({ path: ".env" });

runRenderingTest({
  testName: "dashboard-warga",

  pages: [
    {
      name: "csr",
      url:
        "http://localhost:3000/dashboard-csr",
    },

    {
      name: "ssr",
      url:
        "http://localhost:3000/dashboard-ssr",
    },

    {
      name: "ssg",
      url:
        "http://localhost:3000/dashboard-ssg",
    },
  ],
}).catch(console.error);