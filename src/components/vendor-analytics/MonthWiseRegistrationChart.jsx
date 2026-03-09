import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';

const CHART_COLORS = {
  pqApproved: '#c4b99d',
  nonPqApproved: '#8b7355',
};

// Dummy data for demonstration
const DUMMY_DATA = [
  { month: 'Jan 2025', pqApproved: 23, nonPqApproved: 89 },
  { month: 'Feb 2025', pqApproved: 34, nonPqApproved: 102 },
  { month: 'Mar 2025', pqApproved: 45, nonPqApproved: 123 },
  { month: 'Apr 2025', pqApproved: 38, nonPqApproved: 98 },
  { month: 'May 2025', pqApproved: 52, nonPqApproved: 134 },
  { month: 'Jun 2025', pqApproved: 61, nonPqApproved: 156 },
  { month: 'Jul 2025', pqApproved: 48, nonPqApproved: 128 },
  { month: 'Aug 2025', pqApproved: 55, nonPqApproved: 142 },
  { month: 'Sep 2025', pqApproved: 67, nonPqApproved: 167 },
  { month: 'Oct 2025', pqApproved: 73, nonPqApproved: 189 },
  { month: 'Nov 2025', pqApproved: 81, nonPqApproved: 201 },
  { month: 'Dec 2025', pqApproved: 89, nonPqApproved: 223 },
];

export const MonthWiseRegistrationChart = ({ data, onDownload, className = "" }) => {
  const chartData = (data && data.length > 0 ? data : DUMMY_DATA).map(item => ({
    month: item.month || 'Unknown',
    pqApproved: item.pqApproved || 0,
    nonPqApproved: item.nonPqApproved || 0,
    total: item.total || (item.pqApproved || 0) + (item.nonPqApproved || 0),
  }));

  // Each bar gets ~22px so all months are readable; minimum 600px
  const minChartWidth = Math.max(chartData.length * 22 + 80, 600);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Month-Wise Vendor Registration
          </h3>
          {onDownload && (
            <Download
              data-no-drag="true"
              className="w-5 h-5 cursor-pointer transition-colors z-50"
              style={{ color: '#6b7280', pointerEvents: 'auto' }}
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
      <div className="card-body" style={{ padding: '20px' }}>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: `${minChartWidth}px`, height: '420px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                  <XAxis
                    dataKey="month"
                    fontSize={10}
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
                    domain={[0, chartData.length > 0 ? Math.max(3, Math.ceil(Math.max(...chartData.map(d => d.total || 0)) * 1.2)) : 3]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-800 mb-2">{label}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between items-center gap-4">
                                <span className="font-medium" style={{ color: CHART_COLORS.pqApproved }}>
                                  With PQ:
                                </span>
                                <span className="text-gray-700">{d.pqApproved}</span>
                              </div>
                              <div className="flex justify-between items-center gap-4">
                                <span className="font-medium" style={{ color: CHART_COLORS.nonPqApproved }}>
                                  Without PQ:
                                </span>
                                <span className="text-gray-700">{d.nonPqApproved}</span>
                              </div>
                              <div className="pt-1 border-t border-gray-200">
                                <div className="flex justify-between items-center font-semibold gap-4">
                                  <span>Total:</span>
                                  <span>{d.total}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Bar dataKey="pqApproved" stackId="a" fill={CHART_COLORS.pqApproved} name="With PQ" />
                  <Bar dataKey="nonPqApproved" stackId="a" fill={CHART_COLORS.nonPqApproved} name="Without PQ" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No month-wise data available
          </div>
        )}
      </div>
    </div>
  );
};
