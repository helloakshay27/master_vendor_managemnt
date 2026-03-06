import React, { useState } from "react";

export const GradeAssessmentBar = ({ title, data, className = "" }) => {
  const [tooltip, setTooltip] = useState(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // Brown theme palette (same as other charts)
  const brownShades = [
    "#5c4033", // dark
    "#7a5a45",
    "#b08968",
    "#d6bfa9",
    "#e6d5c3", // light
  ];

  return (
    <div
      className={`card border-0 position-relative ${className}`}
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e6d5c3",
        boxShadow: "0 2px 8px rgba(176,137,104,0.15)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 25px",
          borderBottom: "1px solid #e6d5c3",
          background: "#faf6f1",
        }}
      >
        <h5
          style={{
            margin: 0,
            fontWeight: 600,
            color: "#5c4033",
          }}
        >
          {title}
        </h5>
      </div>

      {/* Body */}
      <div style={{ padding: "30px" }}>
        {/* Legend */}
        <div className="text-center mb-4">
          <strong className="me-2" style={{ color: "#7a5a45" }}>
            Grade
          </strong>
          {data.map((item, index) => (
            <span key={item.grade} className="me-3">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  background: brownShades[index % brownShades.length],
                  marginRight: "6px",
                  borderRadius: "2px",
                }}
              ></span>
              <span style={{ color: "#6b4f3a", fontWeight: 500 }}>
                {item.grade}
              </span>
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
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {data.map((item, index) => {
            const percentage =
              total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;

            const isLight = index >= 3; // light shades for text contrast control

            return (
              <div
                key={item.grade}
                style={{
                  width: `${percentage}%`,
                  background: brownShades[index % brownShades.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  color: isLight ? "#5c4033" : "#ffffff",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
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
            top: tooltip.y - 65,
            left: tooltip.x,
            transform: "translateX(-50%)",
            background: "#5c4033",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            boxShadow: "0 6px 16px rgba(92,64,51,0.25)",
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
