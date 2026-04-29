import React, { useState } from "react";
import { Download, Loader2, RefreshCw } from "lucide-react";
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

const SubmittedPendingOverview = ({ data = [], onDownload, onRefresh }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
        className="vendor-card-header"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #f1e6da",
          position: "relative",
          padding: "14px 48px 14px 14px",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "16px", color: "#5c4033" }}>
          Submitted vs Pending Assessment Overview
        </div>

        {(onRefresh || onDownload) && (
          <div
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {onRefresh && (
              isRefreshing ? (
                <Loader2
                  className="w-5 h-5 animate-spin"
                  style={{ color: "#d97938" }}
                />
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
                <Loader2
                  className="w-5 h-5 animate-spin"
                  style={{ color: "#d97938" }}
                />
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

      <div style={{ padding: "20px" }}>
        <ResponsiveContainer width="100%" height={480}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 70, bottom: 20 }}
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
              width={320}
              tick={{ fontSize: 11, fill: "#8d6e63" }}
              tickLine={false}
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
