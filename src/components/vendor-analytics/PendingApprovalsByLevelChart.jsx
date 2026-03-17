import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Loader2, RefreshCw } from 'lucide-react';

const CHART_COLORS = {
  approvals: '#c4b99d',
};

// Truncated tick similar to MonthWiseRegistrationChart
const TruncatedTick = ({ x, y, payload, maxChars = 8 }) => {
  const full = String(payload?.value || '');
  const display = full.length > maxChars ? full.slice(0, maxChars) + '…' : full;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{full}</title>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="#374151"
        fontSize={10}
        transform="rotate(-45)"
        style={{ cursor: 'default' }}
      >
        {display}
      </text>
    </g>
  );
};

export const PendingApprovalsByLevelChart = ({ data, onDownload, onRefresh, className = "" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // 1. Safely extract array from API response (Handles both direct array and { data: [...] } format)
  let safeData = [];
  if (Array.isArray(data) && data.length > 0) {
    safeData = data;
  } else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
    safeData = data.data;
  }

  // 2. Map API keys (approval_level & pending_count) to Chart keys (level & count)
  const chartData = safeData.map(item => ({
    level: item.approval_level || item.level || 'Unknown',
    count: item.pending_count !== undefined ? Number(item.pending_count) : Number(item.count || 0)
  }));

  // Match month-wise chart behavior: wide chart with horizontal scroll
  const minChartWidth = Math.max(chartData.length * 44 + 80, 600);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">
            Pending Approvals by Level
          </h3>
          {(onRefresh || onDownload) && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {onRefresh && (
                isRefreshing ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#d97938" }} />
                ) : (
                  <RefreshCw
                    className="w-5 h-5 cursor-pointer"
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
                  />
                )
              )}
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
          )}
        </div>
      </div>
      
      <div className="card-body" style={{ padding: '20px' }}>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: `${minChartWidth}px`, height: '420px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" vertical={false} />
                  <XAxis
                    dataKey="level"
                    height={120}
                    interval={0}
                    tick={<TruncatedTick maxChars={8} />}
                  />
                  <YAxis
                    fontSize={12}
                    tick={{ fill: '#374151' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'transparent', opacity: 0.1 }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const rowData = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-800 mb-2">{label}</p>
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-medium" style={{ color: CHART_COLORS.approvals }}>
                                Pending:
                              </span>
                              <span className="text-gray-700 font-bold">{rowData.count}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill={CHART_COLORS.approvals}
                    name="Pending Approvals"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 h-full flex items-center justify-center">
            No pending approvals data available
          </div>
        )}
      </div>
    </div>
  );
};