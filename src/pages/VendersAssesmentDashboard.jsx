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
import SubmittedPendingOverview from "@/components/vendor-analytics/SubmittedPendingOverview";
import SubmittedAssessmentOverview from "@/components/vendor-analytics/SubmittedAssessmentOverview";
import { CategoryWiseRiskFlag } from "@/components/vendor-analytics/CategoryWiseRiskFlag";
import OnTimeCompletion from "@/components/vendor-analytics/OnTimeCompletionChart";
import LeaderBoard from "@/components/vendor-analytics/leaderBoard";
import PercentageCompletionChart from "@/components/vendor-analytics/PercentageCompletionChart";

// =============================================================================
// MOCK DATA (आपका वही रहेगा)
// =============================================================================

const MOCK_STAT_DATA = {
  TotalapprovedVendors: 4987,
  TotalAssesmentCount: 319,
  FullyCompleted: 317,
  PartiallyCompleted: 2,
  Pending: 0,
  TotalUniqueVendorCountForAssessment: 100,
  TotalQualifiedVendors: 98,
  DisqualifiedVendorDuetoRatingNotGiven: 0,
  TotalDisqualifiedVendorsDuetoRating: 2,
  TotalWatchlistVendors: 25,
};

const MOCK_GRADE_DATA = [
  { grade: "A", value: 5, color: "#00b050" },
  { grade: "B", value: 147, color: "#f58513" },
  { grade: "C", value: 101, color: "#e6b325" },
  { grade: "D", value: 62, color: "#f4ea00" },
  { grade: "F", value: 8, color: "#e00000" },
];

const MOCK_TOP_VENDORS = [
  { name: "FABRICASTO PRIVATE LIMITED", avgTat: 98 },
  { name: "M/S POKARNA ENGINEERING", avgTat: 95 },
  { name: "Om Sai Enterprises", avgTat: 94 },
  { name: "Envirotech", avgTat: 92 },
  { name: "THE SHINE REFLECTO", avgTat: 91 },
  { name: "RAMJI VITHAL JAGTAP", avgTat: 89 },
  { name: "TOR.AI LIMITED", avgTat: 87 },
  { name: "RSB INFOTECH", avgTat: 85 },
  { name: "R. A. CONTRACTOR'S", avgTat: 84 },
  { name: "Snehal Fiber Products", avgTat: 82 },
];

const MOCK_BOTTOM_VENDORS = [
  { name: "Stone Natural", avgTat: 55.5 },
  { name: "R K Associates", avgTat: 54.0 },
  { name: "Kiran Buildcon", avgTat: 52.5 },
  { name: "Front Line Technologies", avgTat: 52.33 },
  { name: "Giitai Buildcon Private Ltd", avgTat: 52.0 },
  { name: "PANKAJ DHARKAR & Associates", avgTat: 51.5 },
  { name: "Instec Technology", avgTat: 51.0 },
  { name: "S.A. INFRA", avgTat: 47.5 },
  { name: "Aquastop Solutions", avgTat: 47.0 },
  { name: "Dar & Wagh Architects", avgTat: 38.0 },
];

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
];

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
];

const MOCK_VENDOR_GRADE_DATA = [
  { grade: "B", value: 40, color: "#f58513" },
  { grade: "C", value: 31, color: "#e6b325" },
  { grade: "D", value: 27, color: "#f4ea00" },
  { grade: "F", value: 2, color: "#e00000" },
];

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
  { key: "remainingSites", label: "Remaining Sites" },
];

const MOCK_SCORES_DATA = [
  {
    organizationName: "Siddhivinayak Precast Pipes Private Limited",
    siteName: "L BOMB-Common",
    category: "Procurement Feedback",
    firstName: "Satyabrata",
    lastName: "Dash",
    riskCategory: "Low Risk",
    givenScore: 45,
    siteScore: 80,
    vendorAvgScore: 77.5,
    remainingSites: "Sup",
  },
];

const MOCK_SUBMITTED_PENDING_DATA = [
  { name: "Procurement Feedback", submitted: 198, pending: 0 },
  { name: "QAQC Feedback", submitted: 198, pending: 0 },
];

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
];

const MOCK_PERCENTAGE_COMPLETION_DATA = [
  { department: "Procurement Feedback", percentage: 92 },
  { department: "Design Feedback", percentage: 69 },
];

const MOCK_CATEGORY_RISK_DATA = [
  {
    name: "Procurement Feedback",
    HIGH: 5,
    LOW: 191,
    MODERATE: 10,
  },
];

const MOCK_LEADERBOARD_DATA = [
  {
    organizationName: "Tata Steel Limited",
    siteName: "L BOMB-Common",
    bestSiteScore: 93.0,
  },
];

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
// CHART ORDER - ROWS के अंदर अलग-अलग COMPONENTS
// =============================================================================

