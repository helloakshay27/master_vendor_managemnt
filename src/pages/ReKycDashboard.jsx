import React, { useState } from "react";
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
} from "lucide-react";

// Components
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { VendorAnalyticsFilterDialog } from "@/components/vendor-analytics/VendorAnalyticsFilterDialog";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import { GradeAssessmentBar } from "@/components/vendor-analytics/GradeAssessmentBar";
import ReKycBarchart from "@/components/vendor-analytics/ReKycBarchart";
import { DepartmentReKYCChart } from "@/components/vendor-analytics/DepartmentReKYCTable";

// =============================================================================
// MOCK DATA - Statistics Cards
// =============================================================================

const MOCK_KYC_STATS = {
  ActiveVendors: 5234,
  TotalReKYCInitiated: 3892,
  GeneralReKYC: 892,
  OtherReKYC: 450,
  ReKYCNotInitiated: 3678,
  OpenInvites: 214,
  Approved: 678,
  Rejected: 892,
  LinkExpired: 2599,
  ErrorsinSAPfromApprovedList: 2,
  kycInProgress: 678,
  DocumentsPending: 892,
};

// =============================================================================
// MOCK DATA - Charts Data
// =============================================================================

// Grade Assessment Data
const MOCK_KYC_DATA = [
  { grade: "A", value: 5, color: "#00b050" },
  { grade: "B", value: 147, color: "#f58513" },
  { grade: "C", value: 101, color: "#e6b325" },
  { grade: "D", value: 62, color: "#f4ea00" },
  { grade: "F", value: 8, color: "#e00000" },
];

// Department ReKYC Chart Data
const MOCK_DEPT_REKYC_DATA = [
  { department: "(Blank)", rekycInitiated: 4, totalApproved: 1088 },
  { department: "Accounts", rekycInitiated: 31, totalApproved: 118 },
  { department: "Admin", rekycInitiated: 22, totalApproved: 419 },
  { department: "ARCHITECTURE", rekycInitiated: 1, totalApproved: 31 },
  { department: "Aviation", rekycInitiated: 27, totalApproved: 735 },
  { department: "Billing", rekycInitiated: 1, totalApproved: 139 },
  { department: "Contracts", rekycInitiated: 8, totalApproved: 131 },
  { department: "Finance", rekycInitiated: 3, totalApproved: 65 },
  { department: "Interior", rekycInitiated: 21, totalApproved: 1127 },
  { department: "Legal and Liaison", rekycInitiated: 2, totalApproved: 1157 },
  { department: "Purchase P2 & W.O...", rekycInitiated: 10, totalApproved: 29 },
  { department: "Residential Sales", rekycInitiated: 2, totalApproved: 170 },
  { department: "Travel Desk", rekycInitiated: 4, totalApproved: 95 },
  { department: "Venture", rekycInitiated: 22, totalApproved: 22 },
];

// Month Wise Re-KYC Data
const monthWiseData = [
  { month: "May", rekycCount: 50.0, statuses: 50.0 },
  { month: "June", rekycCount: 100.0, statuses: 100.0 },
  { month: "July", rekycCount: 100.0, statuses: 100.5 },
  { month: "October", rekycCount: 73.54, statuses: 19.31 },
  { month: "November", rekycCount: 54.55, statuses: 9.09 },
  { month: "December", rekycCount: 16.2, statuses: 36.36 },
  { month: "January", rekycCount: 33.33, statuses: 44.44 },
  { month: "February 2026", rekycCount: 64.29, statuses: 28.57 },
];

// Year Wise Re-KYC Data
const yearWiseData = [
  { year: "2025", totalReKYC: 3470 },
  { year: "2026", totalReKYC: 23 },
];

// =============================================================================
// MOCK DATA - Tables Data
// =============================================================================

// 1. KYC Documents Status
const MOCK_DOCUMENTS_COLUMNS = [
  { key: "vendorName", label: "Vendor Name" },
  { key: "department", label: "Department" },
  { key: "documentType", label: "Document Type" },
  { key: "submittedDate", label: "Submitted Date" },
  { key: "expiryDate", label: "Expiry Date" },
  { key: "status", label: "Status" },
  { key: "verifiedBy", label: "Verified By" },
  { key: "remarks", label: "Remarks" },
];

