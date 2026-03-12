import React, { useState } from "react";
import { Download, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export const VendorDataTable = ({
  title,
  data,
  columns,
  onDownload,
  className = "",
  loading = false,      // internal prop
  isLoading = false,    // alias used by ReKyc Dashboard
  pagination: externalPagination,
  onPageChange: externalOnPageChange,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  const isActuallyLoading = loading || isLoading;

  // Show styled spinner card while loading (no data yet)
  if (isActuallyLoading && (!data || data.length === 0)) {
    return (
      <div className={`card go-shadow bg-white rounded-lg ${className}`}>
        <div className="vendor-card-header">
          <h3 className="vendor-card-title">{title}</h3>
        </div>
        <div
          className="card-body"
          style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
          <div className="spinner-border text-primary mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="text-muted fw-medium">Loading {title}...</span>
        </div>
      </div>
    );
  }

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
          </div>
        </div>
        <div className="card-body" style={{ padding: "0" }}>
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

  const isLocalPagination = !externalPagination;
  const activePerPage = externalPagination?.per_page || itemsPerPage;
  const totalRecords = isLocalPagination ? data.length : externalPagination.total_records;
  const totalPages = isLocalPagination
    ? Math.max(1, Math.ceil(totalRecords / activePerPage))
    : externalPagination.total_pages;

  // Make sure current page is within valid range for local pagination
  const safeCurrentPage = isLocalPagination
    ? Math.min(Math.max(1, currentPage), totalPages)
    : externalPagination.current_page;

  const handlePageChange = (newPage) => {
    if (isLocalPagination) {
      setCurrentPage(newPage);
    } else if (externalOnPageChange) {
      externalOnPageChange(newPage);
    }
  };

  const displayData = isLocalPagination
    ? data.slice((safeCurrentPage - 1) * activePerPage, safeCurrentPage * activePerPage)
    : data;

  const showPagination = totalPages > 1 || externalPagination;

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
                    await onDownload({ columns, data });
                  } finally {
                    setIsDownloading(false);
                  }
                }}
              />
            )
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
          position: "relative", // Ensure relative for overlay
        }}
      >
        {/* Loading Overlay */}
        {loading && (
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0 0 8px 8px"
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#d97938] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-gray-600">Loading...</span>
            </div>
          </div>
        )}
        <div style={{ overflowY: "auto", overflowX: "auto", flex: 1 }}>
          <table
            style={{
              width: "100%",
              minWidth: "100%",
              borderCollapse: "collapse",
              border: "1px solid #d1d5db",
              tableLayout: "fixed",
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
                      wordBreak: "break-word",
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "white" }}>
              {displayData.map((row, rowIndex) => {
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
                          wordBreak: "break-word",
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
      {showPagination && (() => {
        const startIndex = totalRecords === 0 ? 0 : (safeCurrentPage - 1) * activePerPage + 1;
        const endIndex = Math.min(safeCurrentPage * activePerPage, totalRecords);

        // Generate visible page numbers
        let startPage = Math.max(1, safeCurrentPage - 2);
        let endPage = Math.min(totalPages, safeCurrentPage + 2);
        if (endPage - startPage < 4) {
          if (startPage === 1) endPage = Math.min(totalPages, 5);
          else if (endPage === totalPages) startPage = Math.max(1, totalPages - 4);
        }
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        const btnStyle = {
          padding: "6px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          fontSize: "14px",
          cursor: "pointer",
          backgroundColor: "#fff",
          color: "#374151"
        };
        const activeBtnStyle = {
          ...btnStyle,
          backgroundColor: "#d97938",
          color: "#fff",
          borderColor: "#d97938"
        };
        const disabledBtnStyle = {
          ...btnStyle,
          backgroundColor: "#e5e7eb",
          color: "#6b7280",
          cursor: "not-allowed"
        };

        return (
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid #d1d5db",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              backgroundColor: "#fff",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <button
                onClick={() => handlePageChange(1)}
                disabled={safeCurrentPage <= 1}
                style={safeCurrentPage <= 1 ? disabledBtnStyle : btnStyle}
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                style={safeCurrentPage <= 1 ? disabledBtnStyle : btnStyle}
              >
                Prev
              </button>
              
              {pages.map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={page === safeCurrentPage ? activeBtnStyle : btnStyle}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                style={safeCurrentPage >= totalPages ? disabledBtnStyle : btnStyle}
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={safeCurrentPage >= totalPages}
                style={safeCurrentPage >= totalPages ? disabledBtnStyle : btnStyle}
              >
                Last
              </button>
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              Showing {startIndex} to {endIndex} of {totalRecords} entries
            </div>
          </div>
        );
      })()}
    </div>
  );
};
