import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download } from 'lucide-react';

const CHART_COLORS = {
  pqApproved: '#c4b99d',
  nonPqApproved: '#8b7355',
};

// Dummy data for demonstration
const DUMMY_DATA = [
  { quarter: 'Q1 2024', pqApproved: 56, nonPqApproved: 178 },
  { quarter: 'Q2 2024', pqApproved: 67, nonPqApproved: 203 },
  { quarter: 'Q3 2024', pqApproved: 89, nonPqApproved: 267 },
  { quarter: 'Q4 2024', pqApproved: 102, nonPqApproved: 312 },
  { quarter: 'Q1 2025', pqApproved: 118, nonPqApproved: 356 },
  { quarter: 'Q2 2025', pqApproved: 134, nonPqApproved: 398 },
];

export const QuarterWiseRegistrationChart = ({ data, onDownload, className = "" }) => {
  // Use provided data or fallback to dummy data
  const chartData = (data && data.length > 0 ? data : DUMMY_DATA).map(item => ({
    quarter: item.quarter || 'Unknown',
    pqApproved: item.pqApproved || 0,
    nonPqApproved: item.nonPqApproved || 0,
    total: (item.pqApproved || 0) + (item.nonPqApproved || 0)
  }));

  console.log('QuarterWiseRegistrationChart - chartData:', chartData);

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`} style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Quarter-Wise Vendor Registration
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
      <div className="card-body" style={{ padding: '20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {chartData.length > 0 ? (
          <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                <XAxis
                  dataKey="quarter"
                  fontSize={11}
                  tick={{ fill: '#374151' }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
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
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-800 mb-2">{label}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-medium" style={{ color: CHART_COLORS.pqApproved }}>
                                PQ Approved:
                              </span>
                              <span className="text-gray-700">{data.pqApproved}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                              <span className="font-medium" style={{ color: CHART_COLORS.nonPqApproved }}>
                                Non PQ Approved:
                              </span>
                              <span className="text-gray-700">{data.nonPqApproved}</span>
                            </div>
                            <div className="pt-1 border-t border-gray-200">
                              <div className="flex justify-between items-center font-semibold gap-4">
                                <span>Total:</span>
                                <span>{data.total}</span>
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
                <Bar dataKey="pqApproved" stackId="a" fill={CHART_COLORS.pqApproved} name="PQ Approved Vendors" />
                <Bar dataKey="nonPqApproved" stackId="a" fill={CHART_COLORS.nonPqApproved} name="Non PQ Approved Vendors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No quarter-wise data available
          </div>
        )}
      </div>
    </div>
  );
};
