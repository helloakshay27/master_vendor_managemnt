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
} from "lucide-react";
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { VendorAnalyticsFilterDialog } from "@/components/vendor-analytics/VendorAnalyticsFilterDialog";
import { GradeAssessmentBar } from "@/components/vendor-analytics/GradeAssessmentBar";
import { TopBottomVendorsChart } from "@/components/vendor-analytics/TopBottomVendorsChart";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import { DepartmentPreQualificationChart } from "@/components/vendor-analytics/DepartmentPreQualificationChart";
import SubmittedPendingOverview from "@/components/vendor-analytics/SubmittedPendingOverview";
import SubmittedAssessmentOverview from "@/components/vendor-analytics/SubmittedAssessmentOverview";
import { CategoryWiseRiskFlag } from "@/components/vendor-analytics/CategoryWiseRiskFlag";
import { LeaderBoard } from "@/components/vendor-analytics/LeaderBoard";
import { PercentageCompletionChart } from "@/components/vendor-analytics/PercentageCompletionChart";
import OnTimeCompletion from "@/components/vendor-analytics/OnTimeCompletionChart";

// =============================================================================
// MOCK DATA
// =============================================================================

// 1 ─ Stat Cards
const MOCK_STAT_DATA = {
  TotalapprovedVendors: 4987,
  TotalAssesmentCount: 319,
  FullyCompleted: 317,
  PartiallyCompleted: 2,
  Pending: 0,
  TotalUniqueVendorCountForAssessment: 100,
  TotalQualifiedVendors: 98,
  DisqualifiedVendorDuetoRatingNotGiven: 0, // shown as "(Blank)"
  TotalDisqualifiedVendorsDuetoRating: 2,
  TotalWatchlistVendors: 25,
};

// 2 ─ Grade Assessment Bar (Count of Assessments by Grade)
const MOCK_GRADE_DATA = [
  { grade: "A", value: 5, color: "#00b050" },
  { grade: "B", value: 147, color: "#f58513" },
  { grade: "C", value: 101, color: "#e6b325" },
  { grade: "D", value: 62, color: "#f4ea00" },
  { grade: "F", value: 8, color: "#e00000" },
];

// 3 ─ Top 10 Vendors (by Average Score — highest = best)
const MOCK_TOP_VENDORS = [
  { name: "MC Bauchemie India Pvt Ltd", avgScore: 89.0 },
  { name: "MAGNUS VENTURES", avgScore: 85.0 },
  { name: "Mitsubishi Electric India", avgScore: 85.0 },
  { name: "Tata Steel Limited", avgScore: 84.83 },
  { name: "Merino Industries Limited", avgScore: 84.43 },
  { name: "Systemair India Pvt Ltd", avgScore: 84.0 },
  { name: "3A Composites India", avgScore: 83.17 },
  { name: "Kalburgi Cement Pvt Ltd", avgScore: 83.0 },
  { name: "Ritikaa Enterprises", avgScore: 83.0 },
  { name: "Bhoruka Extrusion", avgScore: 82.57 },
];

// 4 ─ Bottom 10 Vendors (by Average Score — lowest = worst)
const MOCK_BOTTOM_VENDORS = [
  { name: "Stone Natural", avgScore: 55.5 },
  { name: "R K Associates", avgScore: 54.0 },
  { name: "Kiran Buildcon", avgScore: 52.5 },
  { name: "Front Line Technologies", avgScore: 52.33 },
  { name: "Giitai Buildcon Private Ltd", avgScore: 52.0 },
  { name: "PANKAJ DHARKAR & Associates", avgScore: 51.5 },
  { name: "Instec Technology", avgScore: 51.0 },
  { name: "S.A. INFRA", avgScore: 47.5 },
  { name: "Aquastop Solutions", avgScore: 47.0 },
  { name: "Dar & Wagh Architects", avgScore: 38.0 },
];

// 5 ─ Name of Approver Who Have Not Given Rating
const MOCK_NOT_GIVEN_RATING_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "category", label: "Category" },
];

const MOCK_NOT_GIVEN_RATING_DATA = [
  {
    organizationName: "Precast India Infrastructures Private Limited",
    siteName: "NTT Airoli Common DC",
    category: "Project Execution Feedback",
  },
  {
    organizationName: "Dar & Wagh Architects",
    siteName: "YOO Pune",
    category: "Design Feedback",
  },
];