const MOCK_DOCUMENTS_DATA = [
  {
    vendorName: "Tata Steel Limited",
    department: "Procurement",
    documentType: "GST Certificate",
    submittedDate: "15/01/2025",
    expiryDate: "14/01/2026",
    status: "Verified",
    verifiedBy: "Rajesh Kumar",
    remarks: "All documents verified",
  },
  {
    vendorName: "MC Bauchemie India Pvt Ltd",
    department: "Purchase",
    documentType: "PAN Card",
    submittedDate: "20/01/2025",
    expiryDate: "19/01/2026",
    status: "Pending",
    verifiedBy: "Pending",
    remarks: "Awaiting verification",
  },
  {
    vendorName: "Total Vendors",
    isTotal: true,
    department: "",
    documentType: "",
    submittedDate: "",
    expiryDate: "",
    status: "",
    verifiedBy: "",
    remarks: "5234 Total Vendors",
  },
];

// 2. Pending KYC Approvals
const MOCK_PENDING_KYC_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "departmentName", label: "Department Name" },
  { key: "createdAt", label: "Created at" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
  { key: "rowCount", label: "Row Count" },
];

const MOCK_PENDING_KYC_DATA = [
  {
    organizationName: "Abhijit Borase",
    departmentName: "Admin",
    createdAt: "02-04-25",
    updatedAt: "04-04-25",
    ageingInMonth: 10,
    rowCount: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    departmentName: "",
    createdAt: "",
    updatedAt: "",
    ageingInMonth: "",
    rowCount: 1264,
  },
];

// 3. Expired KYC Documents
const MOCK_EXPIRED_KYC_COLUMNS = [
  { key: "vendorName", label: "Vendor Name" },
  { key: "department", label: "Department" },
  { key: "documentType", label: "Document Type" },
  { key: "expiryDate", label: "Expiry Date" },
  { key: "daysExpired", label: "Days Expired" },
  { key: "renewalStatus", label: "Renewal Status" },
  { key: "notifiedOn", label: "Notified On" },
];

const MOCK_EXPIRED_KYC_DATA = [
  {
    vendorName: "Stone Natural",
    department: "Procurement",
    documentType: "GST Certificate",
    expiryDate: "15/01/2025",
    daysExpired: 39,
    renewalStatus: "Not Started",
    notifiedOn: "01/02/2025",
  },
  {
    vendorName: "Total Expired",
    isTotal: true,
    department: "",
    documentType: "",
    expiryDate: "",
    daysExpired: 102,
    renewalStatus: "",
    notifiedOn: "",
  },
];

// 4. Rejected Vendor Records
const MOCK_REJECTED_VENDORS_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "rejectedSuppliers", label: "Rejected Suppliers" },
  { key: "comment", label: "Comment" },
];

const MOCK_REJECTED_VENDORS_DATA = [
  {
    organizationName: "Aryan Flooring Products Private Limited",
    rekycType: "General Rekyc",
    rejectedSuppliers: 1,
    comment: "",
  },
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    rejectedSuppliers: 30,
    comment: "",
  },
];

// 5. Details Submitted Vendor Records
const MOCK_DETAILS_SUBMITTED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "fullName", label: "Full Name" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
  { key: "detailsSubmittedSuppliers", label: "Details Submitted Suppliers" },
];

const MOCK_DETAILS_SUBMITTED_DATA = [
  {
    organizationName: "Asmita Electric Enterprises",
    rekycType: "General Rekcy",
    fullName: "Jitendra Surana",
    updatedAt: "11-02-26",
    ageingInMonth: 0,
    detailsSubmittedSuppliers: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    fullName: "",
    updatedAt: "",
    ageingInMonth: "",
    detailsSubmittedSuppliers: 15,
  },
];

// 6. Approved Vendor Records
const MOCK_APPROVED_VENDORS_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "approvedSuppliers", label: "Approved Suppliers" },
];

const MOCK_APPROVED_VENDORS_DATA = [
  {
    organizationName: "3 D Enterprises",
    rekycType: "General Rekcy",
    approvedSuppliers: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    approvedSuppliers: 8599,
  },
];

// 7. Expired Vendor Records
const MOCK_EXPIRED_VENDORS_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "expiredSuppliers", label: "Expired Suppliers" },
];

const MOCK_EXPIRED_VENDORS_DATA = [
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekcy",
    expiredSuppliers: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    expiredSuppliers: 8599,
  },
];

// 8. SAP Error Records
const MOCK_SAP_ERROR_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "pushToSAP", label: "Push to SAP" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "count", label: "Count" },
];

