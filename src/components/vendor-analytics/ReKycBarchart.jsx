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
  LabelList,
} from "recharts";
import { Download } from "lucide-react";

const DEFAULT_COLORS = ["#c4b99d", "#8b7355", "#a68d71", "#5d4037", "#d7ccc8"];

// Use the same brown theme colors as the main dashboard
// (see Status Wise Vendor Count chart in ReKycDashboard)
const STATUS_META = {
  approved: { label: "Approved", color: "#5c4033" },
  details_submitted_by_vendor: { label: "Details Submitted By Vendor", color: "#7a5a45" },
  expired: { label: "Expired", color: "#b08968" },
  pending: { label: "Pending", color: "#d6bfa9" },
  rejected: { label: "Rejected", color: "#a52a2a" },
};

const TITLE_CASE_FALLBACK = (value = "") =>
  value
    .toString()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ReKycBarchart = ({
  data = [],
  title = "Chart",
  height = 500,
  onDownload,
  type,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="card go-shadow bg-white rounded-lg">
        <div className="vendor-card-header">
          <h3 className="vendor-card-title">{title}</h3>
        </div>
        <div className="card-body" style={{ padding: "20px" }}>
          <div
            className="flex items-center justify-center"
            style={{ height: "128px" }}
          >
            <p className="text-gray-500">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Get all unique status keys across all data points
  const barKeys = React.useMemo(() => {
    const keys = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "month" && key !== "year" && key !== "total") {
          keys.add(key);
        }
      });
    });
    const arr = Array.from(keys);
    const preferredOrder = Object.keys(STATUS_META);
    arr.sort((a, b) => {
      const ai = preferredOrder.indexOf(a);
      const bi = preferredOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    return arr;
  }, [data]);

  const showPercentage = type !== "year" && barKeys.length > 1;

  const processedData = React.useMemo(() => {
    if (!showPercentage) return data;
    return data.map((item) => {
      const total = barKeys.reduce((sum, k) => sum + (Number(item?.[k]) || 0), 0);
      const next = { ...item, __total: total };
      barKeys.forEach((k) => {
        const count = Number(item?.[k]) || 0;
        next[`${k}__count`] = count;
        next[k] = total > 0 ? (count / total) * 100 : 0;
      });
      return next;
    });
  }, [data, barKeys, showPercentage]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;

    // Only show if segment is big enough
    if (height < 20 || value === undefined || value === null || value === 0) return null;

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#ffffff"
        fontSize={11}
        fontWeight={700}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {showPercentage ? `${Number(value).toFixed(2)}%` : value}
      </text>
    );
  };

  return (
    <div
      className="card go-shadow bg-white rounded-lg"
      style={{
        height: `${height}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">{title}</h3>
          {onDownload && (
            <Download
              className="w-5 h-5 cursor-pointer"
              style={{ color: "#6b7280" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDownload();
              }}
            />
          )}
        </div>
      </div>
      <div className="card-body" style={{ padding: "20px", flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" vertical={false} />

            <XAxis
              dataKey={data[0]?.month ? "month" : "year"}
              fontSize={12}
              tick={{ dy: 10 }}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />

            <YAxis 
              fontSize={12} 
              domain={showPercentage ? [0, 100] : undefined}
              tickFormatter={showPercentage ? (v) => `${v}%` : undefined}
            />
            
            <Tooltip 
              formatter={(value, name, props) => {
                const label = STATUS_META?.[name]?.label || TITLE_CASE_FALLBACK(name);
                if (!showPercentage) return [value, label];
                const count = props?.payload?.[`${name}__count`];
                const pct = Number(value) || 0;
                const display = Number.isFinite(count) ? `${pct.toFixed(2)}% (${count})` : `${pct.toFixed(2)}%`;
                return [display, label];
              }}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: "15px" }} 
              formatter={(value) => STATUS_META?.[value]?.label || TITLE_CASE_FALLBACK(value)}
            />

            {barKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                name={key}
                stackId="a"
                fill={STATUS_META?.[key]?.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                isAnimationActive={false}
                minPointSize={2}
              >
                <LabelList 
                  dataKey={key} 
                  content={renderCustomizedLabel} 
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReKycBarchart;
