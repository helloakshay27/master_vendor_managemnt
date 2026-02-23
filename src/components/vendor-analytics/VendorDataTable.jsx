import React from "react";
import { Download } from "lucide-react";

export const VendorDataTable = ({
  title,
  data,
  columns,
  onDownload,
  className = "",
}) => {

  if (!data || data.length === 0) {
    return (
      <div className={`card go-shadow bg-white rounded-lg ${className}`}>
        <div className="vendor-card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3 className="vendor-card-title">{title}</h3>
            {onDownload && (
              <Download
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
                onClick={onDownload}
              />
            )}
          </div>
        </div>
        <div className="card-body" style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "128px",
            }}
          >
            <p style={{ color: "#6b7280" }}>No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card go-shadow bg-white rounded-lg ${className}`}
      style={{ height: "500px", display: "flex", flexDirection: "column" }}
    >
      <div className="vendor-card-header" style={{ flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3 className="vendor-card-title">{title}</h3>
          {onDownload && (
            <Download
              data-no-drag="true"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                color: "#6b7280",
                pointerEvents: "auto",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDownload();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>
      <div
        className="card-body"
        style={{
          padding: "20px",
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #d1d5db",
            }}
          >
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr style={{ backgroundColor: "#ede4d8" }}>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    style={{
                      border: "1px solid #d1d5db",
                      padding: "12px",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#374151",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "white" }}>
              {data.map((row, rowIndex) => {
                const isTotal = row.isTotal;
                return (
                  <tr
                    key={rowIndex}
                    style={
                      isTotal
                        ? { backgroundColor: "#f3f4f6", fontWeight: 600 }
                        : {}
                    }
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          fontSize: "14px",
                          color: "#111827",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key] !== undefined &&
                              row[column.key] !== ""
                            ? row[column.key]
                            : ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
