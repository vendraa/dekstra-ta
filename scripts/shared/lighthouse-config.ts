import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_ROLE,
  DEVICE_SCALE_FACTOR,
  LIGHTHOUSE_CONFIG_FILE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./constants";

export function createLighthouseConfig() {
  const token =
    process.env.LIGHTHOUSE_AUTH_TOKEN;

  const role =
    process.env.LIGHTHOUSE_AUTH_ROLE ??
    DEFAULT_ROLE;

  if (!token) {
    throw new Error(
      "LIGHTHOUSE_AUTH_TOKEN tidak ditemukan di .env"
    );
  }

  const config = {
    extends: "lighthouse:default",

    settings: {
      extraHeaders: {
        Cookie:
          `access_token=${token}; role=${role}`,
      },

      formFactor: "desktop",

      screenEmulation: {
        mobile: false,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        deviceScaleFactor:
          DEVICE_SCALE_FACTOR,
        disabled: false,
      },

      throttlingMethod: "provided",

      throttling: {
        rttMs: 0,
        throughputKbps: 0,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
        cpuSlowdownMultiplier: 1,
      },
    },
  };

  const configPath = path.join(
    process.cwd(),
    LIGHTHOUSE_CONFIG_FILE
  );

  fs.writeFileSync(
    configPath,
    JSON.stringify(
      config,
      null,
      2
    )
  );

  return configPath;
}