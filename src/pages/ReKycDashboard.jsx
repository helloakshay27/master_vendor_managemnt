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
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { VendorAnalyticsFilterDialog } from "@/components/vendor-analytics/VendorAnalyticsFilterDialog";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";

// =============================================================================
// MOCK DATA
// =============================================================================

// 1 ─ Stat Cards
const MOCK_KYC_STATS = {
  totalVendors: 5234,
  kycCompleted: 3892,
  kycPending: 892,
  kycExpired: 450,
  kycVerified: 3678,
  kycRejected: 214,
  kycInProgress: 678,
  kycDocsPending: 892,
};

// 2 ─ KYC Status Distribution
const MOCK_KYC_STATUS_DATA = [
  { name: "Completed", value: 3892, color: "#10b981" },
  { name: "Pending", value: 892, color: "#f59e0b" },
  { name: "Expired", value: 450, color: "#ef4444" },
  { name: "In Progress", value: 678, color: "#3b82f6" },
];

// 3 ─ KYC Verification Status
const MOCK_VERIFICATION_STATUS_DATA = [
  { name: "Verified", value: 3678, color: "#10b981" },
  { name: "Rejected", value: 214, color: "#ef4444" },
  { name: "Pending Review", value: 1342, color: "#f59e0b" },
];

// 4 ─ KYC Expiry Timeline
const MOCK_EXPIRY_DATA = [
  { month: "Jan", expiring: 45, expired: 120 },
  { month: "Feb", expiring: 52, expired: 98 },
  { month: "Mar", expiring: 38, expired: 87 },
  { month: "Apr", expiring: 61, expired: 76 },
  { month: "May", expiring: 73, expired: 65 },
  { month: "Jun", expiring: 84, expired: 54 },
  { month: "Jul", expiring: 92, expired: 43 },
  { month: "Aug", expiring: 78, expired: 32 },
  { month: "Sep", expiring: 67, expired: 28 },
  { month: "Oct", expiring: 55, expired: 21 },
  { month: "Nov", expiring: 42, expired: 15 },
  { month: "Dec", expiring: 36, expired: 10 },
];

// 5 ─ Department Wise KYC Status
const MOCK_DEPT_KYC_DATA = [
  { department: "Accounts", completed: 423, pending: 87, expired: 45 },
  { department: "Admin", completed: 156, pending: 34, expired: 12 },
  { department: "ARCHITECTURE", completed: 234, pending: 56, expired: 23 },
  { department: "Aviation", completed: 89, pending: 23, expired: 8 },
  { department: "Billing", completed: 567, pending: 123, expired: 67 },
  { department: "Contracts", completed: 345, pending: 78, expired: 34 },
  { department: "Electrical", completed: 234, pending: 45, expired: 23 },
  { department: "Finance", completed: 456, pending: 89, expired: 45 },
  { department: "IT Services", completed: 234, pending: 56, expired: 23 },
  { department: "Legal", completed: 167, pending: 34, expired: 12 },
  { department: "Procurement", completed: 567, pending: 123, expired: 67 },
  { department: "Purchase", completed: 678, pending: 145, expired: 78 },
];

// 6 ─ KYC Documents Status
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
    vendorName: "Merino Industries Limited",
    department: "Billing",
    documentType: "Trade License",
    submittedDate: "10/01/2025",
    expiryDate: "09/01/2026",
    status: "Verified",
    verifiedBy: "Amit Shah",
    remarks: "Verified",
  },
  {
    vendorName: "Systemair India Pvt Ltd",
    department: "Electrical",
    documentType: "MSME Certificate",
    submittedDate: "05/02/2025",
    expiryDate: "04/02/2026",
    status: "Rejected",
    verifiedBy: "Priya Singh",
    remarks: "Document not clear",
  },
  {
    vendorName: "Kesoram Industries Limited",
    department: "Contracts",
    documentType: "GST Certificate",
    submittedDate: "25/01/2025",
    expiryDate: "24/01/2026",
    status: "Verified",
    verifiedBy: "Rajesh Kumar",
    remarks: "Verified",
  },
  {
    vendorName: "Ultratech Cement Limited",
    department: "Procurement",
    documentType: "Company Registration",
    submittedDate: "12/02/2025",
    expiryDate: "11/02/2026",
    status: "Expired",
    verifiedBy: "N/A",
    remarks: "Document expired",
  },
  {
    vendorName: "Total",
    isTotal: true,
    vendorName: "Total Vendors",
    department: "",
    documentType: "",
    submittedDate: "",
    expiryDate: "",
    status: "",
    verifiedBy: "",
    remarks: "5234 Total Vendors",
  },
];

// 7 ─ Pending KYC Approvals
const MOCK_PENDING_KYC_COLUMNS = [
  { key: "vendorName", label: "Vendor Name" },
  { key: "department", label: "Department" },
  { key: "submittedDate", label: "Submitted Date" },
  { key: "pendingDays", label: "Pending Days" },
  { key: "documentsCount", label: "Documents Count" },
  { key: "priority", label: "Priority" },
  { key: "assignedTo", label: "Assigned To" },
];

