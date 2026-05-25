"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* =========================
   TYPES
========================= */
export interface BarChartDataItem {
  label: string;
  value: number;
}

export interface ReusableBarChartProps {
  data:         BarChartDataItem[];
  height?:      number;
  peakOpacity?: number;
  baseOpacity?: number;
  tooltipSuffix?: string;
}

/* =========================
   CUSTOM TOOLTIP
========================= */
function CustomTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?:  boolean;
  payload?: { value: number }[];
  label?:   string;
  suffix?:  string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-bold text-foreground">{label}</p>
      <p className="text-primary font-semibold mt-0.5">
        {payload[0].value} {suffix}
      </p>
    </div>
  );
}

/* =========================
   COMPONENT
========================= */
export function ChartBar({
  data,
  height        = 220,
  peakOpacity   = 1,
  baseOpacity   = 0.3,
  tooltipSuffix = "data",
}: ReusableBarChartProps) {
  const maxValue    = Math.max(...data.map((d) => d.value));
  const primaryColor = "var(--color-primary)";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        barCategoryGap="30%"
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke="#F1F5F9" />

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#94A3B8", fontWeight: 600 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#94A3B8", fontWeight: 600 }}
          allowDecimals={false}
        />

        <Tooltip
          content={
            <CustomTooltip suffix={tooltipSuffix} />
          }
          cursor={{ fill: "transparent" }}
        />

        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.label}
              fill={primaryColor}
              opacity={entry.value === maxValue ? peakOpacity : baseOpacity}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}