// 6 ─ List of Watchlist Vendors
const MOCK_WATCHLIST_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "avgScore", label: "Avg Score (Only Completed)" },
];

const MOCK_WATCHLIST_DATA = [
  {
    organizationName: "AASHI SOLUTIONS PRIVATE LIMITED",
    siteName: "Gagan Habitats LLP",
    avgScore: 56.33,
  },
  {
    organizationName: "AASHI SOLUTIONS PRIVATE LIMITED",
    siteName: "Kharadi (PBSPL) - Co",
    avgScore: 56.33,
  },
  {
    organizationName: "AASHI SOLUTIONS PRIVATE LIMITED",
    siteName: "NTT Airoli Common DC",
    avgScore: 56.33,
  },
  { organizationName: "Alu Facades", siteName: "", avgScore: 58.75 },
  {
    organizationName: "Alu Facades",
    siteName: "Golden Bell Phase II",
    avgScore: 58.75,
  },
  {
    organizationName: "Alu Facades",
    siteName: "Kharadi (PBSPL) - Co",
    avgScore: 58.75,
  },
  {
    organizationName: "Alu Facades",
    siteName: "YOO Villa Phase I",
    avgScore: 58.75,
  },
  {
    organizationName: "Angel Facade Engineers Pvt Ltd",
    siteName: "",
    avgScore: 58.33,
  },
  {
    organizationName: "Angel Facade Engineers Pvt Ltd",
    siteName: "Kharadi Sr No 69",
    avgScore: 58.33,
  },
  {
    organizationName: "Angel Facade Engineers Pvt Ltd",
    siteName: "Wakad Realty - LP2",
    avgScore: 58.33,
  },
  {
    organizationName: "Chandrakant Enterprises",
    siteName: "Vantage Tower",
    avgScore: 60.0,
  },
  {
    organizationName: "Chandrakant Enterprises",
    siteName: "Wakad Realty - LP2",
    avgScore: 60.0,
  },
  {
    organizationName: "Dar & Wagh Architects",
    siteName: "ALOFT-Whitefield",
    avgScore: 55.0,
  },
  {
    organizationName: "Dar & Wagh Architects",
    siteName: "YOO Pune",
    avgScore: 55.0,
  },
  {
    organizationName: "Dekor Exclusive Granites P. Limited",
    siteName: "",
    avgScore: 56.83,
  },
  {
    organizationName: "Dekor Exclusive Granites P. Limited",
    siteName: "Golden Bell",
    avgScore: 56.83,
  },
  {
    organizationName: "Dekor Exclusive Granites P. Limited",
    siteName: "Kharadi (PBSPL) - Co",
    avgScore: 56.83,
  },
];

// 7 ─ List of Disqualified Vendors
const MOCK_DISQUALIFIED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "avgScore", label: "Avg Score (Only Completed)" },
];

const MOCK_DISQUALIFIED_DATA = [
  {
    organizationName: "Aquastop Solutions",
    siteName: "SRA(Resi.)–Mahadev-Bandra",
    avgScore: 47.0,
  },
  {
    organizationName: "S.A. INFRA",
    siteName: "Almedia Park -Gold Fusion, Bandra",
    avgScore: 47.5,
  },
  {
    organizationName: "S.A. INFRA",
    siteName: "SRA(Resi.)–Mahadev-Bandra",
    avgScore: 47.5,
  },
];

// 8 ─ Count of Vendors by Grade
const MOCK_VENDOR_GRADE_DATA = [
  { grade: "B", value: 40, color: "#f58513" },
  { grade: "C", value: 31, color: "#e6b325" },
  { grade: "D", value: 27, color: "#f4ea00" },
  { grade: "F", value: 2, color: "#e00000" },
];

// 9 ─ Scores of Vendor in Respected Sites
const MOCK_SCORES_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "category", label: "Category" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "riskCategory", label: "Risk Category" },
  { key: "givenScore", label: "Given Score" },
  { key: "siteScore", label: "Site Score" },
  { key: "vendorAvgScore", label: "Vendor Avg Score (Complete Sites)" },
];