const MOCK_PENDING_KYC_DATA = [
  {
    vendorName: "Aquastop Solutions",
    department: "Facility Management",
    submittedDate: "01/02/2025",
    pendingDays: 22,
    documentsCount: 3,
    priority: "High",
    assignedTo: "KYC Team A",
  },
  {
    vendorName: "S.A. INFRA",
    department: "Construction",
    submittedDate: "05/02/2025",
    pendingDays: 18,
    documentsCount: 4,
    priority: "Medium",
    assignedTo: "KYC Team B",
  },
  {
    vendorName: "Dar & Wagh Architects",
    department: "Architecture",
    submittedDate: "08/02/2025",
    pendingDays: 15,
    documentsCount: 2,
    priority: "Low",
    assignedTo: "KYC Team A",
  },
  {
    vendorName: "R K Associates",
    department: "Contracts",
    submittedDate: "10/02/2025",
    pendingDays: 13,
    documentsCount: 5,
    priority: "High",
    assignedTo: "KYC Team C",
  },
  {
    vendorName: "Front Line Technologies",
    department: "IT Services",
    submittedDate: "12/02/2025",
    pendingDays: 11,
    documentsCount: 3,
    priority: "Medium",
    assignedTo: "KYC Team B",
  },
  {
    vendorName: "Total",
    isTotal: true,
    vendorName: "Total Pending",
    department: "",
    submittedDate: "",
    pendingDays: 79,
    documentsCount: 17,
    priority: "",
    assignedTo: "",
  },
];

// 8 ─ Expired KYC Documents
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
    vendorName: "Kiran Buildcon",
    department: "Construction",
    documentType: "Trade License",
    expiryDate: "20/01/2025",
    daysExpired: 34,
    renewalStatus: "In Progress",
    notifiedOn: "01/02/2025",
  },
  {
    vendorName: "Instec Technology",
    department: "IT Services",
    documentType: "MSME Certificate",
    expiryDate: "25/01/2025",
    daysExpired: 29,
    renewalStatus: "Not Started",
    notifiedOn: "05/02/2025",
  },
  {
    vendorName: "Total",
    isTotal: true,
    vendorName: "Total Expired",
    department: "",
    documentType: "",
    expiryDate: "",
    daysExpired: 102,
    renewalStatus: "",
    notifiedOn: "",
  },
];

// =============================================================================
// SECTION SELECTOR CONFIG
// =============================================================================