const MOCK_SAP_ERROR_DATA = [
  {
    organizationName: "Arka Enercon Pvt. Ltd.",
    pushToSAP: "FALSE",
    rekycType: "General Rekyc",
    count: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    pushToSAP: "",
    rekycType: "",
    count: 2,
  },
];

// 9. Organisation Wise Vendor ReKyc Status
const MOCK_ORG_WISE_STATUS_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "initiatedBy", label: "Initiated By" },
  { key: "statuses", label: "Statuses" },
  { key: "count", label: "Count" },
];

const MOCK_ORG_WISE_STATUS_DATA = [
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    initiatedBy: "Jitendra Surana",
    statuses: "Expired",
    count: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    initiatedBy: "",
    statuses: "",
    count: 3493,
  },
];

// 10. Open Invites Vendor Records (Updated as per screenshot)
const MOCK_OPEN_INVITES_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
  { key: "pendingSuppliers", label: "Pending Suppliers" },
];

const MOCK_OPEN_INVITES_DATA = [
  {
    organizationName: "Executive Engineer, MIDC, IT Division, Pune-03",
    rekycType: "General Rekyc",
    updatedAt: "11-02-26",
    ageingInMonth: 0,
    pendingSuppliers: 1,
  },
  {
    organizationName: "Iceage Texture And Paints",
    rekycType: "General Rekyc",
    updatedAt: "17-02-26",
    ageingInMonth: 0,
    pendingSuppliers: 1,
  },
  {
    organizationName: "Sachidanand Sharad Galande",
    rekycType: "General Rekyc",
    updatedAt: "17-02-26",
    ageingInMonth: 0,
    pendingSuppliers: "-", // Changed to dash as per screenshot
  },
  {
    organizationName: "SATNAM SIMRAN CRANES",
    rekycType: "General Rekyc",
    updatedAt: "11-02-26",
    ageingInMonth: 0,
    pendingSuppliers: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    updatedAt: "",
    ageingInMonth: 0,
    pendingSuppliers: 4,
  },
];

// 11. Approved Vendors but ReKYC not Initiated
const MOCK_APPROVED_NO_REKYC_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "departmentName", label: "Department Name" },
  { key: "createdAt", label: "Created at" },
  { key: "updatedAt", label: "Updated at" },
  { key: "ageingInMonth", label: "Ageing in Month" },
  { key: "rowCount", label: "Row Count" },
];

