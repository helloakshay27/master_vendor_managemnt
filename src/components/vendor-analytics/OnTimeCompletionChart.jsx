import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Download, Loader2 } from "lucide-react";

const OnTimeCompletion = ({
  submitted = 317,
  totalAssessments = 319,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const percentage =
    totalAssessments > 0 ? Math.round((submitted / totalAssessments) * 100) : 0;

  const remaining = totalAssessments - submitted;

  const donutData = [
    { value: submitted, color: "#b08968" }, // primary light brown
    { value: remaining, color: "#ede0d4" }, // soft brown background
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #e6d5c3",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(176,137,104,0.15)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">On-Time Completion</h3>
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
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "120px",
            background: "#f6f1eb",
            borderRadius: "8px",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "11px",
              color: "#8d6e63",
              fontWeight: 500,
            }}
          >
            Submitted
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#b08968",
            }}
          >
            {submitted}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "120px",
            background: "#f6f1eb",
            borderRadius: "8px",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "11px",
              color: "#8d6e63",
              fontWeight: 500,
            }}
          >
            Total Assessments
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#5c4033",
            }}
          >
            {totalAssessments}
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div style={{ flex: 1, position: "relative", minHeight: "220px" }}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {donutData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              color: "#5c4033",
              lineHeight: 1,
            }}
          >
            {submitted}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#8d6e63" }}>
            {percentage}% complete
          </p>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              background: "#b08968",
            }}
          />
          <span style={{ fontSize: "12px", color: "#5c4033" }}>
            Submitted ({submitted})
          </span>
        </div>

        {remaining > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "2px",
                background: "#ede0d4",
              }}
            />
            <span style={{ fontSize: "12px", color: "#5c4033" }}>
              Pending ({remaining})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnTimeCompletion;
