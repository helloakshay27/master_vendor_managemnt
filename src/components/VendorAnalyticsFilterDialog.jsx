import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

export const VendorAnalyticsFilterDialog = ({ isOpen, onClose, onApplyFilters, currentStartDate, currentEndDate }) => {
  const [startDate, setStartDate] = useState(currentStartDate || '');
  const [endDate, setEndDate] = useState(currentEndDate || '');

  const handleApply = () => {
    if (startDate && endDate) {
      onApplyFilters({ startDate, endDate });
      onClose();
    }
  };

  const handleReset = () => {
    // Set default date range (last year to today)
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    setStartDate(formatDate(lastYear));
    setEndDate(formatDate(today));
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
  const convertToInputFormat = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Convert YYYY-MM-DD to DD/MM/YYYY
  const convertFromInputFormat = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C72030]" />
            Filter Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={convertToInputFormat(startDate)}
              onChange={(e) => setStartDate(convertFromInputFormat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={convertToInputFormat(endDate)}
              onChange={(e) => setEndDate(convertFromInputFormat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-gray-300"
          >
            Reset
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!startDate || !endDate}
            className="bg-[#C72030] text-white hover:bg-[#C72030]/90"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
