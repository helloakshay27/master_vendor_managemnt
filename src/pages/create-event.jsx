import React, { useState } from "react";
import {
  CreateRFQForm,
  DynamicModalBox,
  EventScheduleModal,
  EventTypeModal,
  ParticipantsIcon,
  SearchIcon,
  SelectBox,
  Table,
  MultiSelector,
} from "../components";
import {
  auditLogColumns,
  auditLogData,
  citiesList,
  participantsTabColumns,
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
  const [selectedStrategy, setSelectedStrategy] = useState(false);
  const [selectedVendorDetails, setSelectedVendorDetails] = useState(false);
  const [selectedVendorProfile, setSelectedVendorProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

  const options = [
    { value: "BUILDING MATERIAL", label: "BUILDING MATERIAL" },
    { value: "MIVAN MA", label: "MIVAN MA" },
    { value: "MIVAN MATERIAL", label: "MIVAN MATERIAL" },
  ];

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
  const handleVendorTypeModalShow = () => {
    setVendorModal(true);
  };
  const handleVendorTypeModalClose = () => {
    setVendorModal(false);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
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
          <CreateRFQForm
            handleEventTypeModalShow={handleEventTypeModalShow}
            handleEventScheduleModalShow={handleEventScheduleModalShow}
            handleSettingModalShow={() => {}}
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
            <div className="tbl-container px-0 mx-5 mt-3 ">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>Vendor Name</th>
                    <th>Mob No.</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vendor 1</td>
                    <td>99999999</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mt-2 justify-content-end mt-4">
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Preview</button>
            </div>
            <div className="col-md-2">
              <button className="purple-btn2 w-100">Submit</button>
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
          <div className="row mt-4 me-3 mt-3">
            <h5>Audit Log</h5>
            <div className="mx-0">
              <Table columns={auditLogColumns} data={auditLogData} />
            </div>
          </div>
          {/* <div className="d-flex mt-3 eventD-top pb-3 pt-2">
        <p
          className="mb-0 align-items-center modal-p d-flex"
          style={{ width: "6%" }}
        >
          Event Title:
        </p>
        <input
          className="event-input"
          type="text"
          placeholder="Enter the title of this event"
        />
      </div>
      <div
        className="mt-4 d-flex flex-column justify-content-between"
        style={{ height: "85vh" }}
      >
        <div>
          <form className="d-flex align-items-center">
            <div className="me-4">
              <div className="d-flex mb-2">
                <img
                  src="../erp_event_module/img/trophy.svg"
                  className="eventD-forms-logo"
                  alt=""
                />
                <p className="mb-2 ps-1 font-bold">Event Type</p>
              </div>
              <div
                className="d-flex align-items-start
               mb-1 gap-2"
                onClick={handleEventTypeModalShow}
              >
                <p>Enter Details Manually on lot</p>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            <div>
              <SelectBox
                label={"Templates"}
                options={[
                  { value: "Select Template", label: "Select Template" },
                  { value: "Buy Template", label: "Buy Template" },
                  { value: "BOQ Project", label: "BOQ Project" },
                  { value: "BOQ Marathon", label: "BOQ Marathon" },
                  {
                    value: "Buy Template(Freight and Clause)",
                    label: "Buy Template(Freight and Clause)",
                  },
                ]}
                defaultValue={"Alaska"}
                onChange={() => {}}
              />
            </div>
          </form>
          <div className="d-flex justify-content-end align-items-center">
            <button className="purple-btn2">
              <label htmlFor="file-upload" className="m-0">
                <i className="bi bi-upload me-2"></i>
                Upload File
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                />
              </label>
            </button>
          </div>

          <Table
            columns={[
              { label: "Product", key: "product" },
              { label: "Product Variant", key: "productVariant" },
              { label: "Quantity AVailable", key: "quantityAvailable" },
              { label: "Pickup Location", key: "pickupLocation" },
              { label: "Price", key: "price" },
              { label: "Quantity Requested", key: "quantityRequested" },
              { label: "GST", key: "gst" },
              { label: "Total Amount", key: "totalAmount" },
            ]}
            data={[
              {
                product: "",
                productVariant: "",
                quantityAvailable: "",
                pickupLocation: "",
                price: "",
                quantityRequested: "",
                gst: "",
                totalAmount: "",
              },
            ]}
          />
        </div>
        <div className="">
          <div className="d-flex border-bottom py-2">
            <button
              className="purple-btn2 viewBy-main-child2P mb-0"
              onClick={handleVendorTypeModalShow}
            >
              <span className="ms-2">Participants</span>
            </button>
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
          </div>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <button
              className="purple-btn2"
              // onClick={handleVendorTypeModalShow}
            >
              <span className="ms-2">Terms & Conditions</span>
            </button>
            <div className="d-flex align-items-center">
              <div>
                <p>Schedule</p>
                <div className="d-flex" onClick={handleEventScheduleModalShow}>
                  <span>
                    <i className="bi bi-clock"></i>
                  </span>
                  <p className="ms-2">Now - 08:25 pm, 5th Dec</p>
                </div>
              </div>
              <button
                className="purple-btn2 ms-2"
                onClick={handlePublishEventModalShow}
              >
                <span>Publish Events</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}
          <EventScheduleModal
            show={eventScheduleModal}
            onHide={handleEventScheduleModalClose}
          />
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
          <DynamicModalBox
            size="xl"
            title="All Vendors"
            show={vendorModal}
            onHide={handleVendorTypeModalClose}
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
                      <span className="ms-2">Filter</span>
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
                    data={participantsTabData}
                    showCheckbox={true}
                  />
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
            onHide={handleEventTypeModalClose}
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
          />
        </div>
      </div>
    </>
  );
}
