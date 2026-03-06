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
import { VendorAnalyticsFilterDialog } from "@/components/vendor-analytics/VendorAnalyticsFilterDialog";
import { DepartmentWiseDistributionChart } from "@/components/vendor-analytics/DepartmentWiseDistributionChart";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import { DepartmentReKYCChart } from "@/components/vendor-analytics/DepartmentReKYCTable";
import ReKycBarchart from "@/components/vendor-analytics/ReKycBarchart";

// =============================================================================
// 1. CONSTANTS & CONFIGURATION
// =============================================================================

// Date range helper
const getDefaultDateRange = () => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);
  const fmt = (d) => {
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };
  return { startDate: fmt(lastYear), endDate: fmt(today) };
};

// =============================================================================
// 2. CHART 1: STATUS TYPE WISE RE-KYC DISTRIBUTION (PIE CHART)
// =============================================================================

const STATUS_TYPE_DATA = [
  { name: "Approved", value: 82.95 },
  { name: "Rejected", value: 9.31 },
  { name: "Details Submitted", value: 7.29 },
  { name: "Pending", value: 0.45 },
];

// =============================================================================
// 3. CHART 2: BANK/MSME/GENERAL REKYC DISTRIBUTION (PIE CHART)
// =============================================================================

const REKYC_TYPE_DATA = [
  { name: "Bank Rekyc (186)", value: 1.45 },
  { name: "MSME Rekyc (2794)", value: 21.79 },
  { name: "General Rekyc (9795)", value: 76.4 },
];

// =============================================================================
// 4. CHART 3: DEPARTMENT WISE RE-KYC CHART (BAR CHART)
// =============================================================================

const DEPARTMENT_REKYC_DATA = [
  { department: "(Blank)", rekycInitiated: 4, totalApproved: 1088 },
  { department: "Accounts", rekycInitiated: 31, totalApproved: 118 },
  { department: "Admin", rekycInitiated: 22, totalApproved: 419 },
  { department: "ARCHITECTURE", rekycInitiated: 1, totalApproved: 31 },
  { department: "Architecture-1", rekycInitiated: 1, totalApproved: 27 },
  { department: "Aviation", rekycInitiated: 1, totalApproved: 735 },
  { department: "Billing", rekycInitiated: 11, totalApproved: 139 },
  { department: "Client FFOUT", rekycInitiated: 38, totalApproved: 85 },
  { department: "Contracts", rekycInitiated: 8, totalApproved: 131 },
  { department: "Corporate CO.", rekycInitiated: 5, totalApproved: 819 },
  {
    department: "FACILITY MANAGEMENT...",
    rekycInitiated: 7,
    totalApproved: 5177,
  },
  { department: "Finance", rekycInitiated: 3, totalApproved: 65 },
  {
    department: "Human resources (..)",
    rekycInitiated: 2,
    totalApproved: 13251,
  },
  { department: "HVAC", rekycInitiated: 3, totalApproved: 0 },
  {
    department: "Information techno...",
    rekycInitiated: 5,
    totalApproved: 137,
  },
  { department: "Interior", rekycInitiated: 21, totalApproved: 1127 },
  { department: "Legal and Liaison", rekycInitiated: 2, totalApproved: 1157 },
  { department: "Liaisoning (Mumbai)", rekycInitiated: 4, totalApproved: 316 },
  { department: "Machine Shop", rekycInitiated: 26, totalApproved: 218 },
  { department: "Mumbai Projects", rekycInitiated: 13, totalApproved: 2135 },
  { department: "Purchase P1", rekycInitiated: 10, totalApproved: 29 },
  { department: "RENOVATION & W...", rekycInitiated: 2, totalApproved: 170 },
  { department: "Residential Sales", rekycInitiated: 2, totalApproved: 170 },
  { department: "Sales", rekycInitiated: 19, totalApproved: 0 },
  {
    department: "Sales and Marketing...",
    rekycInitiated: 5,
    totalApproved: 102,
  },
  { department: "Spazio", rekycInitiated: 26, totalApproved: 17 },
  { department: "Travel Desk", rekycInitiated: 4, totalApproved: 95 },
  { department: "Venture", rekycInitiated: 22, totalApproved: 22 },
];

// =============================================================================
// 5. TABLE 1: REJECTED RE-KYC RECORD
// =============================================================================

const REJECTED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "rekycType", label: "ReKYC Type" },
  { key: "rejectedCount", label: "Rejected ReKYC Count" },
];

