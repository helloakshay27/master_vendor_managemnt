import React from "react";
import { ClockIcon } from "../components";
import { eventData, eventHistoryData } from "../constant/data";

export default function EventList() {
  return (
    <section className="home__body">
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
              ].map((tab, index) => (
                <li
                  className="nav-item m-0 p-0"
                  role="presentation"
                  key={tab.id}
                >
                  <button
                    className={`nav-link ${index === 0 ? "active" : ""}`}
                    id={`${tab.id}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab.id}`}
                    type="button"
                    role="tab"
                    aria-controls={tab.id}
                    aria-selected={index === 0 ? "true" : "false"}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            <div>
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
          {/* Live Tab Pane */}
          <div
            className="tab-pane fade show active eventList-parent p-4 pt-0"
            id="live"
            role="tabpanel"
            aria-labelledby="live-tab"
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

          {/* History Tab Pane */}
          <div
            className="tab-pane fade eventList-parent p-4 pt-0"
            id="history"
            role="tabpanel"
            aria-labelledby="history-tab"
          >
            {eventHistoryData.map((data, index) => (
              <div key={index}>
                <div className="mb-4" >
                  <p className="ps-2">{data.date}</p>
                  {data.entries.map((event, index) => (
                    <div className="eventList-main mt-0" key={index}>
                      <div className="eventList-child2 p-0 mb-2">
                        <div className="d-flex justify-content-between p-3">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
