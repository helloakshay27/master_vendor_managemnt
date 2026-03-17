import React, { useState } from 'react';
import { Download, Loader2, RefreshCw } from 'lucide-react';

export const ChartCard = ({
  title,
  onDownload,
  onRefresh,
  children,
  className = "",
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">
            {title}
          </h3>
          {(onRefresh || onDownload) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {onRefresh && (
                isRefreshing ? (
                  <Loader2
                    className="w-5 h-5 animate-spin"
                    style={{ color: "#d97938" }}
                  />
                ) : (
                  <RefreshCw
                    data-no-drag="true"
                    className="w-5 h-5 cursor-pointer transition-colors z-50 hover:opacity-80"
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
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
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
                    data-no-drag="true"
                    className="w-5 h-5 cursor-pointer transition-colors z-50 hover:opacity-80"
                    style={{ color: '#6b7280' }}
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
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div className="card-body" style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export const NoDataMessage = () => (
  <div className="flex items-center justify-center h-64">
    <p className="text-gray-500">No data available</p>
  </div>
);
