import React, { useState } from "react";
import { Download, Loader2, RefreshCw } from "lucide-react";

/**
 * Helper to determine if a color is light or dark
 */
const getContrastColor = (hexColor) => {
  if (!hexColor) return "#ffffff";
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155 ? "#5c4033" : "#ffffff";
};

/**
 * GradeAssessmentBar - A horizontal stacked bar chart component
 * Updated to match the style of a specific vendor management dashboard
 */
export const GradeAssessmentBar = ({ 
  title, 
  data = [], 
  legendLabel = "Grade",
  onDownload,
  onRefresh,
  className = "" 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // Brown theme palette (fallback)
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
        boxShadow: "0 4px 12px rgba(176,137,104,0.1)",
        overflow: "hidden",
        marginBottom: "24px"
      }}
    >
      {/* Header - Styled like Image 1 (Orange banner) */}
      <div
        style={{
          padding: "12px 25px",
          background: "#d97938",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
      >
        <h5
          style={{
            margin: 0,
            fontWeight: 600,
            color: "#ffffff",
            fontSize: "16px"
          }}
        >
          {title}
        </h5>
        
        {onDownload && (
          <div
            style={{
              position: "absolute",
              right: "15px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {onRefresh && (
              <button
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
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                  marginRight: "10px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                disabled={isRefreshing}
                title="Refresh"
              >
                {isRefreshing ? (
                  <Loader2 size={18} className="animate-spin text-white" />
                ) : (
                  <RefreshCw size={18} />
                )}
              </button>
            )}
            {isDownloading ? (
              <Loader2 size={18} className="animate-spin text-white" />
            ) : (
              <button
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
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  opacity: 0.8,
                  transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
              >
                <Download size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 30px 40px" }}>
        {/* Legend - Above bar as in Image 1 */}
        <div className="text-center mb-4" style={{ fontSize: "12px" }}>
          <span style={{ fontWeight: 700, color: "#7a5a45", marginRight: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {legendLabel}:
          </span>
          {data.map((item, index) => (
            <span key={item.label || item.grade} className="me-3" style={{ display: "inline-block", marginBottom: "5px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  background: item.color || brownShades[index % brownShades.length],
                  marginRight: "6px",
                  borderRadius: "50%",
                  verticalAlign: "middle"
                }}
              ></span>
              <span style={{ color: "#6b4f3a", fontWeight: 600 }}>
                {item.label || item.grade}
              </span>
            </span>
          ))}
        </div>

        {/* Stacked Bar */}
        <div
          style={{
            display: "flex",
            height: "40px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "4px",
            position: "relative",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)"
          }}
        >
          {data.map((item, index) => {
            if (item.value === 0 && total > 0) return null;
            
            // Handle if total is 0 to avoid NaN width
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            const barWidth = total > 0 ? `${percentage}%` : (index === 0 ? "100%" : "0%");
            const bgColor = item.color || brownShades[index % brownShades.length];
            const textColor = getContrastColor(bgColor);

            return (
              <div
                key={item.label || item.grade}
                style={{
                  width: barWidth,
                  background: bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: textColor,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRight: index < data.length - 1 && percentage > 0 ? "1px solid rgba(255,255,255,0.3)" : "none"
                }}
                onMouseEnter={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  setTooltip({
                    label: item.label || item.grade,
                    value: item.value,
                    percent: percentage.toFixed(1),
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {percentage > 4 && (
                  <span style={{ textShadow: textColor === "#ffffff" ? "0 1px 2px rgba(0,0,0,0.2)" : "none" }}>
                    {item.value}
                  </span>
                )}
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
            background: "rgba(92, 64, 51, 0.95)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            zIndex: 1000,
            whiteSpace: "nowrap",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", marginBottom: "5px", paddingBottom: "2px", textAlign: "center" }}>
            <strong>{tooltip.label}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <span>Count: <strong>{tooltip.value}</strong></span>
            <span>Share: <strong>{tooltip.percent}%</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
