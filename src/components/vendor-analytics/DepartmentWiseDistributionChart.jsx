import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download, Loader2, RefreshCw } from 'lucide-react';

const COLORS = ['#c4b99d', '#dad6ca', '#8b7355', '#b5a992', '#d4cfc3', '#a89985', '#c9c0b3', '#9d8f7f', '#e0ddd5', '#b8ad9e', '#cec5b8', '#a39689'];

export const DepartmentWiseDistributionChart = ({ 
  data, 
  onDownload, 
  onRefresh,
  title = "Department-Wise Vendor Distribution",
  noDataText = "No department data available",
  className = "" 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const chartData = (data && data.length > 0 ? data : []).filter(item => item.value > 0);
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  const hasData = chartData && chartData.length > 0;

  return (
    <div className={`card shadow-sm bg-white rounded-lg ${className}`} style={{ height: '650px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header border-b px-4 py-3">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <h3 className="vendor-card-title">
            {title}
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
      <div className="card-body" style={{ padding: '20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {hasData ? (
          <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height={550}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={200}
                  paddingAngle={2}
                  dataKey="value"
                  label={false}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-800 mb-1">{data.name}</p>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-gray-600">Vendors:</span>
                            <span className="font-bold text-gray-800">{data.value}</span>
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-gray-600">Percentage:</span>
                            <span className="font-bold" style={{ color: data.payload.fill }}>
                              {((data.value / totalValue) * 100).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  layout="vertical"
                  align="left"
                  verticalAlign="middle"
                  wrapperStyle={{ 
                    fontSize: '12px', 
                    paddingLeft: '10px',
                    width: '300px'
                  }}
                  iconType="circle"
                  formatter={(value, entry) => {
                    const payload = entry.payload;
                    const percent = ((payload.value / totalValue) * 100).toFixed(2);
                    return <span style={{ color: '#4b5563' }}>{value} - {percent}%</span>;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center" style={{ height: '550px' }}>
            <p className="text-gray-500">{noDataText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
