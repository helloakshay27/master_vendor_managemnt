import React, { useState } from "react";
import { Download, Trophy, Loader2 } from "lucide-react";

/**
 * LeaderBoard
 * Props:
 *  - data: Array<{ organizationName: string, siteName: string, bestSiteScore: number }>
 *  - onDownload?: () => void
 */

const MEDAL = { 0: "🥇", 1: "🥈", 2: "🥉" };

const LeaderBoard = ({ data = [], onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const sorted = [...data].sort((a, b) => b.bestSiteScore - a.bestSiteScore);

  const thStyle = {
    padding: "10px 14px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
    background: "#f9fafb",
    borderBottom: "2px solid #e5e7eb",
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "9px 14px",
    fontSize: "12px",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
    verticalAlign: "middle",
  };

  return (
    <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", height: "100%" }}>
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Trophy size={17} color="#f59e0b" />
            <h2 className="vendor-card-title" style={{ margin: 0 }}>Leader Board</h2>
          </div>
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

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "40px" }}>#</th>
              <th style={thStyle}>Organization Name</th>
              <th style={thStyle}>Site Name</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Best Site Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                style={{ background: i < 3 ? (["#fffbeb", "#f9fafb", "#f9fafb"][i]) : i % 2 === 0 ? "#fff" : "#fafafa" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = i < 3 ? (["#fffbeb", "#f9fafb", "#f9fafb"][i]) : i % 2 === 0 ? "#fff" : "#fafafa")}
              >
                <td style={{ ...tdStyle, fontSize: "14px", textAlign: "center" }}>
                  {MEDAL[i] ?? <span style={{ color: "#9ca3af", fontSize: "11px" }}>{i + 1}</span>}
                </td>
                <td style={{ ...tdStyle, fontWeight: i < 3 ? 600 : 400 }}>{row.organizationName}</td>
                <td style={tdStyle}>{row.siteName}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <span style={{
                    fontWeight: 700,
                    color: i === 0 ? "#d97706" : i === 1 ? "#6b7280" : i === 2 ? "#b45309" : "#374151",
                    fontSize: i < 3 ? "14px" : "12px",
                  }}>
                    {row.bestSiteScore.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;