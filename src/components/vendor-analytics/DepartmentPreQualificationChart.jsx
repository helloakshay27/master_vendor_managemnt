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

// Dummy data for demonstration
const DUMMY_DATA = [
  { department: "Accounts", pqApproved: 31, nonPqApproved: 1087 },
  { department: "Admin", pqApproved: 0, nonPqApproved: 31 },
  { department: "ARCHITECTURE", pqApproved: 0, nonPqApproved: 0 },
  { department: "Architecture", pqApproved: 27, nonPqApproved: 0 },
  { department: "Aviation", pqApproved: 0, nonPqApproved: 27 },
  { department: "Billing", pqApproved: 29, nonPqApproved: 706 },
  { department: "CLIENT FITOUT", pqApproved: 11, nonPqApproved: 0 },
  { department: "Contracts", pqApproved: 11, nonPqApproved: 27 },
  { department: "CORPORATE COMMUNICATION", pqApproved: 27, nonPqApproved: 85 },
  { department: "Electrical", pqApproved: 0, nonPqApproved: 0 },
  { department: "FACILITY MANAGEMENT", pqApproved: 7, nonPqApproved: 807 },
  { department: "Finance", pqApproved: 104, nonPqApproved: 0 },
  { department: "Human resources (HR)", pqApproved: 0, nonPqApproved: 253 },
  { department: "HVAC", pqApproved: 0, nonPqApproved: 0 },
  { department: "IMPORTS", pqApproved: 0, nonPqApproved: 0 },
  { department: "Information Technology", pqApproved: 65, nonPqApproved: 0 },
  { department: "Interior", pqApproved: 0, nonPqApproved: 209 },
  { department: "Landscape", pqApproved: 0, nonPqApproved: 0 },
  { department: "Legal and Liaison", pqApproved: 0, nonPqApproved: 127 },
  { department: "Liaison (Mumbai)", pqApproved: 24, nonPqApproved: 0 },
  { department: "Machine shop", pqApproved: 23, nonPqApproved: 0 },
  { department: "Minujal Projects", pqApproved: 0, nonPqApproved: 0 },
  {
    department: "Project Governance and IT",
    pqApproved: 11,
    nonPqApproved: 907,
  },
  { department: "Purchase P1", pqApproved: 0, nonPqApproved: 0 },
  { department: "Purchase P2", pqApproved: 16, nonPqApproved: 116 },
  { department: "RENOVATION & WORK", pqApproved: 0, nonPqApproved: 0 },
  { department: "Residential Sales", pqApproved: 0, nonPqApproved: 135 },
  { department: "Sales", pqApproved: 19, nonPqApproved: 0 },
  { department: "Sales and Marketing", pqApproved: 0, nonPqApproved: 0 },
  { department: "Spazio", pqApproved: 26, nonPqApproved: 0 },
  { department: "Travel Desk", pqApproved: 0, nonPqApproved: 0 },
  { department: "Venture", pqApproved: 0, nonPqApproved: 95 },
];

export const DepartmentPreQualificationChart = ({
  data,
  onDownload,
  className = "",
}) => {
  // Use provided data or fallback to dummy data
  const chartData = (data && data.length > 0 ? data : DUMMY_DATA)
    .map((item) => ({
      department: item.department || "Unknown",
      pqApproved: item.pqApproved || 0,
      nonPqApproved: item.nonPqApproved || 0,
      total: (item.pqApproved || 0) + (item.nonPqApproved || 0),
    }))
    .filter((item) => item.total > 0);

  console.log("DepartmentPreQualificationChart - chartData:", chartData);
  console.log(
    "DepartmentPreQualificationChart - chartData.length:",
    chartData.length,
  );

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Department Pre-Qualification Split
          </h3>
          {onDownload && (
            <Download
              data-no-drag="true"
              className="w-5 h-5 cursor-pointer transition-colors z-50"
              style={{ color: "#6b7280", pointerEvents: "auto" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDownload();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
      <div className="card-body" style={{ padding: "20px" }}>
        {chartData.length > 0 ? (
          <div style={{ width: "100%", height: "500px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                <XAxis
                  dataKey="department"
                  angle={-45}
                  textAnchor="end"
                  height={140}
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
                      const data = payload[0].payload;
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
                                {data.pqApproved}
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
                                {data.nonPqApproved}
                              </span>
                            </div>
                            <div className="pt-1 border-t border-gray-200">
                              <div className="flex justify-between items-center font-semibold gap-4">
                                <span>Total:</span>
                                <span>{data.total}</span>
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            No department data available for the selected date range
          </div>
        )}
      </div>
    </div>
  );
};
