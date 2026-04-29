import React, { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Building2,
  Layers,
  Users,
  Calendar,
  CalendarDays,
  MapPin,
  ListTree,
  Loader2,
} from "lucide-react";
import Select, { components } from "react-select";
import { baseURL } from "../../confi/apiDomain";

const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={props.isSelected || (props.value === "all" && props.selectProps.value.length === props.selectProps.options.length - 1 && props.selectProps.options.length > 1)}
          onChange={() => null}
          style={{ cursor: "pointer" }}
        />
        <span>{props.label}</span>
      </div>
    </components.Option>
  );
};

const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue, selectProps } = props;
  const selected = getValue();
  const options = selectProps.options || [];
  
  // Find if all regular options are selected (excluding "all" option if it exists)
  const regularOptions = options.filter(opt => opt.value !== 'all');
  const isAllSelected = selected.length >= regularOptions.length && regularOptions.length > 0;

  return (
    <components.ValueContainer {...props}>
      {hasValue && !selectProps.inputValue && (
        <span style={{ position: 'absolute', left: '10px', fontWeight: '600', color: '#1A1A1A', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
          {isAllSelected ? "All" : `${selected.length} Selected`}
        </span>
      )}
      {children}
    </components.ValueContainer>
  );
};

const FilterCardItem = ({
  icon: Icon,
  label,
  value,
  onChange,
  isLoading,
  options,
  disabled,
  hasDropdown = true,
  isMulti = true,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#F6F4EE",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minHeight: "100px",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Icon Box */}
      <div
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#e8e3d9",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#8b7355",
        }}
      >
        {Icon && <Icon size={24} />}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <label
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#6b7280",
            marginBottom: "6px",
            display: "block",
          }}
        >
          {label}
        </label>
        {hasDropdown ? (
          <Select
            isMulti={isMulti}
            options={
              isMulti ? [{ value: "all", label: "Select All" }, ...options] : options
            }
            value={value}
            onChange={(selected, actionMeta) => {
              if (!isMulti) {
                onChange(selected || null);
                return;
              }
              if (
                actionMeta.action === "select-option" &&
                actionMeta.option.value === "all"
              ) {
                onChange(options);
              } else if (
                actionMeta.action === "deselect-option" &&
                actionMeta.option.value === "all"
              ) {
                onChange([]);
              } else {
                onChange(selected || []);
              }
            }}
            disabled={disabled || isLoading}
            placeholder={isLoading ? "Loading..." : ""}
            isSearchable={true}
            components={{ Option: CustomOption, ValueContainer }}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: disabled ? "#f3f4f6" : "white",
                borderColor: "#d1d5db",
                minHeight: "40px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: disabled ? "not-allowed" : "pointer",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#d1d5db",
                }
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
                color: "#1A1A1A",
                cursor: "pointer",
                "&:active": {
                  backgroundColor: "#f3f4f6",
                },
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                }
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9ca3af",
              }),
              multiValue: (base) => ({
                display: "none",
              }),
              valueContainer: (base) => ({
                ...base,
                paddingLeft: "10px",
              }),
              input: (base) => ({
                ...base,
                fontWeight: "600",
                color: "#1A1A1A",
              }),
            }}
          />
        ) : (
          <input
            type="date"
            value={value}
            onChange={onChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1A1A1A",
              backgroundColor: "white",
              outline: "none",
            }}
          />
        )}
      </div>
    </div>
  );
};

