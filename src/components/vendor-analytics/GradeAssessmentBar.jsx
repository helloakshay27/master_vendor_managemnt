import React, { useState } from "react";

export const GradeAssessmentBar = ({ data, className = "" }) => {
  const [tooltip, setTooltip] = useState(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  const greyShades = ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"];

  return (
    <div
      className={`card shadow-sm border-0 bg-white position-relative ${className}`}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 25px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <h5 style={{ margin: 0, fontWeight: 600, color: "#111827" }}>
          Count of Assessments by Grade
        </h5>
      </div>

      {/* Body */}
      <div style={{ padding: "30px" }}>
        {/* Legend */}
        <div className="text-center mb-4">
          <strong className="me-2" style={{ color: "#374151" }}>
            Grade
          </strong>
          {data.map((item, index) => (
            <span key={item.grade} className="me-3">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  background: greyShades[index % greyShades.length],
                  marginRight: "6px",
                }}
              ></span>
              <span style={{ color: "#4b5563" }}>{item.grade}</span>
            </span>
          ))}
        </div>

        {/* Stacked Bar */}
        <div
          style={{
            display: "flex",
            height: "55px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "6px",
            position: "relative",
          }}
        >
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);

            return (
              <div
                key={item.grade}
                style={{
                  width: `${percentage}%`,
                  background: greyShades[index % greyShades.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  color: "#ffffff",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  setTooltip({
                    grade: item.grade,
                    value: item.value,
                    percent: percentage,
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {item.value > 0 && item.value}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 60,
            left: tooltip.x,
            transform: "translateX(-50%)",
            background: "#111827",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            whiteSpace: "nowrap",
          }}
        >
          <div>
            <strong>Grade:</strong> {tooltip.grade}
          </div>
          <div>
            <strong>Count:</strong> {tooltip.value}
          </div>
          <div>
            <strong>Percentage:</strong> {tooltip.percent}%
          </div>
        </div>
      )}
    </div>
  );
};