const MOCK_SCORES_DATA = [
  {
    organizationName: "Siddhivinayak Precast Pipes Pvt Ltd",
    siteName: "L BOMB-Common",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 45,
    siteScore: 80,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "",
    siteName: "",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 80,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Project Execution Feedback",
    firstName: "Tushar",
    lastName: "Ghate",
    riskCategory: "Low Risk",
    givenScore: 20,
    siteScore: 80,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "",
    siteName: "Commercial – Mahadev-Bandra",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 45,
    siteScore: 75,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "",
    siteName: "",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 75,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Project Execution Feedback",
    firstName: "Mahesh",
    lastName: "Raje",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 75,
    vendorAvgScore: 77.5,
  },
  {
    organizationName: "YI Engineering LLP",
    siteName: "Commercial – Mahadev-Bandra",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 47,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Project Execution Feedback",
    firstName: "Mahesh",
    lastName: "Raje",
    riskCategory: "Low Risk",
    givenScore: 16,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "SRA(Resi.)–Mahadev-Bandra",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 47,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Project Execution Feedback",
    firstName: "Mahesh",
    lastName: "Raje",
    riskCategory: "Low Risk",
    givenScore: 16,
    siteScore: 78,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "L BOMB-Common",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 79,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 47,
    siteScore: 79,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Project Execution Feedback",
    firstName: "Tushar",
    lastName: "Ghate",
    riskCategory: "Low Risk",
    givenScore: 17,
    siteScore: 79,
    vendorAvgScore: 78.33,
  },
  {
    organizationName: "Magnumtuff India Private Limited",
    siteName: "Golden Bell Phase II",
    category: "Project Execution Feedback",
    firstName: "Nikhil",
    lastName: "Patharkar",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 80,
    vendorAvgScore: 80.0,
  },
  {
    organizationName: "",
    siteName: "",
    category: "QAQC Feedback",
    firstName: "Amol",
    lastName: "Yadav",
    riskCategory: "Low Risk",
    givenScore: 15,
    siteScore: 80,
    vendorAvgScore: 80.0,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Procurement Feedback",
    firstName: "Chetan",
    lastName: "Chordia",
    riskCategory: "Low Risk",
    givenScore: 50,
    siteScore: 80,
    vendorAvgScore: 80.0,
  },
  {
    organizationName: "Abhiyanta Consulting Engineers LLP",
    siteName: "SHEHENSHA INFRA WORK",
    category: "Design Coordination Feedback",
    firstName: "Yogesh",
    lastName: "Naidu",
    riskCategory: "Low Risk",
    givenScore: 27,
    siteScore: 63,
    vendorAvgScore: 63.5,
  },
  {
    organizationName: "",
    siteName: "",
    category: "Design Feedback",
    firstName: "Pramod",
    lastName: "Bangal",
    riskCategory: "Low Risk",
    givenScore: 36,
    siteScore: 63,
    vendorAvgScore: 63.5,
  },
];

// 10 ─ Submitted vs Pending Assessment Overview
const MOCK_SUBMITTED_PENDING_DATA = [
  { name: "Procurement Feedback", submitted: 198, pending: 0 },
  { name: "QAQC Feedback", submitted: 198, pending: 0 },
  { name: "Project Execution Feedback", submitted: 198, pending: 0 },
  { name: "Billing Feedback", submitted: 91, pending: 0 },
  { name: "Execution Feedback", submitted: 91, pending: 0 },
  { name: "Planning Feedback", submitted: 91, pending: 0 },
  { name: "Quality Feedback", submitted: 91, pending: 0 },
];

// 11 ─ Submitted Assessment Overview by Categories
const MOCK_SUBMITTED_ASSESSMENT_DATA = [
  {
    name: "Procurement Feedback",
    A: 145,
    B: 23,
    C: 24,
    D: 4,
    F: 2,
    total: 198,
  },
  { name: "QAQC Feedback", A: 2, B: 12, C: 4, D: 180, F: 0, total: 198 },
  {
    name: "Project Execution Feedback",
    A: 6,
    B: 34,
    C: 77,
    D: 63,
    F: 0,
    total: 180,
  },
  { name: "Billing Feedback", A: 1, B: 6, C: 26, D: 58, F: 0, total: 91 },
  { name: "Planning Feedback", A: 0, B: 7, C: 7, D: 51, F: 26, total: 91 },
  { name: "Quality Feedback", A: 0, B: 5, C: 8, D: 63, F: 15, total: 91 },
  { name: "Safety Feedback", A: 1, B: 8, C: 0, D: 42, F: 40, total: 91 },
];

