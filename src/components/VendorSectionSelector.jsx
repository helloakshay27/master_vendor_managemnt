import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings2 } from 'lucide-react';

const VENDOR_SECTIONS = [
  { id: 'departmentPreQual', label: 'Department Pre-Qualification Split' },
  { id: 'departmentDistribution', label: 'Department-Wise Vendor Distribution' },
  { id: 'yearWise', label: 'Year-Wise Vendor Registration' },
  { id: 'quarterWise', label: 'Quarter-Wise Vendor Registration' },
  { id: 'monthWise', label: 'Month-Wise Vendor Registration' },
  { id: 'pendingApprovals', label: 'Pending Approvals by Level' },
  { id: 'topBottomVendors', label: 'Top & Bottom 10 Vendors' },
  { id: 'supplierPerformance', label: 'Department-Wise Supplier Performance' },
  { id: 'approvedVendors', label: 'Approved Vendors' },
  { id: 'pqVendors', label: 'PQ Vendors' },
  { id: 'nonPqVendors', label: 'Non PQ Vendors' },
  { id: 'invitedVendors', label: 'Invited Vendors' },
  { id: 'verificationPending', label: 'Verification Pending Vendors' },
  { id: 'detailsSubmitted', label: 'Details Submitted Vendors' },
  { id: 'onboardingInProcess', label: 'Onboarding In Process' },
  { id: 'resubmissionRequests', label: 'Request for Resubmission' },
];

export const VendorSectionSelector = ({ onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState(
    VENDOR_SECTIONS.map(section => section.id)
  );

  useEffect(() => {
    // Load saved preferences from localStorage
    const saved = localStorage.getItem('vendorVisibleSections');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedSections(parsed);
        onSelectionChange(parsed);
      } catch (e) {
        console.error('Failed to load section preferences:', e);
      }
    } else {
      // Default: all sections visible
      onSelectionChange(selectedSections);
    }
  }, []);

  const handleToggle = (sectionId) => {
    setSelectedSections(prev => {
      const newSelection = prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId];
      return newSelection;
    });
  };

  const handleApply = () => {
    localStorage.setItem('vendorVisibleSections', JSON.stringify(selectedSections));
    onSelectionChange(selectedSections);
    setIsOpen(false);
  };

  const handleSelectAll = () => {
    const allIds = VENDOR_SECTIONS.map(s => s.id);
    setSelectedSections(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedSections([]);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border-gray-300"
      >
        <Settings2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          Customize Dashboard ({selectedSections.length}/{VENDOR_SECTIONS.length})
        </span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#C72030]" />
              Customize Dashboard Sections
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="flex-1"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeselectAll}
                className="flex-1"
              >
                Deselect All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VENDOR_SECTIONS.map(section => (
                <div
                  key={section.id}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleToggle(section.id)}
                >
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleToggle(section.id)}
                  />
                  <label
                    htmlFor={section.id}
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {section.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="bg-[#C72030] text-white hover:bg-[#C72030]/90"
            >
              Apply Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
