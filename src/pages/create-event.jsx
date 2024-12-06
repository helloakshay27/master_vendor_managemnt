import React, { useState } from "react";
import {
  ClockIcon,
  CreateRFQForm,
  DynamicModalBox,
  EventScheduleModal,
  EventTypeModal,
  MultipleDropdown,
  ParticipantsIcon,
  SearchIcon,
  SelectBox,
  Table,
  TrophyIcon,
  VendorModal,
} from "../components";

export default function CreateEvent() {
  const [eventTypeModal, setEventTypeModal] = useState(false);
  const [publishEventModal, setPublishEventModal] = useState(false);
  const [eventScheduleModal, setEventScheduleModal] = useState(false);
  const [vendorModal, setVendorModal] = useState(false);
  const [eventType, setEventType] = useState(false);
  const [awardType, setAwardType] = useState(false);
  const [dynamicExtension, setDynamicExtension] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleApply = () => {
    console.log('Filters applied!');
    setShowPopup(false);
  };

  const handleEventTypeModalShow = () => {
    setEventTypeModal(true);
  };
  const handleEventTypeModalClose = () => {
    setEventTypeModal(false);
  };
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

  const menuItems = [
    {
      label: "Creator",
      subItems: ["Price Cap", "Tick Size", "Floor Price", "Text Column"],
    },
    {
      label: "Participant",
      subItems: ["Price Cap", "Tick Size", "Floor Price", "Text Column"],
    },
  ];

  return (
    <div className="w-100 p-4 pb-1">
      <CreateRFQForm
        handleEventTypeModalShow={handleEventTypeModalShow}
        handleEventScheduleModalShow={handleEventScheduleModalShow}
        handleSettingModalShow={() => {}}
      />
      <div className="d-flex justify-content-between align-items-end mx-1">
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
                <p>Rank on lot</p>
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

      <VendorModal show={vendorModal} onHide={handleVendorTypeModalClose} />

      {/* <DynamicModalBox
        size="lg"
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
                  onClick={handleVendorTypeModalShow}
                >
                  <span className="ms-2">Invite</span>
                </button>
                <button
                  className="purple-btn2 viewBy-main-child2P mb-0"
                  onClick={handleVendorTypeModalShow}
                >
                  <i className="bi bi-filter"></i>
                  <span className="ms-2">Filter</span>
                </button>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <p>No Vendors Found</p>
            </div>
          </>
        }
        modalType={true}
      /> */}
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
  );
}
