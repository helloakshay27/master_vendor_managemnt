import React from "react";
import CollapsibleCard from "../components/base/Card/CollapsibleCards";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QuickFilter } from "../components";
import SingleSelector from "../components/base/Select/SingleSelector";
import axios from "axios";
import { SingleValue } from "react-select/animated";
import { baseURL } from "../confi/apiDomain";

const ApprovalList = () => {
  const [approvals, setApprovals] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedSite, setSelectedSite] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [filterOptions, setFilterOptions] = useState({
    companies: [],

    departments: [],

    modules: [],
  });

  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 0,
    total_count: 0,
  });

  const pageSize = 8;

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/approval-matrix");
  };

  const [filters, setFilters] = useState({
    company: null,
    site: null,
    project: null,
    department: null,
    modules: null,

    materialtypes: null,
  });
  useEffect(() => {
    const fetchApprovals = async () => {
      setLoading(true);
      try {
        let queryParams = new URLSearchParams();

        // Preserve filters when paginating
        if (filters.company)
          queryParams.append("q[company_id_eq]", filters.company);

        if (filters.department)
          queryParams.append("q[department_id_eq]", filters.department);

        // Add pagination params
        queryParams.append("page", pagination.current_page);
        queryParams.append("page_size", 10); // Use API per_page value

        const apiUrl = `${baseURL}/pms/admin/invoice_approvals.json?${queryParams.toString()}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`;

        console.log("API URL (Pagination):", apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch page data");

        const data = await response.json();
        setApprovals(data.invoice_approvals || []);

        // Update pagination from API response
        setPagination({
          current_page: data.pagination.current_page || 1,
          total_pages: data.pagination.total_pages || 1,
          total_count: data.pagination.total_records || 0,
        });
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovals();
  }, [pagination.current_page, filters]); // Added `filters` to dependencies

  // const handleEditClick = () => {
  //   navigate("/approval_edit");
  // };

  const handleEditClick = (id) => {
    navigate(`/approval_edit/${id}`);
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [companyRes, departmentRes, userRes] = await Promise.all([
          axios.get("https://vendors.lockated.com/pms/company_setups.json"),
          axios.get("https://vendors.lockated.com/pms/departments.json"),
          axios.get("https://vendors.lockated.com/users.json"),
        ]);

        console.log("Raw Company Data:", companyRes.data);
        console.log("Raw Department Data:", departmentRes.data);

        // Correctly map company and department data
        const companyOptions = companyRes.data.map(([id, name]) => ({
          value: id, // ID is the first element in the array
          label: name, // Name is the second element
        }));

        const departmentOptions = departmentRes.data.map(([id, name]) => ({
          value: id,
          label: name,
        }));

        console.log("Processed Companies:", companyOptions);
        console.log("Processed Departments:", departmentOptions);

        setCompanies(companyOptions);
        setDepartments(departmentOptions);
        setUsers(
          userRes.data.map(({ id, full_name }) => ({
            value: id,
            label: full_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption); // Set selected company
    setSelectedProject(null); // Reset project selection
    setSelectedSite(null); // Reset site selection
    setSelectedWing(null); // Reset wing selection
    setProjects([]); // Reset projects
    setSiteOptions([]); // Reset site options
    setWingsOptions([]); // Reset wings options

    if (selectedOption) {
      // Find the selected company from the list
      const selectedCompanyData = companies.find(
        (company) => company.id === selectedOption.value
      );
      setProjects(
        selectedCompanyData?.projects.map((prj) => ({
          value: prj.id,
          label: prj.name,
        }))
      );
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value, // Dynamically update the correct filter field
    }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    let queryParams = new URLSearchParams();
    console.log("Filters:", filters);

    // Construct query parameters following the API format
    if (filters.company)
      queryParams.append("q[company_id_eq]", filters.company);

    queryParams.append("q[department_id_eq]", filters.department);

    queryParams.append("page", 1);
    queryParams.append("page_size", 8); // Adjust page size as needed

    // API URL with query params
    const apiUrl = `https://vendors.lockated.com/pms/admin/invoice_approvals.json?${queryParams.toString()}&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`;

    console.log("API URL:", apiUrl); // Debugging

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const data = await response.json();
      setApprovals(data.invoice_approvals || []);

      // Update pagination state
      setPagination((prev) => ({
        ...prev,
        total_count: data.total_records || 0,
        total_pages: Math.ceil((data.total_records || 0) / 8), // Ensure correct page count
        current_page: 1, // Reset to page 1 when filtering
      }));
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const handleResetFilters = async () => {
    setFilters({
      company: null,
      site: null,
      project: null,
      department: null,
      materialtypes: null,
      modules: null, // Reset module selection
    });

    setSelectedCompany(null);

    // Reset Pagination to Page 1
    setPagination((prev) => ({
      ...prev,
      current_page: 1,
    }));

    try {
      const response = await fetch(
        `${baseURL}/pms/admin/invoice_approvals.json?q[approval_type_not_eq]=vendor_category&token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1&page_size=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch initial data");

      const data = await response.json();
      setApprovals(data.invoice_approvals || []);

      setPagination({
        current_page: 1,
        total_pages: data.total_pages || 1,
        total_count: data.total_records || 0,
      });
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= pagination.total_pages; i++) {
    pageNumbers.push(i);
  }

  const getPageNumbers = () => {
    const maxPagesToShow = 8;
    let startPage, endPage;

    if (pagination.total_pages <= maxPagesToShow) {
      startPage = 1;
      endPage = pagination.total_pages;
    } else if (pagination.current_page <= 4) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (pagination.current_page + 4 >= pagination.total_pages) {
      startPage = pagination.total_pages - maxPagesToShow + 1;
      endPage = pagination.total_pages;
    } else {
      startPage = pagination.current_page - 4;
      endPage = pagination.current_page + 3;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.total_pages) return;
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  return (
    <div>
      <div className="website-content" style={{ overflowY: "auto" }}>
        <footer className="footer"></footer>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* Dynamic tabs will be inserted here */}
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="mt-2 p-2">
            <a href="#">Setup &gt; Configurations Setup </a>
            <h5 className="mt-2">INVOICE APPROVALS</h5>
            <div className="d-flex btn-search row me-1">
              <div className="col-lg-6 col-md-12 colsm-12 d-flex flex-wrap">
                <button
                  onClick={handleAddClick}
                  className="d-flex btn-sm purple-btn1 my-2"
                >
                  <span className="material-symbols-outlined"> add </span>
                  <span>Add</span>
                </button>
                {/* <button
                  className="purple-btn2"
                  fdprocessedid="xn3e6n"
                  data-bs-toggle="modal"
                  data-bs-target="#importModal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span>Import</span>
                </button>
                <a
                  className="d-flex btn-sm purple-btn1 my-2"
                  href="/pms/admin/invoice_approvals/export.xlsx"
                >
                  Export to Excel
                </a> */}
              </div>
            </div>
            <div className="card mt-4 pb-4">
              <CollapsibleCard title="Quick Filter">
                <div>
                  {/* {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      {loading && (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      )} */}

                  <div className="row my-2 align-items-end">
                    {/* Event Title */}
                    <div className="col-md-3">
                      <label htmlFor="event-title-select">Company</label>

                      <SingleSelector
                        options={companies}
                        value={selectedCompany}
                        placeholder={`Select Company`} // Dynamic placeholder
                        isSearchable={true}
                      />
                    </div>

                    {/* Event Number */}

                    <div className="col-md-3">
                      <label htmlFor="event-no-select">Deparment</label>
                      <SingleSelector
                        options={departments}
                        value={selectedDepartment}
                        placeholder={`Select Deparment`}
                      />
                    </div>

                    {/* Created By */}

                    <button
                      type="submit"
                      className="col-md-1 purple-btn2 ms-2 mt-4"
                      // onClick={handleFilterSubmit}
                    >
                      Go{" "}
                    </button>

                    <button
                      className="col-md-1 purple-btn2 ms-2 mt-4"
                      // onClick={handleResetFilters}
                    >
                      Reset
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </CollapsibleCard>

              <div className="tbl-container mt-3 px-3">
                <table className="w-100" style={{ width: "100% !important" }}>
                  <thead>
                    <tr>
                      <th>Edit</th>
                      <th>Id</th>
                      <th>Function</th>
                      <th>Company</th>

                      <th>Created On</th>
                      <th>Created by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvals.map((record) => (
                      <tr key={record.id}>
                        <td>
                          <span
                            className="material-symbols-outlined"
                            onClick={() => handleEditClick(record.id)}
                            style={{ cursor: "pointer" }}
                          >
                            edit
                          </span>
                        </td>
                        <td>{record.id}</td>

                        <td>{record.approval_type}</td>
                        <td>{record.company_name}</td>
                        {/* <td>{record.project_name}</td> */}
                        <td>{record.department_name}</td>

                        {/* <td>{record.approval_type}</td>
                        <td>{record.material_type}</td> */}
                        <td>{record.created_at}</td>

                        <td>{record.created_by}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center px-3 mt-2">
                <ul className="pagination justify-content-center d-flex">
                  {/* First Button */}
                  <li
                    className={`page-item ${
                      pagination.current_page === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(1)}
                    >
                      First
                    </button>
                  </li>

                  {/* Previous Button */}
                  <li
                    className={`page-item ${
                      pagination.current_page === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        handlePageChange(pagination.current_page - 1)
                      }
                      disabled={pagination.current_page === 1}
                    >
                      Prev
                    </button>
                  </li>

                  {/* Dynamic Page Numbers */}
                  {getPageNumbers().map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        pagination.current_page === pageNumber ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}

                  {/* Next Button */}
                  <li
                    className={`page-item ${
                      pagination.current_page === pagination.total_pages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        handlePageChange(pagination.current_page + 1)
                      }
                      disabled={
                        pagination.current_page === pagination.total_pages
                      }
                    >
                      Next
                    </button>
                  </li>

                  {/* Last Button */}
                  <li
                    className={`page-item ${
                      pagination.current_page === pagination.total_pages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(pagination.total_pages)}
                      disabled={
                        pagination.current_page === pagination.total_pages
                      }
                    >
                      Last
                    </button>
                  </li>
                </ul>

                {/* Showing entries count */}
                <div>
                  <p>
                    Showing{" "}
                    {Math.min(
                      (pagination.current_page - 1) * pagination.per_page + 1,
                      pagination.total_count
                    )}{" "}
                    to{" "}
                    {Math.min(
                      pagination.current_page * pagination.per_page,
                      pagination.total_count
                    )}{" "}
                    of {pagination.total_count} entries
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div
            className="modal fade"
            id="importModal"
            tabIndex={-1}
            aria-labelledby="importModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <b className="modal-title" id="importModalLabel">
                    Bulk Upload
                  </b>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div>
                  <input
                    type="hidden"
                    name="authenticity_token"
                    defaultValue="your_token_here"
                    autoComplete="off"
                  />
                  <div className="modal-body">
                    <section className="upload-div">
                      Drag & Drop or
                      <input
                        required="required"
                        name="invoice_approval[approval_file]"
                        type="file"
                        id="approval_file"
                      />
                    </section>
                  </div>
                  <div className="modal-footer">
                    <a
                      download="Approval Import.xlsx"
                      target="_blank"
                      className="purple-btn1"
                      href="/Approval Import.xlsx"
                    >
                      Download Sample Format
                    </a>
                    <input
                      type="submit"
                      name="commit"
                      defaultValue="Import"
                      className="purple-btn2"
                      data-disable-with="Import"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Dynamic tab content will be inserted here */}
        </div>
      </div>
    </div>
  );
};

export default ApprovalList;
