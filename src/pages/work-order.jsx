import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

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
  Table,
} from "../components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CollapsibleCard from "../components/base/Card/CollapsibleCards";
import { eventProjectColumns } from "../constant/data";
import FormatDate from "../components/FormatDate";

export default function WorkListPage() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
  

  const handleModalShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className="main-content">
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
                    Admin List
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
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">All Events</h4>
                      <p className="content-box-sub">0</p>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <div
                      className="content-box"
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">Live Events</h4>
                      <p className="content-box-sub">0</p>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">
                    <div
                      className="content-box"
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        color: "black",
                      }}
                    >
                      <h4 className="content-box-title">History Events</h4>
                      <p className="content-box-sub">0</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex mt-3 align-items-end px-3">
                  <div className="col-md-6 position-relative">
                    <form >
                      <div className="input-group">
                        <input
                          type="search"
                          id="searchInput"
                          className="tbl-search form-control"
                          placeholder="Type your keywords here"
                          // value={searchQuery}
                          // onChange={handleInputChange}
                          // onFocus={() => setIsSuggestionsVisible(true)}
                          // onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)}
                        />

                        <div className="input-group-append">
                          <button type="sumbit"

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
                              // onClick={handleModalShow}
                            >
                              <FilterIcon />
                            </button>
                          </div>

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

                <div className="card mt-4 pb-4">


                  <div className="tbl-container mt-3 px-3">
                    <table className="w-100">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Event Title</th>
                          <th>Event Number</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Created At</th>
                          <th>Created By</th>
                          <th>Event Type</th>
                          <th>Configuration</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="10">No events found.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center px-3 mt-2">
                    <ul className="pagination justify-content-center d-flex">
                      <li className="page-item disabled">
                        <button className="page-link">First</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">Prev</button>
                      </li>
                      <li className="page-item active">
                        <button className="page-link">1</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">Next</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">Last</button>
                      </li>
                    </ul>

                    <div>
                      <p>Showing 0 to 0 of 0 entries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-right"
                className="setting-modal"
                backdrop={true}
                style={{ height: "100vh", overflowY: "scroll" }}
              >
                <Modal.Header>
                  <div className="container-fluid p-0">
                    <div className="border-0 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn"
                          aria-label="Close"
                          onClick={handleClose}
                        >
                          <svg
                            width="10"
                            height="16"
                            viewBox="0 0 10 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 1L1 9L9 17"
                              stroke="#de7008"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <h3
                          className="modal-title m-0"
                          style={{ fontWeight: 500 }}
                        >
                          Filter
                        </h3>
                      </div>
                      <Link
                        className="resetCSS"
                        style={{
                          fontSize: "14px",
                          textDecoration: "underline",
                        }}
                        to="#"
                        // onClick={handleReset} // Attach the reset function
                      >
                        Reset
                      </Link>
                    </div>
                  </div>
                </Modal.Header>
                <form >
                  <div className="modal-body" style={{ overflowY: "scroll" }}>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Enter Title </label>
                        {/* <Select
                          options={filterOptions.event_titles}
                          placeholder="Select an Event Title"
                          isClearable
                          value={filterOptions.event_titles.find(
                            (opt) => opt.value === filters.title_in
                          )}
                          onChange={(option) =>
                            handleFilterChange("title_in", option?.value || "")
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Product</label>
                        {/* <Select
                          options={filterOptions.material_name}
                          placeholder="Select a Product"
                          isClearable
                          value={filterOptions.material_name.find(
                            (opt) =>
                              opt.value === filters.event_materials_inventory_id_in
                          )}
                          onChange={(option) =>
                            handleFilterChange(
                              "event_materials_inventory_id_in",
                              option?.value || ""
                            )
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Product Category</label>
                        {/* <Select
                          options={filterOptions.material_type}
                          placeholder="Select a Product Category"
                          isClearable
                          value={filterOptions.material_type.find(
                            (opt) =>
                              opt.value ===
                              filters.event_materials_pms_inventory_inventory_type_id_in
                          )}
                          onChange={(option) =>
                            handleFilterChange(
                              "event_materials_pms_inventory_inventory_type_id_in",
                              option?.value || ""
                            )
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Location</label>
                        {/* <Select
                          options={filterOptions.locations}
                          placeholder="Select a Location"
                          isClearable
                          value={filterOptions.locations.find(
                            (opt) => opt.value === filters.event_materials_id_in
                          )}
                          onChange={(option) =>
                            handleFilterChange(
                              "event_materials_id_in",
                              option?.value || ""
                            )
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group">
                        <label htmlFor="mor-date-from">Created By</label>
                        {/* <Select
                          options={filterOptions.creaters}
                          placeholder="Select a Creator"
                          isClearable
                          value={filterOptions.creaters.find(
                            (opt) => opt.value === filters.created_by_id_in
                          )}
                          onChange={(option) =>
                            handleFilterChange(
                              "created_by_id_in",
                              option?.value || ""
                            )
                          }
                        /> */}
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="form-group d-flex align-items-start">
                        <label htmlFor="mor-date-from">My Event</label>
                        <div className="form-check form-switch ms-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            // checked={isMyEvent}
                            // onChange={(e) => setIsMyEvent(e.target.checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="purple-btn2">
                      Go
                    </button>
                  </div>
                </form>
              </Modal>

    </>
  );
}