const ALL_CHART_IDS = [
  "gradeAssessmentBar",
  "row1_col1_topBottom", // Row 1 ka pehla column
  "row1_col2_notGivenRating", // Row 1 ka doosra column
  "row2_col1_watchlist", // Row 2 ka pehla column
  "row2_col2_disqualified", // Row 2 ka doosra column
  "countVendorsByGrade",
  "scoresOfVendor",
  "row3_col1_submittedPending", // Row 3 ka pehla column
  "row3_col2_submittedOverview", // Row 3 ka doosra column
  "row4_col1_percentage", // Row 4 ka pehla column
  "row4_col2_categoryRisk", // Row 4 ka doosra column
  "row5_col1_leaderBoard", // Row 5 ka pehla column
  "row5_col2_onTimeCompletion", // Row 5 ka doosra column
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

  // Helper to check if any component in a row is visible
  const showRow = (components) => components.some(show);

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

                {/* Stat Cards */}
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

                {/* Charts with Drag & Drop - ROWS के अंदर INDIVIDUAL COMPONENTS */}
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
                        // Grade Assessment Bar - Full Width
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

                        // ROW 1: Top/Bottom Vendors + Not Given Rating
                        if (
                          (chartId === "row1_col1_topBottom" &&
                            show("topBottomVendors")) ||
                          (chartId === "row1_col2_notGivenRating" &&
                            show("notGivenRatingTable"))
                        ) {
                          // अगर ये पहला कॉलम है
                          if (chartId === "row1_col1_topBottom") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-8">
                                    <SortableChartItem id={chartId}>
                                      <TopBottomVendorsChart
                                        topData={MOCK_TOP_VENDORS}
                                        bottomData={MOCK_BOTTOM_VENDORS}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                  {/* दूसरा कॉलम अगर visible है तो */}
                                  {show("notGivenRatingTable") && (
                                    <div className="col-lg-4">
                                      {chartOrder.map((innerId) => {
                                        if (
                                          innerId === "row1_col2_notGivenRating"
                                        ) {
                                          return (
                                            <SortableChartItem
                                              key={innerId}
                                              id={innerId}
                                            >
                                              <VendorDataTable
                                                title="Name of Approver Who Have Not Given Rating"
                                                columns={
                                                  MOCK_NOT_GIVEN_RATING_COLUMNS
                                                }
                                                data={
                                                  MOCK_NOT_GIVEN_RATING_DATA
                                                }
                                                onDownload={() => {}}
                                              />
                                            </SortableChartItem>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row1_col2_notGivenRating" &&
                            !show("topBottomVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <VendorDataTable
                                        title="Name of Approver Who Have Not Given Rating"
                                        columns={MOCK_NOT_GIVEN_RATING_COLUMNS}
                                        data={MOCK_NOT_GIVEN_RATING_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        // ROW 2: Watchlist + Disqualified
                        if (
                          (chartId === "row2_col1_watchlist" &&
                            show("watchlistVendors")) ||
                          (chartId === "row2_col2_disqualified" &&
                            show("disqualifiedVendors"))
                        ) {
                          // अगर ये पहला कॉलम है
                          if (chartId === "row2_col1_watchlist") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <SortableChartItem id={chartId}>
                                      <VendorDataTable
                                        title="List of Watchlist Vendors"
                                        columns={MOCK_WATCHLIST_COLUMNS}
                                        data={MOCK_WATCHLIST_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                  {/* दूसरा कॉलम अगर visible है तो */}
                                  {show("disqualifiedVendors") && (
                                    <div className="col-lg-6">
                                      {chartOrder.map((innerId) => {
                                        if (
                                          innerId === "row2_col2_disqualified"
                                        ) {
                                          return (
                                            <SortableChartItem
                                              key={innerId}
                                              id={innerId}
                                            >
                                              <VendorDataTable
                                                title="List of Disqualified Vendors"
                                                columns={
                                                  MOCK_DISQUALIFIED_COLUMNS
                                                }
                                                data={MOCK_DISQUALIFIED_DATA}
                                                onDownload={() => {}}
                                              />
                                            </SortableChartItem>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row2_col2_disqualified" &&
                            !show("watchlistVendors")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <VendorDataTable
                                        title="List of Disqualified Vendors"
                                        columns={MOCK_DISQUALIFIED_COLUMNS}
                                        data={MOCK_DISQUALIFIED_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        // Count of Vendors by Grade - Full Width
                        if (
                          chartId === "countVendorsByGrade" &&
                          show("countVendorsByGrade")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <GradeAssessmentBar
                                  data={MOCK_VENDOR_GRADE_DATA}
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // Scores of Vendor - Full Width
                        if (
                          chartId === "scoresOfVendor" &&
                          show("scoresOfVendor")
                        ) {
                          return (
                            <div key={chartId} className="mt-4">
                              <SortableChartItem id={chartId}>
                                <VendorDataTable
                                  title="Scores of Vendor in Respected Sites"
                                  columns={MOCK_SCORES_COLUMNS}
                                  data={MOCK_SCORES_DATA}
                                  onDownload={() => {}}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ROW 3: Submitted vs Pending + Submitted Overview
                        if (
                          (chartId === "row3_col1_submittedPending" &&
                            show("submittedPendingOverview")) ||
                          (chartId === "row3_col2_submittedOverview" &&
                            show("submittedAssessmentOverview"))
                        ) {
                          // अगर ये पहला कॉलम है
                          if (chartId === "row3_col1_submittedPending") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <SortableChartItem id={chartId}>
                                      <SubmittedPendingOverview
                                        data={MOCK_SUBMITTED_PENDING_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                  {/* दूसरा कॉलम अगर visible है तो */}
                                  {show("submittedAssessmentOverview") && (
                                    <div className="col-lg-6">
                                      {chartOrder.map((innerId) => {
                                        if (
                                          innerId ===
                                          "row3_col2_submittedOverview"
                                        ) {
                                          return (
                                            <SortableChartItem
                                              key={innerId}
                                              id={innerId}
                                            >
                                              <SubmittedAssessmentOverview
                                                data={
                                                  MOCK_SUBMITTED_ASSESSMENT_DATA
                                                }
                                                onDownload={() => {}}
                                              />
                                            </SortableChartItem>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row3_col2_submittedOverview" &&
                            !show("submittedPendingOverview")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <SubmittedAssessmentOverview
                                        data={MOCK_SUBMITTED_ASSESSMENT_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        // ROW 4: Percentage Completion + Category Risk
                        if (
                          (chartId === "row4_col1_percentage" &&
                            show("percentageCompletion")) ||
                          (chartId === "row4_col2_categoryRisk" &&
                            show("categoryWiseRiskFlag"))
                        ) {
                          // अगर ये पहला कॉलम है
                          if (chartId === "row4_col1_percentage") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <SortableChartItem id={chartId}>
                                      <PercentageCompletionChart
                                        data={MOCK_PERCENTAGE_COMPLETION_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                  {/* दूसरा कॉलम अगर visible है तो */}
                                  {show("categoryWiseRiskFlag") && (
                                    <div className="col-lg-6">
                                      {chartOrder.map((innerId) => {
                                        if (
                                          innerId === "row4_col2_categoryRisk"
                                        ) {
                                          return (
                                            <SortableChartItem
                                              key={innerId}
                                              id={innerId}
                                            >
                                              <CategoryWiseRiskFlag
                                                data={MOCK_CATEGORY_RISK_DATA}
                                                onDownload={() => {}}
                                              />
                                            </SortableChartItem>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row4_col2_categoryRisk" &&
                            !show("percentageCompletion")
                          ) {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <CategoryWiseRiskFlag
                                        data={MOCK_CATEGORY_RISK_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        // ROW 5: Leader Board + On-Time Completion
                        if (
                          (chartId === "row5_col1_leaderBoard" &&
                            show("leaderBoard")) ||
                          (chartId === "row5_col2_onTimeCompletion" &&
                            show("onTimeCompletion"))
                        ) {
                          // अगर ये पहला कॉलम है
                          if (chartId === "row5_col1_leaderBoard") {
                            return (
                              <div key={chartId} className="mt-4 mb-4">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <SortableChartItem id={chartId}>
                                      <LeaderBoard
                                        data={MOCK_LEADERBOARD_DATA}
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                  {/* दूसरा कॉलम अगर visible है तो */}
                                  {show("onTimeCompletion") && (
                                    <div className="col-lg-6">
                                      {chartOrder.map((innerId) => {
                                        if (
                                          innerId ===
                                          "row5_col2_onTimeCompletion"
                                        ) {
                                          return (
                                            <SortableChartItem
                                              key={innerId}
                                              id={innerId}
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
                                            </SortableChartItem>
                                          );
                                        }
                                        return null;
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row5_col2_onTimeCompletion" &&
                            !show("leaderBoard")
                          ) {
                            return (
                              <div key={chartId} className="mt-4 mb-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <OnTimeCompletion
                                        submitted={
                                          MOCK_ON_TIME_COMPLETION.submitted
                                        }
                                        totalAssessments={
                                          MOCK_ON_TIME_COMPLETION.totalAssessments
                                        }
                                        onDownload={() => {}}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        return null;
                      })}
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

export default VendersAssesmentDashboard;
