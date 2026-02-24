import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Download } from "lucide-react";

const COLORS = {
  HIGH: "#5c4033",
  LOW: "#b08968",
  MODERATE: "#e6d5c3",
};

export const CategoryWiseRiskFlag = ({ data = [], onDownload }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    HIGH: item.HIGH || 0,
    LOW: item.LOW || 0,
    MODERATE: item.MODERATE || 0,
  }));

  return (
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid #e6d5c3",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(176,137,104,0.15)",
      }}
    >
      {/* ✅ Header (White Background Now) */}
      <div
        style={{
          background: "#ffffff",
          color: "#5c4033",
          textAlign: "center",
          padding: "14px",
          fontWeight: "600",
          fontSize: "16px",
          borderBottom: "1px solid #f1e6da",
        }}
      >
        Category Wise Risk Flag
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "12px 20px",
          fontSize: "13px",
          fontWeight: "600",
          color: "#5c4033",
          borderBottom: "1px solid #f1e6da",
        }}
      >
        <span>Risk Category</span>

        {["HIGH", "LOW", "MODERATE"].map((key) => (
          <span
            key={key}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: COLORS[key],
                borderRadius: "50%",
              }}
            />
            {key} RISK
          </span>
        ))}

        {onDownload && (
          <Download
            size={16}
            style={{
              marginLeft: "auto",
              cursor: "pointer",
              color: "#5c4033",
            }}
            onClick={onDownload}
          />
        )}
      </div>

      {/* Chart */}
      <div style={{ height: 420, padding: "20px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#efe6dc"
              vertical={false}
            />

            {/* ✅ Cross / Tilted Labels */}
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fontSize: 11, fill: "#8d6e63" }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#8d6e63" }}
              label={{
                value: "Total Assessments",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fill: "#8d6e63",
                },
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e6d5c3",
                boxShadow: "0 4px 12px rgba(176,137,104,0.15)",
              }}
            />

            <Bar
              dataKey="HIGH"
              stackId="a"
              fill={COLORS.HIGH}
              radius={[0, 0, 6, 6]}
            >
              <LabelList dataKey="HIGH" position="center" />
            </Bar>

            <Bar dataKey="LOW" stackId="a" fill={COLORS.LOW}>
              <LabelList dataKey="LOW" position="center" />
            </Bar>

            <Bar
              dataKey="MODERATE"
              stackId="a"
              fill={COLORS.MODERATE}
              radius={[6, 6, 0, 0]}
            >
              <LabelList dataKey="MODERATE" position="center" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
