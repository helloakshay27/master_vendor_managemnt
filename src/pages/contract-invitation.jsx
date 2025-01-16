import React, { useState } from "react";
import CollapsibleCard from "../components/base/Card/CollapsibleCards";
import { SearchIcon, SelectBox, Table } from "../components";
import { contractColumns, contractData } from "../constant/data";

export default function ContractInvitation() {
  const [activeTab, setActiveTab] = useState("all");
  const [liveEvents, setLiveEvents] = useState({ events: [], pagination: {} });
  const [historyEvents, setHistoryEvents] = useState({
    events: [],
    pagination: {},
  });
  const [allEventsData, setAllEventsData] = useState({
    events: [],
    pagination: {},
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="website-content overflow-auto">
      <div className="module-data-section ">
        <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom thead">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none text-primary">
                  RFQ
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contract Invitation
              </li>
            </ol>
          </nav>
          <h5 className="mt-3 ms-3">RFQ &amp; Auction Events</h5>
          <div style={{ width: "15%" }}></div>
        </div>
        <div className="material-boxes mt-3">
          <div className="container-fluid">
            <div className="row separteinto5 justify-content-left">
              <div className="col-md-2 text-center">
                <div
                  className="content-box"
                  onClick={() => handleTabChange("all")}
                  style={{
                    cursor: "pointer",
                    border:
                      activeTab === "all"
                        ? "2px solid orange"
                        : "1px solid #ccc",
                    backgroundColor: activeTab === "all" ? "#de7008" : "#fff",
                    color: activeTab === "all" ? "white" : "black", // Adjust text color for better contrast
                  }}
                >
                  <h4 className="content-box-title">Accepted</h4>
                  <p className="content-box-sub">
                    {/* {allEventsData.pagination?.total_count || 0} */}
                    4
                  </p>
                </div>
              </div>

              <div className="col-md-2 text-center">
                <div
                  className="content-box"
                  onClick={() => handleTabChange("live")}
                  style={{
                    cursor: "pointer",
                    border:
                      activeTab === "live"
                        ? "2px solid orange"
                        : "1px solid #ccc",
                    backgroundColor: activeTab === "live" ? "#de7008" : "#fff",
                    color: activeTab === "live" ? "white" : "black", // Adjust text color for better contrast
                  }}
                >
                  <h4 className="content-box-title">Not Interested</h4>
                  <p className="content-box-sub">
                    {/* {liveEvents.pagination?.total_count} */}4
                  </p>
                </div>
              </div>

              <div className="col-md-2 text-center">
                <div
                  className="content-box"
                  onClick={() => handleTabChange("history")}
                  style={{
                    cursor: "pointer",
                    border:
                      activeTab === "history"
                        ? "2px solid #007bff"
                        : "1px solid #ccc",
                    backgroundColor:
                      activeTab === "history" ? "#de7008" : "#fff",
                    color: "black",
                  }}
                >
                  <h4 className="content-box-title">Pending</h4>
                  <p className="content-box-sub">
                    {/* {historyEvents.pagination?.total_count}{" "} */}2
                  </p>
                </div>
              </div>
            </div>

            <div className="card mt-4 pb-4">
              <CollapsibleCard title="Quick Filter">
                <form onSubmit={() => {}}>
                  {/* {error && <div className="alert alert-danger">{error}</div>}
                  {loading && (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  )} */}

                  <div className="row my-2 align-items-end justify-content-between">
                    <div className="col-md-4">
                      <SelectBox
                        label={"Event Number"}
                        options={[
                          { value: "Select Event Number", label:"Select Event Number" },
                          { value: "EVT001", label:"EVT001" },
                          { value: "EVT002", label: "EVT002" },
                          { value: "EVT003", label: "EVT003" },
                          { value: "EVT004", label: "EVT004" },
                          { value: "EVT005", label: "EVT005" },
                          { value: "EVT006", label: "EVT006" },
                          { value: "EVT007", label: "EVT007" },
                        ]}
                        defaultValue={"1"}
                        onChange={(e) => e.target}
                        isDisableFirstOption={true}
                      />
                    </div>

                    <button type="submit" className="col-md-1 purple-btn2">
                      Go{" "}
                    </button>
                  </div>
                </form>
              </CollapsibleCard>
              <div className="input-group w-50 position-relative ps-3 mt-3">
                <input
                  type="search"
                  id="searchInput"
                  className="tbl-search form-control"
                  placeholder="Search Vendors"
                  value={""}
                  onChange={(e) => {e.target}}
                //   onFocus={() => setIsSuggestionsVisible(true)}
                //   onBlur={() =>
                //     setTimeout(() => setIsSuggestionsVisible(false), 200)
                //   }
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-md btn-default"
                    onClick={() => {}}
                  >
                    <SearchIcon />
                  </button>
                </div>
                {/* {isSuggestionsVisible && suggestions.length > 0 && (
                  <ul
                    className="suggestions-list position-absolute bg-white border rounded w-100"
                    style={{ zIndex: 1000, top: "100%" }}
                  >
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 cursor-pointer"
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                )} */}
              </div>
              <div className="p-3">
                <Table
                  columns={contractColumns}
                  data={contractData}
                  onRowSelect={undefined}
                  resetSelectedRows={undefined}
                  onResetComplete={undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
