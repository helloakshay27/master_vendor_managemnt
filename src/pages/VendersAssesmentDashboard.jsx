import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { BarChart3, TrendingUp } from "lucide-react";
import { SortableChartItem } from "@/components/SortableChartItem";
import { VendorStatCard } from "@/components/vendor-analytics/VendorStatCard";
import { VendorSectionSelector } from "@/components/vendor-analytics/VendorSectionSelector";
import { GradeAssessmentBar } from "@/components/vendor-analytics/GradeAssessmentBar";
import { TopBottomVendorsChart } from "@/components/vendor-analytics/TopBottomVendorsChart";
import { VendorDataTable } from "@/components/vendor-analytics/VendorDataTable";
import SubmittedPendingOverview from "@/components/vendor-analytics/SubmittedPendingOverview";
import SubmittedAssessmentOverview from "@/components/vendor-analytics/SubmittedAssessmentOverview";
import { CategoryWiseRiskFlag } from "@/components/vendor-analytics/CategoryWiseRiskFlag";
import OnTimeCompletion from "@/components/vendor-analytics/OnTimeCompletionChart";
// LeaderBoard component replaced by VendorDataTable (same table structure)
import PercentageCompletionChart from "@/components/vendor-analytics/PercentageCompletionChart";
import { VendorFilterCard } from "@/components/vendor-analytics/VendorFilterCard";
import { baseURL } from "@/confi/apiDomain";

const NOT_GIVEN_RATING_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  {
    key: "approverName",
    label: "Approver Name",
    render: (value) => (
      <span
        style={{
          color: "#d97938",
          fontWeight: 600,
        }}
      >
        {value}
      </span>
    ),
  },
  { key: "category", label: "Category" },
];

const WATCHLIST_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "avgScore", label: "Avg Score (Only Completed)" },
];

const DISQUALIFIED_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "avgScore", label: "Avg Score (Only Completed)" },
];

const SCORES_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "siteName", label: "Site Name" },
  { key: "category", label: "Category" },
  {
     key: "subCategory" , label :"Sub Category"
  },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "riskCategory", label: "Risk Category" },
  { key: "givenScore", label: "Given Score" },
  { key: "siteScore", label: "Site Score" },
  { key: "vendorAvgScore", label: "Vendor Avg Score (Complete Sites)" },
  { key: "remark", label: "Remark" },
];

const LEADERBOARD_COLUMNS = [
  { key: "organizationName", label: "Organization Name" },
  { key: "bestSiteName", label: " Best Site Name" },
   { key: "bestSiteScore", label: "Best Site Score" },
  { key: "worstSiteName", label: " Worst Site Name" },
 
  { key: "worstSiteScore", label: "Worst Site Score" },
  { key: "avgScore", label: "Avg Score" },
  { key: "variancePct", label: "Variance %" },
];

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
  const fmt = (d) => {
    const dd = d.getDate().toString().padStart(2, "0");
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  };
  const startDate2024 = new Date(2024, 0, 1); // 01 Jan 2024
  return { startDate: fmt(startDate2024), endDate: fmt(today) };
};

// =============================================================================
// COMPONENT
// =============================================================================

const VendersAssesmentDashboard = () => {
  const [dateRange, setDateRange] = useState(getDefaultDateRange);
  const [activeFilters, setActiveFilters] = useState(() => {
    const companyId =
      typeof window !== "undefined"
        ? sessionStorage.getItem("company_id") || "40"
        : "40";
    return {
      companyId,
      departmentIds: "",
      vendorIds: "",
      siteId: "",
      categoryId: "",
      subCategoryId: "",
      fiscal_year: "",
      assessment_half: "",
    };
  });
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

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token",
    );
    return tokenFromUrl || sessionStorage.getItem("token") || "";
  }, []);

  const [kpiResponse, setKpiResponse] = useState(null);
  const [isKpiLoading, setIsKpiLoading] = useState(false);

  const [topBottomResponse, setTopBottomResponse] = useState(null);
  const [isTopBottomLoading, setIsTopBottomLoading] = useState(false);

  const [vendorsByGradeResponse, setVendorsByGradeResponse] = useState(null);
  const [isVendorsByGradeLoading, setIsVendorsByGradeLoading] = useState(false);

  const [noRatingRows, setNoRatingRows] = useState([]);
  const [watchlistRows, setWatchlistRows] = useState([]);
  const [disqualifiedRows, setDisqualifiedRows] = useState([]);
  const [isNoRatingLoading, setIsNoRatingLoading] = useState(false);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);
  const [isDisqualifiedLoading, setIsDisqualifiedLoading] = useState(false);

  const [scoresRows, setScoresRows] = useState([]);
  const [scoresPagination, setScoresPagination] = useState({
    current_page: 1,
    per_page: 50,
    total_pages: 1,
    total_records: 0,
  });
  const [isScoresLoading, setIsScoresLoading] = useState(false);

  const [leaderboardRows, setLeaderboardRows] = useState([]);
  const [leaderboardPagination, setLeaderboardPagination] = useState({
    current_page: 1,
    per_page: 50,
    total_pages: 1,
    total_records: 0,
  });
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  const [subcategoryOverviewResponse, setSubcategoryOverviewResponse] =
    useState(null);
  const [isSubcategoryOverviewLoading, setIsSubcategoryOverviewLoading] =
    useState(false);

  const LoadingCard = ({ title, height = 200, className = "" }) => (
    <div className={`card go-shadow bg-white rounded-lg w-100 ${className}`}>
      <div className="vendor-card-header">
        <h3 className="vendor-card-title">{title}</h3>
      </div>
      <div
        className="card-body"
        style={{
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-primary mb-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-muted fw-medium">Loading {title}...</span>
      </div>
    </div>
  );

  const exportTableToCsv = (rows, columns, filename) => {
    if (!rows || rows.length === 0) return;
    const safeColumns = columns || [];
    const header = safeColumns
      .map((c) => `"${String(c.label || "").replace(/"/g, '""')}"`)
      .join(",");
    const body = rows
      .map((row) =>
        safeColumns
          .map((c) => {
            const raw = row[c.key];
            const value = raw === null || raw === undefined ? "" : String(raw);
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(","),
      )
      .join("\n");
    const csv = `${header}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename || "export"}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportChartData = (data, filename) => {
    if (!data || data.length === 0) {
      alert("No data available to download!");
      return;
    }
    const exportData = Array.isArray(data) ? data : [data];
    if (exportData.length === 0) return;
    const keys = Object.keys(exportData[0]).filter(
      (k) => !["color", "fill", "icon", "component"].includes(k),
    );
    const columns = keys.map((k) => ({
      key: k,
      label: k.replace(/_/g, " ").toUpperCase(),
    }));
    exportTableToCsv(exportData, columns, filename);
  };

  const buildAssessmentQueryParams = (extra = {}) => {
    const params = new URLSearchParams();
    params.append("token", token);
    if (activeFilters.departmentIds)
      params.append("department_ids", activeFilters.departmentIds);
    if (activeFilters.siteId) params.append("sites_ids", activeFilters.siteId);
    if (activeFilters.vendorIds) params.append("vendor_ids", activeFilters.vendorIds);
    params.append("from_date", dateRange.startDate);
    params.append("end_date", dateRange.endDate);
    if (activeFilters.categoryId) params.append("category_ids", activeFilters.categoryId);
    if (activeFilters.subCategoryId)
      params.append("sub_category_ids", activeFilters.subCategoryId);
    if (activeFilters.fiscal_year)
      params.append("fiscal_year", String(activeFilters.fiscal_year));
    if (activeFilters.assessment_half)
      params.append("assessment_half", String(activeFilters.assessment_half));

    Object.entries(extra).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") params.append(k, v);
    });

    return params;
  };

  const refreshKpisAndGrades = useCallback(
    async (signal) => {
      if (!token) return;
      setIsKpiLoading(true);
      try {
        const params = buildAssessmentQueryParams();
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/kpis_and_grades.json?${params.toString()}`,
          { signal },
        );
        const json = await res.json();
        setKpiResponse(json);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("KPI/Grades fetch error:", e);
        setKpiResponse(null);
      } finally {
        setIsKpiLoading(false);
      }
    },
    [
      token,
      dateRange?.startDate,
      dateRange?.endDate,
      activeFilters.departmentIds,
      activeFilters.vendorIds,
      activeFilters.siteId,
      activeFilters.categoryId,
      activeFilters.subCategoryId,
      activeFilters.fiscal_year,
      activeFilters.assessment_half,
    ],
  );

  const fetchAllVendorProjectList = async (type, signal) => {
    const all = [];
    let page = 1;
    let totalPages = 1;

    do {
      const params = buildAssessmentQueryParams({ type, page });
      const res = await fetch(
        `${baseURL}vendor_assement_dashboard/vendor_project_list.json?${params.toString()}`,
        { signal },
      );
      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : [];
      rows.forEach((r) => all.push(r));
      totalPages = Number(json?.total_pages ?? 1) || 1;
      page += 1;
    } while (page <= totalPages);

    return all;
  };

  const refreshTables = useCallback(
    async (signal) => {
      if (!token) return;
      setIsNoRatingLoading(true);
      setIsWatchlistLoading(true);
      setIsDisqualifiedLoading(true);
      try {
        const [noRating, watchlist, disqualified] = await Promise.all([
          fetchAllVendorProjectList("no_rating", signal),
          fetchAllVendorProjectList("watchlist", signal),
          fetchAllVendorProjectList("disqualified", signal),
        ]);

        const concatApproverName = (first, last) => {
          const f = String(first ?? "").trim();
          const l = String(last ?? "").trim();
          const parts = [f, l].filter(Boolean);
          return parts.join(" ") || "-";
        };

        setNoRatingRows(
          (noRating || []).map((r, idx) => {
            if (idx === 0) console.log("Sample full record from API:", r);
            return {
              organizationName: r.vendor_name,
              siteName: r.project_name,
              approverName: r.approver_name || "",
              category: r.category_name,
            };
          }),
        );
        setWatchlistRows(
          (watchlist || []).map((r) => ({
            organizationName: r.vendor_name,
            siteName: r.project_name,
            avgScore: r.avg_percentage,
          })),
        );
        setDisqualifiedRows(
          (disqualified || []).map((r) => ({
            organizationName: r.vendor_name,
            siteName: r.project_name,
            avgScore: r.avg_percentage,
          })),
        );
      } catch (e) {
        if (e?.name !== "AbortError") console.error("Tables fetch error:", e);
        setNoRatingRows([]);
        setWatchlistRows([]);
        setDisqualifiedRows([]);
      } finally {
        setIsNoRatingLoading(false);
        setIsWatchlistLoading(false);
        setIsDisqualifiedLoading(false);
      }
    },
    [
      token,
      dateRange?.startDate,
      dateRange?.endDate,
      activeFilters.departmentIds,
      activeFilters.vendorIds,
      activeFilters.siteId,
      activeFilters.categoryId,
      activeFilters.subCategoryId,
      activeFilters.fiscal_year,
      activeFilters.assessment_half,
    ],
  );

  const statData = useMemo(() => {
    const r = kpiResponse || {};
    const k = r.kpis || {};
    const s = r.assessment_status || {};
    const vr = r.vendor_rating || {};

    return {
      TotalapprovedVendors: k.approved_vendors ?? 0,
      TotalAssesmentCount: k.total_assessment_count ?? 0,
      FullyCompleted: s.fully_completed ?? 0,
      PartiallyCompleted: s.partially_completed ?? 0,
      Pending: s.pending ?? 0,
      TotalUniqueVendorCountForAssessment: k.unique_vendor_count ?? 0,
      TotalQualifiedVendors: vr.total_qualified_vendors ?? 0,
      DisqualifiedVendorDuetoRatingNotGiven:
        vr.disqualified_due_to_missing_rating ?? 0,
      TotalDisqualifiedVendorsDuetoRating: vr.total_disqualified_vendors ?? 0,
      TotalWatchlistVendors: vr.watchlist_vendors ?? 0,
    };
  }, [kpiResponse]);

  const gradeData = useMemo(() => {
    const grades = kpiResponse?.assesment_grades || {};
    // Keep existing colors
    const colors = {
      A: "#00b050",
      B: "#f58513",
      C: "#e6b325",
      D: "#f4ea00",
      F: "#e00000",
    };
    return ["A", "B", "C", "D", "F"].map((g) => ({
      grade: g,
      value: Number(grades?.[g] ?? 0),
      color: colors[g],
    }));
  }, [kpiResponse]);

  const vendorsByGradeData = useMemo(() => {
    const grades = vendorsByGradeResponse?.vendor_by_grade || {};
    const colors = {
      A: "#00b050",
      B: "#f58513",
      C: "#e6b325",
      D: "#f4ea00",
      F: "#e00000",
    };
    return ["A", "B", "C", "D", "F"].map((g) => ({
      grade: g,
      value: Number(grades?.[g] ?? 0),
      color: colors[g],
    }));
  }, [vendorsByGradeResponse]);

  const submittedPendingData = useMemo(() => {
    const rows = subcategoryOverviewResponse?.data;
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => ({
      // Show combined category label on Y-axis
      // Example: "Assessment Contract And Billing - Billing Feedback"
      name: (() => {
        let category = String(r.category ?? r.category_name ?? "").trim();
        // Remove "Assessment" word from category label (e.g., "Assessment Contract And Billing")
        category = category.replace(/^assessment\s*/i, "").trim();
        const sub = String(r.sub_category_name ?? "").trim();
        if (category && sub) return `${category} - ${sub}`;
        return sub || category || "-";
      })(),
      submitted: Number(r.submitted_count ?? 0),
      pending: Number(r.pending_count ?? 0),
      submitted_percentage: Number(r.submitted_percentage ?? 0),
    }));
  }, [subcategoryOverviewResponse]);

  const submittedAssessmentOverviewData = useMemo(() => {
    const rows = subcategoryOverviewResponse?.data;
    if (!Array.isArray(rows)) return [];
    const byCategory = new Map();
    for (const r of rows) {
      const key = String(r.category || "Unknown").trim();
      const prev = byCategory.get(key) || {
        name: key,
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0,
        total: 0,
      };
      prev.A += Number(r.grade_a ?? 0);
      prev.B += Number(r.grade_b ?? 0);
      prev.C += Number(r.grade_c ?? 0);
      prev.D += Number(r.grade_d ?? 0);
      prev.F += Number(r.grade_f ?? 0);
      prev.total += Number(r.total_count ?? 0);
      byCategory.set(key, prev);
    }
    return Array.from(byCategory.values());
  }, [subcategoryOverviewResponse]);

  const percentageCompletionData = useMemo(() => {
    const rows = subcategoryOverviewResponse?.data;
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => {
      const submitted = Number(r.submitted_count ?? 0);
      const total = Number(r.total_count ?? 0);
      const pct = total > 0 ? Math.round((submitted / total) * 100) : 0;
      let category = String(r.category ?? r.category_name ?? "").trim();
      category = category.replace(/^assessment\s*/i, "").trim();
      const sub = String(r.sub_category_name ?? "").trim();
      const label =
        category && sub ? `${category} - ${sub}` : sub || category || "-";
      return {
        department: label,
        percentage: pct,
      };
    });
  }, [subcategoryOverviewResponse]);

  const categoryRiskFlagData = useMemo(() => {
    const rows = subcategoryOverviewResponse?.data;
    if (!Array.isArray(rows)) return [];
    const byCategory = new Map();
    const normalizeRisk = (riskFlag) => {
      const v = String(riskFlag || "").toLowerCase();
      if (v.includes("high")) return "HIGH";
      if (v.includes("moderate")) return "MODERATE";
      if (v.includes("low")) return "LOW";
      return "MODERATE";
    };
    for (const r of rows) {
      const key = String(r.category || "Unknown").trim();
      const prev = byCategory.get(key) || { name: key, HIGH: 0, LOW: 0, MODERATE: 0 };
      const bucket = normalizeRisk(r.risk_flag);
      const inc = Number(r.total_count ?? 0);
      prev[bucket] += inc;
      byCategory.set(key, prev);
    }
    return Array.from(byCategory.values());
  }, [subcategoryOverviewResponse]);

  const topVendorsData = useMemo(() => {
    const arr = topBottomResponse?.top_vendors || [];
    return (Array.isArray(arr) ? arr : [])
      .slice(0, 10)
      .map((v) => ({
        vendorId: v.vendor_id,
        name: String(v.vendor_name || "").trim(),
        avgTat: Number(v.average_score ?? 0), // backward compatibility
        avgWantedScore: Number(
          v.average_score ??
            v.avg_score ??
            v.score ??
            v.average_score ??
            0,
        ),
        Days: Number(
          v.average_days ??
            v.wanted_days ??
            v.average_days ??
            v.average_tat_days ??
            v.avg_tat_days ??
            0,
        ),
      }))
      .filter((x) => x.name);
  }, [topBottomResponse]);

  const bottomVendorsData = useMemo(() => {
    const arr = topBottomResponse?.bottom_vendors || [];
    return (Array.isArray(arr) ? arr : [])
      .slice(0, 10)
      .map((v) => ({
        vendorId: v.vendor_id,
        name: String(v.vendor_name || "").trim(),
        avgTat: Number(v.average_score ?? 0), // backward compatibility
        avgWantedScore: Number(
          v.average_wanted_score ??
            v.wanted_avg_score ??
            v.wanted_score ??
            v.average_score ??
            0,
        ),
        wantedDays: Number(
          v.average_wanted_days ??
            v.wanted_days ??
            v.average_days ??
            v.average_tat_days ??
            v.avg_tat_days ??
            0,
        ),
      }))
      .filter((x) => x.name);
  }, [topBottomResponse]);

  useEffect(() => {
    const controller = new AbortController();
    refreshKpisAndGrades(controller.signal);
    return () => controller.abort();
  }, [refreshKpisAndGrades]);

  const refreshTopBottom = useCallback(
    async (signal) => {
      if (!token) return;
      setIsTopBottomLoading(true);
      try {
        const params = buildAssessmentQueryParams();
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/top_bottom_vendors.json?${params.toString()}`,
          { signal },
        );
        const json = await res.json();
        setTopBottomResponse(json);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Top/Bottom vendors fetch error:", e);
        setTopBottomResponse(null);
      } finally {
        setIsTopBottomLoading(false);
      }
    },
    [
      token,
      dateRange?.startDate,
      dateRange?.endDate,
      activeFilters.departmentIds,
      activeFilters.vendorIds,
      activeFilters.siteId,
      activeFilters.categoryId,
      activeFilters.subCategoryId,
      activeFilters.fiscal_year,
      activeFilters.assessment_half,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    refreshTopBottom(controller.signal);
    return () => controller.abort();
  }, [refreshTopBottom]);

  const refreshVendorsByGrade = useCallback(
    async (signal) => {
      if (!token) return;
      setIsVendorsByGradeLoading(true);
      try {
        const params = buildAssessmentQueryParams();
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/vendors_by_grade.json?${params.toString()}`,
          { signal },
        );
        const json = await res.json();
        setVendorsByGradeResponse(json);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Vendors by grade fetch error:", e);
        setVendorsByGradeResponse(null);
      } finally {
        setIsVendorsByGradeLoading(false);
      }
    },
    [
      token,
      dateRange?.startDate,
      dateRange?.endDate,
      activeFilters.departmentIds,
      activeFilters.vendorIds,
      activeFilters.siteId,
      activeFilters.categoryId,
      activeFilters.subCategoryId,
      activeFilters.fiscal_year,
      activeFilters.assessment_half,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    refreshVendorsByGrade(controller.signal);
    return () => controller.abort();
  }, [refreshVendorsByGrade]);

  const refreshSubcategoryOverview = useCallback(
    async (signal) => {
      if (!token) return;
      setIsSubcategoryOverviewLoading(true);
      try {
        const params = buildAssessmentQueryParams();
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/subcategory_overview.json?${params.toString()}`,
          { signal },
        );
        const json = await res.json();
        setSubcategoryOverviewResponse(json);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Subcategory overview fetch error:", e);
        setSubcategoryOverviewResponse(null);
      } finally {
        setIsSubcategoryOverviewLoading(false);
      }
    },
    [
      token,
      dateRange?.startDate,
      dateRange?.endDate,
      activeFilters.departmentIds,
      activeFilters.vendorIds,
      activeFilters.siteId,
      activeFilters.categoryId,
      activeFilters.subCategoryId,
    ],
  );

  useEffect(() => {
    const controller = new AbortController();
    refreshSubcategoryOverview(controller.signal);
    return () => controller.abort();
  }, [refreshSubcategoryOverview]);

  useEffect(() => {
    const controller = new AbortController();
    refreshTables(controller.signal);
    return () => controller.abort();
  }, [refreshTables]);

  const fetchVendorSiteScoresPage = async (page, signal) => {
    const params = buildAssessmentQueryParams({ page });
    const res = await fetch(
      `${baseURL}vendor_assement_dashboard/vendor_site_scores.json?${params.toString()}`,
      { signal },
    );
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];
    setScoresRows(
      rows.map((r) => ({
        organizationName: r.organization_name,
        siteName: r.site_name,
        category: r.category,
        subCategory: r.sub_category_name,
        firstName: r.first_name,
        lastName: r.last_name,
        riskCategory: r.risk_category,
        givenScore: r.given_score,
        siteScore: r.site_score,
        vendorAvgScore: r.vendor_avg_score,
        remark: r.remark,
      })),
    );
    setScoresPagination({
      current_page: Number(json?.page ?? page) || page,
      per_page: Number(json?.per_page ?? 50) || 50,
      total_pages: Number(json?.total_pages ?? 1) || 1,
      total_records: Number(json?.total_rows ?? 0) || 0,
    });
  };

  const fetchAllVendorSiteScores = async (signal) => {
    const all = [];
    let page = 1;
    let totalPages = 1;
    do {
      const params = buildAssessmentQueryParams({ page });
      const res = await fetch(
        `${baseURL}vendor_assement_dashboard/vendor_site_scores.json?${params.toString()}`,
        { signal },
      );
      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : [];
      rows.forEach((r) => all.push(r));
      totalPages = Number(json?.total_pages ?? 1) || 1;
      page += 1;
    } while (page <= totalPages);
    return all;
  };

  const fetchLeaderboardPage = async (page, signal) => {
    const params = buildAssessmentQueryParams({ page });
    const res = await fetch(
      `${baseURL}vendor_assement_dashboard/leaderboard.json?${params.toString()}`,
      { signal },
    );
    const json = await res.json();
    const rows = Array.isArray(json?.data) ? json.data : [];

    setLeaderboardRows(
      rows.map((r) => ({
      supplierId: r.supplier_id,
        organizationName: r.organization_name,
        siteName: r.site_name,
        bestSiteName: r.best_site_name,
        worstSiteName: r.worst_site_name,
        
        bestSiteScore: r.best_site_score,
        worstSiteScore: r.worst_site_score,
        avgScore: r.avg_score,
        variancePct: r.variance_pct,
      })),
    );

    setLeaderboardPagination({
      current_page: Number(json?.page ?? page) || page,
      per_page: Number(json?.per_page ?? 50) || 50,
      total_pages: Number(json?.total_pages ?? 1) || 1,
      total_records: Number(json?.total_rows ?? 0) || 0,
    });
  };

  const fetchAllLeaderboard = async (signal) => {
    const all = [];
    let page = 1;
    let totalPages = 1;
    do {
      const params = buildAssessmentQueryParams({ page });
      const res = await fetch(
        `${baseURL}vendor_assement_dashboard/leaderboard.json?${params.toString()}`,
        { signal },
      );
      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : [];
      rows.forEach((r) => all.push(r));
      totalPages = Number(json?.total_pages ?? 1) || 1;
      page += 1;
    } while (page <= totalPages);
    return all;
  };

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();

    const run = async () => {
      setIsScoresLoading(true);
      try {
        await fetchVendorSiteScoresPage(1, controller.signal);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Scores fetch error:", e);
        setScoresRows([]);
        setScoresPagination({
          current_page: 1,
          per_page: 50,
          total_pages: 1,
          total_records: 0,
        });
      } finally {
        setIsScoresLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [
    token,
    dateRange?.startDate,
    dateRange?.endDate,
    activeFilters.departmentIds,
    activeFilters.vendorIds,
    activeFilters.siteId,
    activeFilters.categoryId,
    activeFilters.subCategoryId,
    activeFilters.fiscal_year,
    activeFilters.assessment_half,
  ]);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();

    const run = async () => {
      setIsLeaderboardLoading(true);
      try {
        await fetchLeaderboardPage(1, controller.signal);
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Leaderboard fetch error:", e);
        setLeaderboardRows([]);
        setLeaderboardPagination({
          current_page: 1,
          per_page: 50,
          total_pages: 1,
          total_records: 0,
        });
      } finally {
        setIsLeaderboardLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [
    token,
    dateRange?.startDate,
    dateRange?.endDate,
    activeFilters.departmentIds,
    activeFilters.vendorIds,
    activeFilters.siteId,
    activeFilters.categoryId,
    activeFilters.subCategoryId,
    activeFilters.fiscal_year,
    activeFilters.assessment_half,
  ]);

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
                        <VendorSectionSelector
                          data={VENDER_ASSESMENT_CONFIG}
                          dashboardType="assessment"
                          onSelectionChange={setVisibleSections}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <VendorFilterCard
                  onApplyFilters={(filters) => {
                    setDateRange({
                      startDate: filters.startDate,
                      endDate: filters.endDate,
                    });
                    setActiveFilters({
                      companyId: filters.companyId || "",
                      departmentIds: filters.departmentName || "",
                      vendorIds: filters.vendors || "",
                      siteId: filters.siteId || "",
                      categoryId: filters.categoryId || "",
                      subCategoryId: filters.subCategoryId || "",
                      fiscal_year: filters.fiscal_year || "",
                      assessment_half: filters.assessment_half || "",
                    });
                  }}
                  currentStartDate={dateRange.startDate}
                  currentEndDate={dateRange.endDate}
                  token={token}
                  enableAssessmentDropdowns={true}
                  showAssessmentPeriodFilters={true}
                />

                {/* Stat Cards */}
                <div className="row g-3 mb-4">
                  {show("TotalapprovedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard title="Total Approved Vendors" height={120} />
                      ) : (
                        <VendorStatCard
                          title="Total Approved Vendors"
                          value={statData.TotalapprovedVendors}
                        />
                      )}
                    </div>
                  )}
                  {show("TotalAssesmentCount") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard title="Total Assessment Count" height={120} />
                      ) : (
                        <VendorStatCard
                          title="Total Assessment Count"
                          value={statData.TotalAssesmentCount}
                        />
                      )}
                    </div>
                  )}
                  {show("FullyCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard title="Fully Completed" height={120} />
                      ) : (
                        <VendorStatCard
                          title="Fully Completed"
                          value={statData.FullyCompleted}
                        />
                      )}
                    </div>
                  )}
                  {show("PartiallyCompleted") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard title="Partially Completed" height={120} />
                      ) : (
                        <VendorStatCard
                          title="Partially Completed"
                          value={statData.PartiallyCompleted}
                        />
                      )}
                    </div>
                  )}
                  {show("Pending") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard title="Pending" height={120} />
                      ) : (
                        <VendorStatCard title="Pending" value={statData.Pending} />
                      )}
                    </div>
                  )}
                  {show("TotalUniqueVendorCountForAssessment") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard
                          title="Total Unique Vendor Count For Assessment"
                          height={120}
                        />
                      ) : (
                        <VendorStatCard
                          title="Total Unique Vendor Count For Assessment"
                          value={statData.TotalUniqueVendorCountForAssessment}
                        />
                      )}
                    </div>
                  )}
                  {show("TotalQualifiedVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard
                          title="Total Qualified Vendors (Above 50%)"
                          height={120}
                        />
                      ) : (
                        <VendorStatCard
                          title="Total Qualified Vendors (Above 50%)"
                          value={statData.TotalQualifiedVendors}
                        />
                      )}
                    </div>
                  )}
                  {show("DisqualifiedVendorDuetoRatingNotGiven") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard
                          title="Disqualified Vendor Due to Rating Not Given"
                          height={120}
                        />
                      ) : (
                        <VendorStatCard
                          title="Disqualified Vendor Due to Rating Not Given"
                          value={
                            statData.DisqualifiedVendorDuetoRatingNotGiven === 0
                              ? 0
                              : statData.DisqualifiedVendorDuetoRatingNotGiven
                          }
                        />
                      )}
                    </div>
                  )}
                  {show("TotalDisqualifiedVendorsDuetoRating") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard
                          title="Total Disqualified Vendors Due to Rating (Below 50%)"
                          height={120}
                        />
                      ) : (
                        <VendorStatCard
                          title="Total Disqualified Vendors Due to Rating (Below 50%)"
                          value={statData.TotalDisqualifiedVendorsDuetoRating}
                        />
                      )}
                    </div>
                  )}
                  {show("TotalWatchlistVendors") && (
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      {isKpiLoading && !kpiResponse ? (
                        <LoadingCard
                          title="Total Watchlist Vendors (50% to 60%)"
                          height={120}
                        />
                      ) : (
                        <VendorStatCard
                          title="Total Watchlist Vendors (50% to 60%)"
                          value={statData.TotalWatchlistVendors}
                        />
                      )}
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
                                {isKpiLoading && !kpiResponse ? (
                                  <LoadingCard
                                    title="Count of Assessments by Grade"
                                    height={220}
                                  />
                                ) : (
                                  <GradeAssessmentBar
                                    title="Count of Assessments by Grade"
                                    data={gradeData}
                                    onDownload={() => {}}
                                    onRefresh={async () => {
                                      const controller = new AbortController();
                                      await refreshKpisAndGrades(
                                        controller.signal,
                                      );
                                    }}
                                  />
                                )}
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
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      {isTopBottomLoading &&
                                      !topBottomResponse ? (
                                        <LoadingCard
                                          title="Top / Bottom Vendors by Avg Score"
                                          height={520}
                                        />
                                      ) : (
                                        <TopBottomVendorsChart
                                          topData={topVendorsData}
                                          bottomData={bottomVendorsData}
                                          valueKey="avgWantedScore"
                                          xAxisLabel="Supplier Avg Score"
                                          topTitle="Top 10 Vendors by Avg Score"
                                          bottomTitle="Bottom 10 Vendors by Avg Score"
                                          tooltipScoreLabel="Avg Score"
                                          tooltipScoreSuffix=""
                                          daysKey="wantedDays"
                                          tooltipDaysLabel="Days"
                                          onDownload={async () => {
                                            exportChartData(
                                              [
                                                ...(topVendorsData || []).map(
                                                  (x) => ({
                                                    ...x,
                                                    list: "Top",
                                                  }),
                                                ),
                                                ...(bottomVendorsData || []).map(
                                                  (x) => ({
                                                    ...x,
                                                    list: "Bottom",
                                                  }),
                                                ),
                                              ],
                                              "top_bottom_vendors",
                                            );
                                          }}
                                          onRefresh={async () => {
                                            const controller =
                                              new AbortController();
                                            await refreshTopBottom(
                                              controller.signal,
                                            );
                                          }}
                                        />
                                      )}
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Not Given Rating - Full Width (independent)
                          if (chartId === "row1_col2_notGivenRating") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <VendorDataTable
                                        title="Name of Approver Who Have Not Given Rating"
                                        columns={NOT_GIVEN_RATING_COLUMNS}
                                        data={noRatingRows}
                                        loading={isNoRatingLoading}
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshTables(controller.signal);
                                        }}
                                        onDownload={async ({ columns }) => {
                                          const rows = await fetchAllVendorProjectList(
                                            "no_rating",
                                          );
                                          const mapped = (rows || []).map((r) => ({
                                            organizationName: r.vendor_name,
                                            siteName: r.project_name,
                                            approverName: r.approver_name || "",
                                            category: r.category_name,
                                          }));
                                          exportTableToCsv(
                                            mapped,
                                            columns,
                                            "no_rating_vendors",
                                          );
                                        }}
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
                                        columns={WATCHLIST_COLUMNS}
                                        data={watchlistRows}
                                        loading={isWatchlistLoading}
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshTables(controller.signal);
                                        }}
                                        onDownload={async ({ columns }) => {
                                          const rows = await fetchAllVendorProjectList(
                                            "watchlist",
                                          );
                                          const mapped = (rows || []).map((r) => ({
                                            organizationName: r.vendor_name,
                                            siteName: r.project_name,
                                            avgScore: r.avg_percentage,
                                          }));
                                          exportTableToCsv(
                                            mapped,
                                            columns,
                                            "watchlist_vendors",
                                          );
                                        }}
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
                                                  DISQUALIFIED_COLUMNS
                                                }
                                                data={disqualifiedRows}
                                                loading={isDisqualifiedLoading}
                                                onDownload={async ({ columns }) => {
                                                  const rows =
                                                    await fetchAllVendorProjectList(
                                                      "disqualified",
                                                    );
                                                  const mapped = (rows || []).map(
                                                    (r) => ({
                                                      organizationName:
                                                        r.vendor_name,
                                                      siteName: r.project_name,
                                                      avgScore: r.avg_percentage,
                                                    }),
                                                  );
                                                  exportTableToCsv(
                                                    mapped,
                                                    columns,
                                                    "disqualified_vendors",
                                                  );
                                                }}
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
                                        columns={DISQUALIFIED_COLUMNS}
                                        data={disqualifiedRows}
                                        loading={isDisqualifiedLoading}
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshTables(controller.signal);
                                        }}
                                        onDownload={async ({ columns }) => {
                                          const rows = await fetchAllVendorProjectList(
                                            "disqualified",
                                          );
                                          const mapped = (rows || []).map((r) => ({
                                            organizationName: r.vendor_name,
                                            siteName: r.project_name,
                                            avgScore: r.avg_percentage,
                                          }));
                                          exportTableToCsv(
                                            mapped,
                                            columns,
                                            "disqualified_vendors",
                                          );
                                        }}
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
                                {isVendorsByGradeLoading &&
                                !vendorsByGradeResponse ? (
                                  <LoadingCard
                                    title="Count of Vendors by Grade"
                                    height={220}
                                  />
                                ) : (
                                  <GradeAssessmentBar
                                    title="Count of Vendors by Grade"
                                    data={vendorsByGradeData}
                                    onDownload={() => {}}
                                    onRefresh={async () => {
                                      const controller = new AbortController();
                                      await refreshVendorsByGrade(
                                        controller.signal,
                                      );
                                    }}
                                  />
                                )}
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
                                  columns={SCORES_COLUMNS}
                                  data={scoresRows}
                                  loading={isScoresLoading}
                                  pagination={scoresPagination}
                                  onRefresh={async () => {
                                    const controller = new AbortController();
                                    setIsScoresLoading(true);
                                    try {
                                      await fetchVendorSiteScoresPage(
                                        1,
                                        controller.signal,
                                      );
                                    } finally {
                                      setIsScoresLoading(false);
                                    }
                                  }}
                                  onPageChange={async (page) => {
                                    const controller = new AbortController();
                                    setIsScoresLoading(true);
                                    try {
                                      await fetchVendorSiteScoresPage(
                                        page,
                                        controller.signal,
                                      );
                                    } finally {
                                      setIsScoresLoading(false);
                                    }
                                  }}
                                  onDownload={async ({ columns }) => {
                                    const controller = new AbortController();
                                    const rows = await fetchAllVendorSiteScores(
                                      controller.signal,
                                    );
                                    const mapped = (rows || []).map((r) => ({
                                      organizationName: r.organization_name,
                                      siteName: r.site_name,
                                      category: r.category,
                                      subCategory: r.sub_category_name,
                                      firstName: r.first_name,
                                      lastName: r.last_name,
                                      riskCategory: r.risk_category,
                                      givenScore: r.given_score,
                                      siteScore: r.site_score,
                                      vendorAvgScore: r.vendor_avg_score,
                                      remark: r.remark,
                                    }));
                                    exportTableToCsv(
                                      mapped,
                                      columns,
                                      "vendor_site_scores",
                                    );
                                  }}
                                />
                              </SortableChartItem>
                            </div>
                          );
                        }

                        // ROW 3: Submitted vs Pending + Submitted Overview (full width)
                        if (
                          (chartId === "row3_col1_submittedPending" &&
                            show("submittedPendingOverview")) ||
                          (chartId === "row3_col2_submittedOverview" &&
                            show("submittedAssessmentOverview"))
                        ) {
                          if (chartId === "row3_col1_submittedPending") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <SubmittedPendingOverview
                                        data={
                                          isSubcategoryOverviewLoading &&
                                          !subcategoryOverviewResponse
                                            ? []
                                            : submittedPendingData
                                        }
                                        onDownload={() =>
                                          exportChartData(
                                            submittedPendingData,
                                            "submitted_vs_pending_overview",
                                          )
                                        }
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshSubcategoryOverview(
                                            controller.signal,
                                          );
                                        }}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Submitted Assessment Overview - Full Width (independent)
                          if (chartId === "row3_col2_submittedOverview") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <SubmittedAssessmentOverview
                                        data={
                                          isSubcategoryOverviewLoading &&
                                          !subcategoryOverviewResponse
                                            ? []
                                            : submittedAssessmentOverviewData
                                        }
                                        onDownload={() =>
                                          exportChartData(
                                            submittedAssessmentOverviewData,
                                            "submitted_assessment_overview",
                                          )
                                        }
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshSubcategoryOverview(
                                            controller.signal,
                                          );
                                        }}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }

                        // ROW 4: Percentage Completion + Category Risk (full width)
                        if (
                          (chartId === "row4_col1_percentage" &&
                            show("percentageCompletion")) ||
                          (chartId === "row4_col2_categoryRisk" &&
                            show("categoryWiseRiskFlag"))
                        ) {
                          if (chartId === "row4_col1_percentage") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <PercentageCompletionChart
                                        data={
                                          isSubcategoryOverviewLoading &&
                                          !subcategoryOverviewResponse
                                            ? []
                                            : percentageCompletionData
                                        }
                                        onDownload={() =>
                                          exportChartData(
                                            percentageCompletionData,
                                            "percentage_completion",
                                          )
                                        }
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshSubcategoryOverview(
                                            controller.signal,
                                          );
                                        }}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // Category Wise Risk Flag - Full Width (independent)
                          if (chartId === "row4_col2_categoryRisk") {
                            return (
                              <div key={chartId} className="mt-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <CategoryWiseRiskFlag
                                        data={
                                          isSubcategoryOverviewLoading &&
                                          !subcategoryOverviewResponse
                                            ? []
                                            : categoryRiskFlagData
                                        }
                                        onDownload={() =>
                                          exportChartData(
                                            categoryRiskFlagData,
                                            "category_wise_risk_flag",
                                          )
                                        }
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          await refreshSubcategoryOverview(
                                            controller.signal,
                                          );
                                        }}
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
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      <VendorDataTable
                                        title="Leader Board"
                                        columns={LEADERBOARD_COLUMNS}
                                        data={leaderboardRows}
                                        loading={isLeaderboardLoading}
                                        pagination={leaderboardPagination}
                                        onRefresh={async () => {
                                          const controller =
                                            new AbortController();
                                          setIsLeaderboardLoading(true);
                                          try {
                                            await fetchLeaderboardPage(
                                              1,
                                              controller.signal,
                                            );
                                          } finally {
                                            setIsLeaderboardLoading(false);
                                          }
                                        }}
                                        onPageChange={async (page) => {
                                          const controller =
                                            new AbortController();
                                          setIsLeaderboardLoading(true);
                                          try {
                                            await fetchLeaderboardPage(
                                              page,
                                              controller.signal,
                                            );
                                          } finally {
                                            setIsLeaderboardLoading(false);
                                          }
                                        }}
                                        onDownload={async ({ columns }) => {
                                          const controller =
                                            new AbortController();
                                          const rows =
                                            await fetchAllLeaderboard(
                                              controller.signal,
                                            );
                                          const mapped = (rows || []).map(
                                            (r) => ({
                                              supplierId: r.supplier_id,
                                              organizationName:
                                                r.organization_name,
                                            
                                              bestSiteName: r.best_site_name,

                                              bestSiteScore: r.best_site_score,
                                              worstSiteName: r.worst_site_name,
                                              worstSiteScore:
                                                r.worst_site_score,
                                              avgScore: r.avg_score,
                                              variancePct: r.variance_pct,
                                            }),
                                          );
                                          exportTableToCsv(
                                            mapped,
                                            columns,
                                            "leaderboard",
                                          );
                                        }}
                                      />
                                    </SortableChartItem>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          // अगर ये दूसरा कॉलम है
                          if (
                            chartId === "row5_col2_onTimeCompletion"
                          ) {
                            return (
                              <div key={chartId} className="mt-4 mb-4">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <SortableChartItem id={chartId}>
                                      {isKpiLoading && !kpiResponse ? (
                                        <LoadingCard
                                          title="On-Time Completion"
                                          height={220}
                                        />
                                      ) : (
                                        <OnTimeCompletion
                                          submitted={
                                            Number(
                                              kpiResponse?.assessment_status
                                                ?.fully_completed ?? 0,
                                            ) || 0
                                          }
                                          totalAssessments={
                                            Number(
                                              kpiResponse?.kpis
                                                ?.total_assessment_count ?? 0,
                                            ) || 0
                                          }
                                          onDownload={() => {}}
                                          onRefresh={async () => {
                                            const controller =
                                              new AbortController();
                                            await refreshKpisAndGrades(
                                              controller.signal,
                                            );
                                          }}
                                        />
                                      )}
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendersAssesmentDashboard;
