import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreateRFQForm,
  DynamicModalBox,
  EventScheduleModal,
  EventTypeModal,
  SearchIcon,
  SelectBox,
  Table,
  MultiSelector,
} from "../components";

import {
  // @ts-ignore
  auditLogColumns,
  // @ts-ignore
  auditLogData,
  citiesList,
  participantsTabColumns,
  // @ts-ignore
  participantsTabData,
} from "../constant/data";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PopupBox from "../components/base/Popup/Popup";

export default function CreateEvent() {
  const [eventTypeModal, setEventTypeModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [publishEventModal, setPublishEventModal] = useState(false);
  const [eventScheduleModal, setEventScheduleModal] = useState(false);
  const [vendorModal, setVendorModal] = useState(false);
  const [eventType, setEventType] = useState(false);
  const [awardType, setAwardType] = useState(false);
  const [dynamicExtension, setDynamicExtension] = useState(false);
  const [resetSelectedRows, setResetSelectedRows] = useState(false);
  const [dynamicExtensionConfigurations, setDynamicExtensionConfigurations] =
    useState({
      time_extension_type: "",
      triggered_time_extension_on_last: "",
      extend_event_time_by: "",
      time_extension_on_change_in: "",
    });

  const [materialFormData, setMaterialFormData] = useState([
    {
      descriptionOfItem: [],
      inventory_id: "",
      quantity: "",
      unit: [],
      location: [],
      rate: "100.00",
      amount: "100000.00",
    },
  ]);
  const [selectedStrategy, setSelectedStrategy] = useState(false);
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(false);
  const [selectedVendorProfile, setSelectedVendorProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  // @ts-ignore
  const [selectedCity, setSelectedCity] = useState([]);
  const [isTrafficSelected, setIsTrafficSelected] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [eventNo, setEventNo] = useState("");
  const [eventName, seteventName] = useState("");

  // @ts-ignore
  const [createdOn] = useState(new Date().toISOString().split("T")[0]);
  // @ts-ignore
  const [selectedVendors, setSelectedVendors] = useState([]);
  // @ts-ignore
  const [eventSchedule, setEventSchedule] = useState("");
  // @ts-ignore
  const [scheduleData, setScheduleData] = useState({});

  // @ts-ignore
  const [data, setData] = useState([
    { user: "", date: "", status: "", remark: "" },
  ]);

  const options = [
    { value: "BUILDING MATERIAL", label: "BUILDING MATERIAL" },
    { value: "MIVAN MA", label: "MIVAN MA" },
    { value: "MIVAN MATERIAL", label: "MIVAN MATERIAL" },
  ];
  const handleDynamicExtensionBid = (key, value) => {
    setDynamicExtensionConfigurations((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const handleChange = (selectedOption) => {
    setSelectedTags(selectedOption);
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const navigate = useNavigate();

  const handleApply = () => {
    console.log("Filters applied!");
    setShowPopup(false);
  };

  const handleEventTypeModalShow = () => {
    setEventTypeModal(true);
  };
  const handleEventTypeModalClose = () => {
    setEventTypeModal(false);
  };
  const handleInviteModalShow = () => {
    setVendorModal(false);
    setInviteModal(true);
  };
  const handleInviteModalClose = () => {
    setInviteModal(false);
  };
  // @ts-ignore
  // @ts-ignore
  const handlePublishEventModalShow = () => {
    setPublishEventModal(true);
  };
  const handlePublishEventModalClose = () => {
    setPublishEventModal(false);
  };
  const handleEventScheduleModalShow = () => {
    setEventScheduleModal(true);
  };
  const handleEventScheduleModalClose = () => {
    setEventScheduleModal(false);
  };

  const handleSaveSchedule = (data) => {
    console.log("Received Data schedule:", data); // Debugging
    setScheduleData(data);
    handleEventScheduleModalClose();
  };

  const handleVendorTypeModalShow = () => {
    setVendorModal(true);
  };
  const handleVendorTypeModalClose = () => {
    setVendorModal(false);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleTrafficChange = (value) => {
    setIsTrafficSelected(value);
  };

  const handleAwardTypeChange = (e) => {
    setAwardType(e.target.value);
  };

  const handleDynamicExtensionChange = (id, isChecked) => {
    setDynamicExtension((prevState) => ({
      // @ts-ignore
      ...prevState,
      [id]: isChecked,
    }));
  };

  const handleRadioChange = (strategy) => {
    setSelectedStrategy(strategy);
  };
  const handleVendorDetailChange = (vendor) => {
    setSelectedVendorDetails(vendor);
  };
  const handleVendorProfileChange = (profile) => {
    setSelectedVendorProfile(profile);
  };

  const handleEventConfigurationSubmit = () => {
    handleEventTypeModalClose();
  };

  //  for vendordata get api

  // const [vendorModal, setVendorModal] = useState(false);
  const [tableData, setTableData] = useState([]); // State to hold dynamic data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default total pages
  const pageSize = 10; // Number of items per page
  const pageRange = 6; // Number of pages to display in the pagination

  // @ts-ignore
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendorModal) {
      fetchData();
    }
  }, [vendorModal]);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vendors.lockated.com/rfq/events/vendor_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=${page}`
      );

      const vendors = Array.isArray(response.data.vendors)
        ? response.data.vendors
        : [];

      const formattedData = vendors.map((vendor) => ({
        id: vendor.id,
        name: vendor.full_name || vendor.organization_name || "N/A",
        email: vendor.email || "N/A",
        phone: vendor.contact_number || vendor.mobile || "N/A",
        city: vendor.city_id || "N/A",
        tags: vendor.tags || "N/A",
      }));

      setTableData(formattedData);
      setCurrentPage(page);
      setTotalPages(response.data?.pagination?.total_pages || 1); // Assume the API returns total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
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

  const handleCheckboxChange = (vendor, isChecked) => {
    if (isChecked) {
      setSelectedRows((prev) => [...prev, vendor]);
    } else {
      setSelectedRows((prev) => prev.filter((item) => item.id !== vendor.id));
    }
  };

  const handleSaveButtonClick = () => {
    console.log("Selected Vendors:", selectedRows);
    setTableData(selectedRows); // Update the second table when Save button is clicked
    setSelectedVendors(selectedRows);
    setVendorModal(false); // Close the modal after saving
    setSelectedRows([]); // Clear all selected checkboxes
    setResetSelectedRows(true); // Trigger reset of selected rows
  };

  // Check if a vendor is selected
  const isVendorSelected = (vendorId) => {
    return selectedRows.some((vendor) => vendor.id === vendorId);
  };

  // Additional states for other fields
  // @ts-ignore
  const handleSubmit = async () => {
    // Validation
    console.log("selectedVendors:", selectedVendors);
    console.log("eventNo:", eventNo);
    console.log("eventName:", eventName);

    console.log("createdOn:", createdOn);
    console.log("scheduleData:", scheduleData);

    if (
      !eventName ||
      !eventNo ||
      !createdOn ||
      !scheduleData ||
      selectedVendors.length === 0
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    const payload = {
      event: {
        event_title: eventName,
        event_no: eventNo,
        created_on: createdOn,
        status: 1,
        created_by_id: 2,
        event_schedule_attributes: {
          start_time: scheduleData.start_time,
          end_time_duration: scheduleData.end_time_duration,
          evaluation_time: scheduleData.evaluation_time,
          event_type_id: 1,
        },
        event_type_detail_attributes: {
          event_type: Number(eventType),
          award_scheme: Number(awardType),
          event_configuration: 2,
          dynamic_time_extension: dynamicExtension[1],
          time_extension_type:
            dynamicExtensionConfigurations.time_extension_type,
          triggered_time_extension_on_last:
            dynamicExtensionConfigurations.triggered_time_extension_on_last,
          extend_event_time_by: Number(
            dynamicExtensionConfigurations.extend_event_time_by
          ),
          enable_english_auction: true,
          extension_time_min: 5,
          extend_time_min: 10,
          time_extension_change:
            dynamicExtensionConfigurations.time_extension_on_change_in,
        },
        event_materials_attributes: materialFormData,
        event_vendors_attributes: selectedVendors.map((vendor) => {
          return {
            status: 1,
            pms_supplier_id: vendor.id,
          };
        }),
        status_logs_attributes: [
          {
            status: 1,
            created_by_id: 2,
            remarks: "Initial status",
            comments: "No comments",
          },
        ],
      },
    };

    try {
      console.log("payload :", payload);

      const response = await fetch(
        "https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Event created successfully!");
      } else {
        throw new Error("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div
          className="w-100 p-4 mb-2"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          <div className="head-material text-center">
            <h4>Create RFQ &amp; Auction</h4>
          </div>

          <div className="row align-items-end justify-items-end mx-2 mb-5">
            <div className="col-md-4 mt-0 mb-2">
              <div className="form-group">
                <label className="po-fontBold">Event Name</label>
              </div>
              <input
                className="form-control "
                placeholder="Enter Event Name"
                value={eventName}
                onChange={(e) => seteventName(e.target.value)}
              />
            </div>
            <div className="col-md-4 mt-0 mb-2">
              <div className="form-group">
                <label className="po-fontBold">Event Type</label>
              </div>
              <input
                className="form-control "
                onClick={handleEventTypeModalShow}
                placeholder="Configure The Event"
              />
            </div>
            <div className="col-md-4 mt-0 mb-2">
              <div className="form-group">
                <label className="po-fontBold">Event No.</label>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Event No."
                value={eventNo}
                onChange={(e) => setEventNo(e.target.value)}
              />
            </div>
            <div className="col-md-4 mt-0 mb-2">
              <div className="form-group">
                <label className="po-fontBold">Created On</label>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={createdOn} // Sets default value to today's date
                  readOnly // Prevents user from changing the value
                />
              </div>
            </div>
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <label className="po-fontBold">Event Schedule</label>
              </div>
              <input
                className="form-control "
                onClick={handleEventScheduleModalShow}
                placeholder="From [dd-mm-yy hh:mm] To [dd-mm-yy hh:mm] ([DD] Days
                                                          [HH] Hrs [MM] Mins)"
              />
            </div>
          </div>
          <CreateRFQForm
            data={materialFormData}
            setData={setMaterialFormData}
          />
          <div className="d-flex justify-content-between align-items-end mx-1 mt-5">
            <h5 className=" ">Select Vendors</h5>
            <div className="card-tools">
              <button
                className="purple-btn2"
                data-bs-toggle="modal"
                data-bs-target="#venderModal"
                onClick={handleVendorTypeModalShow}
              >
                <span className="material-symbols-outlined align-text-top me-2">
                  add{" "}
                </span>
                <span>Add</span>
              </button>
            </div>
          </div>
          <div className="row justify-content-center mx-1">
            <div className="tbl-container px-0 mx-5 mt-3">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Mob No.</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedVendors
                    .filter(
                      (vendor, index, self) =>
                        index === self.findIndex((v) => v.id === vendor.id) // Ensure uniqueness by id
                    )
                    .map((vendor) => (
                      <tr key={vendor.id}>
                        <td>{vendor.name}</td>
                        <td>{vendor.phone}</td>
                        <td></td> {/* Display the status */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-4 mt-3">
            <h5>Audit Log</h5>
            <div className="mx-0">
              {/* <Table columns={auditLogColumns} data={auditLogData} /> */}
              <div className="tbl-container px-0 mt-3">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter User Name"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Date"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Status"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Remark"
                        />
                      </td>
                    </tr>
                  </tbody> */}
                </table>
              </div>
            </div>

            <EventScheduleModal
              show={eventScheduleModal}
              onHide={handleEventScheduleModalClose}
              handleSaveSchedule={handleSaveSchedule}
            />
          </div>
          {/* make the below component on common modal folder and call it here */}
          <DynamicModalBox
            size="md"
            title="Publish Event"
            footerButtons={[
              {
                label: "Edit Schedule",
                onClick: () => {
                  handlePublishEventModalClose();
                  handleEventScheduleModalShow();
                },
                props: {
                  className: "purple-btn1",
                },
              },
              {
                label: "Save Changes",
                onClick: handlePublishEventModalClose,
                props: {
                  className: "purple-btn2",
                },
              },
            ]}
            show={publishEventModal}
            onHide={handlePublishEventModalClose}
            children={<></>}
          />

          {/* // vendor model with vendor data */}

          <DynamicModalBox
            size="xl"
            title="All Vendors"
            show={vendorModal}
            onHide={handleVendorTypeModalClose}
            footerButtons={[
              {
                label: "Cancel",
                onClick: handleVendorTypeModalClose,
                props: { className: "purple-btn1" },
              },
              {
                label: "Save",
                onClick: handleSaveButtonClick,
                props: { className: "purple-btn2" },
              },
            ]}
            children={
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="input-group w-50">
                    <input
                      type="search"
                      id="searchInput"
                      className="tbl-search form-control"
                      placeholder="Search Vendors"
                    />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-md btn-default">
                        <SearchIcon />
                      </button>
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      className="purple-btn2 viewBy-main-child2P mb-0"
                      onClick={handleInviteModalShow}
                    >
                      <i className="bi bi-person-plus"></i>
                      <span className="ms-2">Invite</span>
                    </button>
                    <button
                      className="purple-btn2 viewBy-main-child2P mb-0"
                      onClick={() => setShowPopup(true)}
                    >
                      <i className="bi bi-filter"></i>
                      <span className="ms-2">Filters</span>
                    </button>

                    <PopupBox
                      title="Filter by"
                      show={showPopup}
                      onClose={() => setShowPopup(false)}
                      footerButtons={[
                        {
                          label: "Cancel",
                          onClick: () => setShowPopup(false),
                          props: {
                            className: "purple-btn1",
                          },
                        },
                        {
                          label: "Apply",
                          onClick: handleApply,
                          props: {
                            className: "purple-btn2",
                          },
                        },
                      ]}
                      children={
                        <div>
                          <div style={{ marginBottom: "12px" }}>
                            <SelectBox
                              label={"City"}
                              options={citiesList}
                              defaultValue={""}
                              onChange={handleCityChange}
                              isDisableFirstOption={true}
                            />
                          </div>

                          <div style={{ marginBottom: "12px" }}>
                            <p>Filter By Tags</p>
                            <MultiSelector
                              options={options}
                              value={selectedTags}
                              onChange={handleChange}
                              placeholder={"Filter by tags"}
                            />
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="form-check form-switch mt-1">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                              />
                            </div>
                            <p className="mb-0 pe-1">
                              Show only selected vendors
                            </p>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <Table
                    columns={participantsTabColumns}
                    // data={participantsTabData}
                    showCheckbox={true}
                    data={tableData}
                    handleCheckboxChange={handleCheckboxChange}
                    onRowSelect={undefined} // handleCheckboxChange={(vendor, isChecked) => handleCheckboxChange(vendor, isChecked)}
                    rowsPerPage={100}
                    isRowSelected={isVendorSelected}
                    resetSelectedRows={resetSelectedRows}
                    onResetComplete={() => setResetSelectedRows(false)}
                    // onRowSelect={handleRowSelect}
                  />
                </div>
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
                      {Math.min(currentPage * pageSize, totalPages * pageSize)}{" "}
                      of {totalPages * pageSize} entries
                    </p>
                  </div>
                </div>
              </>
            }
          />
          <DynamicModalBox
            show={inviteModal}
            onHide={handleInviteModalClose}
            modalType={true}
            title="Invite New Vendor"
            footerButtons={[
              {
                label: "Close",
                onClick: handleInviteModalClose,
                props: {
                  className: "purple-btn1",
                },
              },
              {
                label: "Save Changes",
                onClick: handleInviteModalClose,
                props: {
                  className: "purple-btn2",
                },
              },
            ]}
            children={
              <>
                <form className="p-2">
                  <div className="form-group mb-3">
                    <label className="po-fontBold">POC - Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter POC Name"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="po-fontBold">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <label>Choose vendor profile</label>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div
                      className={`pro-radio-tabs__tab ${
                        // @ts-ignore
                        selectedVendorProfile === "Manufacturer /Trader"
                          ? "pro-radio-tabs__tab__selected"
                          : ""
                      }`}
                      style={{ width: "50%" }}
                      tabIndex={0}
                      role="radio"
                      // @ts-ignore
                      aria-checked={
                        // @ts-ignore
                        selectedVendorProfile === "Manufacturer /Trader"
                      }
                      onClick={() =>
                        handleVendorProfileChange("Manufacturer /Trader")
                      }
                    >
                      <span
                        className={`ant-radio ${
                          // @ts-ignore
                          selectedVendorProfile === "Manufacturer /Trader"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          tabIndex={-1}
                          className="ant-radio-input"
                          // @ts-ignore
                          checked={
                            // @ts-ignore
                            selectedVendorProfile === "Manufacturer /Trader"
                          }
                          onChange={() =>
                            handleVendorProfileChange("Manufacturer /Trader")
                          }
                        />
                        <div className="ant-radio-inner" />
                      </span>
                      <p className="pro-text pro-body pro-text--medium ps-2">
                        Manufacturer /Trader
                      </p>
                    </div>
                    <div
                      className={`pro-radio-tabs__tab col-md-6 ${
                        // @ts-ignore
                        selectedVendorProfile === "Enter Details Manually"
                          ? "pro-radio-tabs__tab__selected"
                          : ""
                      }`}
                      style={{ width: "50%" }}
                      tabIndex={0}
                      role="radio"
                      // @ts-ignore
                      aria-checked={selectedVendorProfile === "Broker"}
                      onClick={() => handleVendorProfileChange("Broker")}
                    >
                      <span
                        className={`ant-radio ${
                          // @ts-ignore
                          selectedVendorProfile === "Broker"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          tabIndex={-1}
                          className="ant-radio-input"
                          // @ts-ignore
                          checked={selectedVendorProfile === "Broker"}
                          onChange={() => handleVendorProfileChange("Broker")}
                        />
                        <div className="ant-radio-inner" />
                      </span>
                      <p className="pro-text pro-body pro-text--medium ps-2">
                        Broker
                      </p>
                    </div>
                  </div>
                  <label>Invite Vendor via</label>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div
                      className={`pro-radio-tabs__tab ${
                        // @ts-ignore
                        selectedVendorDetails === "GST Number"
                          ? "pro-radio-tabs__tab__selected"
                          : ""
                      }`}
                      style={{ width: "50%" }}
                      tabIndex={0}
                      role="radio"
                      // @ts-ignore
                      aria-checked={selectedVendorDetails === "GST Number"}
                      onClick={() => handleVendorDetailChange("GST Number")}
                    >
                      <span
                        className={`ant-radio ${
                          // @ts-ignore
                          selectedVendorDetails === "GST Number"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          tabIndex={-1}
                          className="ant-radio-input"
                          // @ts-ignore
                          checked={selectedVendorDetails === "GST Number"}
                          onChange={() =>
                            handleVendorDetailChange("GST Number")
                          }
                        />
                        <div className="ant-radio-inner" />
                      </span>
                      <p className="pro-text pro-body pro-text--medium ps-2">
                        GST Number
                      </p>
                    </div>
                    <div
                      className={`pro-radio-tabs__tab col-md-6 ${
                        // @ts-ignore
                        selectedVendorDetails === "Enter Details Manually"
                          ? "pro-radio-tabs__tab__selected"
                          : ""
                      }`}
                      style={{ width: "50%" }}
                      tabIndex={0}
                      role="radio"
                      // @ts-ignore
                      aria-checked={
                        // @ts-ignore
                        selectedVendorDetails === "Enter Details Manually"
                      }
                      onClick={() =>
                        handleVendorDetailChange("Enter Details Manually")
                      }
                    >
                      <span
                        className={`ant-radio ${
                          // @ts-ignore
                          selectedVendorDetails === "Enter Details Manually"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          tabIndex={-1}
                          className="ant-radio-input"
                          // @ts-ignore
                          checked={
                            // @ts-ignore
                            selectedVendorDetails === "Enter Details Manually"
                          }
                          onChange={() =>
                            handleRadioChange("Enter Details Manually")
                          }
                        />
                        <div className="ant-radio-inner" />
                      </span>
                      <p className="pro-text pro-body pro-text--medium ps-2">
                        Enter Details Manually
                      </p>
                    </div>
                  </div>
                  {
                    // @ts-ignore
                    selectedVendorDetails === "GST Number" && (
                      <>
                        <div className="form-group mb-3">
                          <label className="po-fontBold">GST Number</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter GST Number"
                          />
                        </div>
                      </>
                    )
                  }
                  {
                    // @ts-ignore
                    selectedVendorDetails === "Enter Details Manually" && (
                      <>
                        <div className="form-group mb-3">
                          <label className="po-fontBold">Company Name</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter Company Name"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="po-fontBold">Address</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter Address"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="po-fontBold">City</label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter City"
                          />
                        </div>
                      </>
                    )
                  }
                </form>
              </>
            }
          />
          <EventTypeModal
            show={eventTypeModal}
            handleDynamicExtensionBid={handleDynamicExtensionBid}
            onHide={handleEventTypeModalClose}
            handleEventConfigurationSubmit={handleEventConfigurationSubmit}
            title={"Configuration for Event"}
            eventType={eventType}
            handleEventTypeChange={handleEventTypeChange}
            eventTypeModal={eventTypeModal}
            handleEventTypeModalClose={handleEventTypeModalClose}
            selectedStrategy={selectedStrategy}
            handleRadioChange={handleRadioChange}
            awardType={awardType}
            handleAwardTypeChange={handleAwardTypeChange}
            dynamicExtension={dynamicExtension}
            dynamicExtensionConfigurations={dynamicExtensionConfigurations}
            handleDynamicExtensionChange={handleDynamicExtensionChange}
            size={"xl"}
            footerButtons={[
              {
                label: "Close",
                onClick: handleEventTypeModalClose,
                props: {
                  className: "purple-btn1",
                },
              },
              {
                label: "Save Changes",
                onClick: handleEventTypeModalClose,
                props: {
                  className: "purple-btn2",
                },
              },
            ]}
            trafficType={isTrafficSelected}
            handleTrafficChange={handleTrafficChange}
          />
          {/* make the above component on common modal folder and call it here */}

          <div className="row mt-2 justify-content-end mt-4">
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Preview</button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="purple-btn1 w-100"
                onClick={() => {
                  navigate("/event-list");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
