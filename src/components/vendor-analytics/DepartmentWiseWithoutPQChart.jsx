import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { Download, Loader2, RefreshCw } from 'lucide-react';

const COLORS = {
  total_approved: '#5c4033',
  with_pq: '#c4b99d',
  without_pq: '#8b7355',
};

const TruncatedTick = ({ x, y, payload, maxChars = 10 }) => {
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

export const DepartmentWiseWithoutPQChart = ({ data, onDownload, onRefresh, className = "" }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const chartData = Array.isArray(data) ? data : [];
  const minChartWidth = Math.max(chartData.length * 80 + 80, 600);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">Department-Wise Vendors (PQ vs Without PQ)</h3>
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
                      try { await onRefresh(); } finally { setIsRefreshing(false); }
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
                      try { await onDownload(); } finally { setIsDownloading(false); }
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
                  barCategoryGap="20%"
                  barGap={2}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" vertical={false} />
                  <XAxis
                    dataKey="name"
                    height={120}
                    interval={0}
                    tick={<TruncatedTick maxChars={10} />}
                  />
                  <YAxis fontSize={12} tick={{ fill: '#374151' }} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <p style={{ fontWeight: 600, marginBottom: 8, color: '#111827' }}>{label}</p>
                            {payload.map((p) => (
                              <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 4 }}>
                                <span style={{ color: p.fill, fontWeight: 500 }}>{p.name}:</span>
                                <span style={{ fontWeight: 700, color: '#374151' }}>{p.value}</span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ paddingBottom: 8 }}
                    formatter={(value) => (
                      <span style={{ fontSize: 12, color: '#374151' }}>{value}</span>
                    )}
                  />
                  <Bar dataKey="total_approved" name="Total Approved" fill={COLORS.total_approved} radius={[4, 4, 0, 0]} barSize={22} isAnimationActive={false} />
                  <Bar dataKey="with_pq" name="PQ Approved Vendors" fill={COLORS.with_pq} radius={[4, 4, 0, 0]} barSize={22} isAnimationActive={false} />
                  <Bar dataKey="without_pq" name="Non PQ Approved Vendors" fill={COLORS.without_pq} radius={[4, 4, 0, 0]} barSize={22} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            No department-wise data available
          </div>
        )}
      </div>
    </div>
  );
};
