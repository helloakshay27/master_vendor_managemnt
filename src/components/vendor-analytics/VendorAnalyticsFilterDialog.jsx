import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const VendorAnalyticsFilterDialog = ({ isOpen, onClose, onApplyFilters, currentStartDate, currentEndDate }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fiscalYear, setFiscalYear] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [onboardStartDate, setOnboardStartDate] = useState('');
  const [onboardEndDate, setOnboardEndDate] = useState('');
  const [vendors, setVendors] = useState('');

  // Convert DD/MM/YYYY to YYYY-MM-DD for HTML input
  const convertToHTMLDate = (ddmmyyyy) => {
    if (!ddmmyyyy) return '';
    const parts = ddmmyyyy.split('/');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Convert YYYY-MM-DD to DD/MM/YYYY
  const convertToDDMMYYYY = (yyyymmdd) => {
    if (!yyyymmdd) return '';
    const parts = yyyymmdd.split('-');
    if (parts.length !== 3) return '';
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  // Initialize dates when dialog opens
  useEffect(() => {
    if (isOpen && currentStartDate && currentEndDate) {
      setStartDate(convertToHTMLDate(currentStartDate));
      setEndDate(convertToHTMLDate(currentEndDate));
    }
  }, [isOpen, currentStartDate, currentEndDate]);

  const calculateDaysSelected = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onApplyFilters({
        startDate: convertToDDMMYYYY(startDate),
        endDate: convertToDDMMYYYY(endDate),
        companyName,
        fiscalYear,
        departmentName,
        onboardStartDate: onboardStartDate ? convertToDDMMYYYY(onboardStartDate) : '',
        onboardEndDate: onboardEndDate ? convertToDDMMYYYY(onboardEndDate) : '',
        vendors
      });
      onClose();
    }
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setCompanyName('');
    setFiscalYear('');
    setDepartmentName('');
    setOnboardStartDate('');
    setOnboardEndDate('');
    setVendors('');
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);
    
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onApplyFilters({
      startDate: formatDate(lastYear),
      endDate: formatDate(today)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '42rem',
          width: '100%'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#111827',
              margin: 0
            }}>FILTER DATE RANGE</h2>
            <button
              onClick={onClose}
              style={{
                color: '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            {/* Date Range Section */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              {/* Days Selected Info */}
              {startDate && endDate && (
                <div style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {calculateDaysSelected()} days selected
                </div>
              )}
            </div>

            {/* Company Name Dropdown */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Company Name
              </label>
              <select
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select Company</option>
                <option value="Panchshil Realty">Panchshil Realty</option>
                <option value="Acme Corporation">Acme Corporation</option>
                <option value="Tech Solutions Ltd">Tech Solutions Ltd</option>
                <option value="Global Industries">Global Industries</option>
                <option value="Prime Enterprises">Prime Enterprises</option>
              </select>
            </div>

            {/* Fiscal Year Dropdown */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Fiscal Year
              </label>
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select Fiscal Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
              </select>
            </div>

            {/* Department Name Dropdown */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Department Name
              </label>
              <select
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select Department</option>
                <option value="Accounts">Accounts</option>
                <option value="Admin">Admin</option>
                <option value="ARCHITECTURE">ARCHITECTURE</option>
                <option value="Aviation">Aviation</option>
                <option value="Billing">Billing</option>
                <option value="CLIENT FITOUT">CLIENT FITOUT</option>
                <option value="Contracts">Contracts</option>
                <option value="CORPORATE COMMUNICATION">CORPORATE COMMUNICATION</option>
                <option value="Electrical">Electrical</option>
                <option value="FACILITY MANAGEMENT">FACILITY MANAGEMENT</option>
                <option value="Finance">Finance</option>
                <option value="IBMS">IBMS</option>
                <option value="IT Services">IT Services</option>
                <option value="Legal and Liaison">Legal and Liaison</option>
                <option value="Purchase P1">Purchase P1</option>
                <option value="Purchase P2">Purchase P2</option>
              </select>
            </div>

            {/* Onboard Date Range */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Onboard Start Date
                  </label>
                  <input
                    type="date"
                    value={onboardStartDate}
                    onChange={(e) => setOnboardStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Onboard End Date
                  </label>
                  <input
                    type="date"
                    value={onboardEndDate}
                    onChange={(e) => setOnboardEndDate(e.target.value)}
                    min={onboardStartDate}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Vendors Dropdown */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Vendors
              </label>
              <select
                value={vendors}
                onChange={(e) => setVendors(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select Vendor</option>
                <option value="All Vendors">All Vendors</option>
                <option value="PQ Vendors">PQ Vendors</option>
                <option value="Non-PQ Vendors">Non-PQ Vendors</option>
                <option value="Approved Vendors">Approved Vendors</option>
                <option value="Pending Vendors">Pending Vendors</option>
                <option value="Invited Vendors">Invited Vendors</option>
                <option value="RONAK ENTERPRISES">RONAK ENTERPRISES</option>
                <option value="S A ENTERPRISES">S A ENTERPRISES</option>
                <option value="TECHNO SOLUTIONS INDIA PVT LTD">TECHNO SOLUTIONS INDIA PVT LTD</option>
                <option value="GLOBAL CONSTRUCTION SERVICES">GLOBAL CONSTRUCTION SERVICES</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={handleApply}
                disabled={!startDate || !endDate}
                style={{
                  flex: 1,
                  backgroundColor: startDate && endDate ? '#f2eee9' : '#d1d5db',
                  color: startDate && endDate ? '#c72030' : '#6b7280',
                  padding: '10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: startDate && endDate ? 'pointer' : 'not-allowed'
                }}
              >
                Apply Filter
              </button>
              <button
                onClick={handleClear}
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
