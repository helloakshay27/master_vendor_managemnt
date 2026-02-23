import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";

/**
 * OnTimeCompletion
 * Props:
 *  - submitted: number
 *  - totalAssessments: number
 *  - onDownload?: () => void
 */

const OnTimeCompletion = ({
  submitted = 317,
  totalAssessments = 319,
  onDownload,
}) => {
  const percentage = Math.round((submitted / totalAssessments) * 100);
  const remaining = totalAssessments - submitted;

  const donutData = [
    { value: submitted, color: "#f58513" },
    { value: remaining, color: "#e5e7eb" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #e5e7eb",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          On-Time Completion
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

      {/* Stats row */}
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
            background: "#f9fafb",
            borderRadius: "8px",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "11px",
              color: "#6b7280",
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
              color: "#f58513",
            }}
          >
            {submitted}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: "120px",
            background: "#f9fafb",
            borderRadius: "8px",
            padding: "12px 16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "11px",
              color: "#6b7280",
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
              color: "#1a1a1a",
            }}
          >
            {totalAssessments}
          </p>
        </div>
      </div>

      {/* Donut chart with center label */}
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

        {/* Center label */}
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
              color: "#1a1a1a",
              lineHeight: 1,
            }}
          >
            {submitted}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#6b7280" }}>
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
              background: "#f58513",
            }}
          />
          <span style={{ fontSize: "12px", color: "#374151" }}>
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
                background: "#e5e7eb",
              }}
            />
            <span style={{ fontSize: "12px", color: "#374151" }}>
              Pending ({remaining})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnTimeCompletion;
