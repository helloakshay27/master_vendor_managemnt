import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const COLORS = {
  SUBMITTED: "#b08968", // primary brown
  PENDING: "#5c4033", // dark brown
};

const SubmittedPendingOverview = ({ data = [] }) => {
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
      {/* ✅ White Header */}
      <div
        style={{
          background: "#ffffff",
          color: "#5c4033",
          textAlign: "center",
          padding: "14px",
          fontWeight: 600,
          fontSize: "16px",
          borderBottom: "1px solid #f1e6da",
        }}
      >
        Submitted vs. Pending Assessment Overview
      </div>

      <div style={{ padding: "20px" }}>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 40, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#efe6dc"
              horizontal={false}
            />

            <XAxis type="number" tick={{ fontSize: 11, fill: "#8d6e63" }} />

            <YAxis
              type="category"
              dataKey="name"
              width={180}
              tick={{ fontSize: 12, fill: "#8d6e63" }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e6d5c3",
                boxShadow: "0 4px 12px rgba(176,137,104,0.15)",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#5c4033",
                fontSize: "13px",
              }}
            />

            {/* Submitted */}
            <Bar
              dataKey="submitted"
              stackId="a"
              fill={COLORS.SUBMITTED}
              radius={[0, 0, 0, 0]}
            >
              <LabelList
                dataKey="submitted"
                position="right"
                style={{
                  fill: "#5c4033",
                  fontWeight: 600,
                  fontSize: 11,
                }}
              />
            </Bar>

            {/* Pending */}
            <Bar
              dataKey="pending"
              stackId="a"
              fill={COLORS.PENDING}
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmittedPendingOverview;