const REJECTED_DATA = [
  {
    organizationName: "Aadhar Steel Traders",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Aashi Solutions",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Adv. Pritesh Gangadhar Chandge",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Aegis Protection Private Limited",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Alf Enterprises",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Aquacaresee Pvt. Ltd.",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Arihant Granites",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Arihant Trade Link",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Aryan Flooring Products Private Limited",
    rekycType: "General Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Associate Decor Limited",
    rekycType: "MSME Rekcy",
    rejectedCount: 1,
  },
  { organizationName: "Autobads", rekycType: "MSME Rekcy", rejectedCount: 1 },
  {
    organizationName: "BANK OF MAHARASHTRA",
    rekycType: "GSTIN Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Believe Security Services Pvt. Ltd",
    rekycType: "General Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Believe Security Services Pvt. Ltd",
    rekycType: "General Reykcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Bharat Petroleum Corporation Limited",
    rekycType: "General Rekcy",
    rejectedCount: 1,
  },
  {
    organizationName: "Bharat Petroleum Corporation Limited",
    rekycType: "General Rekycy",
    rejectedCount: 1,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "CALIFORNIA ASSOCIATED DRIVING LICENSED",
    rekycType: "Total",
    rejectedCount: 166,
  },
];

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

const OPEN_INVITES_DATA = [
  {
    organizationName: "Aegis Protection Private Limited",
    rekycType: "Bank Rekcy",
    updatedAt: "10-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "Dekor Exclusive Granites P. Limited",
    rekycType: "Bank Rekcy",
    updatedAt: "13-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "DEKOR EXCLUSIVE GRANITES PRIVATE LIMITED",
    rekycType: "Bank Rekcy",
    updatedAt: "13-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "Executive Engineer, MIDC, IT Division, Pune-03",
    rekycType: "General Rekcy",
    updatedAt: "11-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "Iceage Texture And Paints",
    rekycType: "General Rekcy",
    updatedAt: "17-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "Sachidanand Sharad Galande",
    rekycType: "General Rekcy",
    updatedAt: "17-02-26",
    ageingInMonth: 0,
    openInvitesCount: "-",
  },
  {
    organizationName: "SATNAM SIMRAN CRANES",
    rekycType: "General Rekcy",
    updatedAt: "11-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  {
    organizationName: "Shaikh Imran Ibrahim",
    rekycType: "Name Rekcy",
    updatedAt: "13-02-26",
    ageingInMonth: 0,
    openInvitesCount: 1,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    updatedAt: "",
    ageingInMonth: 0,
    openInvitesCount: 8,
  },
];

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
  { key: "rowCount", label: "Row Count" },
];

