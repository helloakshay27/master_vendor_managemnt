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

const DEFAULT_COLORS = [
  "#c4b99d", // Warm Stone
  "#8b7355", // Deep Sand
  "#a68d71", // Soft Taupe
  "#5d4037", // Coffee Brown
  "#d7ccc8", // Pale Sand
];

const ReKycBarchart = ({
  data = [],
  title = "Chart",
  height = 500,
  onDownload,
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

  // Get all status keys
  const barKeys = Object.keys(data[0] || {}).filter(
    (key) => key !== "month" && key !== "year" && key !== "total",
  );

  const processedData = data;

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
        {value}
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
            />
            
            <Tooltip 
              formatter={(value, name) => {
                return [value, name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')];
              }}
            />
            
            <Legend 
              wrapperStyle={{ paddingTop: "15px" }} 
              formatter={(value) => value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            />

            {barKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                name={key}
                stackId="a"
                fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
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
