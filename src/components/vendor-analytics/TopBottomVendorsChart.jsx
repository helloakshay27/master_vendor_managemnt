import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Loader2 } from 'lucide-react';

const CHART_COLORS = {
  top: '#c4b99d',
  bottom: '#8b7355',
};

export const TopBottomVendorsChart = ({ topData, bottomData, onDownload, className = "" }) => {
  const [isDownloadingTop, setIsDownloadingTop] = useState(false);
  const [isDownloadingBottom, setIsDownloadingBottom] = useState(false);
  // Use provided data or fallback to empty array
  const topChartData = (topData && topData.length > 0 ? topData : []);
  const bottomChartData = (bottomData && bottomData.length > 0 ? bottomData : []);

  console.log('TopBottomVendorsChart - topData:', topChartData);
  console.log('TopBottomVendorsChart - bottomData:', bottomChartData);

  return (
    <div className="row g-4">
      {/* Top 10 Vendors Card */}
      <div className="col-12 col-lg-6">
        <div className={`card go-shadow bg-white rounded-lg ${className}`}>
          <div className="vendor-card-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <h3 className="vendor-card-title">
                Top 10 Vendors by Avg TAT
              </h3>
              {onDownload && (
                isDownloadingTop ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#d97938" }} />
                ) : (
                  <Download
                    className="w-5 h-5 cursor-pointer"
                    style={{ color: "#6b7280" }}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDownloadingTop(true);
                      try {
                        await onDownload();
                      } finally {
                        setIsDownloadingTop(false);
                      }
                    }}
                  />
                )
              )}
            </div>
          </div>
          <div className="card-body" style={{ padding: '20px' }}>
            {topChartData.length > 0 ? (
              <div style={{ width: '100%', height: '500px' }}>
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={topChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      fontSize={12} 
                      tick={{ fill: '#374151' }}
                      label={{ value: 'Supplier Avg TAT', position: 'insideBottom', offset: -5, style: { fill: '#374151', fontSize: 14 } }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      fontSize={11}
                      tick={{ fill: '#555' }}
                      width={200}
                      interval={0}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-800 mb-1">{payload[0].payload.name}</p>
                              <p className="text-gray-600">Avg TAT: <span className="font-bold">{payload[0].value}</span> days</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="avgTat" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#374151', fontSize: 12 }}>
                      {topChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS.top} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No top vendors data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom 10 Vendors Card */}
      <div className="col-12 col-lg-6">
        <div className={`card go-shadow bg-white rounded-lg ${className}`}>
          <div className="vendor-card-header">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <h3 className="vendor-card-title">
                Bottom 10 Vendors by Avg TAT
              </h3>
              {onDownload && (
                isDownloadingBottom ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#d97938" }} />
                ) : (
                  <Download
                    className="w-5 h-5 cursor-pointer"
                    style={{ color: "#6b7280" }}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDownloadingBottom(true);
                      try {
                        await onDownload();
                      } finally {
                        setIsDownloadingBottom(false);
                      }
                    }}
                  />
                )
              )}
            </div>
          </div>
          <div className="card-body" style={{ padding: '20px' }}>
            {bottomChartData.length > 0 ? (
              <div style={{ width: '100%', height: '500px' }}>
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={bottomChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 40, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      fontSize={12} 
                      tick={{ fill: '#374151' }}
                      label={{ value: 'Supplier Avg TAT', position: 'insideBottom', offset: -5, style: { fill: '#374151', fontSize: 14 } }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      fontSize={11}
                      tick={{ fill: '#555' }}
                      width={200}
                      interval={0}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-800 mb-1">{payload[0].payload.name}</p>
                              <p className="text-gray-600">Avg TAT: <span className="font-bold">{payload[0].value}</span> days</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="avgTat" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#374151', fontSize: 12 }}>
                      {bottomChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS.bottom} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No bottom vendors data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
