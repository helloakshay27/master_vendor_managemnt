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
import {
  BarChart3,
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Clock,
  AlertCircle,
  Layers,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// Config
import { baseURL, token } from "../confi/apiDomain";

// Components
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { VendorFilterCard } from "@/components/vendor-analytics/VendorFilterCard";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import { GradeAssessmentBar } from "@/components/vendor-analytics/GradeAssessmentBar";
import ReKycBarchart from "@/components/vendor-analytics/ReKycBarchart";
import { DepartmentReKYCChart } from "@/components/vendor-analytics/DepartmentReKYCTable";

// Statistics data will be fetched from API

// =============================================================================
// MOCK DATA - Charts Data
// =============================================================================

// Statistics data will be fetched from API

// =============================================================================
// CONFIGURATION
// =============================================================================


// =============================================================================
// CONFIGURATION
// =============================================================================

// Section Selector Configuration
const KYC_MANAGEMENT_CONFIG = {
  charts: {
    icon: BarChart3,
    label: "KYC Analytics",
    color: "#3b82f6",
    options: [
      {
        id: "GradeTotalApprovedSuppliers",
        label: "Grade Total Approved Suppliers",
      },
      { id: "StatuswisevenderChart", label: "Status wise vender Chart" },
      { id: "documentsTable", label: "KYC Documents Status" },
      { id: "pendingKycTable", label: "Pending KYC Approvals" },
      { id: "expiredKycTable", label: "Expired KYC Documents" },
      { id: "rejectedVendorsTable", label: "Rejected Vendor Records" },
      {
        id: "detailsSubmittedTable",
        label: "Details Submitted Vendor Records",
      },
      { id: "deptReKYCChart", label: "Department ReKYC Status" },
      { id: "approvedVendorsTable", label: "Approved Vendor Records" },
      { id: "expiredVendorsTable", label: "Expired Vendor Records" },
      { id: "MonthWiseReKYCType", label: "Month Wise Re-KYC Type" },
      { id: "yearWiseReKYCChart", label: "Year Wise Re-KYC Count" },
      { id: "sapErrorTable", label: "SAP Error" },
      {
        id: "orgWiseStatusTable",
        label: "Organisation Wise Vendor ReKyc Status",
      },
      { id: "openInvitesTable", label: "Open Invites Vendor Records" },
      {
        id: "approvedNoReKYCTable",
        label: "Approved Vendors but ReKYC not Initiated",
      },
    ],
  },
  stats: {
    icon: TrendingUp,
    label: "Statistics Cards",
    color: "#10b981",
    options: [
      { id: "Active Vendors", label: "Active Vendors" },
      { id: "Active Initiated Suppliers", label: "Active Initiated Suppliers" },
      { id: "Latest Unique Suppliers", label: "Latest Unique Suppliers" },
      { id: "Other Rekycs", label: "Other Rekycs" },
      { id: "Active Not Initiated Suppliers", label: "Active Not Initiated Suppliers" },
      { id: "Pending Suppliers", label: "Pending Suppliers" },
      { id: "Details Submitted Suppliers", label: "Details Submitted Suppliers" },
      { id: "Approved Suppliers", label: "Approved Suppliers" },
      { id: "Rejected Suppliers", label: "Rejected Suppliers" },
      { id: "Expired Row Count", label: "Expired Row Count" },
      { id: "SAP Errors", label: "SAP Errors" },
    ],
  },
};

// Chart IDs for drag and drop
const ALL_CHART_IDS = [
  "GradeTotalApprovedSuppliers",
  "StatuswisevenderChart",
  "approvedNoReKYCTable",
  "orgWiseStatusTable",
  "openInvitesTable",
  "detailsSubmittedTable",
  "rejectedVendorsTable",
  "deptReKYCChart",
  "approvedVendorsTable",
  "expiredVendorsTable",
  "MonthWiseReKYCType",
  "yearWiseReKYCChart",
  "sapErrorTable",
];

// Stat IDs
const ALL_STAT_IDS = [
  "Active Vendors",
  "Active Initiated Suppliers",
  "Latest Unique Suppliers",
  "Other Rekycs",
  "Active Not Initiated Suppliers",
  "Pending Suppliers",
  "Details Submitted Suppliers",
  "Approved Suppliers",
  "Rejected Suppliers",
  "Expired Row Count",
  "SAP Errors",
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getDefaultDateRange = () => {
  const today = new Date();
  const startDate = new Date(2024, 0, 1); // January 1, 2024 (fixed)
  const fmt = (d) => {
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  };
  return { startDate: fmt(startDate), endDate: fmt(today) };
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const KYCManagementDashboard = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token") || "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414";

  // State Management
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
  
  // Initialize with zero counts for all predefined stats
  const [kpiData, setKpiData] = useState(
    ALL_STAT_IDS.map(id => ({ status: id, count: 0 }))
  );
  const [isKpiLoading, setIsKpiLoading] = useState(false);
  const [monthData, setMonthData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [approvedNoReKycData, setApprovedNoReKycData] = useState([]);
  const [approvedNoReKycPagination, setApprovedNoReKycPagination] = useState(null);
  const [isApprovedNoReKycLoading, setIsApprovedNoReKycLoading] = useState(false);
  const [orgWiseStatusData, setOrgWiseStatusData] = useState([]);
  const [orgWiseStatusPagination, setOrgWiseStatusPagination] = useState(null);
  const [isOrgWiseStatusLoading, setIsOrgWiseStatusLoading] = useState(false);

  // States for Summary Filtered Tables
  const [sapErrorData, setSapErrorData] = useState([]);
  const [sapErrorPagination, setSapErrorPagination] = useState(null);
  const [isSapErrorLoading, setIsSapErrorLoading] = useState(false);

  const [rejectedData, setRejectedData] = useState([]);
  const [rejectedPagination, setRejectedPagination] = useState(null);
  const [isRejectedLoading, setIsRejectedLoading] = useState(false);

  const [openInvitesData, setOpenInvitesData] = useState([]);
  const [openInvitesPagination, setOpenInvitesPagination] = useState(null);
  const [isOpenInvitesLoading, setIsOpenInvitesLoading] = useState(false);

  const [expiredRecordsData, setExpiredRecordsData] = useState([]);
  const [expiredRecordsPagination, setExpiredRecordsPagination] = useState(null);
  const [isExpiredRecordsLoading, setIsExpiredRecordsLoading] = useState(false);

  const [detailsSubData, setDetailsSubData] = useState([]);
  const [detailsSubPagination, setDetailsSubPagination] = useState(null);
  const [isDetailsSubLoading, setIsDetailsSubLoading] = useState(false);

  const [approvedRecordsData, setApprovedRecordsData] = useState([]);
  const [approvedRecordsPagination, setApprovedRecordsPagination] = useState(null);
  const [isApprovedRecordsLoading, setIsApprovedRecordsLoading] = useState(false);

  // Drag and Drop Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle Drag End
  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() ?? "");
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Check if section is visible
  const show = (id) => visibleSections.includes(id);

  const handleAnalyticsFilterApply = (filters) => {
    setActiveFilters(filters);
  };

  const fetchKpiCards = useCallback(async () => {
    setIsKpiLoading(true);
    try {
      const queryParams = new URLSearchParams();
      // Using hardcoded token as requested
      const hardcodedToken = tokenFromUrl;
      queryParams.append("token", hardcodedToken);
      
      if (activeFilters.startDate)
        queryParams.append("from_date", activeFilters.startDate.split("/").join("-"));
      if (activeFilters.endDate)
        queryParams.append("end_date", activeFilters.endDate.split("/").join("-"));
      if (activeFilters.companyName)
        queryParams.append("company_ids", activeFilters.companyName);
      if (activeFilters.departmentName)
        queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors)
        queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/general_rekyc_kpi_cards.json?${queryParams}`
      );
      const data = await response.json();
      
      if (data.status === "success" && Array.isArray(data.data)) {
        // Map API data and ensure all predefined stats are present (even if zero)
        const apiStats = data.data;
        const updatedKpiData = ALL_STAT_IDS.map(id => {
          const apiMatch = apiStats.find(s => s.status === id);
          return { status: id, count: apiMatch ? apiMatch.count : 0 };
        });
        setKpiData(updatedKpiData);
      }
    } catch (error) {
      console.error("Error fetching KPI cards:", error);
    } finally {
      setIsKpiLoading(false);
    }
  }, [activeFilters]);

  const fetchTimeWiseData = useCallback(async () => {
    setIsChartLoading(true);
    try {
      const queryParams = new URLSearchParams();
      const hardcodedToken = tokenFromUrl;
      queryParams.append("token", hardcodedToken);
      
      if (activeFilters.startDate)
        queryParams.append("from_date", activeFilters.startDate.split("/").join("-"));
      if (activeFilters.endDate)
        queryParams.append("end_date", activeFilters.endDate.split("/").join("-"));
      if (activeFilters.companyName)
        queryParams.append("company_ids", activeFilters.companyName);
      if (activeFilters.departmentName)
        queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors)
        queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/time_wise_general_rekyc.json?${queryParams}`
      );
      const data = await response.json();
      
      if (data) {
        // Transform month-wise data
        if (Array.isArray(data.month_wise)) {
          const transformedMonth = data.month_wise.map(item => {
            const flatObj = { month: item.month };
            if (Array.isArray(item.statuses)) {
              item.statuses.forEach(s => {
                flatObj[s.status] = s.count;
              });
            }
            return flatObj;
          });
          setMonthData(transformedMonth);
        }

        // Transform year-wise data
        if (Array.isArray(data.year_wise)) {
          const transformedYear = data.year_wise.map(item => ({
            year: item.year.toString(),
            "Total Re-KYC": item.total_rekyc_vendors
          }));
          setYearData(transformedYear);
        }
      }
    } catch (error) {
      console.error("Error fetching time-wise data:", error);
    } finally {
      setIsChartLoading(false);
    }
  }, [activeFilters]);

  const fetchApprovedNoReKycData = useCallback(async (page = 1) => {
    setIsApprovedNoReKycLoading(true);
    try {
      const queryParams = new URLSearchParams();
      const hardcodedToken = tokenFromUrl;
      queryParams.append("token", hardcodedToken);
      queryParams.append("page", page);
      
      if (activeFilters.startDate)
        queryParams.append("from_date", activeFilters.startDate.split("/").join("-"));
      if (activeFilters.endDate)
        queryParams.append("end_date", activeFilters.endDate.split("/").join("-"));
      if (activeFilters.companyName)
        queryParams.append("company_ids", activeFilters.companyName);
      if (activeFilters.departmentName)
        queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors)
        queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/approved_vendor_but_rekyc_not_initiated.json?${queryParams}`
      );
      const data = await response.json();
      
      if (data.status === "success" && Array.isArray(data.data)) {
        const transformedData = data.data.map(item => ({
          organizationName: item.organization_name,
          departmentName: item.department_name,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          ageingInMonth: item.ageing_in_month,
          rowCount: item.row_flag
        }));

        // Add total row at the end
        if (data.pagination && data.pagination.current_page === 1) {
           transformedData.push({
             isTotal: true,
             organizationName: "Total",
             departmentName: "",
             createdAt: "",
             updatedAt: "",
             ageingInMonth: "",
             rowCount: data.pagination.total_records
           });
        }
        
        setApprovedNoReKycData(transformedData);
        setApprovedNoReKycPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching Approved No ReKyc data:", error);
    } finally {
      setIsApprovedNoReKycLoading(false);
    }
  }, [activeFilters]);

  const fetchOrgWiseStatusData = useCallback(async (page = 1) => {
    setIsOrgWiseStatusLoading(true);
    try {
      const queryParams = new URLSearchParams();
      const hardcodedToken = tokenFromUrl;
      queryParams.append("token", hardcodedToken);
      queryParams.append("page", page);
      
      if (activeFilters.startDate)
        queryParams.append("from_date", activeFilters.startDate.split("/").join("-"));
      if (activeFilters.endDate)
        queryParams.append("end_date", activeFilters.endDate.split("/").join("-"));
      if (activeFilters.companyName)
        queryParams.append("company_ids", activeFilters.companyName);
      if (activeFilters.departmentName)
        queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors)
        queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/organization_wise_vendor_rekyc_status.json?${queryParams}`
      );
      const data = await response.json();
      
      if (data.status === "success" && Array.isArray(data.data)) {
        const transformedData = data.data.map(item => ({
          organizationName: item.organization_name || "N/A",
          initiatedBy: item.initiated_by,
          statuses: item.rekyc_status,
          count: item.row_count
        }));

        // Add total row at the end of first page
        if (data.pagination && data.pagination.current_page === 1) {
           transformedData.push({
             isTotal: true,
             organizationName: "Total",
             initiatedBy: "",
             statuses: "",
             count: data.pagination.total_records
           });
        }
        
        setOrgWiseStatusData(transformedData);
        setOrgWiseStatusPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching Org Wise Status data:", error);
    } finally {
      setIsOrgWiseStatusLoading(false);
    }
  }, [activeFilters]);

  const fetchSummaryData = useCallback(async (status, errorType = null, page = 1, setter, paginationSetter, loadingSetter) => {
    loadingSetter(true);
    try {
      const queryParams = new URLSearchParams();
      const hardcodedToken = tokenFromUrl;
      queryParams.append("token", hardcodedToken);
      queryParams.append("page", page);
      if (status) queryParams.append("status", status);
      if (errorType) queryParams.append("error", errorType);
      
      if (activeFilters.startDate)
        queryParams.append("from_date", activeFilters.startDate.split("/").join("-"));
      if (activeFilters.endDate)
        queryParams.append("end_date", activeFilters.endDate.split("/").join("-"));
      if (activeFilters.companyName)
        queryParams.append("company_ids", activeFilters.companyName);
      if (activeFilters.departmentName)
        queryParams.append("department_ids", activeFilters.departmentName);
      if (activeFilters.vendors)
        queryParams.append("vendor_ids", activeFilters.vendors);

      const response = await fetch(
        `${baseURL}vendor_re_kyc_dashboard/general_rekyc_summary_filtered.json?${queryParams}`
      );
      const data = await response.json();
      
      if (data.status === "success" && Array.isArray(data.data)) {
        const transformedData = data.data.map(item => ({
          organizationName: item.organization_name || "N/A",
          rekycType: item.rekyc_type || "General Rekyc",
          pushToSAP: item.push_to_sap || "FALSE",
          updatedAt: item.updated_at || "N/A",
          ageingInMonth: item.ageing_in_month || 0,
          count: item.row_count || 1,
          rejectedSuppliers: item.row_count || 1,
          approvedSuppliers: item.row_count || 1,
          expiredSuppliers: item.row_count || 1,
          pendingSuppliers: item.row_count || 1,
          detailsSubmittedSuppliers: item.row_count || 1,
          fullName: item.initiated_by || "N/A",
          comment: ""
        }));

        if (data.pagination && data.pagination.current_page === 1) {
           transformedData.push({
             isTotal: true,
             organizationName: "Total",
             rekycType: "",
             pushToSAP: "",
             updatedAt: "",
             ageingInMonth: 0,
             count: data.pagination.total_records,
             rejectedSuppliers: data.pagination.total_records,
             approvedSuppliers: data.pagination.total_records,
             expiredSuppliers: data.pagination.total_records,
             pendingSuppliers: data.pagination.total_records,
             detailsSubmittedSuppliers: data.pagination.total_records,
             fullName: "",
             comment: ""
           });
        }
        
        setter(transformedData);
        paginationSetter(data.pagination);
      }
    } catch (error) {
      console.error(`Error fetching summary data for ${status}:`, error);
    } finally {
      loadingSetter(false);
    }
  }, [activeFilters]);

  useEffect(() => {
    fetchKpiCards();
    fetchTimeWiseData();
    fetchApprovedNoReKycData();
    fetchOrgWiseStatusData();
    
    // Status wise tables
    fetchSummaryData("approved", "sap", 1, setSapErrorData, setSapErrorPagination, setIsSapErrorLoading);
    fetchSummaryData("rejected", null, 1, setRejectedData, setRejectedPagination, setIsRejectedLoading);
    fetchSummaryData("pending", null, 1, setOpenInvitesData, setOpenInvitesPagination, setIsOpenInvitesLoading);
    fetchSummaryData("expired", null, 1, setExpiredRecordsData, setExpiredRecordsPagination, setIsExpiredRecordsLoading);
    fetchSummaryData("details_submitted_by_vendor", null, 1, setDetailsSubData, setDetailsSubPagination, setIsDetailsSubLoading);
    fetchSummaryData("approved", null, 1, setApprovedRecordsData, setApprovedRecordsPagination, setIsApprovedRecordsLoading);

  }, [
    fetchKpiCards, 
    fetchTimeWiseData, 
    fetchApprovedNoReKycData, 
    fetchOrgWiseStatusData,
    fetchSummaryData
  ]);

  const getStatIcon = (status) => {
    switch (status) {
      case "Active Vendors":
        return <Users size={20} />;
      case "Active Initiated Suppliers":
        return <UserCheck size={20} />;
      case "Latest Unique Suppliers":
        return <Users size={20} />;
      case "Other Rekycs":
        return <Layers size={20} />;
      case "Active Not Initiated Suppliers":
        return <UserX size={20} />;
      case "Pending Suppliers":
        return <Clock size={20} />;
      case "Details Submitted Suppliers":
        return <FileText size={20} />;
      case "Approved Suppliers":
        return <CheckCircle size={20} />;
      case "Rejected Suppliers":
        return <XCircle size={20} />;
      case "Expired Row Count":
        return <AlertTriangle size={20} />;
      case "SAP Errors":
        return <AlertCircle size={20} />;
      default:
        return <TrendingUp size={20} />;
    }
  };

  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* ========================================================= */}
                {/* Header Section */}
                {/* ========================================================= */}
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      {/* Title */}
                      <div>
                        <h1
                          className="text-2xl font-bold mb-2"
                          style={{ color: "#1A1A1A" }}
                        >
                          KYC Management Dashboard
                        </h1>
                        <p className="text-gray-600 mb-0">
                          Comprehensive KYC verification and document tracking
                        </p>
                      </div>

                      {/* Actions */}
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
                  onApplyFilters={handleAnalyticsFilterApply}
                  currentStartDate={activeFilters.startDate}
                  currentEndDate={activeFilters.endDate}
                  currentPqType={activeFilters.pqType}
                  token={tokenFromUrl}
                />

                {/* ========================================================= */}
                {/* Statistics Cards Section */}
                {/* ========================================================= */}
                <div className="row g-3 mb-4">
                  {kpiData.map((stat, index) => {
                    const isVisible = show(stat.status);
                    if (!isVisible) return null;
                    return (
                      <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                        <VendorStatCard
                          title={stat.status}
                          value={stat.count || 0}
                          icon={getStatIcon(stat.status)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* ========================================================= */}
                {/* Charts and Tables with Drag & Drop */}
                {/* ========================================================= */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={chartOrder}
                    strategy={rectSortingStrategy}
                  >
                    <div className="col-12">
                      <div className="row g-4">
                        {chartOrder.map((chartId) => {
                          // =================================================
                          // FULL WIDTH COMPONENTS (col-12)
                          // =================================================

                          // Grade Assessment Chart - Full Width
                          if (
                            chartId === "GradeTotalApprovedSuppliers" &&
                            show("GradeTotalApprovedSuppliers")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  {isKpiLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Total Approved Suppliers</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Total Approved Suppliers...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <GradeAssessmentBar
                                      data={[
                                        { 
                                          label: "Initiated Suppliers", 
                                          value: kpiData.find(d => d.status === "Active Initiated Suppliers")?.count || 0,
                                          color: "#7a5a45" 
                                        },
                                        { 
                                          label: "Not Initiated Suppliers", 
                                          value: kpiData.find(d => d.status === "Active Not Initiated Suppliers")?.count || 0,
                                          color: "#d6bfa9"
                                        }
                                      ]}
                                      title="Total Approved Suppliers"
                                      legendLabel="Suppliers"
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Status wise vendor Chart - Full Width
                          if (
                            chartId === "StatuswisevenderChart" &&
                            show("StatuswisevenderChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  {isKpiLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Status Wise Vendor Count</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Status Wise Vendor Count...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <GradeAssessmentBar
                                      data={[
                                        { 
                                          label: "Approved", 
                                          value: kpiData.find(d => d.status === "Approved Suppliers")?.count || 0,
                                          color: "#5c4033" 
                                        },
                                        { 
                                          label: "Details Submitted By Vendor", 
                                          value: kpiData.find(d => d.status === "Details Submitted Suppliers")?.count || 0,
                                          color: "#7a5a45"
                                        },
                                        { 
                                          label: "Expired", 
                                          value: kpiData.find(d => d.status === "Expired Row Count")?.count || 0,
                                          color: "#b08968"
                                        },
                                        { 
                                          label: "Pending", 
                                          value: kpiData.find(d => d.status === "Pending Suppliers")?.count || 0,
                                          color: "#d6bfa9"
                                        },
                                        { 
                                          label: "Rejected", 
                                          value: kpiData.find(d => d.status === "Rejected Suppliers")?.count || 0,
                                          color: "#a52a2a"
                                        }
                                      ]}
                                      title="Status Wise Vendor Count"
                                      legendLabel="Statuses"
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Rejected Vendor Records Table - Full Width
                          if (
                            chartId === "rejectedVendorsTable" &&
                            show("rejectedVendorsTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Rejected Vendor Records"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                      { key: "comment", label: "Comment" },
                                    ]}
                                    data={rejectedData}
                                    isLoading={isRejectedLoading}
                                    pagination={rejectedPagination}
                                    onPageChange={(page) => fetchSummaryData("rejected", null, page, setRejectedData, setRejectedPagination, setIsRejectedLoading)}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Details Submitted Vendor Records - Full Width
                          if (
                            chartId === "detailsSubmittedTable" &&
                            show("detailsSubmittedTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Details Submitted Vendor Records"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                      { key: "fullName", label: "Full Name" },
                                      { key: "updatedAt", label: "Updated at" },
                                      { key: "ageingInMonth", label: "Ageing in Month" },
                                    ]}
                                    data={detailsSubData}
                                    isLoading={isDetailsSubLoading}
                                    pagination={detailsSubPagination}
                                    onPageChange={(page) => fetchSummaryData("details_submitted_by_vendor", null, page, setDetailsSubData, setDetailsSubPagination, setIsDetailsSubLoading)}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Department ReKYC Chart - Full Width
                          if (
                            chartId === "deptReKYCChart" &&
                            show("deptReKYCChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  {isKpiLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Department ReKYC Status</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Department ReKYC Status...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <DepartmentReKYCChart
                                      title="Department ReKYC Status"
                                      data={[]}
                                      onDownload={() => {}}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Approved Vendors but ReKYC not Initiated - Full Width
                          if (
                            chartId === "approvedNoReKYCTable" &&
                            show("approvedNoReKYCTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Approved Vendors but ReKYC not Initiated"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "departmentName", label: "Department Name" },
                                      { key: "createdAt", label: "Created at" },
                                      { key: "updatedAt", label: "Updated at" },
                                      { key: "ageingInMonth", label: "Ageing in Month" },
                                    ]}
                                    data={approvedNoReKycData}
                                    isLoading={isApprovedNoReKycLoading}
                                    pagination={approvedNoReKycPagination}
                                    onPageChange={fetchApprovedNoReKycData}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // =================================================
                          // HALF WIDTH COMPONENTS (col-12 col-lg-6)
                          // =================================================

                          // Approved Vendor Records Table - Half Width
                          if (
                            chartId === "approvedVendorsTable" &&
                            show("approvedVendorsTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Approved Vendor Records"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                    ]}
                                    data={approvedRecordsData}
                                    isLoading={isApprovedRecordsLoading}
                                    pagination={approvedRecordsPagination}
                                    onPageChange={(page) => fetchSummaryData("approved", null, page, setApprovedRecordsData, setApprovedRecordsPagination, setIsApprovedRecordsLoading)}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Expired Vendor Records Table - Half Width
                          if (
                            chartId === "expiredVendorsTable" &&
                            show("expiredVendorsTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Expired Vendor Records"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                    ]}
                                    data={expiredRecordsData}
                                    isLoading={isExpiredRecordsLoading}
                                    pagination={expiredRecordsPagination}
                                    onPageChange={(page) => fetchSummaryData("expired", null, page, setExpiredRecordsData, setExpiredRecordsPagination, setIsExpiredRecordsLoading)}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Month Wise Re-KYC Chart - Half Width
                          if (
                            chartId === "MonthWiseReKYCType" &&
                            show("MonthWiseReKYCType")
                          ) {
                            return (
                              <div key={chartId} className="col-lg-6 col-md-12">
                                <SortableChartItem id={chartId}>
                                  {isChartLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Month Wise Re-KYC Type</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Month Wise Re-KYC Type...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <ReKycBarchart
                                      data={monthData}
                                      title="Month Wise Re-KYC Type"
                                      isLoading={isChartLoading}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Year Wise Re-KYC Count Chart - Half Width
                          if (
                            chartId === "yearWiseReKYCChart" &&
                            show("yearWiseReKYCChart")
                          ) {
                            return (
                              <div key={chartId} className="col-lg-6 col-md-12">
                                <SortableChartItem id={chartId}>
                                  {isChartLoading ? (
                                    <div className="card go-shadow bg-white rounded-lg w-100">
                                      <div className="vendor-card-header">
                                        <h3 className="vendor-card-title">Year Wise Re-KYC Count</h3>
                                      </div>
                                      <div className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="text-muted fw-medium">Loading Year Wise Re-KYC Count...</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <ReKycBarchart
                                      data={yearData}
                                      title="Year Wise Re-KYC Count"
                                      type="year"
                                      isLoading={isChartLoading}
                                    />
                                  )}
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // SAP Error Table - Half Width
                          if (
                            chartId === "sapErrorTable" &&
                            show("sapErrorTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="SAP Error"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "pushToSAP", label: "Push to SAP" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                    ]}
                                    data={sapErrorData}
                                    isLoading={isSapErrorLoading}
                                    pagination={sapErrorPagination}
                                    onPageChange={(page) => fetchSummaryData("approved", "sap", page, setSapErrorData, setSapErrorPagination, setIsSapErrorLoading)}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Organisation Wise Vendor ReKyc Status - Half Width
                          if (
                            chartId === "orgWiseStatusTable" &&
                            show("orgWiseStatusTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Organisation Wise Vendor ReKyc Status"
                                    columns={[
                                      {
                                        key: "organizationName",
                                        label: "Organization Name",
                                      },
                                      { key: "initiatedBy", label: "Initiated By" },
                                      { key: "statuses", label: "Statuses" },
                                    ]}
                                    data={orgWiseStatusData}
                                    isLoading={isOrgWiseStatusLoading}
                                    pagination={orgWiseStatusPagination}
                                    onPageChange={fetchOrgWiseStatusData}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Open Invites Vendor Records - Half Width
                          if (
                            chartId === "openInvitesTable" &&
                            show("openInvitesTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Open Invites Vendor Records"
                                    columns={[
                                      { key: "organizationName", label: "Organization Name" },
                                      { key: "rekycType", label: "ReKYC Type" },
                                      { key: "updatedAt", label: "Updated at" },
                                      { key: "ageingInMonth", label: "Ageing in Month" },
                                    ]}
                                    data={openInvitesData}
                                    isLoading={isOpenInvitesLoading}
                                    pagination={openInvitesPagination}
                                    onPageChange={(page) => fetchSummaryData("pending", null, page, setOpenInvitesData, setOpenInvitesPagination, setIsOpenInvitesLoading)}
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

                {/* Filter Dialog removed and replaced by Filter Card */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCManagementDashboard;
