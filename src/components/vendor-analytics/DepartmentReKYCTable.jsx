import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import { Download } from "lucide-react";

const CHART_COLORS = {
  rekyc: "#c4b99d",
  approved: "#8b7355",
};

export const DepartmentReKYCChart = ({ data, onDownload, className = "" }) => {
  // Convert to 100% stacked format
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => {
      const rekyc = item.rekycInitiated || 0;
      const approved = item.totalApproved || 0;
      const total = rekyc + approved;

      return {
        department: item.department || "Unknown",
        rekycInitiated: rekyc,
        totalApproved: approved,
        rekycPercent: total ? (rekyc / total) * 100 : 0,
        approvedPercent: total ? (approved / total) * 100 : 0,
        total,
      };
    });
  }, [data]);

  // Custom label renderer to position labels slightly lower
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;

    // Position label in the middle but slightly lower
    return (
      <text
        x={x + width / 2}
        y={y + height / 2 + 3} // 3 pixels lower than center
        fill="#ffffff"
        fontSize={11}
        fontWeight={500}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div
      className={`card go-shadow bg-white rounded-lg ${className}`}
      style={{
        height: "650px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Department Wise Successful  General Re-KYC
          </h3>

          {/* {onDownload && (
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
          )} */}
        </div>
      </div>

      {/* Body */}
      <div
        className="card-body"
        style={{
          padding: "20px",
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chartData.length > 0 ? (
          <div style={{ width: "100%", flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />

                <XAxis
                  dataKey="department"
                  fontSize={12}
                  tick={{ fill: "#374151", dy: 30 }}
                  tickMargin={20}
                  angle={-40}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis
                  fontSize={12}
                  tick={{ fill: "#374151" }}
                  domain={[0, 100]}
                  tickFormatter={(tick) => `${tick}%`}
                />

                {/* Custom Tooltip */}
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;

                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-800 mb-2">
                            Department: {label}
                          </p>

                          <div className="space-y-1">
                            <div className="flex justify-between gap-4">
                              <span
                                className="font-medium"
                                style={{ color: CHART_COLORS.rekyc }}
                              >
                                ReKYC Initiated:
                              </span>
                              <span>{data.rekycInitiated}</span>
                            </div>

                            <div className="flex justify-between gap-4">
                              <span
                                className="font-medium"
                                style={{ color: CHART_COLORS.approved }}
                              >
                                Total Approved:
                              </span>
                              <span>{data.totalApproved}</span>
                            </div>

                            <div className="pt-1 border-t border-gray-200">
                              <div className="flex justify-between font-semibold gap-4">
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

                {/* 100% stacked bars */}
                <Bar
                  dataKey="rekycPercent"
                  stackId="a"
                  fill={CHART_COLORS.rekyc}
                  name="ReKYC Initiated Suppliers"
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="rekycInitiated"
                    content={renderCustomizedLabel}
                  />
                </Bar>

                <Bar
                  dataKey="approvedPercent"
                  stackId="a"
                  fill={CHART_COLORS.approved}
                  name="Total Approved Suppliers"
                  isAnimationActive={false}
                >
                  <LabelList
                    dataKey="totalApproved"
                    content={renderCustomizedLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No department-wise Re-KYC data available
          </div>
        )}
      </div>
    </div>
  );
};
