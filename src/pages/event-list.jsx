import React from "react";

export default function EventList() {
  return (
    <section className="home__body">
      <div className="w-100 m-4 main-div-k">
        <div className="event-parent">
          <h4 className="event-head p-2 pt-3">Events</h4>
          <div className="d-flex justify-content-between me-2">
            <div className="d-flex gap-2">
              <button className="event-btn1">
                <span>
                  <img
                    className="event-img1"
                    src="../erp_event_module/img/live.svg"
                    alt=""
                  />
                </span>
                Live
              </button>
              <button className="event-btn1 event-btn1-child">
                <span>
                  <img
                    className="event-img2"
                    src="../erp_event_module/img/history.svg"
                    alt=""
                  />
                </span>
                History
              </button>
              <button
                className="event-btn2"
                data-bs-toggle="modal"
                data-bs-target="#sidebarModal"
              >
                <img src="../erp_event_module/img/filter.svg" alt="" />
              </button>
            </div>
            <div>
              <button className="event-btn3">
                <a href="/erp_event_module/event_order.html">
                  {" "}
                  <span>
                    <img
                      className="event-img2"
                      src="../erp_event_module/img/add.svg"
                      alt=""
                    />
                  </span>
                  New Event
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="eventList-parent">
          <div className="eventList-main">
            <div className="d-flex flex-row-reverse">
              <div className="eventList-child1">
                <span className="mt-1">
                  <img
                    className="event-img2 me-3"
                    src="../erp_event_module/img/clock.svg"
                    alt=""
                  />
                </span>
                <p className="eventList-time">24H:05M:10s</p>
              </div>
            </div>
            <div className="d-flex justify-content-between eventList-child2">
              <div>
                <p className="mb-0 eventList-p1">Pratik Bhosale</p>
                <p className="mb-0 eventList-p2">
                  [IN/NXTPH2/NXTIICC01/34] HARDWARE products - Marathon Ener Gen
                  LLP
                </p>
                <p className="mb-0 eventList-p2">(Marathon Nextown)</p>
              </div>
              <div className="d-flex flex-column justify-content-center text-center">
                <p className="mb-0 eventList-p3">RFQ</p>
                <p className="mb-0 eventList-p1">3 Products</p>
              </div>
            </div>
          </div>
          <div className="eventList-main">
            <div className="d-flex flex-row-reverse">
              <div className="eventList-child1">
                <span className="mt-1">
                  <img
                    className="event-img2 me-3"
                    src="../erp_event_module/img/clock.svg"
                    alt=""
                  />
                </span>
                <p className="eventList-time">24H:05M:10s</p>
              </div>
            </div>
            <div className="d-flex justify-content-between eventList-child2">
              <div>
                <p className="mb-0 eventList-p1">Pratik Bhosale</p>
                <p className="mb-0 eventList-p2">
                  [IN/NXTPH2/NXTIICC01/34] HARDWARE products - Marathon Ener Gen
                  LLP
                </p>
                <p className="mb-0 eventList-p2">(Marathon Nextown)</p>
              </div>
              <div className="d-flex flex-column justify-content-center text-center">
                <p className="mb-0 eventList-p3">RFQ</p>
                <p className="mb-0 eventList-p1">3 Products</p>
              </div>
            </div>
          </div>
          <div className="eventList-main">
            <div className="d-flex flex-row-reverse">
              <div className="eventList-child1">
                <span className="mt-1">
                  <img
                    className="event-img2 me-3"
                    src="../erp_event_module/img/clock.svg"
                    alt=""
                  />
                </span>
                <p className="eventList-time">24H:05M:10s</p>
              </div>
            </div>
            <div className="d-flex justify-content-between eventList-child2">
              <div>
                <p className="mb-0 eventList-p1">Pratik Bhosale</p>
                <p className="mb-0 eventList-p2">
                  [IN/NXTPH2/NXTIICC01/34] HARDWARE products - Marathon Ener Gen
                  LLP
                </p>
                <p className="mb-0 eventList-p2">(Marathon Nextown)</p>
              </div>
              <div className="d-flex flex-column justify-content-center text-center">
                <p className="mb-0 eventList-p3">RFQ</p>
                <p className="mb-0 eventList-p1">3 Products</p>
              </div>
            </div>
          </div>
          <div className="eventList-main">
            <div className="d-flex flex-row-reverse">
              <div className="eventList-child1">
                <span className="mt-1">
                  <img
                    className="event-img2 me-3"
                    src="../erp_event_module/img/clock.svg"
                    alt=""
                  />
                </span>
                <p className="eventList-time">24H:05M:10s</p>
              </div>
            </div>
            <div className="d-flex justify-content-between eventList-child2">
              <div>
                <p className="mb-0 eventList-p1">Pratik Bhosale</p>
                <p className="mb-0 eventList-p2">
                  [IN/NXTPH2/NXTIICC01/34] HARDWARE products - Marathon Ener Gen
                  LLP
                </p>
                <p className="mb-0 eventList-p2">(Marathon Nextown)</p>
              </div>
              <div className="d-flex flex-column justify-content-center text-center">
                <p className="mb-0 eventList-p3">RFQ</p>
                <p className="mb-0 eventList-p1">3 Products</p>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}
