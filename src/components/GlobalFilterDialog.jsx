import React, { useState, useEffect } from "react";
import {
  Calendar,
  X,
  Building2,
  CalendarDays,
  Briefcase,
  Users,
  Filter,
} from "lucide-react";

export const GlobalFilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentStartDate,
  currentEndDate,
  showAdvancedFilters = false, // <-- Ye prop decide karega ki chota form dikhana hai ya bada
  title = "Filter Analytics",
}) => {
  // States for all possible filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Advanced States
  const [companyName, setCompanyName] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [onboardStartDate, setOnboardStartDate] = useState("");
  const [onboardEndDate, setOnboardEndDate] = useState("");
  const [vendors, setVendors] = useState("");

  // Helpers for Date Conversion
  const convertToHTMLDate = (ddmmyyyy) => {
    if (!ddmmyyyy) return "";
    const parts = ddmmyyyy.split("/");
    if (parts.length !== 3) return ddmmyyyy;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const convertToDDMMYYYY = (yyyymmdd) => {
    if (!yyyymmdd) return "";
    const parts = yyyymmdd.split("-");
    if (parts.length !== 3) return yyyymmdd;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  // Sync dates when modal opens
  useEffect(() => {
    if (isOpen) {
      setStartDate(convertToHTMLDate(currentStartDate) || "");
      setEndDate(convertToHTMLDate(currentEndDate) || "");
    }
  }, [isOpen, currentStartDate, currentEndDate]);

  const calculateDaysSelected = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const filtersToApply = {
        startDate: convertToDDMMYYYY(startDate),
        endDate: convertToDDMMYYYY(endDate),
      };

      // Agar advanced on hai, tabhi extra data bhejein
      if (showAdvancedFilters) {
        filtersToApply.companyName = companyName;
        filtersToApply.fiscalYear = fiscalYear;
        filtersToApply.departmentName = departmentName;
        filtersToApply.onboardStartDate = onboardStartDate
          ? convertToDDMMYYYY(onboardStartDate)
          : "";
        filtersToApply.onboardEndDate = onboardEndDate
          ? convertToDDMMYYYY(onboardEndDate)
          : "";
        filtersToApply.vendors = vendors;
      }

      onApplyFilters(filtersToApply);
      onClose();
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setCompanyName("");
    setFiscalYear("");
    setDepartmentName("");
    setOnboardStartDate("");
    setOnboardEndDate("");
    setVendors("");

    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onApplyFilters({
      startDate: formatDate(lastYear),
      endDate: formatDate(today),
    });
    onClose();
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full pl-10 pr-3 h-11 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C72030]/20 focus:border-[#C72030] transition-colors appearance-none";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-xl shadow-2xl w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${showAdvancedFilters ? "max-w-2xl max-h-[90vh]" : "max-w-[450px]"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg text-[#C72030]">
              {showAdvancedFilters ? (
                <Filter className="w-5 h-5" />
              ) : (
                <Calendar className="w-5 h-5" />
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900 m-0">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Primary Date Range (Always Visible) */}
          <div
            className={
              showAdvancedFilters
                ? "p-4 bg-gray-50 rounded-xl border border-gray-100"
                : ""
            }
          >
            {showAdvancedFilters && (
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Assessment Date Range <span className="text-[#C72030]">*</span>
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            {startDate && endDate && (
              <div className="mt-3 text-xs font-medium text-[#C72030] bg-red-50 inline-block px-2.5 py-1 rounded-md border border-red-100">
                {calculateDaysSelected()} days selected
              </div>
            )}
          </div>

          {/* Advanced Filters Section (Conditionally Visible) */}
          {showAdvancedFilters && (
            <>
              <hr className="border-gray-100" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Company Name</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Company</option>
                      <option value="Panchshil Realty">Panchshil Realty</option>
                      <option value="Acme Corporation">Acme Corporation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Fiscal Year</label>
                  <div className="relative">
                    <CalendarDays className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={fiscalYear}
                      onChange={(e) => setFiscalYear(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Fiscal Year</option>
                      <option value="2023-24">2023-24</option>
                      <option value="2024-25">2024-25</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Department Name</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Department</option>
                      <option value="Accounts">Accounts</option>
                      <option value="Billing">Billing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Vendor Category / Name</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={vendors}
                      onChange={(e) => setVendors(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select Vendor</option>
                      <option value="All Vendors">All Vendors</option>
                      <option value="RONAK ENTERPRISES">
                        RONAK ENTERPRISES
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Onboard Date Range
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={onboardStartDate}
                        onChange={(e) => setOnboardStartDate(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={onboardEndDate}
                        onChange={(e) => setOnboardEndDate(e.target.value)}
                        min={onboardStartDate}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={handleClear}
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
          >
            Reset to Default
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!startDate || !endDate}
              className="flex-1 sm:flex-none px-6 py-2 bg-[#C72030] text-white hover:bg-[#a51926] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-sm shadow-sm transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
