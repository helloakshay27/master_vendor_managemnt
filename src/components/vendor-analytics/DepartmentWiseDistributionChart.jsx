import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download } from 'lucide-react';

const COLORS = ['#c4b99d', '#dad6ca', '#8b7355', '#b5a992', '#d4cfc3', '#a89985', '#c9c0b3', '#9d8f7f', '#e0ddd5', '#b8ad9e', '#cec5b8', '#a39689'];

// Dummy data for demonstration
const DUMMY_DATA = [
  { name: 'Accounts', value: 1118 },
  { name: 'Admin', value: 20 },
  { name: 'ARCHITECTURE', value: 559 },
  { name: 'Architecture-1', value: 27 },
  { name: 'Aviation', value: 103 },
  { name: 'Billing', value: 735 },
  { name: 'Business - Concepts and Des...', value: 1 },
  { name: 'Business Development', value: 8 },
  { name: 'Civil Work', value: 121 },
  { name: 'CLIENT FITOUT', value: 11 },
  { name: 'construction', value: 3 },
  { name: 'Consultant', value: 7 },
];

export const DepartmentWiseDistributionChart = ({ data, onDownload, className = "" }) => {
  const chartData = (data && data.length > 0 ? data : DUMMY_DATA).filter(item => item.value > 0);

  const hasData = chartData && chartData.length > 0;

  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`} style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            Department-Wise Vendor Distribution
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
        {hasData ? (
          <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(2)}%`}
                  labelLine={true}
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
                              {data.payload.percent ? `${(data.payload.percent * 100).toFixed(2)}%` : ''}
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
                    maxHeight: '380px', 
                    overflowY: 'auto',
                    paddingLeft: '10px'
                  }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center" style={{ height: '400px' }}>
            <p className="text-gray-500">No department data available</p>
          </div>
        )}
      </div>
    </div>
  );
};
