import React, { useState } from "react";
import {
  CheckBoxList,
  ClockIcon,
  DownloadIcon,
  DynamicModalBox,
  FilterIcon,
  FilterModal,
  MultiDateSelector,
  SelectBox,
} from "../components";
import { eventData, eventHistoryData, reportType } from "../constant/data";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/mor.css";

const VendorList = () => {
  const [isHistoryActive, setIsHistoryActive] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [isSelectCheckboxes, setIsSelectCheckboxes] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setIsCustomSelected(selectedValue === "Custom");
  };

  const handleExportModal = () => {
    setExportModal(true);
  };
  const handleCloseExportModal = () => {
    setExportModal(false);
  };
  const handleFilterModal = () => {
    setFilterModal(true);
  };
  const handleCloseFilterModal = () => {
    setFilterModal(false);
  };
  const handleTabChange = (tabId) => {
    setIsHistoryActive(tabId === "history");
  };

  const handleSwitchChange = () => {
    setIsSelectCheckboxes((prev) => !prev); // Toggle switch state
  };

  const filteredData = isSelectCheckboxes
    ? eventData.filter((event) => event.endsIn)
    : eventData; // Show all data when "All" is selected

  const basicDetails = [
    "Event ID",
    "Event Terms and Conditions",
    "Event Date",
    "Event End Time",
    "Event Creator Name",
    "Event Strategy",
    "Event Title",
    "Event Remarks",
    "Event Start Time",
    "Event Duration",
    "Event Mode",
  ];

  const bidDetails = [
    "Total Vendors invited",
    "Number of Revisions",
    "Bidder Company",
    "Bid Placed At",
    "Bid Status",
    "Initial Price",
    "Final Price",
    "Bid Quantity",
    "Bid Quantity UOM",
    "Bidder Remarks",
  ];

  const productDetails = [
    "Article Code",
    "Article Name",
    "Article Category",
    "Article Family",
    "Product Variant",
    "Location Name",
    "Requested Quantity",
    "Requested Quantity UOM",
  ];

  const SavingDetails = [
    "Budget Savings",
    "Historical Price Savings",
    "Existing Proposal Savings",
    "Last Purchase Price Savings",
    "Default Savings",
  ];

  const handleSelectedItems = (selectedItems) => {
    console.log("Selected Items: ", selectedItems);
  };

  return (
    <>
      <Header />
      <div className="main-content">
        {/* <Sidebar /> */}
        <div
          className="w-100"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          <div className="event-parent p-4 mb-0">
            <h4>Events</h4>
            <div className="d-flex justify-content-between m-0 p-0">
              <ul
                className="nav nav-tabs border-0 m-0 p-0"
                id="eventTabs"
                role="tablist"
              >
                {[
                  { id: "live", label: "Live" },
                  { id: "history", label: "History" },
                ].map((tab) => (
                  <li
                    className="nav-item m-0 p-0"
                    role="presentation"
                    key={tab.id}
                  >
                    <button
                      className={`nav-link setting-link ${
                        (tab.id === "live" && !isHistoryActive) ||
                        (tab.id === "history" && isHistoryActive)
                          ? "active"
                          : ""
                      }`}
                      id={`${tab.id}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${tab.id}`}
                      type="button"
                      role="tab"
                      aria-controls={tab.id}
                      aria-selected={isHistoryActive === (tab.id === "history")}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-content m-2">
            <div
              className={`tab-pane fade ${
                !isHistoryActive ? "show active" : ""
              } eventList-parent p-4 pt-0`}
              id="live"
              role="tabpanel"
              tabIndex={0}
            >
              {/* <div className="d-flex justify-content-between align-items-center">
                <h4>Team Events</h4>
                <div className="rounded-3 bg-light p-2 gap-3 d-flex align-items-end justify-content-around shadow-sm">
                  <p>All</p>
                  <div className="form-check form-switch mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={isSelectCheckboxes}
                      onChange={handleSwitchChange}
                    />
                  </div>
                  <p>Not Bids</p>
                </div>
              </div> */}
              {filteredData.map((event, index) => (
                <div
                  className="eventList-main"
                  key={index}
                  onClick={() => navigate("/user-overview")}
                >
                  <div className="d-flex flex-row-reverse">
                    <div className="eventList-child1 d-flex align-items-center gap-2 py-3">
                      {event.endsIn ? (
                        <div className="d-flex align-items-center gap-2">
                          {/* <ClockIcon /> */}
                          <p className="mb-0 eventList-p1">Ends In</p>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-hourglass-split"></i>
                          <p className="mb-0 eventList-p1">Bid Approves In</p>
                        </div>
                      )}
                      <span>{event.timeRemaining}</span>
                    </div>
                  </div>
                  <div className="eventList-child2 p-0">
                    <div className="d-flex justify-content-between p-3 w-100 position-relative">
                      <div>
                        <h6>{event.name}</h6>
                        <p className="mb-0 eventList-p2">{event.description}</p>
                        <p className="mb-0 eventList-p2">{event.location}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <p className="mb-0 eventList-p3 me-2">
                              {event.status}
                            </p>
                            <p className="mb-0 eventList-p1">
                              {event.productsCount}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-0 mt-2 text-muted">your price</p>
                        </div>
                      </div>
                      {/* {event.deliveryLocation && (
                        <div className="w-25">
                          <div className="d-flex align-items-start gap-2">
                            <i className="bi bi-truck"></i>
                            <p>Delivery at</p>
                          </div>
                          <p className="mb-0 eventList-p2">
                            {event.deliveryLocation}
                          </p>
                        </div>
                      )} */}
                      {/* {event.endsIn && (
                        <button
                          className="purple-btn2 position-absolute"
                          style={{ bottom: 10, right: 10 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/create-bid");
                          }}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            add
                          </span>
                          New Bid
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* History Tab */}
            <div
              className={`tab-pane fade ${
                isHistoryActive ? "show active" : ""
              } eventList-parent p-4 pt-0`}
              id="history"
              role="tabpanel"
              tabIndex={0}
            >
              {eventHistoryData.map((data, index) => (
                <div key={index} className="mb-5">
                  <div
                    className="eventList-child1"
                    style={{ maxWidth: "200px" }}
                  >
                    <p>{data.date}</p>
                  </div>
                  {data.entries.map((event, index) => (
                    <div
                      className="eventList-main mt-0 mb-2 rounded-top-0"
                      key={index}
                      onClick={() => navigate("/erp-rfq-detail-price-trends4h")}
                    >
                      <div className="eventList-child2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6>{event.name}</h6>
                            <p className="mb-0 eventList-p2">
                              {event.description}
                            </p>
                            <p className="mb-0 eventList-p2">
                              {event.location}
                            </p>
                            <div className="d-flex align-items-center mt-3">
                              <p className="mb-0 eventList-p3 me-2">
                                {event.status}
                              </p>
                              <p className="mb-0 eventList-p1">
                                {event.productsCount}
                              </p>
                            </div>
                          </div>
                          {/* {event.deliveryLocation && (
                            <div className="w-25">
                              <div className="d-flex align-items-start gap-2">
                                <i className="bi bi-truck"></i>
                                <p>Delivery at</p>
                              </div>
                              <p className="mb-0 eventList-p2">
                                {event.deliveryLocation}
                              </p>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <DynamicModalBox
            title="Download Report"
            show={exportModal}
            onHide={handleCloseExportModal}
            size="xl"
            footerButtons={[
              {
                label: "Cancel",
                onClick: handleCloseExportModal,
                props: {
                  className: "purple-btn1",
                },
              },
              {
                label: "Download Excel",
                onClick: handleCloseExportModal,
                props: {
                  className: "purple-btn2",
                },
              },
            ]}
            modalType={true}
            children={
              <div>
                <div className="d-flex">
                  <i className="bi bi-info-circle pe-3 pt-1"></i>
                  <p>
                    You have not chosen any duration for your procurement
                    history. Report will be generated for duration of 03 Sep
                    2024 to 03 Dec 2024.
                  </p>
                </div>
                <MultiDateSelector />
                <SelectBox
                  className="mb-4"
                  label={"Choose Report Type"}
                  options={reportType}
                  defaultValue={"Event Detailed Report"}
                  onChange={(e) => e.target.value}
                />
                <SelectBox
                  className="mb-4"
                  label={"Choose Report Format"}
                  options={[
                    {
                      value: "Default report Format",
                      label: "Default report Format",
                    },
                    { value: "Custom", label: "Custom" },
                  ]}
                  defaultValue={"Default report Format"}
                  onChange={handleSelectChange}
                />

                <div className="d-flex align-items-end justify-content-between bg-light mx-0 mb-3">
                  <div className="d-flex  align-items-start">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p>Select All</p>
                  </div>
                  <div className="d-flex align-items-end">
                    <p>Include Revised Bids</p>
                    <span className="form-switch ps-5">
                      <input
                        className="on-off-toggler form-check-input my-2"
                        type="checkbox"
                        onChange={handleCheckboxChange}
                      />
                    </span>
                  </div>
                </div>
                <CheckBoxList
                  title="Basic Details"
                  items={basicDetails}
                  onChange={handleSelectedItems}
                  isAllSelected={isChecked}
                />
                <CheckBoxList
                  title="Bid Details"
                  items={bidDetails}
                  onChange={handleSelectedItems}
                  isAllSelected={isChecked}
                />
                <CheckBoxList
                  title="Product Details"
                  items={productDetails}
                  onChange={handleSelectedItems}
                  isAllSelected={isChecked}
                  style={{ paddingBottom: "50px" }}
                />

                {isCustomSelected && (
                  <div
                    className="position-fixed bg-light p-2"
                    style={{
                      width: "80%",
                      bottom: "calc(0% + 100px)",
                      right: "0",
                      transform: "translate(50%, 50%)",
                    }}
                  >
                    <p>Report Format Name</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Report Format Name"
                    />
                  </div>
                )}
              </div>
            }
          />
          <FilterModal
            show={filterModal}
            handleClose={handleCloseFilterModal}
          />
        </div>
      </div>
    </>
  );
};

export default VendorList;