// 12 ─ Percentage of Completed Assessment by Category (Bar chart values from PDF)
const MOCK_PERCENTAGE_COMPLETION_DATA = [
  { department: "Procurement Feedback", percentage: 92 },
  { department: "Design Feedback", percentage: 69 },
  { department: "Project Execution Feedback", percentage: 67 },
  { department: "Execution Feedback", percentage: 66 },
  { department: "Billing Feedback", percentage: 64 },
  { department: "QAQC Feedback", percentage: 60 },
  { department: "Design Coordination Feedback", percentage: 59 },
  { department: "Quality Feedback", percentage: 58 },
  { department: "Planning Feedback", percentage: 56 },
  { department: "Safety Feedback", percentage: 51 },
];

// 13 ─ Category Wise Risk Flag
const MOCK_CATEGORY_RISK_DATA = [
  {
    category: "Procurement Feedback",
    totalAssessments: 191,
    riskScore: "LOW RISK",
  },
  {
    category: "Project Execution Feedback",
    totalAssessments: 191,
    riskScore: "LOW RISK",
  },
  { category: "QAQC Feedback", totalAssessments: 191, riskScore: "LOW RISK" },
  {
    category: "Billing Feedback",
    totalAssessments: 35,
    riskScore: "MODERATE RISK",
  },
  {
    category: "Execution Feedback",
    totalAssessments: 35,
    riskScore: "MODERATE RISK",
  },
  {
    category: "Planning Feedback",
    totalAssessments: 35,
    riskScore: "HIGH RISK",
  },
  {
    category: "Quality Feedback",
    totalAssessments: 35,
    riskScore: "HIGH RISK",
  },
  { category: "Safety Feedback", totalAssessments: 35, riskScore: "HIGH RISK" },
  {
    category: "Design Feedback",
    totalAssessments: 21,
    riskScore: "MODERATE RISK",
  },
  {
    category: "Design Coordination Feedback",
    totalAssessments: 21,
    riskScore: "MODERATE RISK",
  },
];

// 14 ─ Leader Board
const MOCK_LEADERBOARD_DATA = [
  {
    organizationName: "Tata Steel Limited",
    siteName: "L BOMB-Common",
    bestSiteScore: 93.0,
  },
  {
    organizationName: "Merino Industries Limited",
    siteName: "Golden Bell Phase II",
    bestSiteScore: 90.0,
  },
  {
    organizationName: "MC Bauchemie India Pvt Ltd",
    siteName: "Panchshil Towers",
    bestSiteScore: 89.0,
  },
  {
    organizationName: "Mapei Construction Products India Pvt Ltd",
    siteName: "YOO Villa Phase I",
    bestSiteScore: 88.0,
  },
  {
    organizationName: "Mapei Construction Products India Pvt Ltd",
    siteName: "Golden Bell Phase II",
    bestSiteScore: 87.0,
  },
  {
    organizationName: "Systemair India Private Limited",
    siteName: "Avant Garde",
    bestSiteScore: 86.0,
  },
  {
    organizationName: "Kuber Steel Industries Private Limited",
    siteName: "L BOMB-Common",
    bestSiteScore: 86.0,
  },
  {
    organizationName: "Kesoram Industries Limited",
    siteName: "Golden Bell Phase II",
    bestSiteScore: 85.0,
  },
  {
    organizationName: "Tata Steel Limited",
    siteName: "Golden Bell Phase II",
    bestSiteScore: 85.0,
  },
  {
    organizationName: "Ultratech Cement Limited",
    siteName: "Golden Bell Phase II",
    bestSiteScore: 85.0,
  },
  {
    organizationName: "Merino Industries Limited",
    siteName: "Kharadi (PBSPL) - Co",
    bestSiteScore: 85.0,
  },
  {
    organizationName: "Srj Peety Steels Private Limited",
    siteName: "Kharadi (PBSPL) - Co",
    bestSiteScore: 85.0,
  },
];

// 15 ─ On-Time Completion
const MOCK_ON_TIME_COMPLETION = {
  submitted: 317,
  totalAssessments: 319,
};

// =============================================================================
// SECTION SELECTOR CONFIG
// =============================================================================

