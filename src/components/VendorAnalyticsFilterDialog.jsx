import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";

export const VendorAnalyticsFilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentStartDate,
  currentEndDate,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Jaise hi modal open hoga, current dates set ho jayengi
  useEffect(() => {
    if (isOpen) {
      setStartDate(currentStartDate || "");
      setEndDate(currentEndDate || "");
    }
  }, [isOpen, currentStartDate, currentEndDate]);

  const handleApply = () => {
    if (startDate && endDate) {
      onApplyFilters({ startDate, endDate });
      onClose();
    }
  };

  const handleReset = () => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const newStart = formatDate(lastYear);
    const newEnd = formatDate(today);

    setStartDate(newStart);
    setEndDate(newEnd);

    // Reset karte hi turant apply ho jayega
    onApplyFilters({ startDate: newStart, endDate: newEnd });
    onClose();
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD
  const convertToInputFormat = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length !== 3) return dateStr;
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };

  // Convert YYYY-MM-DD to DD/MM/YYYY
  const convertFromInputFormat = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  // Ye line guarantee karti hai ki state false hone par modal gayab aur true hone par dikhega
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark Blur Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Main Modal Box */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[450px] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5 m-0">
            <div className="p-1.5 bg-red-50 rounded-md">
              <Calendar className="w-5 h-5 text-[#C72030]" />
            </div>
            Filter Analytics
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 block">
                Start Date
              </label>
              <input
                type="date"
                value={convertToInputFormat(startDate)}
                onChange={(e) =>
                  setStartDate(convertFromInputFormat(e.target.value))
                }
                className="w-full h-11 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C72030]/20 focus:border-[#C72030] transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 block">
                End Date
              </label>
              <input
                type="date"
                value={convertToInputFormat(endDate)}
                min={convertToInputFormat(startDate)}
                onChange={(e) =>
                  setEndDate(convertFromInputFormat(e.target.value))
                }
                className="w-full h-11 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C72030]/20 focus:border-[#C72030] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center gap-3">
          <button
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none"
          >
            Reset
          </button>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!startDate || !endDate}
              className="flex-1 sm:flex-none px-5 py-2 bg-[#C72030] text-white hover:bg-[#a51926] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-sm shadow-sm transition-colors focus:outline-none"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