export const VendorFilterCard = ({
  onApplyFilters,
  currentStartDate,
  currentEndDate,
  token, // Added token prop
  currentPqType = "with_pq",
  enableAssessmentDropdowns = false,
  showAssessmentPeriodFilters = false, // Fiscal Year + Half Yearly (only where needed)
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyName, setCompanyName] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [pqType, setPqType] = useState("with_pq");

  const [site, setSite] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [fiscalYear, setFiscalYear] = useState([]);
  const [halfYearly, setHalfYearly] = useState([]);

  const [fiscalYearsList, setFiscalYearsList] = useState([]);
  const [halvesList, setHalvesList] = useState([]);
  const [isLoadingFiscalYears, setIsLoadingFiscalYears] = useState(false);
  const [isLoadingHalves, setIsLoadingHalves] = useState(false);

  const [sitesList, setSitesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [isLoadingSites, setIsLoadingSites] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false);

  const [companiesList, setCompaniesList] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);
  
  const [hasInitialFetch, setHasInitialFetch] = useState(false);
  // Use a ref so the initial-apply guard survives re-renders without triggering effects
  const initialApplied = useRef(false);
  const companiesLoadedRef = useRef(false);

  const [isApplying, setIsApplying] = useState(false);

  const companyIdsKey = (companyName || [])
    .map((c) => c?.value)
    .filter((v) => v !== undefined && v !== null && String(v).length > 0)
    .map((v) => String(v))
    .join(",");

  const departmentIdsKey = (departmentName || [])
    .map((d) => d?.value)
    .filter((v) => v !== undefined && v !== null && String(v).length > 0)
    .map((v) => String(v))
    .join(",");

  useEffect(() => {
    const formatForInput = (dateStr) => {
      if (!dateStr) return "";
      const parts = dateStr.split("/");
      if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
      return dateStr;
    };
    const defaultStart = "01/01/2024";
    setStartDate(formatForInput(currentStartDate || defaultStart));
    setEndDate(formatForInput(currentEndDate));
    setPqType(currentPqType || "with_pq");
  }, [currentStartDate, currentEndDate, currentPqType]);

  useEffect(() => {
    // 1. Fetch Companies
    const fetchCompanies = async () => {
      setIsLoadingCompanies(true);
      try {
        const response = await fetch(`${baseURL}vendor_pq_dashboard/company_slicer.json?token=${token}`);
        const data = await response.json();
        const arr = data.data || (Array.isArray(data) ? data : []);
        setCompaniesList(arr);
        const allCompanies = arr.map(c => ({ value: c.id || c.name || c, label: c.name || c.company_name || c }));
        setCompanyName(allCompanies);
        companiesLoadedRef.current = true;
      } catch (err) { console.error("Error fetching companies:", err); }
      finally { setIsLoadingCompanies(false); }
    };

    // 2. Fetch Departments (Independent of Company)
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true);
      try {
        const response = await fetch(`${baseURL}vendor_pq_dashboard/department_slicer.json?token=${token}`);
        const data = await response.json();
        const arr = data.data || (Array.isArray(data) ? data : []);
        setDepartmentsList(arr);
        const allDepartments = arr.map(d => ({
          value: d.id || d.name || d,
          label: d.name || d.department_name || d,
        }));
        setDepartmentName(allDepartments); // default all selected
      } catch (err) { console.error("Error fetching departments:", err); }
      finally { setIsLoadingDepartments(false); }
    };

    fetchCompanies();
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Only run vendor fetch once companies have been loaded initially
    // companyName will be set by the companies fetch above
    if (companyName.length === 0 && !companiesLoadedRef.current) return;

    const fetchVendors = async () => {
      setIsLoadingVendors(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", token);
        if (companyName && companyName.length > 0) {
          queryParams.append("company_ids", companyName.map(c => c.value).join(","));
        }
        if (departmentName && departmentName.length > 0) {
          queryParams.append("department_ids", departmentName.map(d => d.value).join(","));
        }

        const response = await fetch(`${baseURL}vendor_pq_dashboard/vendors_slicer.json?${queryParams.toString()}`);
        const result = await response.json();
        const arr = result.data || (Array.isArray(result) ? result : []);
        setVendorsList(arr);

        // Fire onApplyFilters only once on initial load — never again from this effect
        // Ensure we include default "all departments" in the first apply
        if (!initialApplied.current && departmentIdsKey) {
          initialApplied.current = true;
          onApplyFilters({
            startDate: currentStartDate,
            endDate: currentEndDate,
            companyName: companyName.map(c => c.value).join(","),
            departmentName: departmentIdsKey,
            vendors: "",
            pqType: currentPqType || "with_pq",
          });
        }
      } catch (err) { console.error("Error fetching vendors:", err); setVendorsList([]); }
      finally { setIsLoadingVendors(false); }
    };

    fetchVendors();
    // Only re-fetch vendors when user manually changes company or department selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName, departmentName]);

  // Fiscal Year + Half Yearly filters (assessment dashboard only)
  useEffect(() => {
    if (!showAssessmentPeriodFilters) return;
    if (!token) return;

    const controller = new AbortController();

    const normalizeList = (json, key) => {
      const raw = json?.[key];
      if (Array.isArray(raw)) return raw;
      if (json?.data && Array.isArray(json.data)) return json.data;
      if (json?.data && Array.isArray(json.data?.[key])) return json.data[key];
      return [];
    };

    const fetchFiscalYears = async () => {
      setIsLoadingFiscalYears(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/fiscal_year_filter.json?token=${encodeURIComponent(token)}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setFiscalYearsList(normalizeList(json, "fiscal_years"));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Error fetching fiscal years:", e);
        setFiscalYearsList([]);
      } finally {
        setIsLoadingFiscalYears(false);
      }
    };

    const fetchHalves = async () => {
      setIsLoadingHalves(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/assessment_half_filter.json?token=${encodeURIComponent(token)}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setHalvesList(normalizeList(json, "halves"));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Error fetching halves:", e);
        setHalvesList([]);
      } finally {
        setIsLoadingHalves(false);
      }
    };

    fetchFiscalYears();
    fetchHalves();

    return () => controller.abort();
  }, [showAssessmentPeriodFilters, token]);

  // Assessment dropdowns depend on company (single effective company: first selected)
  useEffect(() => {
    if (!enableAssessmentDropdowns) return;
    if (!token) return;

    const companyIds = companyIdsKey ? companyIdsKey.split(",") : [];
    const departmentIds = departmentIdsKey ? departmentIdsKey.split(",") : [];

    if (companyIds.length === 0) {
      setSitesList([]);
      setCategoriesList([]);
      setSubCategoriesList([]);
      setSite([]);
      setCategory([]);
      setSubCategory([]);
      return;
    }

    const controller = new AbortController();

    const normalize = (json) => {
      if (!json) return [];
      if (Array.isArray(json)) return json;
      if (json?.data && Array.isArray(json.data)) return json.data;
      if (json?.sites && Array.isArray(json.sites)) return json.sites;
      if (json?.category && Array.isArray(json.category)) return json.category;
      if (json?.sub_category && Array.isArray(json.sub_category))
        return json.sub_category;
      const arr = typeof json === "object"
        ? Object.values(json).find((v) => Array.isArray(v))
        : null;
      return Array.isArray(arr) ? arr : [];
    };

    const fetchSites = async () => {
      setIsLoadingSites(true);
      try {
        const deptParam =
          departmentIds.length > 0
            ? `&department_ids=${encodeURIComponent(departmentIds.join(","))}`
            : "";

        // Call API ONCE with all company ids (when multiple selected).
        // Use company_id for single selection to match existing backend behavior.
        const companyParam =
          companyIds.length <= 1
            ? `company_id=${encodeURIComponent(companyIds[0] || "")}`
            : `company_ids=${encodeURIComponent(companyIds.join(","))}`;

        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/sites_filter.json?token=${token}&${companyParam}${deptParam}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setSitesList(normalize(json?.sites ?? json));
      } catch (e) {
        if (e?.name !== "AbortError") console.error("Error fetching sites:", e);
        setSitesList([]);
      } finally {
        setIsLoadingSites(false);
      }
    };

    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/category_filter.json?token=${token}&company_ids=${encodeURIComponent(companyIds.join(","))}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setCategoriesList(normalize(json?.category ?? json));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Error fetching categories:", e);
        setCategoriesList([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchSites();
    fetchCategories();

    // Clear dependent selections when company changes
    setSite([]);
    setCategory([]);
    setSubCategory([]);
    setSubCategoriesList([]);

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableAssessmentDropdowns, token, companyIdsKey, departmentIdsKey]);

  // Subcategory: depends on company + category (optional category-wise)
  useEffect(() => {
    if (!enableAssessmentDropdowns) return;
    if (!token) return;
    const companyIds = companyIdsKey ? companyIdsKey.split(",") : [];
    if (companyIds.length === 0) return;

    const controller = new AbortController();

    const normalize = (json) => {
      if (!json) return [];
      if (Array.isArray(json)) return json;
      if (json?.sub_category && Array.isArray(json.sub_category))
        return json.sub_category;
      const arr = typeof json === "object"
        ? Object.values(json).find((v) => Array.isArray(v))
        : null;
      return Array.isArray(arr) ? arr : [];
    };

    const fetchSubCategories = async () => {
      setIsLoadingSubCategories(true);
      try {
        const base =
          `${baseURL}vendor_assement_dashboard/sub_category_filter.json?token=${token}` +
          `&company_ids=${encodeURIComponent(companyIds.join(","))}`;
        // If exactly one category selected, try category-wise subcategories.
        // If multiple selected, fall back to full list (backend may not support multi).
        const url =
          Array.isArray(category) && category.length === 1 && category[0]?.value
            ? `${base}&category_id=${encodeURIComponent(category[0].value)}`
            : base;
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        setSubCategoriesList(normalize(json?.sub_category ?? json));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Error fetching subcategories:", e);
        setSubCategoriesList([]);
      } finally {
        setIsLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
    setSubCategory([]);

    return () => controller.abort();
  }, [enableAssessmentDropdowns, token, companyIdsKey, category]);

  const handleApply = async () => {
    if (startDate && endDate) {
      const formatOutput = (date) => {
        const parts = date.split("-");
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return date;
      };

      const payload = {
        startDate: formatOutput(startDate),
        endDate: formatOutput(endDate),
        companyName: companyName.map((c) => c.value).join(","),
        departmentName: departmentName.map((d) => d.value).join(","),
        vendors: vendors.map((v) => v.value).join(","),
        pqType,
        ...(showAssessmentPeriodFilters
          ? {
              fiscal_year: (fiscalYear || [])
                .map((x) => String(x.value))
                .join(","),
              assessment_half: (halfYearly || [])
                .map((x) => String(x.value))
                .join(","),
            }
          : {}),
        ...(enableAssessmentDropdowns
          ? {
              companyId: companyName?.length
                ? companyName.map((c) => String(c.value)).join(",")
                : "",
              siteId:
                Array.isArray(site) && site.length
                  ? site.map((s) => String(s.value)).join(",")
                  : "",
              categoryId:
                Array.isArray(category) && category.length
                  ? category.map((c) => String(c.value)).join(",")
                  : "",
              subCategoryId:
                Array.isArray(subCategory) && subCategory.length
                  ? subCategory.map((sc) => String(sc.value)).join(",")
                  : "",
            }
          : {}),
      };

      setIsApplying(true);
      try {
        await Promise.resolve(onApplyFilters(payload));
      } finally {
        setIsApplying(false);
      }
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

    const startDate2024 = new Date(2024, 0, 1); // 1 Jan 2024

    const allCos = companiesList.map(c => ({
      value: c.id || c.name || c,
      label: c.name || c.company_name || c,
    }));
    const allDepts = departmentsList.map(d => ({
      value: d.id || d.name || d,
      label: d.name || d.department_name || d,
    }));
    const allVs = vendorsList.map(v => ({
      value: v.id || v.name || v,
      label: v.name || v.vendor_name || v,
    }));

    setStartDate(formatDt(startDate2024));
    setEndDate(formatDt(today));
    setCompanyName(allCos);
    setDepartmentName(allDepts); // default all selected
    setVendors([]); // Start with empty selection
    setPqType("with_pq");
    setSite([]);
    setCategory([]);
    setSubCategory([]);
    setFiscalYear([]);
    setHalfYearly([]);

    onApplyFilters({
      startDate: formatOut(startDate2024),
      endDate: formatOut(today),
      companyName: allCos.map(c => c.value).join(","),
      departmentName: allDepts.map(d => d.value).join(","),
      vendors: "", // Passing empty as per requirement
      pqType: "with_pq",
      ...(showAssessmentPeriodFilters
        ? { fiscal_year: "", assessment_half: "" }
        : {}),
      ...(enableAssessmentDropdowns
        ? { companyId: allCos.map((c) => String(c.value)).join(","), siteId: "", categoryId: "", subCategoryId: "" }
        : {}),
    });
  };

  const safeCompanies = Array.isArray(companiesList) ? companiesList : [];
  const safeDepartments = Array.isArray(departmentsList) ? departmentsList : [];
  const safeVendors = Array.isArray(vendorsList) ? vendorsList : [];

  const companyOptions = safeCompanies.map((company) => ({
    value: company.id || company.name || company,
    label: company.name || company.company_name || company,
  }));

  const departmentOptions = safeDepartments.map((dept) => ({
    value: dept.id || dept.name || dept,
    label: dept.name || dept.department_name || dept,
  }));

  const vendorOptions = safeVendors.map((vendor) => ({
    value: vendor.id || vendor.name || vendor,
    label: vendor.name || vendor.vendor_name || vendor,
  }));

  const siteOptions = (Array.isArray(sitesList) ? sitesList : []).map((s) => ({
    value: s.id ?? s.value ?? "",
    label: s.name ?? s.label ?? "",
  })).filter(o => o.value && o.label);

  const categoryOptions = (Array.isArray(categoriesList) ? categoriesList : []).map((c) => ({
    value: c.id ?? c.value ?? "",
    label: c.name ?? c.label ?? "",
  })).filter(o => o.value && o.label);

  const subCategoryOptions = (Array.isArray(subCategoriesList) ? subCategoriesList : []).map((sc) => ({
    value: sc.id ?? sc.value ?? "",
    label: sc.name ?? sc.label ?? "",
  })).filter(o => o.value && o.label);

  const fiscalYearOptions = (Array.isArray(fiscalYearsList) ? fiscalYearsList : [])
    .map((fy) => ({
      value: fy?.id ?? fy?.value ?? fy,
      label: fy?.name ?? fy?.label ?? fy,
    }))
    .filter((o) => o.value && o.label);

  const halfYearlyOptions = (Array.isArray(halvesList) ? halvesList : [])
    .map((h) => ({
      value: h?.id ?? h?.value ?? h,
      label: h?.name ?? h?.label ?? h,
    }))
    .filter((o) => o.value && o.label);


  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: "#1A1A1A",
          }}
        >
          Filters
        </h2>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #d1d5db",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Filter Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <FilterCardItem
          icon={Building2}
          label="Company Name"
          value={companyName}
          onChange={(selected) => setCompanyName(selected || [])}
          isLoading={isLoadingCompanies}
          options={companyOptions}
          disabled={false}
          hasDropdown={true}
        />

        <FilterCardItem
          icon={Users}
          label="Department Name"
          value={departmentName}
          onChange={(selected) => setDepartmentName(selected || [])}
          isLoading={isLoadingDepartments}
          options={departmentOptions}
          disabled={false}
          hasDropdown={true}
        />

        <FilterCardItem
          icon={Calendar}
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          isLoading={false}
          disabled={false}
          hasDropdown={false}
        />

        <FilterCardItem
          icon={Calendar}
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          isLoading={false}
          disabled={false}
          hasDropdown={false}
        />

        <FilterCardItem
          icon={Users}
          label="Vendors"
          value={vendors}
          onChange={(selected) => setVendors(selected || [])}
          isLoading={isLoadingVendors}
          options={vendorOptions}
          disabled={false}
          hasDropdown={true}
          isMulti={true}
        />

        {showAssessmentPeriodFilters && (
          <>
            <FilterCardItem
              icon={CalendarDays}
              label="Fiscal Year"
              value={fiscalYear}
              onChange={(selected) => setFiscalYear(selected || [])}
              isLoading={isLoadingFiscalYears}
              options={fiscalYearOptions}
              disabled={false}
              hasDropdown={true}
              isMulti={true}
            />

            <FilterCardItem
              icon={CalendarDays}
              label="Half Yearly"
              value={halfYearly}
              onChange={(selected) => setHalfYearly(selected || [])}
              isLoading={isLoadingHalves}
              options={halfYearlyOptions}
              disabled={false}
              hasDropdown={true}
              isMulti={true}
            />
          </>
        )}

        {enableAssessmentDropdowns && (
          <>
            <FilterCardItem
              icon={MapPin}
              label="Site"
              value={site}
              onChange={(selected) => setSite(selected)}
              isLoading={isLoadingSites}
              options={siteOptions}
              disabled={!companyName?.length}
              hasDropdown={true}
              isMulti={true}
            />

            <FilterCardItem
              icon={Layers}
              label="Category"
              value={category}
              onChange={(selected) => setCategory(selected)}
              isLoading={isLoadingCategories}
              options={categoryOptions}
              disabled={!companyName?.length}
              hasDropdown={true}
              isMulti={true}
            />

            <FilterCardItem
              icon={ListTree}
              label="Subcategory"
              value={subCategory}
              onChange={(selected) => setSubCategory(selected)}
              isLoading={isLoadingSubCategories}
              options={subCategoryOptions}
              disabled={!companyName?.length}
              hasDropdown={true}
              isMulti={true}
            />
          </>
        )}
      </div>

      {/* Apply Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <button
          onClick={handleApply}
          disabled={isApplying}
          style={{
            backgroundColor: isApplying ? "#444" : "#1A1A1A",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: isApplying ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (isApplying) return;
            e.target.style.backgroundColor = "#333";
          }}
          onMouseLeave={(e) => {
            if (isApplying) return;
            e.target.style.backgroundColor = "#1A1A1A";
          }}
        >
          {isApplying && (
            <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#fff" }} />
          )}
          {isApplying ? "Applying..." : "Apply Filters"}
        </button>
      </div>
    </div>
  );
};