const VENDER_ASSESMENT_CONFIG = {
  charts: {
    icon: BarChart3,
    label: "Vendor Analytics",
    color: "#d97938",
    options: [
      { id: "gradeAssessmentBar", label: "Count of Assessments by Grade" },
      { id: "topBottomVendors", label: "Top / Bottom Vendors by Avg Score" },
      {
        id: "notGivenRatingTable",
        label: "Name of Approver Who Have Not Given Rating",
      },
      { id: "watchlistVendors", label: "List of Watchlist Vendors" },
      { id: "disqualifiedVendors", label: "List of Disqualified Vendors" },
      { id: "countVendorsByGrade", label: "Count of Vendors by Grade" },
      { id: "scoresOfVendor", label: "Scores of Vendor in Respected Sites" },
      {
        id: "submittedPendingOverview",
        label: "Submitted vs Pending Assessment Overview",
      },
      {
        id: "submittedAssessmentOverview",
        label: "Submitted Assessment Overview by Categories",
      },
      {
        id: "percentageCompletion",
        label: "Percentage of Completed Assessment by Category",
      },
      { id: "categoryWiseRiskFlag", label: "Category Wise Risk Flag" },
      { id: "leaderBoard", label: "Leader Board" },
      { id: "onTimeCompletion", label: "On-Time Completion" },
    ],
  },
  stats: {
    icon: TrendingUp,
    label: "Statistics Cards",
    color: "#39b54a",
    options: [
      { id: "TotalapprovedVendors", label: "Total Approved Vendors" },
      { id: "TotalAssesmentCount", label: "Total Assessment Count" },
      { id: "FullyCompleted", label: "Fully Completed" },
      { id: "PartiallyCompleted", label: "Partially Completed" },
      { id: "Pending", label: "Pending" },
      {
        id: "TotalUniqueVendorCountForAssessment",
        label: "Total Unique Vendor Count For Assessment",
      },
      {
        id: "TotalQualifiedVendors",
        label: "Total Qualified Vendors (Above 50%)",
      },
      {
        id: "DisqualifiedVendorDuetoRatingNotGiven",
        label: "Disqualified Vendor Due to Rating Not Given",
      },
      {
        id: "TotalDisqualifiedVendorsDuetoRating",
        label: "Total Disqualified Vendors Due to Rating",
      },
      {
        id: "TotalWatchlistVendors",
        label: "Total Watchlist Vendors (50% to 60%)",
      },
    ],
  },
};

// =============================================================================
// CHART ORDER
// =============================================================================

const ALL_CHART_IDS = [
  "gradeAssessmentBar",
  "topBottomVendors",
  // --- row: notGivenRating | watchlist | disqualified (handled as a group row)
  "notGivenRatingWatchlistDisqualified",
  "countVendorsByGrade",
  "scoresOfVendor",
  // --- row: submittedPending | submittedAssessmentOverview
  "submittedRow",
  // --- row: percentageCompletion | categoryWiseRiskFlag
  "percentageCategoryRow",
  // --- row: leaderBoard | onTimeCompletion
  "leaderBoardRow",
];

