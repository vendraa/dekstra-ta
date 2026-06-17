import fs from "node:fs";

export type Metrics = {
  ttfb: number;
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
};

export function formatMetric(
  value: number,
  digits = 2
): string {
  return value.toFixed(digits);
}

export function extractMetrics(
  reportPath: string
): Metrics {
  const report = JSON.parse(
    fs.readFileSync(
      reportPath,
      "utf8"
    )
  );

  const audits = report.audits;

  return {
    ttfb:
      audits["server-response-time"]
        ?.numericValue ?? 0,

    fcp:
      audits["first-contentful-paint"]
        ?.numericValue ?? 0,

    lcp:
      audits["largest-contentful-paint"]
        ?.numericValue ?? 0,

    cls:
      audits["cumulative-layout-shift"]
        ?.numericValue ?? 0,

    tbt:
      audits["total-blocking-time"]
        ?.numericValue ?? 0,
  };
}