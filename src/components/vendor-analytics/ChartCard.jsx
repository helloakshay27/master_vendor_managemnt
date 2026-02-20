import React from 'react';
import { Download } from 'lucide-react';

export const ChartCard = ({ title, onDownload, children, className = "" }) => {
  return (
    <div className={`card go-shadow bg-white rounded-lg ${className}`}>
      <div className="vendor-card-header">
        <div className="flex items-center justify-between">
          <h3 className="vendor-card-title">
            {title}
          </h3>
          {onDownload && (
            <Download
              data-no-drag="true"
              className="w-5 h-5 cursor-pointer transition-colors z-50 hover:opacity-80"
              style={{ color: '#6b7280' }}
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
