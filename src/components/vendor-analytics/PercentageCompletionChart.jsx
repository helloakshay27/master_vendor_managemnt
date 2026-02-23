import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Download } from "lucide-react";

/**
 * PercentageCompletionChart
 * Props:
 *  - data: Array<{ department: string, percentage: number }>
 *  - onDownload?: () => void
 */

const getBarColor = (pct) => {
  if (pct >= 80) return "#f58513";
  if (pct >= 60) return "#f58513";
  return "#f58513";
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "8px 12px",
        fontSize: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#1a1a1a" }}>
        {label}
      </p>
      <p style={{ margin: 0, color: "#6b7280" }}>
        Completion:{" "}
        <strong style={{ color: "#1a1a1a" }}>{payload[0]?.value}%</strong>
      </p>
    </div>
  );
};

const PercentageCompletionChart = ({ data = [], onDownload }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          Percentage of Completed Assessment by Category
        </h2>
        {onDownload && (
          <button
            onClick={onDownload}
            style={{
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            <Download size={13} /> Export
          </button>
        )}
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 24, right: 10, left: 0, bottom: 70 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="department"
            tick={{ fontSize: 10, fill: "#6b7280" }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="percentage"
              position="top"
              style={{ fontSize: "11px", fontWeight: 700, fill: "#374151" }}
              formatter={(v) => `${v}`}
            />
            {data.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.percentage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentageCompletionChart;
