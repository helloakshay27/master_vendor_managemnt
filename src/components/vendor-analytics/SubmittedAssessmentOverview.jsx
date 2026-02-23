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
} from "recharts";
import { Download } from "lucide-react";

/**
 * SubmittedPendingOverview
 * Props:
 *  - data: Array<{ name: string, submitted: number, pending: number }>
 *  - onDownload?: () => void
 */
const SubmittedPendingOverview = ({ data = [], onDownload }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
          Submitted vs Pending Assessment Overview
        </h2>
        {onDownload && (
          <button
            onClick={onDownload}
            style={{
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "5px 10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            <Download size={13} /> Export
          </button>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            verticalAlign="top"
          />
          <Bar dataKey="submitted" name="Submitted" fill="#3b82f6" radius={[3, 3, 0, 0]} />
          <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmittedPendingOverview;