import React, { useState, useEffect, useCallback } from "react";
import { baseURL } from "../confi/apiDomain";
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
import {
  BarChart3,
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Database,
} from "lucide-react";

// Components
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { DepartmentWiseDistributionChart } from "@/components/vendor-analytics/DepartmentWiseDistributionChart";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import { DepartmentReKYCChart } from "@/components/vendor-analytics/DepartmentReKYCTable";
import ReKycBarchart from "@/components/vendor-analytics/ReKycBarchart";
import { VendorFilterCard } from "@/components/vendor-analytics/VendorFilterCard";

// =============================================================================
// 1. CONSTANTS & CONFIGURATION
// =============================================================================

// Date range helper - fixed from 1 Jan 2024 to today
const getDefaultDateRange = () => {
  const today = new Date();
  const startDate = new Date(2024, 0, 1); // 1 Jan 2024
  const fmt = (d) => {
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  return { startDate: fmt(startDate), endDate: fmt(today) };
};

// =============================================================================
// 4. CHART 3: DEPARTMENT WISE RE-KYC CHART (BAR CHART)
// =============================================================================

// DEPARTMENT RE-KYC DATA WILL BE FETCHED FROM API

// =============================================================================
// 5. TABLE 1: REJECTED RE-KYC RECORD
// =============================================================================

const REJECTED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "rejectedCount", label: "Rejected ReKYC Count" },
];

const REJECTED_DATA = [];
// REJECTED DATA FETCHED FROM API

// =============================================================================
// 6. TABLE 2: OPEN INVITES RE-KYC RECORD
// =============================================================================

const OPEN_INVITES_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
  { key: "openInvitesCount", label: "Open Invites ReKYC Count" },
];

const OPEN_INVITES_DATA = [];
// OPEN INVITES DATA FETCHED FROM API

// =============================================================================
// 7. TABLE 3: TYPE WISE REKYC DISTRIBUTION
// =============================================================================

const TYPE_WISE_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created at" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
];

const TYPE_WISE_DATA = [];
// TYPE WISE DATA FETCHED FROM API

// =============================================================================
// 1. EXPIRED RE-KYC RECORD TABLE
// =============================================================================

// Expired Re-KYC Columns
const EXPIRED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "expiredCount", label: "Expired ReKYC Count" },
];

// Expired Re-KYC Data - As per image
const EXPIRED_DATA = [];
// EXPIRED DATA FETCHED FROM API

// =============================================================================
// 2. SAP ERROR TABLE
// =============================================================================

// SAP Error Columns
const SAP_ERROR_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "pushToSAP", label: "Push to SAP" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "count", label: "Count" },
];

// SAP Error Data - As per image
const SAP_ERROR_DATA = [];
// SAP ERROR DATA FETCHED FROM API

// =============================================================================
// 1. APPROVED RE-KYC RECORD TABLE
// =============================================================================

// Approved Re-KYC Columns
const APPROVED_RECORD_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "approvedCount", label: "Approved ReKYC Count" },
];

// Approved Re-KYC Data - As per image
const APPROVED_RECORD_DATA = [];
// APPROVED RECORD DATA FETCHED FROM API

// =============================================================================
// 2. DETAILS SUB RE-KYC RECORD TABLE
// =============================================================================

// Details Sub Re-KYC Columns
const DETAILS_SUB_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "detailsCount", label: "Details Submitted ReKYC Count" },
];

// Details Sub Re-KYC Data - As per image
const DETAILS_SUB_DATA = [];
// DETAILS SUB DATA FETCHED FROM API

// =============================================================================
// 8. STATS DATA (FETCHED FROM API)
// =============================================================================
// =============================================================================
// 9. CHART CONFIGURATION
// =============================================================================

// =============================================================================
// ADD THESE TO YOUR ALL_CHART_IDS
// =============================================================================

const ALL_CHART_IDS = [
  "statusWiseChart", // Pie Chart 1 - NEW ID
  "typeWiseChart", // Pie Chart 2 - NEW ID
  "monthWiseChart", // Month Wise Bar Chart
  "yearWiseChart", // Year Wise Bar Chart (NEW)
  "departmentReKYCChart", // Department Bar Chart
  "rejectedTable", // Table 1
  "openInvitesTable", // Table 2
  "approvedRecordTable", // Approved Re-KYC Record (NEW)
  "detailsSubTable",
  "typeWiseTable",
  "expiredTable", // Expired Re-KYC Record (NEW)
  "sapErrorTable", // Table 3
];

