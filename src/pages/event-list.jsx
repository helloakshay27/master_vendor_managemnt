import React, { useState } from "react";
import {
  CheckBoxList,
  ClockIcon,
  DynamicModalBox,
  MultiDateSelector,
  SelectBox,
} from "../components";
import { eventData, eventHistoryData, reportType } from "../constant/data";

const Events = () => {
  const [isHistoryActive, setIsHistoryActive] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  const handleExportModal = () => {
    setExportModal(true);
  };
  const handleCloseExportModal = () => {
    setExportModal(false);
  };
  const handleTabChange = (tabId) => {
    setIsHistoryActive(tabId === "history");
  };

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

  const handleSelectedItems = (selectedItems) => {
    console.log("Selected Items: ", selectedItems);
  };

  return (
    <div className="w-100 main-div-k">
      <div className="event-parent p-4">
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
              <li className="nav-item m-0 p-0" role="presentation" key={tab.id}>
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
          <div className="d-flex align-items-center">
            {isHistoryActive && (
              <button className="purple-btn2" onClick={handleExportModal}>
                <span className="align-text-top pe-3">
                  <i className="bi bi-download"></i>
                </span>
                Export
              </button>
            )}
            <button className="purple-btn2">
              <span className="material-symbols-outlined align-text-top">
                add
              </span>
              New Event
            </button>
          </div>
        </div>
      </div>
      <div className="tab-content m-2">
        {/* Live Tab */}
        <div
          className={`tab-pane fade ${
            !isHistoryActive ? "show active" : ""
          } eventList-parent p-4 pt-0`}
          id="live"
          role="tabpanel"
          tabIndex={0}
        >
          <h4>Team Events</h4>
          {eventData.map((event, index) => (
            <div className="eventList-main" key={index}>
              <div className="d-flex flex-row-reverse">
                <div className="eventList-child1 d-flex align-items-center gap-2 py-3">
                  {event.endsIn ? (
                    <div className="d-flex align-items-center gap-2">
                      <ClockIcon />
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
                <div className="d-flex justify-content-between p-3">
                  <div>
                    <h6>{event.name}</h6>
                    <p className="mb-0 eventList-p2">{event.description}</p>
                    <p className="mb-0 eventList-p2">{event.location}</p>
                    <div className="d-flex align-items-center mt-3">
                      <p className="mb-0 eventList-p3 me-2">{event.status}</p>
                      <p className="mb-0 eventList-p1">{event.productsCount}</p>
                    </div>
                  </div>
                  {event.deliveryLocation && (
                    <div className="w-25">
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-truck"></i>
                        <p>Delivery at</p>
                      </div>
                      <p className="mb-0 eventList-p2">
                        {event.deliveryLocation}
                      </p>
                    </div>
                  )}
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
              <div className="eventList-child1" style={{ maxWidth: "200px" }}>
                <p>{data.date}</p>
              </div>
              {data.entries.map((event, index) => (
                <div
                  className="eventList-main mt-0 mb-2 rounded-top-0"
                  key={index}
                >
                  <div className="eventList-child2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6>{event.name}</h6>
                        <p className="mb-0 eventList-p2">{event.description}</p>
                        <p className="mb-0 eventList-p2">{event.location}</p>
                        <div className="d-flex align-items-center mt-3">
                          <p className="mb-0 eventList-p3 me-2">
                            {event.status}
                          </p>
                          <p className="mb-0 eventList-p1">
                            {event.productsCount}
                          </p>
                        </div>
                      </div>
                      {event.deliveryLocation && (
                        <div className="w-25">
                          <div className="d-flex align-items-start gap-2">
                            <i className="bi bi-truck"></i>
                            <p>Delivery at</p>
                          </div>
                          <p className="mb-0 eventList-p2">
                            {event.deliveryLocation}
                          </p>
                        </div>
                      )}
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
          <>
            <div className="d-flex">
              <i className="bi bi-info-circle pe-3 pt-1"></i>
              <p>
                You have not chosen any duration for your procurement history.
                Report will be generated for duration of 03 Sep 2024 to 03 Dec
                2024.
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
              onChange={(e) => e.target.value}
            />

            <CheckBoxList
              title="Basic Details"
              items={basicDetails}
              onChange={handleSelectedItems}
            />
            <CheckBoxList
              title="Basic Details"
              items={basicDetails}
              onChange={handleSelectedItems}
            />
            <CheckBoxList
              title="Basic Details"
              items={basicDetails}
              onChange={handleSelectedItems}
            />
          </>
        }
      />
    </div>
  );
};

export default Events;