const TYPE_WISE_DATA = [
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekyc",
    status: "Approved",
    createdAt: "13-05-25",
    updatedAt: "13-05-25",
    ageingInMonth: 3,
    rowCount: 4,
  },
  {
    organizationName: "1st Printing N Design",
    rekycType: "General Rekyc",
    status: "Expired",
    createdAt: "15-10-25",
    updatedAt: "15-10-25",
    ageingInMonth: 2,
    rowCount: 3,
  },
  {
    organizationName: "3 AM FRIEND",
    rekycType: "General Rekyc",
    status: "Expired",
    createdAt: "18-03-25",
    updatedAt: "18-03-25",
    ageingInMonth: 3,
    rowCount: 3,
  },
  {
    organizationName: "3 D Enterprises",
    rekycType: "General Rekyc",
    status: "Expired",
    createdAt: "19-03-25",
    updatedAt: "19-03-25",
    ageingInMonth: 3,
    rowCount: 3,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "General Rekyc",
    status: "Approved",
    createdAt: "12-03-25",
    updatedAt: "13-03-25",
    ageingInMonth: 0,
    rowCount: 12802,
  },
];

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
const EXPIRED_DATA = [
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "MANISH WATER PUMP SERVICE",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "1st Printing N Design",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "1st Printing N Design",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "1st Printing N Design",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 AM FRIEND",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 AM FRIEND",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 AM FRIEND",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 D Enterprises",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 D Enterprises",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "3 R Waste Management",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "360 Degree Cloud Technologies Priva Limited",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  {
    organizationName: "360 Home Solutions",
    rekycType: "General Rekyc",
    expiredCount: 1,
  },
  // Total Row - Adding a total row as per image style
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    expiredCount: 15,
  },
];

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
const SAP_ERROR_DATA = [
  {
    organizationName: "A R Technologies",
    pushToSAP: "FALSE",
    rekycType: "Bank Rekyc",
    count: 1,
  },
  {
    organizationName: "Aarvi Products",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Abhisar Balasaheb Agne",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Accusonic Controls Private Limited",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "ACE Environment",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Adfactor Advertising LLP",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "AEGIS PRO SOLUTION",
    pushToSAP: "FALSE",
    rekycType: "Bank Rekyc",
    count: 1,
  },
  {
    organizationName: "Air Works India Engineering Private Limited",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Airodynamiks",
    pushToSAP: "FALSE",
    rekycType: "Bank Rekyc",
    count: 1,
  },
  {
    organizationName: "Akash Bapurao Bagal",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Alfa Carpeting Co. Private Limited",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Alok Nanda And Company communication Pvt Ltd.",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Anarock Property Consultants Private Limited",
    pushToSAP: "FALSE",
    rekycType: "Bank Rekyc",
    count: 1,
  },
  {
    organizationName: "Anaya Consultancy Services",
    pushToSAP: "FALSE",
    rekycType: "Bank Rekyc",
    count: 1,
  },
  {
    organizationName: "ANIKET ARUN KULKARNI",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  {
    organizationName: "Anuj Joshi Photography",
    pushToSAP: "FALSE",
    rekycType: "MSME Rekyc",
    count: 1,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "Total",
    pushToSAP: "",
    rekycType: "",
    count: 11019,
  },
];

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
const APPROVED_RECORD_DATA = [
  {
    organizationName: "3 D Enterprises",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "3A Composites India Private Limited",
    rekycType: "MSME Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "3A Composites India Private Limited",
    rekycType: "",
    approvedCount: "",
  },
  {
    organizationName: "3D Environmental Services",
    rekycType: "MSME Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "7i Network",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A B Lubricants",
    rekycType: "Bank Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A B Lubricants",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A B SURVEYORS",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A J Gas Systems",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A N Trading Company",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A R Technologies",
    rekycType: "MSME Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "A S Solutions",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "Aa Construction",
    rekycType: "MSME Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "Aadhar Steel Traders",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "Aadhya Consultancy And Services",
    rekycType: "MSME Rekyc",
    approvedCount: 1,
  },
  {
    organizationName: "AAMAR TRANSPORT",
    rekycType: "General Rekyc",
    approvedCount: 1,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    approvedCount: 1479,
  },
];

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
const DETAILS_SUB_DATA = [
  {
    organizationName: "AAYATAM DESIGN STUDIO",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Abhiyanta Consulting Engineers Ltd",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  { organizationName: "Aqua Rise", rekycType: "MSME Rekyc", detailsCount: 1 },
  {
    organizationName: "ARCTIC Cool Sales & Service Pvt.Ltd",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Arctic Hvac Engineering Pvt. Ltd.",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Arhat Enterprises",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Asawa Insulation Private Limited",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Ashwini Infradevelopments Private Limited",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Asmita Electric Enterprises",
    rekycType: "General Rekyc",
    detailsCount: 1,
  },
  { organizationName: "Autolines", rekycType: "MSME Rekyc", detailsCount: 1 },
  {
    organizationName: "Bhumi Envirotech Solutions",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  { organizationName: "Bm Advisors", rekycType: "MSME Rekyc", detailsCount: 1 },
  {
    organizationName: "Bsh Electricals Private Limited",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Carpet Couture",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Clean Environment",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Club Concierge Services India Private Limited",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  {
    organizationName: "Crystal Facade Systems",
    rekycType: "MSME Rekyc",
    detailsCount: 1,
  },
  // Total Row
  {
    isTotal: true,
    organizationName: "Total",
    rekycType: "",
    detailsCount: 130,
  },
];

// =============================================================================
// 8. STATS DATA
// =============================================================================

const MOCK_KYC_STATS = {
  TotalVendors: 12802,
  AwaitingApproval: 130,
  ApprovedReKYC: 1479,
  OpenInvites: 8,
  RejectedReKYC: 166,
  ErrorsInSAP: 126,
};
// =============================================================================
// MONTH WISE RE-KYC TYPE CHART DATA
// =============================================================================

const MONTH_WISE_DATA = [
  {
    month: "January",
    "Bank Rekyc": 57.58,
    "E-invoicing Rekyc": 30.3,
    "General Rekyc": 12.12,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.0,
    totalCount: 0.0,
  },
  {
    month: "February",
    "Bank Rekyc": 33.33,
    "E-invoicing Rekyc": 62.5,
    "General Rekyc": 0.0,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.0,
    totalCount: 0.0,
  },
  {
    month: "March",
    "Bank Rekyc": 99.96,
    "E-invoicing Rekyc": 66.67,
    "General Rekyc": 22.22,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.1,
    totalCount: 0.0,
  },
  {
    month: "April",
    "Bank Rekyc": 70.45,
    "E-invoicing Rekyc": 44.83,
    "General Rekyc": 10.34,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.2,
    totalCount: 0.0,
  },
  {
    month: "May",
    "Bank Rekyc": 27.59,
    "E-invoicing Rekyc": 10.34,
    "General Rekyc": 22.22,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.1,
    "Name Rekyc": 0.3,
    totalCount: 0.0,
  },
  {
    month: "June",
    "Bank Rekyc": 22.22,
    "E-invoicing Rekyc": 6.7,
    "General Rekyc": 18.42,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.4,
    totalCount: 0.0,
  },
  {
    month: "July",
    "Bank Rekyc": 65.79,
    "E-invoicing Rekyc": 43.4,
    "General Rekyc": 15.91,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.5,
    totalCount: 0.0,
  },
  {
    month: "August",
    "Bank Rekyc": 41.51,
    "E-invoicing Rekyc": 36.36,
    "General Rekyc": 9.09,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.6,
    totalCount: 0.0,
  },
  {
    month: "September",
    "Bank Rekyc": 27.27,
    "E-invoicing Rekyc": 9.09,
    "General Rekyc": 36.36,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.0,
    "Name Rekyc": 0.7,
    totalCount: 0.0,
  },
  {
    month: "October",
    "Bank Rekyc": 99.69,
    "E-invoicing Rekyc": 15.91,
    "General Rekyc": 15.91,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.1,
    "Name Rekyc": 0.8,
    totalCount: 0.0,
  },
  {
    month: "November",
    "Bank Rekyc": 27.27,
    "E-invoicing Rekyc": 0.0,
    "General Rekyc": 0.0,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.3,
    "Name Rekyc": 0.9,
    totalCount: 0.0,
  },
  {
    month: "December",
    "Bank Rekyc": 99.54,
    "E-invoicing Rekyc": 0.0,
    "General Rekyc": 0.0,
    "GSTIN Rekyc": 0.0,
    "MSME Rekyc": 0.4,
    "Name Rekyc": 1.0,
    totalCount: 0.0,
  },
];

// =============================================================================
// YEAR WISE RE-KYC TYPE CHART DATA
// =============================================================================

const YEAR_WISE_DATA = [
  {
    year: "2023",
    "Bank Rekyc": 45.2,
    "E-invoicing Rekyc": 22.8,
    "General Rekyc": 28.5,
    "GSTIN Rekyc": 1.5,
    "MSME Rekyc": 1.2,
    "Name Rekyc": 0.8,
    totalCount: 9850,
  },
  {
    year: "2024",
    "Bank Rekyc": 42.6,
    "E-invoicing Rekyc": 24.3,
    "General Rekyc": 29.1,
    "GSTIN Rekyc": 1.8,
    "MSME Rekyc": 1.4,
    "Name Rekyc": 0.8,
    totalCount: 11200,
  },
  {
    year: "2025",
    "Bank Rekyc": 40.8,
    "E-invoicing Rekyc": 25.6,
    "General Rekyc": 29.7,
    "GSTIN Rekyc": 2.1,
    "MSME Rekyc": 1.6,
    "Name Rekyc": 0.2,
    totalCount: 12800,
  },
  {
    year: "2026",
    "Bank Rekyc": 38.5,
    "E-invoicing Rekyc": 27.2,
    "General Rekyc": 30.2,
    "GSTIN Rekyc": 2.4,
    "MSME Rekyc": 1.8,
    "Name Rekyc": -0.1,
    totalCount: 4500,
  },
];

// =============================================================================
// ADD THESE TO YOUR ALL_CHART_IDS
// =============================================================================

const ALL_CHART_IDS = [
  "statusTypeChart", // Pie Chart 1
  "rekycTypeChart", // Pie Chart 2
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
  "TotalReKYcVendor",
  "AwaitingforApproval",
  "approvedReKYC",
  "openInvites",
  "rejectedReKYC",
  "errorsInSAP",
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
      { id: "statusTypeChart", label: "StatusType Wise Re-KYC Distribution" },
      { id: "rekycTypeChart", label: "Bank/MSME/General ReKYC Distribution" },
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
      { id: "TotalReKYcVendor", label: "Total Re-KYC Vendor" },
      { id: "AwaitingforApproval", label: "Awaiting for Approval" },
      { id: "approvedReKYC", label: "Approved Re-KYC" },
      { id: "openInvites", label: "Open Invites" },
      { id: "rejectedReKYC", label: "Rejected Re-KYC" },
      { id: "errorsInSAP", label: "Errors in SAP from Approved" },
    ],
  },
};

// =============================================================================
// 12. MAIN COMPONENT
// =============================================================================

const ReKYCDashboard = () => {
  // State management
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState(getDefaultDateRange());
  const [chartOrder, setChartOrder] = useState(ALL_CHART_IDS);
  const [visibleSections, setVisibleSections] = useState([
    ...ALL_STAT_IDS,
    ...ALL_CHART_IDS,
  ]);

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

                {/* ===== STATISTICS CARDS SECTION ===== */}
                <div className="row g-3 mb-4">
                  {/* Total Re-KYC Vendor */}
                  {show("TotalReKYcVendor") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Re-KYC Vendor"
                        value={MOCK_KYC_STATS.TotalVendors}
                        icon={<Users size={20} />}
                        color="#3b82f6"
                      />
                    </div>
                  )}

                  {/* Awaiting for Approval */}
                  {show("AwaitingforApproval") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Awaiting for Approval"
                        value={MOCK_KYC_STATS.AwaitingApproval}
                        icon={<Clock size={20} />}
                        color="#f59e0b"
                      />
                    </div>
                  )}

                  {/* Approved Re-KYC */}
                  {show("approvedReKYC") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Approved Re-KYC"
                        value={MOCK_KYC_STATS.ApprovedReKYC}
                        icon={<CheckCircle size={20} />}
                        color="#22c55e"
                      />
                    </div>
                  )}

                  {/* Open Invites */}
                  {show("openInvites") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Open Invites"
                        value={MOCK_KYC_STATS.OpenInvites}
                        icon={<Mail size={20} />}
                        color="#ec4899"
                      />
                    </div>
                  )}

                  {/* Rejected Re-KYC */}
                  {show("rejectedReKYC") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Rejected Re-KYC"
                        value={MOCK_KYC_STATS.RejectedReKYC}
                        icon={<XCircle size={20} />}
                        color="#ef4444"
                      />
                    </div>
                  )}

                  {/* Errors in SAP from Approved */}
                  {show("errorsInSAP") && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Errors in SAP from Approved"
                        value={MOCK_KYC_STATS.ErrorsInSAP}
                        icon={<Database size={20} />}
                        color="#6b7280"
                      />
                    </div>
                  )}
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
                          // CHART 1: StatusType Wise Re-KYC Distribution (Pie Chart)
                          if (chartId === "statusTypeChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <DepartmentWiseDistributionChart
                                    data={STATUS_TYPE_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // CHART 2: Bank/MSME/General ReKYC Distribution (Pie Chart)
                          if (chartId === "rekycTypeChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <DepartmentWiseDistributionChart
                                    data={REKYC_TYPE_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // CHART 3: Department Wise Re-KYC (Bar Chart)
                          if (chartId === "departmentReKYCChart") {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <DepartmentReKYCChart
                                    data={DEPARTMENT_REKYC_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "monthWiseChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <ReKycBarchart
                                    data={MONTH_WISE_DATA}
                                    title="Month Wise Re-KYC Type"
                                    height={500}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          if (chartId === "yearWiseChart") {
                            return (
                              <div key={chartId} className="col-12 col-lg-6">
                                <SortableChartItem id={chartId}>
                                  <ReKycBarchart
                                    data={YEAR_WISE_DATA}
                                    title="Year Wise Re-KYC Type"
                                    height={500}
                                    onDownload={() => {}}
                                  />
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
                                    columns={REJECTED_COLUMNS}
                                    data={REJECTED_DATA}
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
                                    columns={OPEN_INVITES_COLUMNS}
                                    data={OPEN_INVITES_DATA}
                                    onDownload={() => {}}
                                  />
                                </SortableChartItem>
                              </div>
                            );
                          }

                          // TABLE 3: Type wise ReKYC Distribution
                          if (chartId === "typeWiseTable") {
                            return (
                              <div key={chartId} className="col-12">
                                <SortableChartItem id={chartId}>
                                  <VendorDataTable
                                    title="Type wise ReKYC Distribution"
                                    columns={TYPE_WISE_COLUMNS}
                                    data={TYPE_WISE_DATA}
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
                                    columns={APPROVED_RECORD_COLUMNS}
                                    data={APPROVED_RECORD_DATA}
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
                                    columns={DETAILS_SUB_COLUMNS}
                                    data={DETAILS_SUB_DATA}
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
                                    columns={EXPIRED_COLUMNS}
                                    data={EXPIRED_DATA}
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
                                    columns={SAP_ERROR_COLUMNS}
                                    data={SAP_ERROR_DATA}
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

                {/* ===== FILTER DIALOG ===== */}
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

export default ReKYCDashboard;
