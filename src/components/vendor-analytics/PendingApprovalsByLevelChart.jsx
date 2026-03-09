import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const CHART_COLORS = {
  approvals: '#c4b99d',
};

export const PendingApprovalsByLevelChart = ({ data, onDownload, className = "" }) => {
  
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

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`} style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Pending Approvals by Level
          </h3>
        </div>
      </div>
      
      <div className="card-body" style={{ padding: '20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" vertical={false} />
                <XAxis
                  dataKey="level"
                  fontSize={11}
                  tick={{ fill: '#374151' }}
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  interval={0}
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
                />
              </BarChart>
            </ResponsiveContainer>
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