const MOCK_APPROVED_NO_REKYC_DATA = [
  {
    organizationName: "Abhijit Borase",
    departmentName: "Admin",
    createdAt: "02-04-25",
    updatedAt: "04-04-25",
    ageingInMonth: 10,
    rowCount: 1,
  },
  {
    isTotal: true,
    organizationName: "Total",
    departmentName: "",
    createdAt: "",
    updatedAt: "",
    ageingInMonth: "",
    rowCount: 1264,
  },
];

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
      { id: "totalVendors", label: "Total Vendors" },
      { id: "kycCompleted", label: "KYC Completed" },
      { id: "kycPending", label: "KYC Pending" },
      { id: "kycExpired", label: "KYC Expired" },
      { id: "kycVerified", label: "KYC Verified" },
      { id: "kycRejected", label: "KYC Rejected" },
      { id: "kycInProgress", label: "KYC In Progress" },
      { id: "kycDocsPending", label: "Documents Pending" },
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
  "totalVendors",
  "kycCompleted",
  "kycPending",
  "kycExpired",
  "kycVerified",
  "kycRejected",
  "kycInProgress",
  "kycDocsPending",
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getDefaultDateRange = () => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);
  const fmt = (d) => {
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  };
  return { startDate: fmt(lastYear), endDate: fmt(today) };
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const KYCManagementDashboard = () => {
  // State Management
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState(getDefaultDateRange);
  const [chartOrder, setChartOrder] = useState(ALL_CHART_IDS);
  const [visibleSections, setVisibleSections] = useState([
    ...ALL_STAT_IDS,
    ...ALL_CHART_IDS,
  ]);

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
                        {/* Date Filter Button */}
                        <button
                          onClick={() => setIsFilterOpen(true)}
                          className="btn d-flex align-items-center gap-2"
                          style={{
                            backgroundColor: "white",
                            border: "1px solid #ddd",
                            color: "#333",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            fontSize: "14px",
                          }}
                        >
                          <CalendarIcon
                            style={{ width: "16px", height: "16px" }}
                          />
                          <span style={{ fontWeight: 500 }}>
                            {dateRange.startDate} – {dateRange.endDate}
                          </span>
                          <Filter style={{ width: "16px", height: "16px" }} />
                        </button>

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

                {/* ========================================================= */}
                {/* Statistics Cards Section */}
                {/* ========================================================= */}
                <div className="row g-3 mb-4">
                  {show("totalVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Vendors"
                        value={MOCK_KYC_STATS.ActiveVendors}
                        icon={<Users size={20} />}
                      />
                    </div>
                  )}
                  {show("kycCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Completed"
                        value={MOCK_KYC_STATS.TotalReKYCInitiated}
                        icon={<UserCheck size={20} />}
                      />
                    </div>
                  )}
                  {show("kycPending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Pending"
                        value={MOCK_KYC_STATS.GeneralReKYC}
                        icon={<Clock size={20} />}
                      />
                    </div>
                  )}
                  {show("kycExpired") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Expired"
                        value={MOCK_KYC_STATS.OtherReKYC}
                        icon={<AlertCircle size={20} />}
                      />
                    </div>
                  )}
                  {show("kycVerified") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Verified"
                        value={MOCK_KYC_STATS.ReKYCNotInitiated}
                        icon={<UserCheck size={20} />}
                      />
                    </div>
                  )}
                  {show("kycRejected") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Rejected"
                        value={MOCK_KYC_STATS.OpenInvites}
                        icon={<UserX size={20} />}
                      />
                    </div>
                  )}
                  {show("kycInProgress") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC In Progress"
                        value={MOCK_KYC_STATS.kycInProgress}
                        icon={<Clock size={20} />}
                      />
                    </div>
                  )}
                  {show("kycDocsPending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Documents Pending"
                        value={MOCK_KYC_STATS.DocumentsPending}
                        icon={<AlertCircle size={20} />}
                      />
                    </div>
                  )}
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
                                  <GradeAssessmentBar
                                    data={MOCK_KYC_DATA}
                                    title="Grade Total Approved Suppliers"
                                    onDownload={() => {}}
                                  />
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
                                  <GradeAssessmentBar
                                    data={MOCK_KYC_DATA}
                                    title="Status wise vender Chart"
                                    onDownload={() => {}}
                                  />
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
                                    columns={MOCK_REJECTED_VENDORS_COLUMNS}
                                    data={MOCK_REJECTED_VENDORS_DATA}
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
                                    columns={MOCK_DETAILS_SUBMITTED_COLUMNS}
                                    data={MOCK_DETAILS_SUBMITTED_DATA}
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
                                  <DepartmentReKYCChart
                                    title="Department ReKYC Status"
                                    data={MOCK_DEPT_REKYC_DATA}
                                    onDownload={() => {}}
                                  />
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
                                    columns={MOCK_APPROVED_NO_REKYC_COLUMNS}
                                    data={MOCK_APPROVED_NO_REKYC_DATA}
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
                                    columns={MOCK_APPROVED_VENDORS_COLUMNS}
                                    data={MOCK_APPROVED_VENDORS_DATA}
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
                                    columns={MOCK_EXPIRED_VENDORS_COLUMNS}
                                    data={MOCK_EXPIRED_VENDORS_DATA}
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
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <ReKycBarchart
                                    data={monthWiseData}
                                    title="Month Wise Re-KYC Type"
                                    height={500}
                                    onDownload={() => {}}
                                  />
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
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <ReKycBarchart
                                    data={yearWiseData}
                                    title="Year Wise Re-KYC Count"
                                    height={500}
                                    onDownload={() => {}}
                                  />
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
                                    columns={MOCK_SAP_ERROR_COLUMNS}
                                    data={MOCK_SAP_ERROR_DATA}
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
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Organisation Wise Vendor ReKyc Status [General ReKYC]"
                                    columns={MOCK_ORG_WISE_STATUS_COLUMNS}
                                    data={MOCK_ORG_WISE_STATUS_DATA}
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
                                    columns={MOCK_OPEN_INVITES_COLUMNS}
                                    data={MOCK_OPEN_INVITES_DATA}
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

                {/* ========================================================= */}
                {/* Filter Dialog */}
                {/* ========================================================= */}
                <VendorAnalyticsFilterDialog
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  onApplyFilters={(filters) => {
                    setDateRange(filters);
                    setIsFilterOpen(false);
                  }}
                  currentStartDate={dateRange.startDate}
                  currentEndDate={dateRange.endDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCManagementDashboard;
