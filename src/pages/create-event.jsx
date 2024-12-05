import React, { useState } from "react";
import {
  EventTypeModal,
  MultipleDropdown,
  SelectBox,
  Table,
  TrophyIcon,
} from "../components";

export default function CreateEvent() {
  const [eventTypeModal, setEventTypeModal] = useState(false);
  const [eventType, setEventType] = useState(false);
  const [awardType, setAwardType] = useState(false);
  const [dynamicExtension, setDynamicExtension] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(false);

  const handleEventTypeModalShow = () => {
    setEventTypeModal(true);
  };
  const handleEventTypeModalClose = () => {
    setEventTypeModal(false);
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
    <div className="w-100 p-4 pt-0">
      <div className="d-flex mt-3 eventD-top pb-3 pt-2">
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
      <div className="mt-4">
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
            {/* <MultipleDropdown
              menuItems={menuItems}
              children={
                <button className="purple-btn2">
                  <span className="material-symbols-outlined align-text-top">
                    add
                  </span>
                  Add Column
                </button>
              }
            /> */}
            {/* <button className="purple-btn2">
              <span className="material-symbols-outlined align-text-top">
                add
              </span>
              Add Column
            </button> */}
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
      </div>
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
