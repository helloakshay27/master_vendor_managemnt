import React, { useState } from "react";
import { EventTypeModal, SelectBox, TrophyIcon } from "../components";

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
               mb-1"
                onClick={handleEventTypeModalShow}
              >
                <TrophyIcon />
                <p>Rank on lot</p>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            <div>
              <SelectBox
                label={"Templates"}
                options={[
                  { value: "MNRL", label: "MNRL" },
                  { value: "Alaska", label: "Alaska" },
                  { value: "California", label: "California" },
                  { value: "Delaware", label: "Delaware" },
                  { value: "Tennessee", label: "Tennessee" },
                  { value: "Texas", label: "Texas" },
                  { value: "Washington", label: "Washington" },
                ]}
                defaultValue={"Alaska"}
                onChange={() => {}}
              />
            </div>
          </form>
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
