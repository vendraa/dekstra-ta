import { execSync } from "node:child_process";

import {
  Metrics,
  extractMetrics,
} from "./metrics";

export function runLighthouse(
  url: string,
  outputPath: string,
  configPath: string
): Metrics {
  execSync(
    [
      "lighthouse",
      url,

      "--quiet",

      "--output=json",

      `--output-path="${outputPath}"`,

      '--chrome-flags="--headless --disable-dev-shm-usage"',

      "--only-categories=performance",

      "--preset=desktop",

      `--config-path="${configPath}"`,
    ].join(" "),
    {
      stdio: "ignore",
    }
  );

  return extractMetrics(
    outputPath
  );
}