const ALL_STAT_IDS = [
  "TotalapprovedVendors",
  "TotalAssesmentCount",
  "FullyCompleted",
  "PartiallyCompleted",
  "Pending",
  "TotalUniqueVendorCountForAssessment",
  "TotalQualifiedVendors",
  "DisqualifiedVendorDuetoRatingNotGiven",
  "TotalDisqualifiedVendorsDuetoRating",
  "TotalWatchlistVendors",
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

// =============================================================================
// COMPONENT
// =============================================================================

const VendersAssesmentDashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState(getDefaultDateRange);
  const [chartOrder, setChartOrder] = useState(ALL_CHART_IDS);
  const [visibleSections, setVisibleSections] = useState([
    ...ALL_STAT_IDS,
    "gradeAssessmentBar",
    "topBottomVendors",
    "notGivenRatingTable",
    "watchlistVendors",
    "disqualifiedVendors",
    "countVendorsByGrade",
    "scoresOfVendor",
    "submittedPendingOverview",
    "submittedAssessmentOverview",
    "percentageCompletion",
    "categoryWiseRiskFlag",
    "leaderBoard",
    "onTimeCompletion",
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

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="site-content">
      <div className="website-content">
        <div className="module-data-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="bg-white border-b mb-4">
                  <div className="px-0 py-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <div>
                        <h1
                          className="text-2xl font-bold mb-2"
                          style={{ color: "#1A1A1A" }}
                        >
                          Vendor Assessment Dashboard
                        </h1>
                        <p className="text-gray-600 mb-0">
                          Detailed vendor assessment and rating analytics
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
                          data={VENDER_ASSESMENT_CONFIG}
                          dashboardType="assessment"
                          onSelectionChange={setVisibleSections}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Stat Cards ──────────────────────────────────────────── */}
                <div className="row g-3 mb-4">
                  {show("TotalapprovedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Approved Vendors"
                        value={MOCK_STAT_DATA.TotalapprovedVendors}
                      />
                    </div>
                  )}
                  {show("TotalAssesmentCount") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Assessment Count"
                        value={MOCK_STAT_DATA.TotalAssesmentCount}
                      />
                    </div>
                  )}
                  {show("FullyCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Fully Completed"
                        value={MOCK_STAT_DATA.FullyCompleted}
                      />
                    </div>
                  )}
                  {show("PartiallyCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Partially Completed"
                        value={MOCK_STAT_DATA.PartiallyCompleted}
                      />
                    </div>
                  )}
                  {show("Pending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Pending"
                        value={MOCK_STAT_DATA.Pending}
                      />
                    </div>
                  )}
                  {show("TotalUniqueVendorCountForAssessment") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Unique Vendor Count For Assessment"
                        value={
                          MOCK_STAT_DATA.TotalUniqueVendorCountForAssessment
                        }
                      />
                    </div>
                  )}
                  {show("TotalQualifiedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Qualified Vendors (Above 50%)"
                        value={MOCK_STAT_DATA.TotalQualifiedVendors}
                      />
                    </div>
                  )}
                  {show("DisqualifiedVendorDuetoRatingNotGiven") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Disqualified Vendor Due to Rating Not Given"
                        value={
                          MOCK_STAT_DATA.DisqualifiedVendorDuetoRatingNotGiven ===
                          0
                            ? "(Blank)"
                            : MOCK_STAT_DATA.DisqualifiedVendorDuetoRatingNotGiven
                        }
                      />
                    </div>
                  )}
                  {show("TotalDisqualifiedVendorsDuetoRating") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Disqualified Vendors Due to Rating (Below 50%)"
                        value={
                          MOCK_STAT_DATA.TotalDisqualifiedVendorsDuetoRating
                        }
                      />
                    </div>
                  )}
                  {show("TotalWatchlistVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <VendorStatCard
                        title="Total Watchlist Vendors (50% to 60%)"
                        value={MOCK_STAT_DATA.TotalWatchlistVendors}
                      />
                    </div>
                  )}
                </div>

                {/* ── Charts with Drag & Drop ──────────────────────────────── */}
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
                      {chartOrder.map((chartId) => {
                        // ── 1. Count of Assessments by Grade (full width) ───
                        if (
                          chartId === "gradeAssessmentBar" &&
                          show("gradeAssessmentBar")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <GradeAssessmentBar
                                  data={MOCK_GRADE_DATA}
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 2. Top / Bottom Vendors (full width) ────────────
                        if (
                          chartId === "topBottomVendors" &&
                          show("topBottomVendors")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <TopBottomVendorsChart
                                  topData={MOCK_TOP_VENDORS}
                                  bottomData={MOCK_BOTTOM_VENDORS}
                                  scoreLabel="avgScore"
                                  scoreKey="avgScore"
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 3. Row: Not-Given | Watchlist | Disqualified ────
                        // (3 panels side by side, matching PDF layout)
                        if (chartId === "notGivenRatingWatchlistDisqualified") {
                          const anyVisible =
                            show("notGivenRatingTable") ||
                            show("watchlistVendors") ||
                            show("disqualifiedVendors");
                          if (!anyVisible) return null;
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <div className="row g-3">
                                  {/* Left: Not Given Rating */}
                                  {show("notGivenRatingTable") && (
                                    <div className="col-12 col-lg-4">
                                      <VendorDataTable
                                        title="Name of Approver Who Have Not Given Rating"
                                        columns={MOCK_NOT_GIVEN_RATING_COLUMNS}
                                        data={MOCK_NOT_GIVEN_RATING_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                  {/* Middle: Watchlist */}
                                  {show("watchlistVendors") && (
                                    <div
                                      className={`col-12 ${show("notGivenRatingTable") && show("disqualifiedVendors") ? "col-lg-4" : show("notGivenRatingTable") || show("disqualifiedVendors") ? "col-lg-6" : "col-lg-12"}`}
                                    >
                                      <VendorDataTable
                                        title="List of Watchlist Vendors"
                                        columns={MOCK_WATCHLIST_COLUMNS}
                                        data={MOCK_WATCHLIST_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                  {/* Right: Disqualified */}
                                  {show("disqualifiedVendors") && (
                                    <div
                                      className={`col-12 ${show("notGivenRatingTable") && show("watchlistVendors") ? "col-lg-4" : show("notGivenRatingTable") || show("watchlistVendors") ? "col-lg-6" : "col-lg-12"}`}
                                    >
                                      <VendorDataTable
                                        title="List of Disqualified Vendors"
                                        columns={MOCK_DISQUALIFIED_COLUMNS}
                                        data={MOCK_DISQUALIFIED_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                </div>
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 4. Count of Vendors by Grade (full width) ───────
                        if (
                          chartId === "countVendorsByGrade" &&
                          show("countVendorsByGrade")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <CountOfVendorsByGrade
                                  data={MOCK_VENDOR_GRADE_DATA}
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 5. Scores of Vendor in Respected Sites (full width)
                        if (
                          chartId === "scoresOfVendor" &&
                          show("scoresOfVendor")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <ScoresOfVendorTable
                                  title="Scores of Vendor in Respected Sites"
                                  columns={MOCK_SCORES_COLUMNS}
                                  data={MOCK_SCORES_DATA}
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 6. Row: Submitted vs Pending | Submitted Overview
                        if (chartId === "submittedRow") {
                          const anyVisible =
                            show("submittedPendingOverview") ||
                            show("submittedAssessmentOverview");
                          if (!anyVisible) return null;
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <div className="row g-3">
                                  {show("submittedPendingOverview") && (
                                    <div
                                      className={`col-12 ${show("submittedAssessmentOverview") ? "col-lg-6" : ""}`}
                                    >
                                      <SubmittedPendingOverview
                                        data={MOCK_SUBMITTED_PENDING_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                  {show("submittedAssessmentOverview") && (
                                    <div
                                      className={`col-12 ${show("submittedPendingOverview") ? "col-lg-6" : ""}`}
                                    >
                                      <SubmittedAssessmentOverview
                                        data={MOCK_SUBMITTED_ASSESSMENT_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                </div>
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 7. Row: Percentage Completion | Category Risk Flag
                        if (chartId === "percentageCategoryRow") {
                          const anyVisible =
                            show("percentageCompletion") ||
                            show("categoryWiseRiskFlag");
                          if (!anyVisible) return null;
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <div className="row g-3">
                                  {show("percentageCompletion") && (
                                    <div
                                      className={`col-12 ${show("categoryWiseRiskFlag") ? "col-lg-6" : ""}`}
                                    >
                                      <PercentageCompletionChart
                                        data={MOCK_PERCENTAGE_COMPLETION_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                  {show("categoryWiseRiskFlag") && (
                                    <div
                                      className={`col-12 ${show("percentageCompletion") ? "col-lg-6" : ""}`}
                                    >
                                      <CategoryWiseRiskFlag
                                        data={MOCK_CATEGORY_RISK_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                </div>
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ── 8. Row: Leader Board | On-Time Completion ───────
                        if (chartId === "leaderBoardRow") {
                          const anyVisible =
                            show("leaderBoard") || show("onTimeCompletion");
                          if (!anyVisible) return null;
                          return (
                            <div key={chartId} className="mt-4 mb-4">
                              <SortableChartItem id={chartId}>
                                <div className="row g-3">
                                  {show("leaderBoard") && (
                                    <div
                                      className={`col-12 ${show("onTimeCompletion") ? "col-lg-6" : ""}`}
                                    >
                                      <LeaderBoard
                                        data={MOCK_LEADERBOARD_DATA}
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                  {show("onTimeCompletion") && (
                                    <div
                                      className={`col-12 ${show("leaderBoard") ? "col-lg-6" : ""}`}
                                    >
                                      <OnTimeCompletion
                                        submitted={
                                          MOCK_ON_TIME_COMPLETION.submitted
                                        }
                                        totalAssessments={
                                          MOCK_ON_TIME_COMPLETION.totalAssessments
                                        }
                                        onDownload={() => {}}
                                      />
                                    </div>
                                  )}
                                </div>
                              </SortableChartItem>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </SortableContext>
                </DndContext>

                {/* ── Filter Dialog ────────────────────────────────────────── */}
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

export default VendersAssesmentDashboard;
