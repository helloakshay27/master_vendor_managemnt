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

const CHART_COLORS = {
  pqApproved: "#c4b99d",
  nonPqApproved: "#8b7355",
};

export const DepartmentPreQualificationChart = ({
  data,
  onDownload,
  className = "",
}) => {
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

  // Each bar gets ~40px for department names; minimum 600px
  const minChartWidth = Math.max(chartData.length * 40 + 80, 600);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Department Pre-Qualification Split
          </h3>
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
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                  <XAxis
                    dataKey="department"
                    angle={-45}
                    textAnchor="end"
                    height={150}
                    interval={0}
                    fontSize={10}
                    tick={{ fill: "#374151" }}
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
                              Math.max(...chartData.map((d) => d.total || 0)) *
                                1.2,
                            ),
                          )
                        : 3,
                    ]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-800 mb-2">
                              {label}
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center gap-4">
                                <span
                                  className="font-medium"
                                  style={{ color: CHART_COLORS.pqApproved }}
                                >
                                  PQ Approved:
                                </span>
                                <span className="text-gray-700">
                                  {d.pqApproved}
                                </span>
                              </div>
                              <div className="flex justify-between items-center gap-4">
                                <span
                                  className="font-medium"
                                  style={{ color: CHART_COLORS.nonPqApproved }}
                                >
                                  Non PQ Approved:
                                </span>
                                <span className="text-gray-700">
                                  {d.nonPqApproved}
                                </span>
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
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="pqApproved"
                    stackId="a"
                    fill={CHART_COLORS.pqApproved}
                    name="PQ Approved Vendors"
                  />
                  <Bar
                    dataKey="nonPqApproved"
                    stackId="a"
                    fill={CHART_COLORS.nonPqApproved}
                    name="Non PQ Approved Vendors"
                  />
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
