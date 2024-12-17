// import React from "react";
// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/mor.css";
// import { useNavigate } from "react-router-dom";
// import {
//   LayoutModal,
//   FilterModal,
//   BulkAction,
//   DownloadIcon,
//   EventProjectTable,
//   FilterIcon,
//   QuickFilter,
//   SearchIcon,
//   SettingIcon,
//   StarIcon,
// } from "../components";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

// export default function ErpRfqAuctionEvents4f() {
//   const [activeTab, setActiveTab] = useState("live"); // Track the active tab
//   const [settingShow, setSettingShow] = useState(false);
//   const [show, setShow] = useState(false);
//   const handleSettingClose = () => setSettingShow(false);
//   const handleClose = () => setShow(false);

//   const handleSettingModalShow = () => setSettingShow(true);
//   const handleModalShow = () => setShow(true);

//   const [liveEvents, setLiveEvents] = useState([]);
//   const [historyEvents, setHistoryEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isSelectCheckboxes, setIsSelectCheckboxes] = useState(false);
//   const navigate = useNavigate();
//   const [allEventsData, setAllEventsData] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const [liveResponse, historyResponse, allResponse] = await Promise.all([
//           axios.get(
//             "https://vendors.lockated.com/rfq/events/live_events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
//           ),

//           axios.get(
//             "https://vendors.lockated.com/rfq/events/vendor_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&q[first_name_or_last_name_or_email_or_mobile_or_nature_of_business_name_in]=9970804349%2Cmahendra.lungare%40lockated.com"
//           ),

//           axios.get(
//             "https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
//           ), // New API call for all events
//         ]);

//         console.log("Live Events:", liveResponse.data?.events || []);

//         console.log("History Events:", historyResponse.data?.events || []);

//         console.log("All Events:", allResponse.data?.events || []); // Log the all events response

//         setLiveEvents(
//           Array.isArray(liveResponse.data.events)
//             ? liveResponse.data.events
//             : []
//         );
//         setHistoryEvents(
//           Array.isArray(historyResponse.data.events)
//             ? historyResponse.data.events
//             : []
//         );

//         setAllEventsData(
//           Array.isArray(allResponse.data.events) ? allResponse.data.events : []
//         ); //
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const filteredLiveData = isSelectCheckboxes
//     ? liveEvents.filter((event) => event.endsIn)
//     : liveEvents;

//   return (
//     <>
//       <Header />
//       <div className="main-content">
//         <Sidebar />
//         <div className="website-content overflow-auto">
//           <div className="module-data-section p-3">
//             <div className="card mt-0 pb-3">
//               <div className="d-flex mt-1 align-items-end px-3">
//                 <div className="col-md-6">
//                   <div className="event-parent p-4 mb-0">
//                     <h4>Events</h4>
//                     <div className="d-flex justify-content-between m-0 p-0 ">
//                       <ul
//                         className="nav nav-tabs border-0 m-0 p-0"
//                         id="eventTabs"
//                         role="tablist"
//                       >
//                         {[
//                           { id: "all", label: "All" },
//                           { id: "live", label: "Live" },
//                           { id: "history", label: "History" },
//                         ].map((tab) => (
//                           <li
//                             className="nav-item m-0 p-0 mt-2"
//                             role="presentation"
//                             key={tab.id}
//                           >
//                             <button
//                               className={`nav-link setting-link ${
//                                 activeTab === tab.id ? "active" : ""
//                               }`}
//                               id={`${tab.id}-tab`}
//                               data-bs-toggle="tab"
//                               data-bs-target={`#${tab.id}`}
//                               type="button"
//                               role="tab"
//                               aria-controls={tab.id}
//                               aria-selected={activeTab === tab.id}
//                               onClick={() => handleTabChange(tab.id)}
//                             >
//                               {tab.label}
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                       <div className="d-flex align-items-center">
//                         <div className="row justify-content-end px-3">
//                           <div className="col-md-4">
//                             <button
//                               style={{ color: "#de7008" }}
//                               className="btn btn-md"
//                               // onClick={handleFilterModal}
//                             >
//                               <FilterIcon />
//                             </button>
//                           </div>
//                         </div>
//                         <button
//                           className="purple-btn2 ms-4"
//                           onClick={() => {
//                             navigate("/create-event");
//                           }}
//                         >
//                           <span className="material-symbols-outlined align-text-top">
//                             add
//                           </span>
//                           New Event
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <QuickFilter />
//               {/* <BulkAction /> */}

//               <div className="mx-3">
//                 <EventProjectTable />
//               </div>
//               <div className="row mt-3  px-3">
//                 <div className="col-md-3">
//                   <div className="form-group">
//                     <label htmlFor="">Rows Per Page</label>
//                     <select
//                       className="form-control form-select per_page"
//                       style={{ width: "100%" }}
//                     >
//                       <option
//                         value={10}
//                         // @ts-ignore
//                         selected="selected"
//                       >
//                         10 Rows
//                       </option>
//                       <option value={20}>20 Rows</option>
//                       <option value={50}>50 Rows</option>
//                       <option value={100}>100 Rows</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*
//       <FilterModal show={show} handleClose={handleClose} />
//       <LayoutModal show={settingShow} onHide={handleSettingClose} /> */}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutModal,
  FilterModal,
  FilterIcon,
  QuickFilter,
  EventProjectTable,
} from "../components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function ErpRfqAuctionEvents4f() {
  const [activeTab, setActiveTab] = useState("live"); // Track the active tab
  const [settingShow, setSettingShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleSettingClose = () => setSettingShow(false);
  const handleClose = () => setShow(false);

  const [liveEvents, setLiveEvents] = useState([]);
  const [historyEvents, setHistoryEvents] = useState([]);
  const [allEventsData, setAllEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

        console.log("All Events:", allResponse.data?.events || []); // Log the all events response

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
        <div
          className="w-100"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          <div className="website-content overflow-auto">
            <div className="module-data-section p-3">
              <div className="card mt-0 pb-3">
                <div className="d-flex mt-1 align-items-end px-3">
                  <div className="col-md-6 ">
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
                        <div className="row justify-content-end px-3 ms-10">
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
                  </div>
                </div>
                <QuickFilter />
                <div className="mx-3">
                  {/* Pass the filtered data to EventProjectTable */}
                  <EventProjectTable eventData={getFilteredData()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
