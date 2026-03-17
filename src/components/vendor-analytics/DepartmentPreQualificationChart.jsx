import React, { useState } from "react";
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
import { Download, Loader2, RefreshCw } from "lucide-react";

const CHART_COLORS = {
  pqApproved: "#c4b99d",
  nonPqApproved: "#8b7355",
};

// Custom tick: truncates long department names and shows full text via SVG <title> on hover
const TruncatedTick = ({ x, y, payload, maxChars = 10 }) => {
  const full = String(payload?.value || "");
  const display = full.length > maxChars ? full.slice(0, maxChars) + "…" : full;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{full}</title>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#374151"
        fontSize={10}
        transform="rotate(-45)"
        style={{ cursor: "default" }}
      >
        {display}
      </text>
    </g>
  );
};

export const DepartmentPreQualificationChart = ({
  data,
  onDownload,
  onRefresh,
  className = "",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // Map incoming raw API data – fields: department_name, with_pq_count, without_pq_count
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        department: item.department_name || item.department || "Unknown",
        pqApproved: Number(item.with_pq_count ?? item.pqApproved ?? 0),
        nonPqApproved: Number(item.without_pq_count ?? item.nonPqApproved ?? 0),
        total:
          Number(item.with_pq_count ?? item.pqApproved ?? 0) +
          Number(item.without_pq_count ?? item.nonPqApproved ?? 0),
      }))
    : [];

  // Each bar gets ~50px for department names; minimum 600px
  const minChartWidth = Math.max(chartData.length * 50 + 80, 600);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">Department Pre-Qualification Split</h3>
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
      <div className="card-body" style={{ padding: "20px" }}>
        {chartData.length > 0 ? (
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ minWidth: `${minChartWidth}px`, height: "500px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 130 }}
                  barCategoryGap="10%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                  <XAxis
                    dataKey="department"
                    height={150}
                    interval={0}
                    tick={<TruncatedTick maxChars={10} />}
                  />
                  <YAxis
                    fontSize={12}
                    tick={{ fill: "#374151" }}
                    allowDecimals={false}
                    domain={[
                      0,
                      chartData.length > 0
                        ? Math.max(
                            3,
                            Math.ceil(
                              Math.max(...chartData.map((d) => d.total || 0)) * 1.2,
                            ),
                          )
                        : 3,
                    ]}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-800 mb-2">{d.department}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center gap-4">
                                <span className="font-medium" style={{ color: CHART_COLORS.pqApproved }}>
                                  PQ Approved:
                                </span>
                                <span className="text-gray-700">{d.pqApproved}</span>
                              </div>
                              <div className="flex justify-between items-center gap-4">
                                <span className="font-medium" style={{ color: CHART_COLORS.nonPqApproved }}>
                                  Non PQ Approved:
                                </span>
                                <span className="text-gray-700">{d.nonPqApproved}</span>
                              </div>
                              <div className="pt-1 border-t border-gray-200">
                                <div className="flex justify-between items-center font-semibold gap-4">
                                  <span>Total:</span>
                                  <span>{d.total}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
                  <Bar dataKey="pqApproved" stackId="a" fill={CHART_COLORS.pqApproved} name="PQ Approved Vendors" />
                  <Bar dataKey="nonPqApproved" stackId="a" fill={CHART_COLORS.nonPqApproved} name="Non PQ Approved Vendors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No department data available for the selected date range
          </div>
        )}
      </div>
    </div>
  );
};
