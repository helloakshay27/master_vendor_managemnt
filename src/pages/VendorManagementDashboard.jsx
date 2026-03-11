import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { BarChart3, Calendar, Filter, TrendingUp, X } from "lucide-react";
import { SortableChartItem } from "@/components/SortableChartItem";
import "../styles/mor.css";

import {
  VendorStatCard,
  DepartmentPreQualificationChart,
  DepartmentWiseDistributionChart,
  YearWiseRegistrationChart,
  QuarterWiseRegistrationChart,
  MonthWiseRegistrationChart,
  PendingApprovalsByLevelChart,
  VendorDataTable,
  TopBottomVendorsChart,
} from "@/components/vendor-analytics";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { VendorFilterCard } from "@/components/vendor-analytics/VendorFilterCard";
import { baseURL } from "../confi/apiDomain";

// =========================================================================
// TABLE COLUMNS CONSTANTS
// =========================================================================
const InlineFilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentStartDate,
  currentEndDate,
  currentPqType,
  token, // Added token prop
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [onboardStartDate, setOnboardStartDate] = useState("");
  const [onboardEndDate, setOnboardEndDate] = useState("");
  const [vendors, setVendors] = useState("");
  const [pqType, setPqType] = useState("with_pq");

  const [companiesList, setCompaniesList] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const formatForInput = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split("/");
        if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
        return dateStr;
      };
      setStartDate(formatForInput(currentStartDate));
      setEndDate(formatForInput(currentEndDate));
      setPqType(currentPqType || "with_pq");
    }
  }, [isOpen, currentStartDate, currentEndDate, currentPqType]);

  useEffect(() => {
    if (isOpen && companiesList.length === 0) {
      const fetchCompanies = async () => {
        setIsLoadingCompanies(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/company_slicer.json?token=${token}`,
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data?.data?.companies && Array.isArray(data.data.companies))
            arr = data.data.companies;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setCompaniesList(arr);
        } catch (error) {
          console.error("Error fetching companies:", error);
        } finally {
          setIsLoadingCompanies(false);
        }
      };
      fetchCompanies();
    }
  }, [isOpen]);

  useEffect(() => {
    if (companyName) {
      const fetchDepartments = async () => {
        setIsLoadingDepartments(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/department_slicer.json?token=${token}&company_ids=${companyName}`,
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (
            data?.data?.departments &&
            Array.isArray(data.data.departments)
          )
            arr = data.data.departments;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setDepartmentsList(arr);
        } catch (error) {
          console.error("Error fetching departments:", error);
        } finally {
          setIsLoadingDepartments(false);
        }
      };
      fetchDepartments();
    } else {
      setDepartmentsList([]);
      setDepartmentName("");
    }
  }, [companyName]);

  useEffect(() => {
    if (companyName) {
      const fetchVendors = async () => {
        setIsLoadingVendors(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/vendors_slicer.json?token=${token}&company_ids=${companyName}`,
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data?.data?.vendors && Array.isArray(data.data.vendors))
            arr = data.data.vendors;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setVendorsList(arr);
        } catch (error) {
          console.error("Error fetching vendors:", error);
        } finally {
          setIsLoadingVendors(false);
        }
      };
      fetchVendors();
    } else {
      setVendorsList([]);
      setVendors("");
    }
  }, [companyName]);

  if (!isOpen) return null;

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
      const formatForOutput = (dateStr) => {
        const parts = dateStr.split("-");
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return dateStr;
      };
      onApplyFilters({
        startDate: formatForOutput(startDate),
        endDate: formatForOutput(endDate),
        companyName,
        fiscalYear,
        departmentName,
        onboardStartDate: onboardStartDate
          ? formatForOutput(onboardStartDate)
          : "",
        onboardEndDate: onboardEndDate ? formatForOutput(onboardEndDate) : "",
        vendors,
        pqType,
      });
      onClose();
    }
  };

  const handleReset = () => {
    const today = new Date();
    const formatDt = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const formatOut = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    setStartDate(formatDt(oneYearAgo));
    setEndDate(formatDt(today));
    setCompanyName("");
    setFiscalYear("");
    setDepartmentName("");
    setOnboardStartDate("");
    setOnboardEndDate("");
    setVendors("");
    setPqType("with_pq");

    onApplyFilters({
      startDate: formatOut(oneYearAgo),
      endDate: formatOut(today),
      companyName: "",
      departmentName: "",
      vendors: "",
      pqType: "with_pq",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white",
    color: "#111827",
  };
  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    color: "#374151",
  };

  const safeCompanies = Array.isArray(companiesList) ? companiesList : [];
  const safeDepartments = Array.isArray(departmentsList) ? departmentsList : [];
  const safeVendors = Array.isArray(vendorsList) ? vendorsList : [];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
        }}
      ></div>
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #f3f4f6",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#111827",
            }}
          >
            Advanced Filters
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
            }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: "24px", overflowY: "auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            {startDate && endDate && (
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                {calculateDaysSelected()} days selected
              </div>
            )}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label style={labelStyle}>Company Name</label>
              <select
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Company</option>
                {isLoadingCompanies ? (
                  <option disabled>Loading companies...</option>
                ) : (
                  safeCompanies.map((company, index) => {
                    const val = company.id || company.name || company;
                    const label =
                      company.name || company.company_name || company;
                    return (
                      <option key={index} value={val}>
                        {label}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Fiscal Year</label>
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Fiscal Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Department Name</label>
              <select
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                style={{
                  ...inputStyle,
                  backgroundColor: !companyName ? "#f3f4f6" : "white",
                  cursor: !companyName ? "not-allowed" : "pointer",
                }}
                disabled={!companyName || isLoadingDepartments}
              >
                <option value="">
                  {!companyName
                    ? "Select a company first"
                    : "Select Department"}
                </option>
                {isLoadingDepartments ? (
                  <option disabled>Loading departments...</option>
                ) : (
                  safeDepartments.map((dept, index) => {
                    const val = dept.id || dept.name || dept;
                    const label = dept.name || dept.department_name || dept;
                    return (
                      <option key={index} value={val}>
                        {label}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Vendors</label>
              <select
                value={vendors}
                onChange={(e) => setVendors(e.target.value)}
                style={{
                  ...inputStyle,
                  backgroundColor: !companyName ? "#f3f4f6" : "white",
                  cursor: !companyName ? "not-allowed" : "pointer",
                }}
                disabled={!companyName || isLoadingVendors}
              >
                <option value="">
                  {!companyName ? "Select a company first" : "Select Vendor"}
                </option>
                {isLoadingVendors ? (
                  <option disabled>Loading vendors...</option>
                ) : (
                  safeVendors.map((vendor, index) => {
                    const val = vendor.id || vendor.name || vendor;
                    const label =
                      vendor.name ||
                      vendor.vendor_name ||
                      vendor.organization_name ||
                      vendor;
                    return (
                      <option key={index} value={val}>
                        {label}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div>
              <label style={labelStyle}>PQ Type</label>
              <select
                value={pqType}
                onChange={(e) => setPqType(e.target.value)}
                style={inputStyle}
              >
                <option value="with_pq">PQ (Pre-Qualified)</option>
                <option value="without_pq">
                  Non-PQ (Without Pre-Qualification)
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#fff",
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={handleApply}
            disabled={!startDate || !endDate}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              background: startDate && endDate ? "#C72030" : "#fca5a5",
              color: "#fff",
              cursor: startDate && endDate ? "pointer" : "not-allowed",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              background: "#fff",
              color: "#374151",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Columns Constants
const SUPPLIER_PERFORMANCE_COLUMNS = [
  { key: "department", label: "Department Name" },
  { key: "approvedVendors", label: "Approved Vendors" },
  { key: "avgTat", label: "Avg TAT (Dept)" },
  { key: "invitedToApproved", label: "Invited to Approved Vendors" },
];

const APPROVED_VENDORS_COLUMNS = [
  { key: "organization", label: "Organization Name" },
  { key: "department", label: "Department Name" },
  { key: "status", label: "Status" },
  { key: "vendorTat", label: "Vendor TAT" },
  { key: "internalTat", label: "Internal TAT" },
  { key: "cumulativeTat", label: "Cumulative TAT" },
  // { key: "approvalvendor", label: "Approved Vendor" },

];

// =========================================================================
// MAIN COMPONENT
// =========================================================================
function VendorManagementDashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token") || "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414";

  const [visibleSections, setVisibleSections] = useState([
    "departmentPreQual",
    "departmentDistribution",
    "yearWise",
    "quarterWise",
    "monthWise",
    "pendingApprovals",
    "topBottomVendors",
    "supplierPerformance",
    "approvedVendors",
    "pqVendors",
    "nonPqVendors",
    "invitedVendors",
    "verificationPending",
    "detailsSubmitted",
    "onboardingInProcess",
    "resubmissionRequests",
  ]);
  const [chartOrder, setChartOrder] = useState([
    "departmentPreQual",
    "departmentDistribution",
    "yearWise",
    "quarterWise",
    "monthWise",
    "pendingApprovals",
    "topBottomVendors",
    "supplierPerformance",
    "approvedVendors",
    "pqVendorsTable",
    "nonPqVendorsTable",
    "invitedVendorsTable",
    "verificationPendingTable",
    "detailsSubmittedTable",
    "onboardingInProcessTable",
    "resubmissionRequestsTable",
  ]);

  // States for Stat Cards
  const [vendorStats, setVendorStats] = useState({
    approved: 0,
    with_pq: 0,
    without_pq: 0,
    onboarding: 0,
    invited: 0,
    details_submitted_by_vendor: 0,
    verification_pending: 0,
    request_for_resubmission: 0,
  });

  // States for API fetched data
  const [deptDistributionData, setDeptDistributionData] = useState([]);
  const [isDeptDistributionLoading, setIsDeptDistributionLoading] =
    useState(false);
  const [quarterWiseData, setQuarterWiseData] = useState([]);
  const [isQuarterWiseLoading, setIsQuarterWiseLoading] = useState(false);
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [isMonthWiseLoading, setIsMonthWiseLoading] = useState(false);
  const [deptPreQualData, setDeptPreQualData] = useState([]);
  const [isDeptPreQualLoading, setIsDeptPreQualLoading] = useState(false);
  const [pendingApprovalsData, setPendingApprovalsData] = useState([]);
  const [isPendingApprovalsLoading, setIsPendingApprovalsLoading] =
    useState(false);
  const [supplierPerformanceData, setSupplierPerformanceData] = useState([]);
  const [isSupplierPerformanceLoading, setIsSupplierPerformanceLoading] =
    useState(false);
  const [approvedVendorsData, setApprovedVendorsData] = useState([]);
  const [approvedVendorsPagination, setApprovedVendorsPagination] = useState(null);
  const [approvedVendorsPage, setApprovedVendorsPage] = useState(1);
  const [isApprovedVendorsLoading, setIsApprovedVendorsLoading] = useState(false);

  const [pqVendorsData, setPqVendorsData] = useState([]);
  const [pqVendorsPagination, setPqVendorsPagination] = useState(null);
  const [pqVendorsPage, setPqVendorsPage] = useState(1);
  const [isPqVendorsLoading, setIsPqVendorsLoading] = useState(false);

  const [nonPqVendorsData, setNonPqVendorsData] = useState([]);
  const [nonPqVendorsPagination, setNonPqVendorsPagination] = useState(null);
  const [nonPqVendorsPage, setNonPqVendorsPage] = useState(1);
  const [isNonPqVendorsLoading, setIsNonPqVendorsLoading] = useState(false);

  const [resubmissionRequestsData, setResubmissionRequestsData] = useState([]);
  const [resubmissionRequestsPagination, setResubmissionRequestsPagination] = useState(null);
  const [resubmissionRequestsPage, setResubmissionRequestsPage] = useState(1);
  const [isResubmissionRequestsLoading, setIsResubmissionRequestsLoading] = useState(false);

  const [onboardingInProcessData, setOnboardingInProcessData] = useState([]);
  const [onboardingInProcessPagination, setOnboardingInProcessPagination] = useState(null);
  const [onboardingInProcessPage, setOnboardingInProcessPage] = useState(1);
  const [isOnboardingInProcessLoading, setIsOnboardingInProcessLoading] = useState(false);

  const [invitedVendorsData, setInvitedVendorsData] = useState([]);
  const [invitedVendorsPagination, setInvitedVendorsPagination] = useState(null);
  const [invitedVendorsPage, setInvitedVendorsPage] = useState(1);
  const [isInvitedVendorsLoading, setIsInvitedVendorsLoading] = useState(false);

  const [detailsSubmittedData, setDetailsSubmittedData] = useState([]);
  const [detailsSubmittedPagination, setDetailsSubmittedPagination] = useState(null);
  const [detailsSubmittedPage, setDetailsSubmittedPage] = useState(1);
  const [isDetailsSubmittedLoading, setIsDetailsSubmittedLoading] = useState(false);

  // Default Empty States
  const [yearWiseData, setYearWiseData] = useState([]);
  const [isYearWiseLoading, setIsYearWiseLoading] = useState(false);
  const [topVendorsData, setTopVendorsData] = useState([]);
  const [bottomVendorsData, setBottomVendorsData] = useState([]);
  const [isTopBottomVendorsLoading, setIsTopBottomVendorsLoading] = useState(false);
  const [verificationPendingData, setVerificationPendingData] = useState([]);
  const [isVerificationPendingLoading, setIsVerificationPendingLoading] = useState(false);

  // Default start date is last 7 days
  const getDefaultDateRange = () => {
    const today = new Date();
    const startDate2024 = new Date(2024, 0, 1); // 1 Jan 2024

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    return {
      startDate: formatDate(startDate2024),
      endDate: formatDate(today),
    };
  };

  const [activeFilters, setActiveFilters] = useState({
    ...getDefaultDateRange(),
    companyName: "",
    departmentName: "",
    vendors: "",
    pqType: "with_pq",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() || "");
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAnalyticsFilterApply = (filters) => {
    setActiveFilters(filters);
  };

  const handleSelectionChange = (selectedSections) => {
    setVisibleSections(selectedSections);
  };

  const formatDtForAPI = (dt) => (dt ? dt.split("/").join("-") : "");

  // =========================================================================
  // API CALLS
  // =========================================================================
  useEffect(() => {
    const fetchStatCards = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved,rejected,invited,verification_pending,details_submitted_by_vendor,request_for_resubmission,onboarding");
        queryParams.append("pq_type", "without_pq,with_pq");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/count_stats.json?${queryParams}`,
        );
        const json = await response.json();
        console.log("Count Stats API Response:", json);
        
        // Handle both direct array and wrapped response
        let dataArray = [];
        if (Array.isArray(json)) {
          dataArray = json;
        } else if (json?.data && Array.isArray(json.data)) {
          dataArray = json.data;
        }
        
        if (dataArray.length > 0) {
          // Transform array of [{status, count}, ...] into object {status: count, ...}
          // Start with default values and override with API data
          const mappedStats = {
            approved: 0,
            with_pq: 0,
            without_pq: 0,
            onboarding: 0,
            invited: 0,
            details_submitted_by_vendor: 0,
            verification_pending: 0,
            request_for_resubmission: 0,
            rejected: 0,
          };
          
          dataArray.forEach((item) => {
            mappedStats[item.status] = item.count;
          });
          
          console.log("Mapped Stats:", mappedStats);
          setVendorStats(mappedStats);
        }
      } catch (error) {
        console.error("Error fetching Count Stats:", error);
      }
    };

    const fetchDeptDistribution = async () => {
      setIsDeptDistributionLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/department_wise_distribution.json?${queryParams}`,
        );
        const json = await response.json();
        console.log("Department Distribution API Response:", json);
        
        // Handle different response structures
        let rawData = [];
        if (json?.data?.departments && Array.isArray(json.data.departments)) {
          rawData = json.data.departments;
        } else if (json?.data?.department_wise_distribution && Array.isArray(json.data.department_wise_distribution)) {
          rawData = json.data.department_wise_distribution;
        } else if (Array.isArray(json?.data)) {
          rawData = json.data;
        } else {
          rawData = Object.values(json).find((val) => Array.isArray(val)) || [];
        }
        
        console.log("Extracted Raw Data:", rawData);
        
        const mappedData = rawData.map((item) => ({
          name: item.department_name || item.name || "Unknown",
          value: Number(item.vendor_count || item.count || item.value || 0),
        }));
        
        console.log("Mapped Distribution Data:", mappedData);
        setDeptDistributionData(mappedData);
      } catch (error) {
        console.error("Error fetching Department Distribution:", error);
        setDeptDistributionData([]);
      } finally {
        setIsDeptDistributionLoading(false);
      }
    };

    const fetchQuarterWiseData = async () => {
      setIsQuarterWiseLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        queryParams.append("pq_type", "without_pq,with_pq");
        queryParams.append("group_by", "quarter");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/time_wise_registration.json?${queryParams}`,
        );
        const json = await response.json();
        // API returns { data: { group_by: "quarter", quarters: [...] } }
        // Each quarter has: quarter ("Q36"), label (full title), total, with_pq, without_pq
        let rawData =
          json?.data?.quarters ||
          json?.data?.time_wise_registration ||
          Object.values(json?.data || {}).find((val) => Array.isArray(val)) ||
          Object.values(json).find((val) => Array.isArray(val)) ||
          [];
        setQuarterWiseData(
          rawData
            .map((item) => ({
              quarter: item.quarter || item.period || "Q",
              label: item.label || item.quarter || "",
              pqApproved: Number(item.with_pq || item.pqApproved || 0),
              nonPqApproved: Number(item.without_pq || item.nonPqApproved || 0),
              total: Number(item.total || 0),
            })),
        );
      } catch (error) {
        setQuarterWiseData([]);
      } finally {
        setIsQuarterWiseLoading(false);
      }
    };

    const fetchYearWiseData = async () => {
      setIsYearWiseLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        queryParams.append("pq_type", "without_pq,with_pq");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/yearwise_onboarding.json?${queryParams}`,
        );
        const json = await response.json();
        
        // API returns: { status, data: [ { year, pq, non_pq }, ... ] }
        let rawData = Array.isArray(json?.data)
          ? json.data
          : json?.data?.years ||
            json?.data?.year_wise_onboarding ||
            Object.values(json?.data || {}).find((val) => Array.isArray(val)) ||
            [];

        setYearWiseData(
          rawData.map((item) => ({
            year: String(item.year || item.label || item.period || "Unknown"),
            pqApproved: Number(item.pq ?? item.with_pq ?? item.pqApproved ?? 0),
            nonPqApproved: Number(item.non_pq ?? item.without_pq ?? item.nonPqApproved ?? 0),
            total: Number(item.total || (item.pq ?? 0) + (item.non_pq ?? 0) || 0),
          })),
        );
      } catch (error) {
        console.error("Error fetching YearWiseData:", error);
        setYearWiseData([]);
      } finally {
        setIsYearWiseLoading(false);
      }
    };

    const fetchMonthWiseData = async () => {
      setIsMonthWiseLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        queryParams.append("pq_type", "without_pq,with_pq");
        queryParams.append("group_by", "month");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/time_wise_registration.json?${queryParams}`,
        );
        const json = await response.json();
        // API returns { data: { group_by: "month", months: [...] } }
        // Each month has: label, total, with_pq, without_pq
        let rawData =
          json?.data?.months ||
          json?.data?.time_wise_registration ||
          Object.values(json?.data || {}).find((val) => Array.isArray(val)) ||
          Object.values(json).find((val) => Array.isArray(val)) ||
          [];
        setMonthWiseData(
          rawData
            .map((item) => ({
              month: item.label || item.month || item.period || "M",
              pqApproved: Number(item.with_pq || item.pqApproved || 0),
              nonPqApproved: Number(item.without_pq || item.nonPqApproved || 0),
              total: Number(item.total || 0),
            })),
        );
      } catch (error) {
        setMonthWiseData([]);
      } finally {
        setIsMonthWiseLoading(false);
      }
    };

    const fetchDeptPreQual = async () => {
      setIsDeptPreQualLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/department_pq_split.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData =
          json?.data?.departments ||
          json?.data?.department_pq_split ||
          json?.departments ||
          Object.values(json?.data || {}).find((val) => Array.isArray(val)) ||
          Object.values(json).find((val) => Array.isArray(val)) ||
          [];
        setDeptPreQualData(rawData);
      } catch (error) {
        setDeptPreQualData([]);
      } finally {
        setIsDeptPreQualLoading(false);
      }
    };

    const fetchPendingApprovals = async () => {
      setIsPendingApprovalsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pending_approvals_by_level.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData =
          json?.data?.pending_approvals ||
          Object.values(json).find((val) => Array.isArray(val)) ||
          [];
        setPendingApprovalsData(
          rawData.map((item) => ({
            level: item.approval_level || item.level || "Unknown",
            count: Number(item.pending_count || item.count || 0),
          })),
        );
      } catch (error) {
        setPendingApprovalsData([]);
      } finally {
        setIsPendingApprovalsLoading(false);
      }
    };

    const fetchSupplierPerformance = async () => {
      setIsSupplierPerformanceLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/department_supplier_performance.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData =
          json?.data?.supplier_performance ||
          Object.values(json).find((val) => Array.isArray(val)) ||
          [];
        setSupplierPerformanceData(
          rawData.map((item) => ({
            department: item.department_name || item.department || "Unknown",
            approvedVendors: item.approved_vendors || 0,
            avgTat: item.avg_tat || "0.00",
            invitedToApproved: item.invited_to_approved_vendors || 0,
          })),
        );
      } catch (error) {
        setSupplierPerformanceData([]);
      } finally {
        setIsSupplierPerformanceLoading(false);
      }
    };

    const fetchApprovedVendors = async () => {
      setIsApprovedVendorsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setApprovedVendorsData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: item.status || "Approved",
            vendorTat: item.vendor_tat_days ?? "-",
            internalTat: item.internal_tat_days ?? "-",
            cumulativeTat: item.cumulative_tat_days ?? "-",
            approvalDate: item.approval_date || "-",
            vendorCode: item.vendor_code || "-",
            category: item.category || "-",
            contactPerson: item.contact_person || "-",
            contactEmail: item.contact_email || "-",
          })),
        );
      } catch (error) {
        setApprovedVendorsData([]);
      } finally {
        setIsApprovedVendorsLoading(false);
      }
    };

    const fetchPqVendors = async () => {
      setIsPqVendorsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        queryParams.append("pq_type", "with_pq");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        setPqVendorsData(json?.data?.suppliers || []);
      } catch (error) {
        setPqVendorsData([]);
      } finally {
        setIsPqVendorsLoading(false);
      }
    };

    const fetchNonPqVendors = async () => {
      setIsNonPqVendorsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "approved");
        queryParams.append("pq_type", "without_pq");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        setNonPqVendorsData(json?.data?.suppliers || []);
      } catch (error) {
        setNonPqVendorsData([]);
      } finally {
        setIsNonPqVendorsLoading(false);
      }
    };

    const fetchResubmissionRequests = async () => {
      setIsResubmissionRequestsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "request_for_resubmission");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setResubmissionRequestsData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: item.status || "Request for Resubmission",
            vendorTat: item.vendor_tat_days ?? "-",
            internalTat: item.internal_tat_days ?? "-",
            cumulativeTat: item.cumulative_tat_days ?? "-",
            requestDate: item.request_date || "-",
            reason: item.reason || "-",
            requestedBy: item.requested_by || "-",
            resubmittedOn: item.resubmitted_on || "-",
            currentStatus: item.current_status || "-",
          })),
        );
      } catch (error) {
        setResubmissionRequestsData([]);
      } finally {
        setIsResubmissionRequestsLoading(false);
      }
    };

    const fetchOnboardingInProcess = async () => {
      setIsOnboardingInProcessLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "onboarding");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setOnboardingInProcessData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: item.status || "Onboarding",
            vendorTat: item.vendor_tat_days ?? "-",
            internalTat: item.internal_tat_days ?? "-",
            cumulativeTat: item.cumulative_tat_days ?? "-",
            startDate: item.start_date || "-",
            currentStage: item.current_stage || "-",
            daysInProcess: item.days_in_process || "-",
            assignedTo: item.assigned_to || "-",
            progressPercentage: item.progress_percentage || "-",
          })),
        );
      } catch (error) {
        setOnboardingInProcessData([]);
      } finally {
        setIsOnboardingInProcessLoading(false);
      }
    };

    const fetchInvitedVendors = async () => {
      setIsInvitedVendorsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "invited");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setInvitedVendorsData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: item.status || "Invited",
            vendorTat: item.vendor_tat_days ?? "-",
            internalTat: item.internal_tat_days ?? "-",
            cumulativeTat: item.cumulative_tat_days ?? "-",
            invitationDate: item.invitation_date || "-",
            invitedBy: item.invited_by || "-",
            category: item.category || "-",
            email: item.contact_email || "-",
            responseStatus: item.response_status || "Pending",
          })),
        );
      } catch (error) {
        setInvitedVendorsData([]);
      } finally {
        setIsInvitedVendorsLoading(false);
      }
    };

    const fetchDetailsSubmitted = async () => {
      setIsDetailsSubmittedLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "details_submitted_by_vendor");
        
        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));
        
        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setDetailsSubmittedData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: "Details Submitted",
            submissionDate: item.submission_date || "-",
            completionPercentage: item.completion_percentage || "-",
            documentsUploaded: item.documents_uploaded || "-",
            lastUpdated: item.last_updated || "-",
            reviewStatus: item.review_status || "Pending Review",
          })),
        );
      } catch (error) {
        setDetailsSubmittedData([]);
      } finally {
        setIsDetailsSubmittedLoading(false);
      }
    };

    const fetchVerificationPending = async () => {
      setIsVerificationPendingLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        queryParams.append("status", "verification_pending");

        if (activeFilters.companyName) queryParams.append("company_ids", activeFilters.companyName);
        if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
        if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);
        if (activeFilters.startDate) queryParams.append("from_date", formatDtForAPI(activeFilters.startDate));
        if (activeFilters.endDate) queryParams.append("end_date", formatDtForAPI(activeFilters.endDate));

        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/pq_vendor_stats.json?${queryParams}`,
        );
        const json = await response.json();
        let rawData = json?.data?.suppliers || [];
        setVerificationPendingData(
          rawData.map((item) => ({
            organization: item.organization_name || "-",
            department: item.department_name || "-",
            status: item.status || "Verification Pending",
            overallTatDays: item.cumulative_tat_days ?? item.overall_tat_days ?? "-",
            approvalLevel: item.approval_level || "-",
          }))
        );
      } catch (error) {
        console.error("Error fetching Verification Pending:", error);
        setVerificationPendingData([]);
      } finally {
        setIsVerificationPendingLoading(false);
      }
    };

    const fetchTopVendors = async () => {
      setIsTopBottomVendorsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        if (activeFilters.companyName)
          queryParams.append("company_id", activeFilters.companyName);

        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/top_10_vendors_by_avg_tat.json?${queryParams}`,
        );
        const json = await response.json();

        let rawData =
          json?.data?.vendors ||
          json?.data?.top_vendors ||
          json?.data ||
          [];

        if (!Array.isArray(rawData) && typeof rawData === "object") {
          rawData =
            Object.values(rawData).find((val) => Array.isArray(val)) || [];
        }

        setTopVendorsData(
          rawData.map((item) => ({
            name:
              item.organization_name ||
              item.vendor_name ||
              item.name ||
              "Unknown",
            avgTat: Number(
              item.avg_tat ||
              item.average_tat ||
              item.avg_tat_days ||
              0
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching top vendors:", error);
        setTopVendorsData([]);
      } finally {
        setIsTopBottomVendorsLoading(false);
      }
    };

    const fetchBottomVendors = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", tokenFromUrl);
        if (activeFilters.companyName)
          queryParams.append("company_id", activeFilters.companyName);

        const response = await fetch(
          `${baseURL}vendor_pq_dashboard/bottom_10_vendors_by_avg_tat.json?${queryParams}`,
        );
        const json = await response.json();

        let rawData =
          json?.data?.vendors ||
          json?.data?.bottom_vendors ||
          json?.data ||
          [];

        if (!Array.isArray(rawData) && typeof rawData === "object") {
          rawData =
            Object.values(rawData).find((val) => Array.isArray(val)) || [];
        }

        setBottomVendorsData(
          rawData.map((item) => ({
            name:
              item.organization_name ||
              item.vendor_name ||
              item.name ||
              "Unknown",
            avgTat: Number(
              item.avg_tat ||
              item.average_tat ||
              item.avg_tat_days ||
              0
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching bottom vendors:", error);
        setBottomVendorsData([]);
      }
    };

    fetchStatCards();
    fetchDeptDistribution();
    fetchYearWiseData();
    fetchQuarterWiseData();
    fetchMonthWiseData();
    fetchDeptPreQual();
    fetchPendingApprovals();
    fetchSupplierPerformance();
    fetchApprovedVendors();
    fetchPqVendors();
    fetchNonPqVendors();
    fetchResubmissionRequests();
    fetchOnboardingInProcess();
    fetchInvitedVendors();
    fetchDetailsSubmitted();
    fetchVerificationPending();
    fetchTopVendors();
    fetchBottomVendors();
  }, [activeFilters]);

  const VENDOR_MANGEMENT = {
    charts: {
      icon: BarChart3,
      label: "Vendor Analytics",
      color: "#d97938",
      options: [
        {
          id: "departmentPreQual",
          label: "Department Pre-Qualification Split",
        },
        {
          id: "departmentDistribution",
          label: "Department-Wise Vendor Distribution",
        },
        { id: "yearWise", label: "Year-Wise Vendor Registration" },
        { id: "quarterWise", label: "Quarter-Wise Vendor Registration" },
        { id: "monthWise", label: "Month-Wise Vendor Registration" },
        { id: "pendingApprovals", label: "Pending Approvals by Level" },
        { id: "topBottomVendors", label: "Top/Bottom Vendors by Avg TAT" },
        {
          id: "supplierPerformance",
          label: "Department-Wise Supplier Performance",
        },
        { id: "approvedVendors", label: "Approved Vendors" },
      ],
    },
    stats: {
      icon: TrendingUp,
      label: "Statistics Cards",
      color: "#39b54a",
      options: [
        { id: "approvedVendors", label: "Approved Vendors" },
        { id: "pqVendors", label: "PQ Vendors" },
        { id: "nonPqVendors", label: "Non-PQ Vendors" },
        { id: "onboardingInProcess", label: "Onboarding In Process" },
        { id: "invitedVendors", label: "Invited Vendors" },
        { id: "detailsSubmitted", label: "Details Submitted" },
        { id: "verificationPending", label: "Verification Pending" },
        { id: "resubmissionRequests", label: "Request for Resubmission" },
      ],
    },
  };

  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <h1
                          className="text-2xl font-bold mb-2"
                          style={{ color: "#1A1A1A" }}
                        >
                          Vendor Management Dashboard
                        </h1>
                        <p className="text-gray-600 mb-0">
                          Overview of vendor statistics and analytics
                        </p>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <VendorSectionSelector
                          dashboardType="management"
                          data={VENDOR_MANGEMENT}
                          onSelectionChange={handleSelectionChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <VendorFilterCard
                  onApplyFilters={handleAnalyticsFilterApply}
                  currentStartDate={activeFilters.startDate}
                  currentEndDate={activeFilters.endDate}
                  currentPqType={activeFilters.pqType}
                  token={tokenFromUrl}
                />

                <div className="row g-3 mb-4">
                  {visibleSections.includes("approvedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Approved Vendors"
                        value={vendorStats.approved}
                      />
                    </div>
                  )}
                  {visibleSections.includes("pqVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="PQ Vendors"
                        value={vendorStats.with_pq}
                      />
                    </div>
                  )}
                  {visibleSections.includes("nonPqVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Non-PQ Vendors"
                        value={vendorStats.without_pq}
                      />
                    </div>
                  )}
                  {visibleSections.includes("onboardingInProcess") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Onboarding In Process"
                        value={
                          (vendorStats.invited || 0) +
                          (vendorStats.details_submitted_by_vendor || 0) +
                          (vendorStats.verification_pending || 0) +
                          (vendorStats.request_for_resubmission || 0)
                        }
                      />
                    </div>
                  )}
                  {visibleSections.includes("invitedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Invited Vendors"
                        value={vendorStats.invited}
                      />
                    </div>
                  )}
                  {visibleSections.includes("detailsSubmitted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Details Submitted"
                        value={vendorStats.details_submitted_by_vendor}
                      />
                    </div>
                  )}
                  {visibleSections.includes("verificationPending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Verification Pending"
                        value={vendorStats.verification_pending}
                      />
                    </div>
                  )}
                  {visibleSections.includes("resubmissionRequests") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Request for Resubmission"
                        value={vendorStats.request_for_resubmission}
                      />
                    </div>
                  )}
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={chartOrder}
                    strategy={rectSortingStrategy}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="row g-4">
                          {chartOrder.map((chartId) => {
                            if (
                              chartId === "departmentDistribution" &&
                              visibleSections.includes("departmentDistribution")
                            ) {
                              return (
                                <div
                                  key={chartId}
                                  className="col-12"
                                  style={{ position: "relative" }}
                                >
                                  <SortableChartItem id={chartId}>
                                    {isDeptDistributionLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Department-Wise Vendor Distribution</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Department-Wise Vendor Distribution...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <DepartmentWiseDistributionChart
                                        data={deptDistributionData}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (
                              chartId === "yearWise" &&
                              visibleSections.includes("yearWise")
                            ) {
                              return (
                                <div key={chartId} className="col-12">
                                  <SortableChartItem id={chartId}>
                                    {isYearWiseLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Year-Wise Vendor Registration</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Year-Wise Vendor Registration...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <YearWiseRegistrationChart
                                        data={yearWiseData}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (
                              chartId === "quarterWise" &&
                              visibleSections.includes("quarterWise")
                            ) {
                              return (
                                <div key={chartId} className="col-12">
                                  <SortableChartItem id={chartId}>
                                    {isQuarterWiseLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Quarter-Wise Vendor Registration</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Quarter-Wise Vendor Registration...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <QuarterWiseRegistrationChart
                                        data={quarterWiseData}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (
                              chartId === "monthWise" &&
                              visibleSections.includes("monthWise")
                            ) {
                              return (
                                <div key={chartId} className="col-12">
                                  <SortableChartItem id={chartId}>
                                    {isMonthWiseLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Month-Wise Vendor Registration</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Month-Wise Vendor Registration...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <MonthWiseRegistrationChart
                                        data={monthWiseData}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (
                              chartId === "pendingApprovals" &&
                              visibleSections.includes("pendingApprovals")
                            ) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    {isPendingApprovalsLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Pending Approvals by Level</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Pending Approvals by Level...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <PendingApprovalsByLevelChart
                                        data={pendingApprovalsData}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            if (
                              chartId === "supplierPerformance" &&
                              visibleSections.includes("supplierPerformance")
                            ) {
                              return (
                                <div key={chartId} className="col-12 col-lg-6">
                                  <SortableChartItem id={chartId}>
                                    {isSupplierPerformanceLoading ? (
                                      <div className="card go-shadow bg-white rounded-lg w-100">
                                        <div className="vendor-card-header">
                                          <h3 className="vendor-card-title">Department-Wise Supplier Performance</h3>
                                        </div>
                                        <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                          <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                          <span className="text-muted fw-medium">Loading Department-Wise Supplier Performance...</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <VendorDataTable
                                        title="Department-Wise Supplier Performance"
                                        data={supplierPerformanceData}
                                        columns={SUPPLIER_PERFORMANCE_COLUMNS}
                                        onDownload={() => {}}
                                      />
                                    )}
                                  </SortableChartItem>
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>

                        {chartOrder.map((chartId) => {
                          if (
                            chartId === "departmentPreQual" &&
                            visibleSections.includes("departmentPreQual")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isDeptPreQualLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Department Pre-Qualification Split</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Department Pre-Qualification Split...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <DepartmentPreQualificationChart
                                      data={deptPreQualData}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "topBottomVendors" &&
                            visibleSections.includes("topBottomVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isTopBottomVendorsLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Top/Bottom Vendors by Avg TAT</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Top/Bottom Vendors by Avg TAT...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <TopBottomVendorsChart
                                      topData={topVendorsData}
                                      bottomData={bottomVendorsData}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "approvedVendors" &&
                            visibleSections.includes("approvedVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isApprovedVendorsLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Approved Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Approved Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Approved Vendors"
                                      data={approvedVendorsData}
                                      columns={APPROVED_VENDORS_COLUMNS}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "pqVendorsTable" &&
                            visibleSections.includes("pqVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isPqVendorsLoading ? (
                                    <div
                                      style={{
                                        height: "300px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#fff",
                                        borderRadius: "8px",
                                      }}
                                    >
                                      Loading...
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="PQ Vendors"
                                      data={pqVendorsData}
                                      columns={[
                                        { key: "organization_name", label: "Organization Name" },
                                        { key: "department_name", label: "Department Name" },
                                        { key: "status", label: "Status" },
                                        // { key: "vendor_tat_days", label: "Vendor TAT (Days)" },
                                        // { key: "internal_tat_days", label: "Internal TAT (Days)" },
                                        // { key: "cumulative_tat_days", label: "Cumulative TAT (Days)" },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "nonPqVendorsTable" &&
                            visibleSections.includes("nonPqVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isNonPqVendorsLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Non PQ Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Non PQ Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Non PQ Vendors"
                                      data={nonPqVendorsData}
                                      columns={[
                                        { key: "organization_name", label: "Organization Name" },
                                        { key: "department_name", label: "Department Name" },
                                        { key: "status", label: "Status" },
                                        // { key: "vendor_tat_days", label: "Vendor TAT (Days)" },
                                        // { key: "internal_tat_days", label: "Internal TAT (Days)" },
                                        // { key: "cumulative_tat_days", label: "Cumulative TAT (Days)" },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "invitedVendorsTable" &&
                            visibleSections.includes("invitedVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isInvitedVendorsLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Invited Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Invited Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Invited Vendors"
                                      data={invitedVendorsData}
                                      columns={[
                                        {
                                          key: "organization",
                                          label: "Organization Name",
                                        },
                                        {
                                          key: "department",
                                          label: "Department Name",
                                        },
                                        { key: "status", label: "Status" },
                                        // {
                                        //   key: "vendorTat",
                                        //   label: "Vendor TAT (Days)",
                                        // },
                                        // {
                                        //   key: "internalTat",
                                        //   label: "Internal TAT (Days)",
                                        // },
                                        // {
                                        //   key: "cumulativeTat",
                                        //   label: "Cumulative TAT (Days)",
                                        // },
                                        // {
                                        //   key: "invitationDate",
                                        //   label: "Invitation Date",
                                        // },
                                        // {
                                        //   key: "invitedBy",
                                        //   label: "Invited By",
                                        // },
                                        // { key: "category", label: "Category" },
                                        // { key: "email", label: "Email" },
                                        // {
                                        //   key: "responseStatus",
                                        //   label: "Response Status",
                                        // },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "verificationPendingTable" &&
                            visibleSections.includes("verificationPending")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isVerificationPendingLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Verification Pending Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Verification Pending Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Verification Pending Vendors"
                                      data={verificationPendingData}
                                      columns={[
                                        {
                                          key: "organization",
                                          label: "Organization Name",
                                        },
                                        { key: "status", label: "Status" },
                                        {
                                          key: "department",
                                          label: "Department Name",
                                        },
                                        {
                                          key: "overallTatDays",
                                          label: "Overall TAT Days",
                                        },
                                        {
                                          key: "approvalLevel",
                                          label: "Approval Level",
                                        },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "detailsSubmittedTable" &&
                            visibleSections.includes("detailsSubmitted")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isDetailsSubmittedLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Details Submitted Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Details Submitted Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Details Submitted Vendors"
                                      data={detailsSubmittedData}
                                      columns={[
                                        {
                                          key: "organization",
                                          label: "Organization Name",
                                        },
                                        {
                                          key: "department",
                                          label: "Department Name",
                                        },
                                        { key: "status", label: "Status" },
                                        // {
                                        //   key: "submissionDate",
                                        //   label: "Submission Date",
                                        // },
                                        // {
                                        //   key: "completionPercentage",
                                        //   label: "Completion %",
                                        // },
                                        // {
                                        //   key: "documentsUploaded",
                                        //   label: "Documents Uploaded",
                                        // },
                                        // {
                                        //   key: "lastUpdated",
                                        //   label: "Last Updated",
                                        // },
                                        // {
                                        //   key: "reviewStatus",
                                        //   label: "Review Status",
                                        // },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "onboardingInProcessTable" &&
                            visibleSections.includes("onboardingInProcess")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isOnboardingInProcessLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Onboarding In Process</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Onboarding In Process...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Onboarding In Process"
                                      data={onboardingInProcessData}
                                      columns={[
                                        {
                                          key: "organization",
                                          label: "Organization Name",
                                        },
                                        {
                                          key: "department",
                                          label: "Department Name",
                                        },
                                        { key: "status", label: "Status" },
                                        // {
                                        //   key: "vendorTat",
                                        //   label: "Vendor TAT (Days)",
                                        // },
                                        // {
                                        //   key: "internalTat",
                                        //   label: "Internal TAT (Days)",
                                        // },
                                        // {
                                        //   key: "cumulativeTat",
                                        //   label: "Cumulative TAT (Days)",
                                        // },
                                        // {
                                        //   key: "startDate",
                                        //   label: "Start Date",
                                        // },
                                        // {
                                        //   key: "currentStage",
                                        //   label: "Current Stage",
                                        // },
                                        // {
                                        //   key: "daysInProcess",
                                        //   label: "Days In Process",
                                        // },
                                        // {
                                        //   key: "assignedTo",
                                        //   label: "Assigned To",
                                        // },
                                        // {
                                        //   key: "progressPercentage",
                                        //   label: "Progress %",
                                        // },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (
                            chartId === "resubmissionRequestsTable" &&
                            visibleSections.includes("resubmissionRequests")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <SortableChartItem id={chartId}>
                                  {isResubmissionRequestsLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Request for Resubmission Vendors</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Request for Resubmission Vendors...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <VendorDataTable
                                      title="Request for Resubmission Vendors"
                                      data={resubmissionRequestsData}
                                      columns={[
                                        {
                                          key: "organization",
                                          label: "Organization Name",
                                        },
                                        {
                                          key: "department",
                                          label: "Department Name",
                                        },
                                        { key: "status", label: "Status" },
                                        // {
                                        //   key: "vendorTat",
                                        //   label: "Vendor TAT (Days)",
                                        // },
                                        // {
                                        //   key: "internalTat",
                                        //   label: "Internal TAT (Days)",
                                        // },
                                        // {
                                        //   key: "cumulativeTat",
                                        //   label: "Cumulative TAT (Days)",
                                        // },
                                        // {
                                        //   key: "requestDate",
                                        //   label: "Request Date",
                                        // },
                                        // { key: "reason", label: "Reason" },
                                        // {
                                        //   key: "requestedBy",
                                        //   label: "Requested By",
                                        // },
                                        // {
                                        //   key: "resubmittedOn",
                                        //   label: "Resubmitted On",
                                        // },
                                        // {
                                        //   key: "currentStatus",
                                        //   label: "Current Status",
                                        // },
                                      ]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorManagementDashboard;