// =============================================================================
// 10. STAT IDS
// =============================================================================

const ALL_STAT_IDS = [
  "total_rekyc_vendor",
  "pending",
  "approved",
  "details_submitted_by_vendor",
  "rejected",
  "sap",
];

// =============================================================================
// 11. SECTION SELECTOR CONFIG
// =============================================================================

const KYC_MANAGEMENT_CONFIG = {
  charts: {
    icon: BarChart3,
    label: "KYC Analytics",
    color: "#3b82f6",
    options: [
      { id: "statusWiseChart", label: "StatusWise Re-KYC Distributions" },
      { id: "typeWiseChart", label: "TypeWise Re-KYC Distributions" },
      { id: "monthWiseChart", label: "Month Wise Re-KYC Type" },
      { id: "yearWiseChart", label: "Year Wise Re-KYC Type" },
      { id: "departmentReKYCChart", label: "Department Wise Re-KYC" },
      { id: "rejectedTable", label: "Rejected Re-KYC Record" },
      { id: "openInvitesTable", label: "Open Invites Re-KYC Record" },
      { id: "typeWiseTable", label: "Type wise ReKYC Distribution" },
      { id: "approvedRecordTable", label: "Approved Re-KYC Record" }, // NEW
      { id: "detailsSubTable", label: "Details Sub Re-KYC Record" },
      { id: "expiredTable", label: "Expired Re-KYC Record" }, // NEW
      { id: "sapErrorTable", label: "SAP Error" },
    ],
  },
  stats: {
    icon: TrendingUp,
    label: "KYC Statistics",
    color: "#10b981",
    options: [
      { id: "total_rekyc_vendor", label: "Total Re-KYC Vendor" },
      { id: "pending", label: "Awaiting for Approval" },
      { id: "approved", label: "Approved Re-KYC" },
      { id: "details_submitted_by_vendor", label: "Details Submitted" },
      { id: "rejected", label: "Rejected Re-KYC" },
      { id: "sap", label: "Errors in SAP from Approved" },
    ],
  },
};

// =============================================================================
// 12. MAIN COMPONENT
// =============================================================================

const ReKYCDashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token") || "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414";
  
  // State management
  const [activeFilters, setActiveFilters] = useState({
    ...getDefaultDateRange(),
    companyName: "",
    departmentName: "",
    vendors: "",
    pqType: "with_pq",
  });
  const [chartOrder, setChartOrder] = useState(ALL_CHART_IDS);
  const [visibleSections, setVisibleSections] = useState([
    ...ALL_STAT_IDS,
    ...ALL_CHART_IDS,
  ]);

  const [kpiData, setKpiData] = useState([]);
  const [isKpiLoading, setIsKpiLoading] = useState(false);
  const [typeChartData, setTypeChartData] = useState([]);
  const [isTypeWiseLoading, setIsTypeWiseLoading] = useState(false);
  const [monthWiseData, setMonthWiseData] = useState([]);
  const [isMonthWiseLoading, setIsMonthWiseLoading] = useState(false);
  const [yearWiseData, setYearWiseData] = useState([]);
  const [isYearWiseLoading, setIsYearWiseLoading] = useState(false);
  const [deptChartData, setDeptChartData] = useState([]);
  const [isDeptLoading, setIsDeptLoading] = useState(false);

  // Table Data States
  const [sapErrorData, setSapErrorData] = useState([]);
  const [isSapErrorLoading, setIsSapErrorLoading] = useState(false);
  const [sapErrorPagination, setSapErrorPagination] = useState(null);

  const [rejectedRecordsData, setRejectedRecordsData] = useState([]);
  const [isRejectedLoading, setIsRejectedLoading] = useState(false);
  const [rejectedPagination, setRejectedPagination] = useState(null);

  const [openInvitesData, setOpenInvitesData] = useState([]);
  const [isOpenInvitesLoading, setIsOpenInvitesLoading] = useState(false);
  const [openInvitesPagination, setOpenInvitesPagination] = useState(null);

  // Type-wise table data (for "Type wise ReKYC Distribution")
  const [typeWiseTableData, setTypeWiseTableData] = useState([]);

  const [expiredData, setExpiredData] = useState([]);
  const [isExpiredLoading, setIsExpiredLoading] = useState(false);
  const [expiredPagination, setExpiredPagination] = useState(null);

  const [detailsSubData, setDetailsSubData] = useState([]);
  const [isDetailsSubLoading, setIsDetailsSubLoading] = useState(false);
  const [detailsSubPagination, setDetailsSubPagination] = useState(null);

  const [approvedRecordsData, setApprovedRecordsData] = useState([]);
  const [isApprovedLoading, setIsApprovedLoading] = useState(false);
  const [approvedPagination, setApprovedPagination] = useState(null);

  const fetchKpiCards = useCallback(async () => {
    setIsKpiLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("status", "details_submitted_by_vendor,approved,rejected,pending");
      queryParams.append("error", "sap");

      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        queryParams.append("from_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(`${baseURL}vendor_re_kyc_dashboard/kpi_cards.json?${queryParams}`);
      const data = await response.json();
      if (data.status === "success") {
        setKpiData(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching KPI cards:", error);
    } finally {
      setIsKpiLoading(false);
    }
  }, [activeFilters]);

  const fetchTypeWiseData = useCallback(async () => {
    setIsTypeWiseLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("status", "approved");
      queryParams.append("error", "");
      
      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        // API expects dd-mm-yyyy
        queryParams.append("from_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/type_wise_rekyc_distribution.json?${queryParams}`,
      );
      const data = await response.json();

      // Handle both wrapped { data: [...] } and raw [] forms
      const rows = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];

      if (rows.length > 0) {
        // 1) Table rows directly from API
        const tableRows = rows.map((item) => ({
          organizationName: item.organization_name || "-",
          rekycType: item.rekyc_type || "",
          status: item.status || "",
          createdAt: item.created_at || "",
          updatedAt: item.updated_at || "",
          ageingInMonth: item.ageing_in_month ?? "",
          rowCount: item.row_count ?? 0,
        }));
        setTypeWiseTableData(tableRows);

        // 2) Aggregate by type for chart
        const byType = new Map();
        tableRows.forEach((row) => {
          const key = row.rekycType || "Unknown";
          const prev = byType.get(key) || 0;
          byType.set(key, prev + (row.rowCount || 0));
        });
        const chartTransformed = Array.from(byType.entries()).map(
          ([name, value]) => ({ name, value }),
        );
        setTypeChartData(chartTransformed);
      }
    } catch (error) {
      console.error("Error fetching type-wise data:", error);
    } finally {
      setIsTypeWiseLoading(false);
    }
  }, [activeFilters]);

  const fetchMonthWiseData = useCallback(async () => {
    setIsMonthWiseLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("error", "");
      
      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        queryParams.append("from_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(`${baseURL}vendor_re_kyc_dashboard/month_wise_rekyc.json?${queryParams}`);
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.months)) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const transformed = data.months.map(item => ({
          month: `${monthNames[item.month - 1]} ${item.year}`,
          "General Rekyc": item.general_rekyc,
          "Bank Rekyc": item.bank_rekyc,
          "GSTIN Rekyc": item.gstin_rekyc,
          "MSME Rekyc": item.msme_rekyc,
          "E-invoicing Rekyc": item.einvoice_rekyc,
          "Name Rekyc": item.name_rekyc,
          totalCount: item.total
        }));
        setMonthWiseData(transformed);
      }
    } catch (error) {
      console.error("Error fetching month-wise data:", error);
    } finally {
      setIsMonthWiseLoading(false);
    }
  }, [activeFilters]);

  const fetchYearWiseData = useCallback(async () => {
    setIsYearWiseLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("error", "");
      
      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        queryParams.append("from_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[0]}-${parts[1]}-${parts[2]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(`${baseURL}vendor_re_kyc_dashboard/year_wise_rekyc.json?${queryParams}`);
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        const transformed = data.data.map(item => ({
          year: item.year.toString(),
          total_rekyc_vendors: item.total_rekyc_vendors
        }));
        setYearWiseData(transformed);
      }
    } catch (error) {
      console.error("Error fetching year-wise data:", error);
    } finally {
      setIsYearWiseLoading(false);
    }
  }, [activeFilters]);

  const fetchDeptWiseData = useCallback(async () => {
    setIsDeptLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("error", "");
      
      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        queryParams.append("from_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(`${baseURL}vendor_re_kyc_dashboard/department_wise_approved_suppliers.json?${queryParams}`);
      const data = await response.json();
      if (data && Array.isArray(data.department_wise_suppliers)) {
        const transformed = data.department_wise_suppliers.map(item => ({
          department: item.department_name,
          rekycInitiated: item.active_initiated_suppliers,
          totalApproved: item.total_approved_suppliers
        }));
        setDeptChartData(transformed);
      }
    } catch (error) {
      console.error("Error fetching department-wise data:", error);
    } finally {
      setIsDeptLoading(false);
    }
  }, [activeFilters]);

  const fetchTableData = useCallback(async (status, errorType = "", page = 1) => {
    // Determine which loading and data state to update based on status and errorType
    let setLoading, setData, setPagination;
    
    if (status === "approved" && errorType === "sap") {
      setLoading = setIsSapErrorLoading; setData = setSapErrorData; setPagination = setSapErrorPagination;
    } else if (status === "rejected") {
      setLoading = setIsRejectedLoading; setData = setRejectedRecordsData; setPagination = setRejectedPagination;
    } else if (status === "pending") {
      setLoading = setIsOpenInvitesLoading; setData = setOpenInvitesData; setPagination = setOpenInvitesPagination;
    } else if (status === "expired") {
      setLoading = setIsExpiredLoading; setData = setExpiredData; setPagination = setExpiredPagination;
    } else if (status === "details_submitted_by_vendor") {
      setLoading = setIsDetailsSubLoading; setData = setDetailsSubData; setPagination = setDetailsSubPagination;
    } else if (status === "approved") {
      setLoading = setIsApprovedLoading; setData = setApprovedRecordsData; setPagination = setApprovedPagination;
    } else {
      return; // Unknown status
    }

    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("token", tokenFromUrl);
      queryParams.append("status", status);
      queryParams.append("error", errorType);
      queryParams.append("page", page);
      
      if (activeFilters.startDate) {
        const parts = activeFilters.startDate.split("/");
        queryParams.append("from_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.endDate) {
        const parts = activeFilters.endDate.split("/");
        queryParams.append("end_date", `${parts[2]}-${parts[1]}-${parts[0]}`);
      }
      if (activeFilters.departmentName) queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors) queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(`${baseURL}vendor_re_kyc_dashboard/status_wise.json?${queryParams}`);
      const result = await response.json();
      
      if (result.status === "success") {
        const transformed = result.data.map(item => {
          let rekycType = "";
          try {
            if (typeof item.rekyc_type === 'string' && item.rekyc_type.startsWith('[')) {
              rekycType = JSON.parse(item.rekyc_type).join(", ");
            } else if (Array.isArray(item.rekyc_type)) {
              rekycType = item.rekyc_type.join(", ");
            } else {
              rekycType = item.rekyc_type || "";
            }
          } catch (e) {
            rekycType = item.rekyc_type || "";
          }

          return {
            organizationName: item.organization_name,
            rekycType: rekycType,
            status: item.status,
            departmentName: item.department_name,
            // Specific column mappings if needed
            rejectedCount: status === "rejected" ? 1 : undefined,
            openInvitesCount: status === "pending" ? 1 : undefined,
            expiredCount: status === "expired" ? 1 : undefined,
            approvedCount: (status === "approved" && !errorType) ? 1 : undefined,
            detailsCount: status === "details_submitted_by_vendor" ? 1 : undefined,
            count: (status === "approved" && errorType === "sap") ? 1 : undefined,
            pushToSAP: (status === "approved" && errorType === "sap") ? "FALSE" : undefined
          };
        });
        setData(transformed);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error(`Error fetching ${status} table data:`, error);
    } finally {
      setLoading(false);
    }
  }, [activeFilters]);

  useEffect(() => {
    fetchKpiCards();
    fetchTypeWiseData();
    fetchMonthWiseData();
    fetchYearWiseData();
    fetchDeptWiseData();
    
    // Fetch individual table data
    fetchTableData("approved", "sap");
    fetchTableData("rejected");
    fetchTableData("pending");
    fetchTableData("expired");
    fetchTableData("details_submitted_by_vendor");
    fetchTableData("approved");
  }, [fetchKpiCards, fetchTypeWiseData, fetchMonthWiseData, fetchYearWiseData, fetchDeptWiseData, fetchTableData]);

  const getStatLabel = (status) => {
    const labels = {
      total_rekyc_vendor: "Total Re-KYC Vendor",
      pending: "Awaiting for Approval",
      approved: "Approved Re-KYC",
      details_submitted_by_vendor: "Details Submitted",
      rejected: "Rejected Re-KYC",
      sap: "Errors in SAP from Approved",
    };
    return labels[status] || status;
  };

  const getStatIcon = (status) => {
    switch (status) {
      case "total_rekyc_vendor": return <Users size={20} />;
      case "pending": return <Clock size={20} />;
      case "approved": return <CheckCircle size={20} />;
      case "details_submitted_by_vendor": return <Mail size={20} />;
      case "rejected": return <XCircle size={20} />;
      case "sap": return <Database size={20} />;
      default: return <Database size={20} />;
    }
  };

  const getStatColor = (status) => {
    switch (status) {
      case "total_rekyc_vendor": return "#3b82f6";
      case "pending": return "#f59e0b";
      case "approved": return "#22c55e";
      case "details_submitted_by_vendor": return "#ec4899";
      case "rejected": return "#ef4444";
      case "sap": return "#6b7280";
      default: return "#3b82f6";
    }
  };

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle drag end for reordering charts
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() ?? "");
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Helper to check if section should be visible
  const show = (id) => visibleSections.includes(id);
  const visibleChartIds = chartOrder.filter((id) => show(id));

  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* ===== HEADER SECTION ===== */}
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <h1
                          className="text-2xl font-bold mb-2"
                          style={{ color: "#1A1A1A" }}
                        >
                          Re-KYC Dashboard 2
                        </h1>
                        <p className="text-gray-600 mb-0">
                          Track and manage vendor KYC verification status
                        </p>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        {/* Section Selector */}
                        <VendorSectionSelector
                          data={KYC_MANAGEMENT_CONFIG}
                          dashboardType="kyc"
                          onSelectionChange={setVisibleSections}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <VendorFilterCard
                  onApplyFilters={(filters) => setActiveFilters(filters)}
                  currentStartDate={activeFilters.startDate}
                  currentEndDate={activeFilters.endDate}
                  currentPqType={activeFilters.pqType}
                  token={tokenFromUrl}
                />

                {/* ===== STATISTICS CARDS SECTION ===== */}
                <div className="row g-3 mb-4">
                  {kpiData.map((stat, index) => {
                    if (!show(stat.status)) return null;
                    return (
                      <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                        <VendorStatCard
                          title={getStatLabel(stat.status)}
                          value={stat.count || 0}
                          icon={getStatIcon(stat.status)}
                          color={getStatColor(stat.status)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* ===== DRAG & DROP CHARTS SECTION ===== */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={visibleChartIds}
                    strategy={rectSortingStrategy}
                  >
                    <div className="col-12">
                      <div className="row g-4">
                        {visibleChartIds.map((chartId) => {
                          // CHART 1: StatusWise Re-KYC Distributions
                          if (chartId === "statusWiseChart") {
                            const statusChartData = kpiData
                              .filter(item => !["total_rekyc_vendor", "sap"].includes(item.status))
                              .map(item => ({
                                name: getStatLabel(item.status),
                                value: item.count
                              }));
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  {isKpiLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">
                                          StatusWise Re-KYC Distributions
                                        </h3>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          height: "300px",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="spinner-border text-primary mb-2"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                        <span className="text-muted fw-medium">
                                          Loading Status Data...
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <DepartmentWiseDistributionChart
                                      title="StatusWise Re-KYC Distributions"
                                      data={statusChartData}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // CHART 2: TypeWise Re-KYC Distributions
                          if (chartId === "typeWiseChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  {isTypeWiseLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">
                                          TypeWise Re-KYC Distributions
                                        </h3>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          height: "300px",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="spinner-border text-primary mb-2"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                        <span className="text-muted fw-medium">
                                          Loading Type Data...
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <DepartmentWiseDistributionChart
                                      title="TypeWise Re-KYC Distributions"
                                      data={typeChartData}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // CHART 3: Department Wise Re-KYC (Bar Chart)
                          if (chartId === "departmentReKYCChart") {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  {isDeptLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">
                                          Department Wise Re-KYC
                                        </h3>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          height: "400px",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="spinner-border text-primary mb-2"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                        <span className="text-muted fw-medium">
                                          Loading Department Data...
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <DepartmentReKYCChart
                                      data={deptChartData}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "monthWiseChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  {isMonthWiseLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">
                                          Month Wise Re-KYC Type
                                        </h3>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          height: "300px",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="spinner-border text-primary mb-2"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                        <span className="text-muted fw-medium">
                                          Loading Month-wise Data...
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <ReKycBarchart
                                      data={monthWiseData}
                                      title="Month Wise Re-KYC Type"
                                      height={500}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "yearWiseChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  {isYearWiseLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">
                                          Year Wise Re-KYC Type
                                        </h3>
                                      </div>
                                      <div
                                        className="card-body"
                                        style={{
                                          height: "300px",
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          className="spinner-border text-primary mb-2"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Loading...
                                          </span>
                                        </div>
                                        <span className="text-muted fw-medium">
                                          Loading Year-wise Data...
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <ReKycBarchart
                                      data={yearWiseData}
                                      title="Year Wise Re-KYC Type"
                                      height={500}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // TABLE 1: Rejected Re-KYC Record
                          if (chartId === "rejectedTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="Rejected Re-KYC Record"
                                      loading={isRejectedLoading}
                                      columns={REJECTED_COLUMNS}
                                      data={rejectedRecordsData}
                                      pagination={rejectedPagination}
                                      onPageChange={(page) => fetchTableData("rejected", "", page)}
                                      onDownload={() => {}}
                                    />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // TABLE 2: Open Invites Re-KYC Record
                          if (chartId === "openInvitesTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="Open Invites Re-KYC Record"
                                      loading={isOpenInvitesLoading}
                                      columns={OPEN_INVITES_COLUMNS}
                                      data={openInvitesData}
                                      pagination={openInvitesPagination}
                                      onPageChange={(page) => fetchTableData("pending", "", page)}
                                      onDownload={() => {}}
                                    />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // TABLE 3: Type wise ReKYC Distribution (Existing Table - uses hardcoded/diff source maybe? the request didn't specify changing this one, but I'll update if it looks redundant)
                          if (chartId === "typeWiseTable") {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Type wise ReKYC Distribution"
                                    columns={TYPE_WISE_COLUMNS}
                                    data={typeWiseTableData}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "approvedRecordTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="Approved Re-KYC Record"
                                      loading={isApprovedLoading}
                                      columns={APPROVED_RECORD_COLUMNS}
                                      data={approvedRecordsData}
                                      pagination={approvedPagination}
                                      onPageChange={(page) => fetchTableData("approved", "", page)}
                                      onDownload={() => {}}
                                    />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "detailsSubTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="Details Sub Re-KYC Record"
                                      loading={isDetailsSubLoading}
                                      columns={DETAILS_SUB_COLUMNS}
                                      data={detailsSubData}
                                      pagination={detailsSubPagination}
                                      onPageChange={(page) => fetchTableData("details_submitted_by_vendor", "", page)}
                                      onDownload={() => {}}
                                    />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "expiredTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="Expired Re-KYC Record"
                                      loading={isExpiredLoading}
                                      columns={EXPIRED_COLUMNS}
                                      data={expiredData}
                                      pagination={expiredPagination}
                                      onPageChange={(page) => fetchTableData("expired", "", page)}
                                      onDownload={() => {}}
                                    />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "sapErrorTable") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                    <VendorDataTable
                                      title="SAP Error"
                                      loading={isSapErrorLoading}
                                      columns={SAP_ERROR_COLUMNS}
                                      data={sapErrorData}
                                      pagination={sapErrorPagination}
                                      onPageChange={(page) => fetchTableData("approved", "sap", page)}
                                      onDownload={() => {}}
                                    />
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

                {/* ===== FILTER DIALOG REMOVED IN FAVOR OF VENDORFILTERCARD ===== */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReKYCDashboard;
