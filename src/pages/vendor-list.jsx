import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

import axios from "axios";

import {
  LayoutModal,
  FilterModal,
  BulkAction,
  DownloadIcon,
  EventProjectTable,
  FilterIcon,
  QuickFilter,
  SearchIcon,
  SettingIcon,
  StarIcon,
  Table,
} from "../components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CollapsibleCard from "../components/base/Card/CollapsibleCards";
import { eventProjectColumns } from "../constant/data";

export default function VendorListPage() {
  const [settingShow, setSettingShow] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // Added `activeTab` state to handle tab changes
  const [liveEvents, setLiveEvents] = useState([]);
  const [historyEvents, setHistoryEvents] = useState([]);
  const [allEventsData, setAllEventsData] = useState([]);
  const [LiveEvents1, setLiveEvents1] = useState([]);
  const [HistoryEvents1, setHistoryEvents1] = useState([]);
  const [AllEventsData1, setAllEventsData1] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSettingClose = () => setSettingShow(false);
  const handleClose = () => setShow(false);
  const handleSettingModalShow = () => setSettingShow(true);
  const handleModalShow = () => setShow(true);

  const [filters, setFilters] = useState({
    created_by_id_in: "",
    event_type_detail_award_scheme_in: "",
    status_in: "",
    title_in: "",
    event_materials_inventory_id_in: "",
    event_materials_pms_inventory_inventory_type_id_in: "",
    event_materials_id_in: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    event_titles: [],
    event_numbers: [],
    statuses: [],
    creaters: [],
    material_name: [],
    material_type: [],
    locations: [],
  });

  const [isMyEvent, setIsMyEvent] = useState(false);
  const handleReset = () => {
    // Reset filters
    setFilters({
      created_by_id_in: "",
      event_type_detail_award_scheme_in: "",
      status_in: "",
      title_in: "",
      event_materials_inventory_id_in: "",
      event_materials_pms_inventory_inventory_type_id_in: "",
      event_materials_id_in: "",
    });

    // Reset filter options
    setFilterOptions({
      event_titles: [],
      event_numbers: [],
      statuses: [],
      creaters: [],
      material_name: [],
      material_type: [],
      locations: [],
    });

    // Reset other related states
    setIsMyEvent(false);
  };

  const [error, setError] = useState("");

  const preprocessOptions = (array, isKeyValuePair = false) => {
    if (!array) return [];
    const uniqueMap = new Map();
    array
      .filter((item) => item.name && typeof item.name === "string")
      .forEach((item) => {
        uniqueMap.set(item.name, {
          value: item.value,
          label: item.name || `Unknown (${item.value})`,
        });
      });
    return Array.from(uniqueMap.values());
  };

  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/rfq/events/advance_filter_options",
          {
            params: {
              token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
            },
          }
        );

        setFilterOptions({
          event_titles: preprocessOptions(response.data.event_titles),
          event_numbers: preprocessOptions(response.data.event_numbers),
          creaters: preprocessOptions(response.data.creaters, true),
          statuses: preprocessOptions(
            response.data.statuses.map((status) => ({
              name: status,
              value: status,
            }))
          ),
          material_name: preprocessOptions(response.data?.material_name || []),
          material_type: preprocessOptions(response.data?.material_type || []),
          locations: preprocessOptions(response.data?.locations || []),
        });
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError(
          err.response?.data?.message || "Failed to fetch filter options"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch events based on filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default total pages
  const pageSize = 10; // Number of items per page
  const pageRange = 6; // Number of pages to display in the pagination

  const fetchData = async (url, params) => {
    try {
      const response = await axios.get(url, { params });
      console.log(`Response from ${url}:`, response.data); // Log response for debugging
      return response.data; // Return only the data from the API response
    } catch (err) {
      console.error(`Error fetching data from ${url}:`, err);
      throw err; // Throw the error to be handled by the caller
    }
  };

  const fetchEvents = async (page = 1) => {
    setLoading(true);
    try {
      const [liveResponse, historyResponse, allResponse] = await Promise.all([
        axios.get("https://vendors.lockated.com/rfq/events/live_events", {
          params: {
            token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
            page: page,

            ...filters,
          },
        }),
        axios.get("https://vendors.lockated.com/rfq/events/vendor_list", {
          params: {
            token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
            q: "9970804349,mahendra.lungare@lockated.com",
            page: page,

            ...filters,
          },
        }),
        axios.get("https://vendors.lockated.com/rfq/events", {
          params: {
            token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
            page: page,
            ...filters,
          },
        }),
      ]);

      setLiveEvents(liveResponse.data.events || []);
      setHistoryEvents(historyResponse.data.events || []);
      setAllEventsData(allResponse.data.events || []);
      setLiveEvents1(liveResponse.data.pagination || []);
      setHistoryEvents1(historyResponse.data.pagination || []);
      setAllEventsData1(allResponse.data.pagination || []);

      // Set total pages dynamically based on all events count

      const totalEventCount = allResponse.data.pagination.total_pages || 0; // Adjust key based on API response
      setTotalPages(totalEventCount);
    } catch (error) {
      console.error("Error fetching event data:", error);
      setError(error.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchEvents(newPage);
    }
  };

  const getPageRange = () => {
    // Calculate the starting page for the range
    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;

    // Ensure the range doesn't exceed the total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Fetch data on component mount

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // Submit filter form

  // Handle Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get Filtered Data Based on Active Tab
  const getFilteredData = () => {
    if (activeTab === "live") return liveEvents;
    if (activeTab === "history") return historyEvents;
    return allEventsData;
  };

  // Submit Filters
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&q[event_title_or_event_no_or_status_or_created_at_or_event_schedule_start_time_or_event_schedule_end_time_cont]=${searchQuery}`
      );

      // Assuming the API returns the same structure for all responses
      setLiveEvents(response.data.liveEvents || []);
      setHistoryEvents(response.data.historyEvents || []);
      setAllEventsData(response.data.allEvents || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Unable to fetch search results. Please try again later.");
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const debounce = setTimeout(() => {
        handleSearch();
      }, 500); // Debounce delay of 500ms to reduce API calls
      return () => clearTimeout(debounce); // Cleanup function
    }
  }, [searchQuery]);
  const [vendorId, setVendorId] = useState(""); // State to store selected vendor ID
  const [vendorOptions, setVendorOptions] = useState([]); // Options for the dropdown

  // Function to fetch vendor details
  const vendorDetails = async () => {
    try {
      const response = await axios.get(
        "https://vendors.lockated.com/rfq/events/event_vendors_list",
        {
          params: {
            token: "bfa5004e7b0175622be8f7e69b37d01290b737f82e078411",
            page: 1,
          },
        }
      );

      const vendorData = response.data.list;

      // Process the data to remove duplicates
      const options = Array.from(
        new Map(vendorData.map((item) => [item[0], item])).values()
      ).map((item) => ({
        value: item[1], // Use ID as the value
        label: item[0], // Use name as the label
      }));

      setVendorOptions(options); // Set options for the dropdown
    } catch (error) {
      console.error("Error fetching vendor details:", error.message);
    }
  };

  // Fetch vendor details when the component mounts
  useEffect(() => {
    vendorDetails();
  }, []);

  // Handle dropdown selection
  const handleSelectChange = (selectedOption) => {
    console.log("Selected vendor:", selectedOption);
    setVendorId(selectedOption ? selectedOption.value : ""); // Update selected vendor ID
  };

  const flattenedData = getFilteredData().map((event, index) => ({
    srNo: index + 1,
    ...event,
    event_type: event.event_type_detail?.event_type || "N/A", // Extract 'event_type'
    event_configuration: event.event_type_detail?.event_configuration || "N/A", // Extract 'event_configuration'
  }));

  const handleActionClick = (row) => {
    // Navigate to detail price page with eventData.id
    navigate(`/user-list/${row.id}`);
    console.log("View details for:", row);
  };

  return (
    <>
      <div className="main-content">
        <div className="website-content overflow-auto">
          <div className="module-data-section p-3">
            <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom thead">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-decoration-none text-primary">
                      RFQ
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Vendor List
                  </li>
                </ol>
              </nav>
              <h5 className="mt-3 ms-3">RFQ &amp; Auction Events</h5>
              <div style={{ width: "15%" }}>
                <Select
                  options={vendorOptions}
                  placeholder="Select a Vendor"
                  isClearable
                  value={vendorOptions.find(
                    (option) => option.value === vendorId
                  )}
                  onChange={(selectedOption) =>
                    setVendorId(selectedOption ? selectedOption.value : "")
                  }
                />
              </div>
            </div>

            <div className="material-boxes mt-3">
              <div className="container-fluid">
                <div className="row separteinto5 justify-content-left">
                  <div className="col-md-2 text-center">
                    <div
                      className="content-box"
                      onClick={() => handleTabChange("all")}
                      style={{
                        cursor: "pointer",
                        border:
                          activeTab === "all"
                            ? "2px solid orange"
                            : "1px solid #ccc",
                        backgroundColor:
                          activeTab === "all" ? "#de7008" : "#fff",
                        color: activeTab === "all" ? "white" : "black", // Adjust text color for better contrast
                      }}
                    >
                      <h4 className="content-box-title">All Events</h4>
                      <p className="content-box-sub">
                        {AllEventsData1.total_count || []}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <div
                      className="content-box"
                      onClick={() => handleTabChange("live")}
                      style={{
                        cursor: "pointer",
                        border:
                          activeTab === "live"
                            ? "2px solid orange"
                            : "1px solid #ccc",
                        backgroundColor:
                          activeTab === "live" ? "#de7008" : "#fff",
                        color: activeTab === "live" ? "white" : "black", // Adjust text color for better contrast
                      }}
                    >
                      <h4 className="content-box-title">Live Events</h4>
                      <p className="content-box-sub">
                        {LiveEvents1.total_count}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <div
                      className="content-box"
                      onClick={() => handleTabChange("history")}
                      style={{
                        cursor: "pointer",
                        border:
                          activeTab === "live"
                            ? "2px solid #007bff"
                            : "1px solid #ccc",
                        backgroundColor:
                          activeTab === "history" ? "#de7008" : "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">History Events</h4>
                      <p className="content-box-sub">
                        {HistoryEvents1.total_count}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card mt-4 pb-4">
                  <CollapsibleCard title="Quick Filter">
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      {loading && (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      )}

                      <div className="row my-2 align-items-end">
                        {/* Event Title */}
                        <div className="col-md-2">
                          <label htmlFor="event-title-select">
                            Event Title
                          </label>
                          <Select
                            id="event-title-select"
                            options={filterOptions.event_titles}
                            onChange={(option) =>
                              handleFilterChange(
                                "title_in",
                                option?.value || ""
                              )
                            }
                            value={
                              filters.title_in
                                ? filterOptions.event_titles.find(
                                    (opt) => opt.value === filters.title_in
                                  )
                                : null
                            }
                            placeholder="Select Event Title"
                            isClearable
                          />
                        </div>

                        {/* Event Number */}
                        <div className="col-md-2">
                          <label htmlFor="event-no-select">Event Number</label>
                          <Select
                            id="event-no-select"
                            options={filterOptions.event_numbers}
                            onChange={(option) =>
                              handleFilterChange(
                                "event_no_in",
                                option?.value || ""
                              )
                            }
                            value={
                              filters.event_no_in
                                ? filterOptions.event_numbers.find(
                                    (opt) => opt.value === filters.event_no_in
                                  )
                                : null
                            }
                            placeholder="Select Event Number"
                            isClearable
                          />
                        </div>

                        {/* Status */}
                        <div className="col-md-2">
                          <label htmlFor="status-select">Status</label>
                          <Select
                            id="status-select"
                            options={filterOptions.statuses}
                            onChange={(option) =>
                              handleFilterChange(
                                "status_in",
                                option?.value || ""
                              )
                            }
                            value={
                              filters.status_in
                                ? filterOptions.statuses.find(
                                    (opt) => opt.value === filters.status_in
                                  )
                                : null
                            }
                            placeholder="Select Status"
                            isClearable
                          />
                        </div>

                        {/* Created By */}
                        <div className="col-md-2">
                          <label htmlFor="created-by-select">Created By</label>
                          <Select
                            id="created-by-select"
                            options={filterOptions.creaters}
                            onChange={(option) =>
                              handleFilterChange(
                                "created_by_id_in",
                                option?.value || ""
                              )
                            }
                            value={
                              filters.created_by_id_in
                                ? filterOptions.creaters.find(
                                    (opt) =>
                                      opt.value === filters.created_by_id_in
                                  )
                                : null
                            }
                            placeholder="Select Creator"
                            isClearable
                          />
                        </div>
                        <button type="submit" className="col-md-1 purple-btn2">
                          Go{" "}
                        </button>
                      </div>
                    </form>
                  </CollapsibleCard>

                  <div className="d-flex mt-3 align-items-end px-3">
                    <div className="col-md-6">
                      <form>
                        <div className="input-group">
                          <input
                            type="search"
                            id="searchInput"
                            className="tbl-search form-control"
                            placeholder="Type your keywords here"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <div className="input-group-append">
                            <button
                              type="button"
                              className="btn btn-md btn-default"
                            >
                              <SearchIcon />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-6">
                      <div className="row justify-content-end">
                        <div className="col-md-5">
                          <div className="row justify-content-end px-3">
                            <div className="col-md-3">
                              <button
                                style={{ color: "#de7008" }}
                                className="btn btn-md"
                                onClick={handleModalShow}
                              >
                                <FilterIcon />
                              </button>
                            </div>
                            {/* <div className="col-md-3">
                                <button
                                  style={{ color: "#de7008" }}
                                  type="submit"
                                  className="btn btn-md"
                                >
                                  <StarIcon />
                                </button>
                              </div> */}
                            {/* <div className="col-md-3">
                                <button
                                  style={{ color: "#de7008" }}
                                  id="downloadButton"
                                  type="submit"
                                  className="btn btn-md"
                                >
                                  <DownloadIcon />
                                </button>
                              </div> */}
                            {/* <div className="col-md-3">
                                <button
                                  style={{ color: "#de7008" }}
                                  type="submit"
                                  className="btn btn-md"
                                  onClick={handleSettingModalShow}
                                >
                                  <SettingIcon
                                    color={"#de7008"}
                                    style={{ width: "23px", height: "23px" }}
                                  />
                                </button>
                              </div> */}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <button
                            className="purple-btn2"
                            onClick={() => navigate("/create-event")}
                          >
                            <span className="material-symbols-outlined align-text-top">
                              add
                            </span>
                            New Event
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mx-3">
                    <Table
                      columns={eventProjectColumns}
                      data={flattenedData}
                      // showCheckbox={true}
                      onRowSelect={undefined}
                      handleCheckboxChange={undefined}
                      // resetSelectedRows={undefined}
                      onResetComplete={undefined}
                      actionIcon={true}
                      onActionClick={handleActionClick}
                    />
                    <div className="d-flex justify-content-between align-items-center px-1 mt-2">
                      <ul className="pagination justify-content-center d-flex ">
                        {/* First Button */}
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
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
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                        </li>

                        {/* Dynamic Page Numbers */}
                        {getPageRange().map((pageNumber) => (
                          <li
                            key={pageNumber}
                            className={`page-item ${
                              currentPage === pageNumber ? "active" : ""
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
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>

                        {/* Last Button */}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            Last
                          </button>
                        </li>
                      </ul>
                      {/* Display Data */}

                      {/* Showing entries count */}
                      <div>
                        <p>
                          Showing {currentPage * pageSize - (pageSize - 1)} to{" "}
                          {Math.min(
                            currentPage * pageSize,
                            totalPages * pageSize
                          )}{" "}
                          of {totalPages * pageSize} entries
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3 px-3">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Rows Per Page</label>
                        <select
                          className="form-control form-select per_page"
                          style={{ width: "100%" }}
                        >
                          <option value={10} selected>
                            10 Rows
                          </option>
                          <option value={20}>20 Rows</option>
                          <option value={50}>50 Rows</option>
                          <option value={100}>100 Rows</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                  {/* </div> */}
                </div>
              </div>

              <LayoutModal show={settingShow} onHide={handleSettingClose} />

              <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-right"
                className="setting-modal"
                backdrop={true}
              >
                <Modal.Header>
                  <div className="container-fluid p-0">
                    <div className="border-0 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn"
                          aria-label="Close"
                          onClick={handleClose}
                        >
                          <svg
                            width="10"
                            height="16"
                            viewBox="0 0 10 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 1L1 9L9 17"
                              stroke="#de7008"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <h3
                          className="modal-title m-0"
                          style={{ fontWeight: 500 }}
                        >
                          Filter
                        </h3>
                      </div>
                      <Link
                        className="resetCSS"
                        style={{
                          fontSize: "14px",
                          textDecoration: "underline",
                        }}
                        to="#"
                        onClick={handleReset} // Attach the reset function
                      >
                        Reset
                      </Link>
                    </div>
                  </div>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body" style={{ overflowY: "scroll" }}>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Enter Title </label>
                        <Select
                          options={filterOptions.event_titles}
                          placeholder="Select an Event Title"
                          isClearable
                          selectedValue={filters.title_in}
                          handleChange={(value) =>
                            handleFilterChange("title_in", value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Product</label>
                        <Select
                          options={filterOptions.material_name}
                          placeholder="Select an Event Title"
                          isClearable
                          selectedValue={
                            filters.event_materials_inventory_id_in
                          }
                          handleChange={(value) =>
                            handleFilterChange(
                              "event_materials_inventory_id_in",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Product Category</label>
                        <Select
                          options={filterOptions.material_type}
                          placeholder="Select an Event Title"
                          isClearable
                          selectedValue={
                            filters.event_materials_pms_inventory_inventory_type_id_in
                          }
                          handleChange={(value) =>
                            handleFilterChange(
                              "event_materials_pms_inventory_inventory_type_id_in",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Location</label>
                        <Select
                          options={filterOptions.locations}
                          placeholder="Select an Event Title"
                          isClearable
                          selectedValue={filters.event_materials_id_in}
                          handleChange={(value) =>
                            handleFilterChange("event_materials_id_in", value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Created By</label>
                        <Select
                          options={filterOptions.locations}
                          placeholder="Select an Event Title"
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group d-flex align-items-start">
                        <label htmlFor="mor-date-from">My Event</label>
                        <div className="form-check form-switch ms-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isMyEvent}
                            onChange={(e) => setIsMyEvent(e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="purple-btn2">
                      Go
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
