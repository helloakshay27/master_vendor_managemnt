import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download } from "lucide-react";

const RISK_COLORS = {
  HIGH: "#d32f2f",       // Red
  LOW: "#42d65c",        // Green
  MODERATE: "#d4b44c",   // Yellow
};

export const CategoryWiseRiskFlag = ({
  data,
  onDownload,
  className = "",
}) => {
  const chartData =
    data && data.length > 0
      ? data.map((item) => ({
          name: item.name || "Unknown",
          HIGH: item.HIGH || 0,
          LOW: item.LOW || 0,
          MODERATE: item.MODERATE || 0,
          total:
            (item.HIGH || 0) +
            (item.LOW || 0) +
            (item.MODERATE || 0),
        }))
      : [];

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}
      style={{ height: "500px", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <div className="bg-[#D97706] p-2 px-4 flex justify-between items-center">
        <span className="text-white font-bold text-sm mx-auto">
          Category Wise Risk Flag
        </span>

        {onDownload && (
          <Download
            size={18}
            className="text-white cursor-pointer absolute right-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDownload();
            }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-4 py-2 text-xs font-bold">
        <span className="text-gray-700">Risk Category</span>

        {Object.keys(RISK_COLORS).map((key) => (
          <div key={key} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: RISK_COLORS[key] }}
            ></span>
            <span className="text-gray-600">
              {key.replace("_", " ")} RISK
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ width: "100%", flex: 1, padding: "0 20px 20px" }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fontSize: 11 }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11 }}
                label={{
                  value: "Total Assessments",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
                        <p className="font-semibold mb-2">{label}</p>

                        <div className="space-y-1">
                          <div className="flex justify-between gap-4">
                            <span style={{ color: RISK_COLORS.HIGH }}>
                              High Risk:
                            </span>
                            <span>{data.HIGH}</span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span style={{ color: RISK_COLORS.LOW }}>
                              Low Risk:
                            </span>
                            <span>{data.LOW}</span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span style={{ color: RISK_COLORS.MODERATE }}>
                              Moderate Risk:
                            </span>
                            <span>{data.MODERATE}</span>
                          </div>

                          <div className="pt-1 border-t font-semibold flex justify-between">
                            <span>Total:</span>
                            <span>{data.total}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend verticalAlign="top" height={20} />

              <Bar
                dataKey="HIGH"
                stackId="a"
                fill={RISK_COLORS.HIGH}
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="LOW"
                stackId="a"
                fill={RISK_COLORS.LOW}
              />
              <Bar
                dataKey="MODERATE"
                stackId="a"
                fill={RISK_COLORS.MODERATE}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No risk data available
          </div>
        )}
      </div>
    </div>
  );
};