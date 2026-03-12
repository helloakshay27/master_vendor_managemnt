import React, { useState } from "react";
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
import { Download, Loader2 } from "lucide-react";

const getBarColor = () => "#b08968"; // uniform light brown bars

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e6d5c3",
        borderRadius: "8px",
        padding: "8px 12px",
        fontSize: "12px",
        boxShadow: "0 4px 12px rgba(176,137,104,0.15)",
      }}
    >
      <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#5c4033" }}>
        {label}
      </p>
      <p style={{ margin: 0, color: "#8d6e63" }}>
        Completion:{" "}
        <strong style={{ color: "#5c4033" }}>{payload[0]?.value}%</strong>
      </p>
    </div>
  );
};

const PercentageCompletionChart = ({ data = [], onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #e6d5c3",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(176,137,104,0.15)",
        height: "100%",
      }}
    >
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">Percentage of Completed Assessment by Category</h3>
          {onDownload && (
            isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#d97938" }} />
            ) : (
              <Download
                className="w-5 h-5 cursor-pointer"
                style={{ color: "#6b7280" }}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDownloading(true);
                  try {
                    await onDownload();
                  } finally {
                    setIsDownloading(false);
                  }
                }}
              />
            )
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 24, right: 10, left: 0, bottom: 70 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#efe6dc"
            vertical={false}
          />

          <XAxis
            dataKey="department"
            tick={{ fontSize: 10, fill: "#8d6e63" }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#8d6e63" }}
            tickFormatter={(v) => `${v}`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="percentage"
              position="top"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                fill: "#5c4033",
              }}
              formatter={(v) => `${v}%`}
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
