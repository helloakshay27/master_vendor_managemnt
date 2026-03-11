import React, { useState, useEffect } from "react";
import { RotateCcw, Building2, Layers, Users, Calendar } from "lucide-react";
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

const FilterCardItem = ({ icon: Icon, label, value, onChange, isLoading, options, disabled, hasDropdown = true }) => {
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
            isMulti
            options={[{ value: "all", label: "Select All" }, ...options]}
            value={value}
            onChange={(selected, actionMeta) => {
              if (actionMeta.action === "select-option" && actionMeta.option.value === "all") {
                onChange(options);
              } else if (actionMeta.action === "deselect-option" && actionMeta.option.value === "all") {
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
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyName, setCompanyName] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [pqType, setPqType] = useState("with_pq");

  const [companiesList, setCompaniesList] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);
  
  const [hasInitialFetch, setHasInitialFetch] = useState(false);
  const [hasInitialVendorsSelected, setHasInitialVendorsSelected] = useState(false);

  useEffect(() => {
    const formatForInput = (dateStr) => {
      if (!dateStr) return "";
      const parts = dateStr.split("/");
      if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
      return dateStr;
    };
    setStartDate(formatForInput(currentStartDate));
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
        // Removed auto-selection for departments
      } catch (err) { console.error("Error fetching departments:", err); }
      finally { setIsLoadingDepartments(false); }
    };

    fetchCompanies();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoadingVendors(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("token", token);
        if (companyName && companyName.length > 0) {
          queryParams.append("company_ids", companyName.map(c => c.value).join(","));
        }
        // User requested only to pass company ID when company selected, 
        // but typically department is also filtered. I'll include it if it has selections.
        if (departmentName && departmentName.length > 0) {
          queryParams.append("department_ids", departmentName.map(d => d.value).join(","));
        }

        const response = await fetch(`${baseURL}vendor_pq_dashboard/vendors_slicer.json?${queryParams.toString()}`);
        const result = await response.json();
        const arr = result.data || (Array.isArray(result) ? result : []);
        
        setVendorsList(arr);

        if (!hasInitialVendorsSelected) {
          // Removed auto-selection for vendors
          setHasInitialVendorsSelected(true);
          
          onApplyFilters({
            startDate: currentStartDate,
            endDate: currentEndDate,
            companyName: companyName.map(c => c.value).join(","),
            departmentName: "", 
            vendors: "", 
            pqType: currentPqType || "with_pq",
          });
        }
      } catch (err) { console.error("Error fetching vendors:", err); setVendorsList([]); }
      finally { setIsLoadingVendors(false); }
    };

    // Re-fetch vendors if company or department changes
    if (companiesList.length > 0 || departmentsList.length > 0) {
      fetchVendors();
    }
  }, [companyName, departmentName, companiesList, departmentsList]);

  const handleApply = () => {
    if (startDate && endDate) {
      const formatOutput = (date) => {
        const parts = date.split("-");
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return date;
      };

      onApplyFilters({
        startDate: formatOutput(startDate),
        endDate: formatOutput(endDate),
        companyName: companyName.map(c => c.value).join(","),
        departmentName: departmentName.map(d => d.value).join(","),
        vendors: vendors.map(v => v.value).join(","),
        pqType,
      });
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
    setDepartmentName([]); // Start with empty selection
    setVendors([]); // Start with empty selection
    setPqType("with_pq");

    onApplyFilters({
      startDate: formatOut(startDate2024),
      endDate: formatOut(today),
      companyName: allCos.map(c => c.value).join(","),
      departmentName: "", // Passing empty as per requirement
      vendors: "", // Passing empty as per requirement
      pqType: "with_pq",
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
        />
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
          style={{
            backgroundColor: "#1A1A1A",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#1A1A1A";
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
