import fs from "node:fs";
import path from "node:path";

import {
  DEVICE_SCALE_FACTOR,
  LIGHTHOUSE_CONFIG_FILE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./constants";

import {
  LighthouseRole,
  getAuthCookie,
} from "./auth";

export function createLighthouseConfig(
  userRole: LighthouseRole
) {
  const auth =
    getAuthCookie(userRole);

  if (!auth.token) {
    throw new Error(
      `Token untuk role '${userRole}' tidak ditemukan`
    );
  }

  const config = {
    extends: "lighthouse:default",

    settings: {
      extraHeaders: {
        Cookie:
          `access_token=${auth.token}; role=${auth.role}`,
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

      throttlingMethod:
        "provided",

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