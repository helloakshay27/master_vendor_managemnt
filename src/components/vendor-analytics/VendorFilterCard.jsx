import React, { useState, useEffect } from "react";
import { RotateCcw, Building2, Layers, Users, Calendar } from "lucide-react";
import { baseURL } from "../../confi/apiDomain";

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
          <select
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1A1A1A",
              backgroundColor: disabled ? "#f3f4f6" : "white",
              cursor: disabled ? "not-allowed" : "pointer",
              outline: "none",
            }}
          >
            {options && options.length > 0 ? (
              options.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))
            ) : (
              <option value="">
                {isLoading ? "Loading..." : disabled ? "Select first" : "Select"}
              </option>
            )}
          </select>
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
  currentPqType = "with_pq",
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [vendors, setVendors] = useState("");
  const [pqType, setPqType] = useState("with_pq");

  const [companiesList, setCompaniesList] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [departmentsList, setDepartmentsList] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

  const [vendorsList, setVendorsList] = useState([]);
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);
  
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

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
    if (companiesList.length === 0) {
      const fetchCompanies = async () => {
        setIsLoadingCompanies(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/company_slicer.json?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data?.data?.companies && Array.isArray(data.data.companies))
            arr = data.data.companies;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setCompaniesList(arr);
        } catch (error) {
          console.error("Error fetching companies:", error);
        } finally {
          setIsLoadingCompanies(false);
        }
      };
      fetchCompanies();
    }
  }, []);

  useEffect(() => {
    if (!hasInitialFetch && companiesList.length > 0) {
      const fetchDepartments = async () => {
        setIsLoadingDepartments(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/department_slicer.json?company=${companyName || ""}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setDepartmentsList(arr);
          setHasInitialFetch(true);
        } catch (error) {
          console.error("Error fetching departments:", error);
        } finally {
          setIsLoadingDepartments(false);
        }
      };
      fetchDepartments();
    } else if (companyName && hasInitialFetch && departmentsList.length === 0) {
      // Re-fetch when user selects a specific company
      const fetchDepartments = async () => {
        setIsLoadingDepartments(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/department_slicer.json?company=${companyName}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setDepartmentsList(arr);
        } catch (error) {
          console.error("Error fetching departments:", error);
        } finally {
          setIsLoadingDepartments(false);
        }
      };
      fetchDepartments();
    } else if (!companyName && hasInitialFetch) {
      setDepartmentsList([]);
      setDepartmentName("");
    }
  }, [companyName, companiesList, hasInitialFetch]);

  useEffect(() => {
    if (hasInitialFetch && departmentsList.length > 0 && vendorsList.length === 0) {
      const fetchVendors = async () => {
        setIsLoadingVendors(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/vendor_slicer.json?company=${companyName || ""}&department=${departmentName || ""}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setVendorsList(arr);
        } catch (error) {
          console.error("Error fetching vendors:", error);
        } finally {
          setIsLoadingVendors(false);
        }
      };
      fetchVendors();
    } else if (departmentName && vendorsList.length === 0) {
      const fetchVendors = async () => {
        setIsLoadingVendors(true);
        try {
          const response = await fetch(
            `${baseURL}vendor_pq_dashboard/vendor_slicer.json?company=${companyName}&department=${departmentName}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
          );
          const data = await response.json();
          let arr = [];
          if (Array.isArray(data)) arr = data;
          else if (data?.data && Array.isArray(data.data)) arr = data.data;
          else if (data && typeof data === "object")
            arr = Object.values(data).find((v) => Array.isArray(v)) || [];
          setVendorsList(arr);
        } catch (error) {
          console.error("Error fetching vendors:", error);
        } finally {
          setIsLoadingVendors(false);
        }
      };
      fetchVendors();
    } else if (!companyName || !departmentName) {
      setVendorsList([]);
      setVendors("");
    }
  }, [departmentName, companyName, departmentsList, hasInitialFetch]);

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
        companyName,
        departmentName,
        vendors,
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

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    setStartDate(formatDt(sevenDaysAgo));
    setEndDate(formatDt(today));
    setCompanyName("");
    setDepartmentName("");
    setVendors("");
    setPqType("with_pq");

    onApplyFilters({
      startDate: formatOut(sevenDaysAgo),
      endDate: formatOut(today),
      companyName: "",
      departmentName: "",
      vendors: "",
      pqType: "with_pq",
    });
  };

  const safeCompanies = Array.isArray(companiesList) ? companiesList : [];
  const safeDepartments = Array.isArray(departmentsList) ? departmentsList : [];
  const safeVendors = Array.isArray(vendorsList) ? vendorsList : [];

  const companyOptions = [
    { value: "", label: "All" },
    ...safeCompanies.map((company) => ({
      value: company.id || company.name || company,
      label: company.name || company.company_name || company,
    })),
  ];

  const departmentOptions = [
    { value: "", label: "All" },
    ...safeDepartments.map((dept) => ({
      value: dept.id || dept.name || dept,
      label: dept.name || dept.department_name || dept,
    })),
  ];

  const vendorOptions = [
    { value: "", label: "All" },
    ...safeVendors.map((vendor) => ({
      value: vendor.id || vendor.name || vendor,
      label: vendor.name || vendor.vendor_name || vendor,
    })),
  ];


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
          onChange={(e) => setCompanyName(e.target.value)}
          isLoading={isLoadingCompanies}
          options={companyOptions}
          disabled={false}
          hasDropdown={true}
        />


        <FilterCardItem
          icon={Users}
          label="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
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
          onChange={(e) => setVendors(e.target.value)}
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
