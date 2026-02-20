import React from 'react';
import { CheckCircle2, Users, UserCheck, Clock, Mail, FileText, AlertCircle, RefreshCw } from 'lucide-react';

const getIconForTitle = (title) => {
  const iconProps = { size: 24, strokeWidth: 2 };
  
  switch (title) {
    case 'Approved Vendors':
      return <CheckCircle2 {...iconProps} />;
    case 'PQ Vendors':
      return <UserCheck {...iconProps} />;
    case 'Non-PQ Vendors':
      return <Users {...iconProps} />;
    case 'Onboarding In Process':
      return <Clock {...iconProps} />;
    case 'Invited Vendors':
      return <Mail {...iconProps} />;
    case 'Details Submitted':
      return <FileText {...iconProps} />;
    case 'Verification Pending':
      return <AlertCircle {...iconProps} />;
    case 'Request for Resubmission':
      return <RefreshCw {...iconProps} />;
    default:
      return <Users {...iconProps} />;
  }
};

export const VendorStatCard = ({ title, value, className = "" }) => {
  return (
    <div 
      className={`card go-shadow transition-all duration-200 hover:shadow-lg ${className}`}
      style={{ 
        backgroundColor: '#F6F4EE',
        borderRadius: '12px',
        padding: '20px',
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Icon Box */}
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: '#e8e3d9',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#8b7355'
        }}>
          {getIconForTitle(title)}
        </div>
        
        {/* Content */}
        <div style={{ flex: 1 }}>
          <p style={{ 
            fontSize: '32px', 
            fontWeight: 700, 
            color: '#1f2937',
            margin: 0,
            lineHeight: 1.2,
            marginBottom: '4px'
          }}>
            {value.toLocaleString()}
          </p>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#6b7280',
            margin: 0,
            lineHeight: 1.4
          }}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};
