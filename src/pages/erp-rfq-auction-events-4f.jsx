import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import { useNavigate } from "react-router-dom";
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
} from "../components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function ErpRfqAuctionEvents4f() {
  const [settingShow, setSettingShow] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // Added `activeTab` state to handle tab changes
  const [liveEvents, setLiveEvents] = useState([]);
  const [historyEvents, setHistoryEvents] = useState([]);
  const [allEventsData, setAllEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSettingClose = () => setSettingShow(false);
  const handleClose = () => setShow(false);
  const handleSettingModalShow = () => setSettingShow(true);
  const handleModalShow = () => setShow(true);

  // Fetch API Data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const [liveResponse, historyResponse, allResponse] = await Promise.all([
          axios.get(
            "https://vendors.lockated.com/rfq/events/live_events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
          ),
          axios.get(
            "https://vendors.lockated.com/rfq/events/vendor_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&q[first_name_or_last_name_or_email_or_mobile_or_nature_of_business_name_in]=9970804349%2Cmahendra.lungare%40lockated.com"
          ),
          axios.get(
            "https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
          ), // New API call for all events
        ]);

        console.log("Live Events:", liveResponse.data?.events || []);
        console.log("History Events:", historyResponse.data?.events || []);
        console.log("All Events:", allResponse.data?.events || []);

        setLiveEvents(liveResponse.data.events || []);
        setHistoryEvents(historyResponse.data.events || []);
        setAllEventsData(allResponse.data.events || []);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle Tab Changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Determine Data Based on Active Tab
  const getFilteredData = () => {
    if (activeTab === "live") return liveEvents;
    if (activeTab === "history") return historyEvents;
    return allEventsData;
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="website-content overflow-auto">
          <div className="module-data-section p-3">
            <a href="">
              Home &gt; Purchase &gt; Procurement &gt; RFQ &amp; Auction Events
            </a>
            <h5 className="mt-3">RFQ &amp; Auction Events</h5>
            <div className="material-boxes mt-3">
              <div className="container-fluid">
                <div className="row separteinto5 justify-content-between">
                  <div className="col-md-4 text-center">
                    <div
                      className="content-box"
                      onClick={() => handleTabChange("all")}
                      style={{
                        cursor: "pointer",
                        border:
                          activeTab === "all"
                            ? "2px solidrgb(219, 143, 29)"
                            : "1px solid #ccc",
                        backgroundColor:
                          activeTab === "all" ? "#e9f5ff" : "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">All Events</h4>
                      <p className="content-box-sub">{allEventsData.length}</p>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div
                      className="content-box"
                      onClick={() => handleTabChange("live")}
                      style={{
                        cursor: "pointer",
                        border:
                          activeTab === "live"
                            ? "2px solid #007bff"
                            : "1px solid #ccc",
                        backgroundColor:
                          activeTab === "live" ? "#e9f5ff" : "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">Live Events</h4>
                      <p className="content-box-sub">{liveEvents.length}</p>
                    </div>
                  </div>
                  {/* <div className="col-md-2 text-center">
                    <div className="content-box">
                      <h4 className="content-box-title">RFQ</h4>
                      <p className="content-box-sub">1</p>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <div className="content-box">
                      <h4 className="content-box-title">Auction</h4>
                      <p className="content-box-sub">0</p>
                    </div>
                  </div> */}
                  <div className="col-md-4 text-center">
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
                          activeTab === "history" ? "#e9f5ff" : "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">History Events</h4>
                      <p className="content-box-sub">{historyEvents.length}</p>
                    </div>
                  </div>
                </div>
                <div className="card mt-0 pb-3">
                  {/* <div className="d-flex mt-1 align-items-end px-3">
                    <div className="col-md-6">
                      <h4>Events</h4>
                      <div className="event-parent p-4 mb-0">
                        <div className="d-flex justify-content-between">
                          <ul className="nav nav-tabs border-0">
                            {[
                              { id: "all", label: "All" },
                              { id: "live", label: "Live" },
                              { id: "history", label: "History" },
                            ].map((tab) => (
                              <li className="nav-item" key={tab.id}>
                                <button
                                  className={`nav-link ${
                                    activeTab === tab.id ? "active" : ""
                                  }`}
                                  onClick={() => handleTabChange(tab.id)}
                                >
                                  {tab.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="purple-btn2 ms-4"
                            onClick={() => navigate("/create-event")}
                          >
                            <span className="material-symbols-outlined">
                              add
                            </span>
                            New Event
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="card mt-4 pb-3">
                    <QuickFilter />
                    {/* <BulkAction /> */}
                    <div className="d-flex mt-3 align-items-end px-3">
                      <div className="col-md-6">
                        <form>
                          <div className="input-group">
                            <input
                              type="search"
                              id="searchInput"
                              className="tbl-search form-control"
                              placeholder="Type your keywords here"
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
                      <EventProjectTable eventData={getFilteredData()} />
                    </div>
                    <div className="row mt-3 px-3">
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
                    </div>
                  </div>
                </div>
              </div>
              <FilterModal show={show} handleClose={handleClose} />
              <LayoutModal show={settingShow} onHide={handleSettingClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
