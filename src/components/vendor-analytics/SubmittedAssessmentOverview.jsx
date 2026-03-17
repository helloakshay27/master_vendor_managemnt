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
  A: "#5c4033",
  B: "#7a5a45",
  C: "#b08968",
  D: "#d6bfa9",
  F: "#e6d5c3",
  GRID: "#efe6dc",
  TEXT: "#6b4f3a",
  BORDER: "#e6d5c3",
};

const SubmittedAssessmentOverview = ({ data = [], onDownload, onRefresh }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: `1px solid ${COLORS.BORDER}`,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(176,137,104,0.15)",
      }}
    >
      <div
        className="vendor-card-header"
        style={{
          background: "#ffffff",
          borderBottom: `1px solid ${COLORS.BORDER}`,
          position: "relative",
          padding: "14px 48px 14px 14px",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "16px", color: COLORS.A }}>
          Submitted Assessment Overview by Categories
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
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.GRID}
              horizontal={false}
            />

            <XAxis type="number" tick={{ fontSize: 11, fill: COLORS.TEXT }} />

            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={{ fontSize: 12, fill: COLORS.TEXT }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: `1px solid ${COLORS.BORDER}`,
                boxShadow: "0 4px 12px rgba(176,137,104,0.15)",
              }}
            />

            <Legend
              verticalAlign="top"
              wrapperStyle={{
                color: COLORS.A,
                fontSize: "13px",
              }}
            />

            {/* Dark Bars → White Text */}
            <Bar dataKey="A" stackId="a" fill={COLORS.A}>
              <LabelList
                dataKey="A"
                position="center"
                style={{ fill: "#ffffff", fontWeight: 600 }}
              />
            </Bar>

            <Bar dataKey="B" stackId="a" fill={COLORS.B}>
              <LabelList
                dataKey="B"
                position="center"
                style={{ fill: "#ffffff", fontWeight: 600 }}
              />
            </Bar>

            <Bar dataKey="C" stackId="a" fill={COLORS.C}>
              <LabelList
                dataKey="C"
                position="center"
                style={{ fill: "#ffffff", fontWeight: 600 }}
              />
            </Bar>

            {/* Light Bars → Dark Text */}
            <Bar dataKey="D" stackId="a" fill={COLORS.D}>
              <LabelList
                dataKey="D"
                position="center"
                style={{ fill: COLORS.A, fontWeight: 600 }}
              />
            </Bar>

            <Bar dataKey="F" stackId="a" fill={COLORS.F}>
              <LabelList
                dataKey="F"
                position="center"
                style={{ fill: COLORS.A, fontWeight: 600 }}
              />
            </Bar>

            {/* Total */}
            <Bar dataKey="total" fill="transparent">
              <LabelList
                dataKey="total"
                position="right"
                style={{
                  fill: COLORS.A,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmittedAssessmentOverview;
