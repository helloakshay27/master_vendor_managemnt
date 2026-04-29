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
import { Download, Loader2, RefreshCw } from "lucide-react";

const getBarColor = () => "#b08968"; // uniform light brown bars

const truncateLabel = (value, max = 24) => {
  const str = String(value ?? "");
  if (str.length <= max) return str;
  return `${str.slice(0, Math.max(0, max - 3))}...`;
};

const TruncatedAxisTick = (props) => {
  const { x, y, payload } = props;
  const full = String(payload?.value ?? "");
  const short = truncateLabel(full, 24);
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{full}</title>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#8d6e63"
        fontSize={10}
        transform="rotate(-25)"
      >
        {short}
      </text>
    </g>
  );
};

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

const PercentageCompletionChart = ({ data = [], onDownload, onRefresh }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
          {(onRefresh || onDownload) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {onRefresh && (
                isRefreshing ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#d97938" }} />
                ) : (
                  <RefreshCw
                    className="w-5 h-5 cursor-pointer"
                    style={{ color: "#6b7280" }}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsRefreshing(true);
                      try {
                        await onRefresh();
                      } finally {
                        setIsRefreshing(false);
                      }
                    }}
                  />
                )
              )}
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
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          // Give enough left space so Y-axis text stays outside plot
          margin={{ top: 24, right: 10, left: 50, bottom: 70 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#efe6dc"
            vertical={false}
          />

          <XAxis
            dataKey="department"
            tick={<TruncatedAxisTick />}
            interval={0}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#8d6e63" }}
            tickFormatter={(v) => `${v}`}
            width={55}
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
