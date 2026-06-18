import fs from "node:fs";
import path from "node:path";

import { RUNS } from "./constants";

import { formatMetric } from "./metrics";

import { createLighthouseConfig }
  from "./lighthouse-config";

import { runLighthouse }
  from "./lighthouse-runner";

import { LighthouseRole }
  from "./auth";

export type TestPage = {
  name: string;
  url: string;
  role: LighthouseRole;
};

type RunRenderingTestParams = {
  testName: string;
  pages: readonly TestPage[];
};

export async function runRenderingTest({
  testName,
  pages,
}: RunRenderingTestParams) {

  console.log(
    `\n===== TEST ${testName.toUpperCase()} =====`
  );

  for (const page of pages) {

    /**
     * Config dibuat sekali
     * untuk setiap role/page
     */
    const configPath =
      createLighthouseConfig(
        page.role
      );

    console.log(
      `\n===== ${page.name.toUpperCase()} =====`
    );

    console.log(
      `Role: ${page.role}`
    );

    const outputDir = path.join(
      process.cwd(),
      "results",
      testName,
      page.name
    );

    fs.mkdirSync(
      outputDir,
      {
        recursive: true,
      }
    );

    const csvPath = path.join(
      outputDir,
      "metrics.csv"
    );

    const rows: string[] = [
      "Run;TTFB_ms;FCP_ms;LCP_ms;CLS;TBT_ms",
    ];

    for (
      let run = 1;
      run <= RUNS;
      run++
    ) {

      console.log(
        `[${page.name}] Run ${run}/${RUNS}`
      );

      const jsonPath = path.join(
        outputDir,
        `run-${run}.json`
      );

      try {

        const metrics =
          runLighthouse(
            page.url,
            jsonPath,
            configPath
          );

        rows.push(
          [
            run,

            formatMetric(
              metrics.ttfb
            ),

            formatMetric(
              metrics.fcp
            ),

            formatMetric(
              metrics.lcp
            ),

            formatMetric(
              metrics.cls,
              4
            ),

            formatMetric(
              metrics.tbt
            ),

          ].join(";")
        );

      } catch (error) {

        console.error(
          `[${page.name}] Run ${run} gagal`,
          error
        );

      }
    }

    fs.writeFileSync(
      csvPath,
      rows.join("\n")
    );

    console.log(
      `CSV tersimpan: ${csvPath}`
    );
  }

  console.log(
    `\n===== TEST ${testName.toUpperCase()} SELESAI =====`
  );
}