const KYC_MANAGEMENT_CONFIG = {
  charts: {
    icon: BarChart3,
    label: "KYC Analytics",
    color: "#3b82f6",
    options: [
      { id: "kycStatusChart", label: "KYC Status Distribution" },
      { id: "verificationStatusChart", label: "Verification Status" },
      { id: "expiryTimelineChart", label: "KYC Expiry Timeline" },
      { id: "deptKycChart", label: "Department Wise KYC Status" },
      { id: "documentsTable", label: "KYC Documents Status" },
      { id: "pendingKycTable", label: "Pending KYC Approvals" },
      { id: "expiredKycTable", label: "Expired KYC Documents" },
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

// =============================================================================
// CHART ORDER
// =============================================================================

const ALL_CHART_IDS = [
  "kycStatusChart",
  "verificationStatusChart",
  "expiryTimelineChart",
  "deptKycChart",
  "documentsTable",
  "pendingKycTable",
  "expiredKycTable",
];

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
// HELPERS
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

// Simple Pie Chart Component
const SimplePieChart = ({ data, title, onDownload }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="card go-shadow bg-white rounded-lg"
      style={{ height: "400px" }}
    >
      <div className="vendor-card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className="vendor-card-title">{title}</h3>
          {onDownload && (
            <button
              onClick={onDownload}
              style={{
                background: "none",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <BarChart3 size={14} /> Export
            </button>
          )}
        </div>
      </div>
      <div
        className="card-body"
        style={{
          padding: "20px",
          height: "calc(100% - 60px)",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {data.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  {item.name}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  {item.value.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "4px",
                  height: "24px",
                }}
              >
                <div
                  style={{
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: item.color,
                    height: "24px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "8px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {Math.round((item.value / total) * 100)}%
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 600,
              }}
            >
              <span>Total</span>
              <span>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Bar Chart Component
const SimpleBarChart = ({ data, title, onDownload, bars }) => {
  return (
    <div
      className="card go-shadow bg-white rounded-lg"
      style={{ height: "400px" }}
    >
      <div className="vendor-card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3 className="vendor-card-title">{title}</h3>
          {onDownload && (
            <button
              onClick={onDownload}
              style={{
                background: "none",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "4px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
              }}
            >
              <BarChart3 size={14} /> Export
            </button>
          )}
        </div>
      </div>
      <div
        className="card-body"
        style={{
          padding: "20px",
          height: "calc(100% - 60px)",
          overflowY: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Category
              </th>
              {bars &&
                bars.map((bar, idx) => (
                  <th
                    key={idx}
                    style={{
                      padding: "10px",
                      textAlign: "right",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {bar.label}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  {row.department || row.month || row.name}
                </td>
                {bars &&
                  bars.map((bar, barIdx) => (
                    <td
                      key={barIdx}
                      style={{
                        padding: "10px",
                        textAlign: "right",
                        fontSize: "14px",
                      }}
                    >
                      {row[bar.key]?.toLocaleString() || "0"}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// =============================================================================
// COMPONENT
// =============================================================================

const KYCManagementDashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState(getDefaultDateRange);
  const [chartOrder, setChartOrder] = useState(ALL_CHART_IDS);
  const [visibleSections, setVisibleSections] = useState([
    ...ALL_STAT_IDS,
    ...ALL_CHART_IDS,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() ?? "");
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const show = (id) => visibleSections.includes(id);

  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* Header */}
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
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
                      <div className="d-flex align-items-center gap-3">
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
                        <VendorSectionSelector
                          data={KYC_MANAGEMENT_CONFIG}
                          dashboardType="kyc"
                          onSelectionChange={setVisibleSections}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className="row g-3 mb-4">
                  {show("totalVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Vendors"
                        value={MOCK_KYC_STATS.totalVendors}
                        icon={<Users size={20} />}
                      />
                    </div>
                  )}
                  {show("kycCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Completed"
                        value={MOCK_KYC_STATS.kycCompleted}
                        icon={<UserCheck size={20} />}
                      />
                    </div>
                  )}
                  {show("kycPending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Pending"
                        value={MOCK_KYC_STATS.kycPending}
                        icon={<Clock size={20} />}
                      />
                    </div>
                  )}
                  {show("kycExpired") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Expired"
                        value={MOCK_KYC_STATS.kycExpired}
                        icon={<AlertCircle size={20} />}
                      />
                    </div>
                  )}
                  {show("kycVerified") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Verified"
                        value={MOCK_KYC_STATS.kycVerified}
                        icon={<UserCheck size={20} />}
                      />
                    </div>
                  )}
                  {show("kycRejected") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="KYC Rejected"
                        value={MOCK_KYC_STATS.kycRejected}
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
                        value={MOCK_KYC_STATS.kycDocsPending}
                        icon={<AlertCircle size={20} />}
                      />
                    </div>
                  )}
                </div>

                {/* Charts with Drag & Drop */}
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
                          // KYC Status Distribution (Pie Chart)
                          if (
                            chartId === "kycStatusChart" &&
                            show("kycStatusChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <SimplePieChart
                                    data={MOCK_KYC_STATUS_DATA}
                                    title="KYC Status Distribution"
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Verification Status (Pie Chart)
                          if (
                            chartId === "verificationStatusChart" &&
                            show("verificationStatusChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <SimplePieChart
                                    data={MOCK_VERIFICATION_STATUS_DATA}
                                    title="Verification Status"
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // KYC Expiry Timeline (Bar Chart)
                          if (
                            chartId === "expiryTimelineChart" &&
                            show("expiryTimelineChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <SimpleBarChart
                                    data={MOCK_EXPIRY_DATA}
                                    title="KYC Expiry Timeline"
                                    bars={[
                                      {
                                        key: "expiring",
                                        label: "Expiring Soon",
                                      },
                                      { key: "expired", label: "Expired" },
                                    ]}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Department Wise KYC Status
                          if (
                            chartId === "deptKycChart" &&
                            show("deptKycChart")
                          ) {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <SimpleBarChart
                                    data={MOCK_DEPT_KYC_DATA}
                                    title="Department Wise KYC Status"
                                    bars={[
                                      { key: "completed", label: "Completed" },
                                      { key: "pending", label: "Pending" },
                                      { key: "expired", label: "Expired" },
                                    ]}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // KYC Documents Status Table
                          if (
                            chartId === "documentsTable" &&
                            show("documentsTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="KYC Documents Status"
                                    columns={MOCK_DOCUMENTS_COLUMNS}
                                    data={MOCK_DOCUMENTS_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Pending KYC Approvals Table
                          if (
                            chartId === "pendingKycTable" &&
                            show("pendingKycTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Pending KYC Approvals"
                                    columns={MOCK_PENDING_KYC_COLUMNS}
                                    data={MOCK_PENDING_KYC_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // Expired KYC Documents Table
                          if (
                            chartId === "expiredKycTable" &&
                            show("expiredKycTable")
                          ) {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Expired KYC Documents"
                                    columns={MOCK_EXPIRED_KYC_COLUMNS}
                                    data={MOCK_EXPIRED_KYC_DATA}
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

                {/* Filter Dialog */}
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
