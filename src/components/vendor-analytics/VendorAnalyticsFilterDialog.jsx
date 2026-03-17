import React, { useEffect, useMemo, useState } from "react";
import { Building2, Calendar, Layers, ListTree, MapPin, X } from "lucide-react";
import { baseURL } from "@/confi/apiDomain";

export const VendorAnalyticsFilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentStartDate,
  currentEndDate,
  token,
  currentCompanyId = "",
  currentSiteId = "",
  currentCategoryId = "",
  currentSubCategoryId = "",
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [companyId, setCompanyId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [companies, setCompanies] = useState([]);
  const [sites, setSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingSites, setLoadingSites] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const hasToken = Boolean(token);
  const canLoadCompanyScoped = hasToken && Boolean(companyId);

  // Convert DD/MM/YYYY to YYYY-MM-DD for HTML input
  const convertToHTMLDate = (ddmmyyyy) => {
    if (!ddmmyyyy) return "";
    const parts = ddmmyyyy.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Convert YYYY-MM-DD to DD/MM/YYYY
  const convertToDDMMYYYY = (yyyymmdd) => {
    if (!yyyymmdd) return "";
    const parts = yyyymmdd.split("-");
    if (parts.length !== 3) return "";
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  const normalizeOptions = (raw) => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    if (raw?.data && typeof raw.data === "object") {
      const arr = Object.values(raw.data).find((v) => Array.isArray(v));
      if (Array.isArray(arr)) return arr;
    }
    if (typeof raw === "object") {
      const arr = Object.values(raw).find((v) => Array.isArray(v));
      if (Array.isArray(arr)) return arr;
    }
    return [];
  };

  const getId = (item) =>
    String(item?.id ?? item?.value ?? item?.company_id ?? item?.companyId ?? "");
  const getName = (item) =>
    String(
      item?.name ??
        item?.label ??
        item?.company_name ??
        item?.companyName ??
        "",
    );

  const calculateDaysSelected = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  // Initialize values when dialog opens
  useEffect(() => {
    if (!isOpen) return;
    setStartDate(convertToHTMLDate(currentStartDate));
    setEndDate(convertToHTMLDate(currentEndDate));
    setCompanyId(currentCompanyId ? String(currentCompanyId) : "");
    setSiteId(currentSiteId ? String(currentSiteId) : "");
    setCategoryId(currentCategoryId ? String(currentCategoryId) : "");
    setSubCategoryId(currentSubCategoryId ? String(currentSubCategoryId) : "");
  }, [
    isOpen,
    currentStartDate,
    currentEndDate,
    currentCompanyId,
    currentSiteId,
    currentCategoryId,
    currentSubCategoryId,
  ]);

  // Companies list
  useEffect(() => {
    if (!isOpen || !hasToken) return;
    if (companies.length > 0) return;

    const controller = new AbortController();
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_pq_dashboard/company_slicer.json?token=${token}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setCompanies(normalizeOptions(json));
      } catch (e) {
        if (e?.name !== "AbortError") console.error("Companies fetch error", e);
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
    return () => controller.abort();
  }, [isOpen, hasToken, token, companies.length]);

  // Clear dependent selections when company changes
  useEffect(() => {
    if (!isOpen) return;
    setSiteId("");
    setCategoryId("");
    setSubCategoryId("");
    setSites([]);
    setCategories([]);
    setSubCategories([]);
  }, [companyId, isOpen]);

  // Sites + Categories (company-scoped)
  useEffect(() => {
    if (!isOpen || !canLoadCompanyScoped) return;

    const controller = new AbortController();

    const fetchSites = async () => {
      setLoadingSites(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/sites_filter.json?token=${token}&company_id=${companyId}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setSites(normalizeOptions(json?.sites ?? json));
      } catch (e) {
        if (e?.name !== "AbortError") console.error("Sites fetch error", e);
      } finally {
        setLoadingSites(false);
      }
    };

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await fetch(
          `${baseURL}vendor_assement_dashboard/category_filter.json?token=${token}&company_ids=${companyId}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setCategories(normalizeOptions(json?.category ?? json));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Categories fetch error", e);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchSites();
    fetchCategories();

    return () => controller.abort();
  }, [isOpen, canLoadCompanyScoped, token, companyId]);

  // Subcategories (category-wise if supported)
  useEffect(() => {
    if (!isOpen || !canLoadCompanyScoped) return;

    const controller = new AbortController();
    const fetchSubCategories = async () => {
      setLoadingSubCategories(true);
      try {
        const base =
          `${baseURL}vendor_assement_dashboard/sub_category_filter.json?token=${token}` +
          `&company_ids=${companyId}`;
        const url = categoryId ? `${base}&category_id=${categoryId}` : base;
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        setSubCategories(normalizeOptions(json?.sub_category ?? json));
      } catch (e) {
        if (e?.name !== "AbortError")
          console.error("Subcategories fetch error", e);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchSubCategories();
    return () => controller.abort();
  }, [isOpen, canLoadCompanyScoped, token, companyId, categoryId]);

  const companyOptions = useMemo(() => {
    return (companies || []).map((c) => {
      // Support array-of-tuples ([name,id])
      if (Array.isArray(c) && c.length >= 2) {
        const [name, id] = c;
        return { id: String(id), name: String(name) };
      }
      return { id: getId(c), name: getName(c) };
    });
  }, [companies]);

  const handleApply = () => {
    if (!startDate || !endDate) return;
    onApplyFilters({
      startDate: convertToDDMMYYYY(startDate),
      endDate: convertToDDMMYYYY(endDate),
      companyId: companyId || "",
      siteId: siteId || "",
      categoryId: categoryId || "",
      subCategoryId: subCategoryId || "",
    });
    onClose();
  };

  const handleClear = () => {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onApplyFilters({
      startDate: formatDate(lastYear),
      endDate: formatDate(today),
      companyId: "",
      siteId: "",
      categoryId: "",
      subCategoryId: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  const labelClass =
    "block text-sm font-semibold text-gray-700 mb-1.5 select-none";
  const inputClass =
    "w-full pl-10 pr-3 h-11 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#C72030]/20 focus:border-[#C72030] transition-colors appearance-none";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg text-[#C72030]">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 m-0">
              Filter Assessment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Date Range */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Assessment Date Range <span className="text-[#C72030]">*</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            {startDate && endDate && (
              <div className="mt-3 text-xs font-medium text-[#C72030] bg-red-50 inline-block px-2.5 py-1 rounded-md border border-red-100">
                {calculateDaysSelected()} days selected
              </div>
            )}
          </div>

          {/* Company / Site / Category / Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Company <span className="text-[#C72030]">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  disabled={!hasToken || loadingCompanies}
                  className={inputClass}
                >
                  <option value="">
                    {!hasToken
                      ? "Token missing (login again)"
                      : loadingCompanies
                        ? "Loading companies..."
                        : "Select Company"}
                  </option>
                  {companyOptions
                    .filter((c) => c.id && c.name)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Site</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                  disabled={!canLoadCompanyScoped || loadingSites}
                  className={inputClass}
                >
                  <option value="">
                    {!canLoadCompanyScoped
                      ? "Select company first"
                      : loadingSites
                        ? "Loading sites..."
                        : "All Sites"}
                  </option>
                  {sites
                    .map((s) => ({ id: getId(s), name: getName(s) }))
                    .filter((s) => s.id && s.name)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <Layers className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={!canLoadCompanyScoped || loadingCategories}
                  className={inputClass}
                >
                  <option value="">
                    {!canLoadCompanyScoped
                      ? "Select company first"
                      : loadingCategories
                        ? "Loading categories..."
                        : "All Categories"}
                  </option>
                  {categories
                    .map((c) => ({ id: getId(c), name: getName(c) }))
                    .filter((c) => c.id && c.name)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Subcategory</label>
              <div className="relative">
                <ListTree className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={subCategoryId}
                  onChange={(e) => setSubCategoryId(e.target.value)}
                  disabled={!canLoadCompanyScoped || loadingSubCategories}
                  className={inputClass}
                >
                  <option value="">
                    {!canLoadCompanyScoped
                      ? "Select company first"
                      : loadingSubCategories
                        ? "Loading subcategories..."
                        : "All Subcategories"}
                  </option>
                  {subCategories
                    .map((sc) => ({ id: getId(sc), name: getName(sc) }))
                    .filter((sc) => sc.id && sc.name)
                    .map((sc) => (
                      <option key={sc.id} value={sc.id}>
                        {sc.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={handleClear}
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
          >
            Reset to Default
          </button>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!startDate || !endDate}
              className="flex-1 sm:flex-none px-6 py-2 bg-[#C72030] text-white hover:bg-[#a51926] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold text-sm shadow-sm transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
