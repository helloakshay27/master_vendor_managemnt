import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
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

export default function ServicePRListPage() {
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
                    
                  </li>
                </ol>
              </nav>
              <h5 className="mt-3 ms-3">RFQ &amp; Service PR</h5>
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
                      <h4 className="content-box-title">All Materials</h4>
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
                      <h4 className="content-box-title">Approved</h4>
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
                      <h4 className="content-box-title">Pending</h4>
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
                      <h4 className="content-box-title">Rejected</h4>
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
                      {/* <div className="col-md-5">
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

                        </div>
                      </div> */}
                      <div className="col-md-4">
                        <button
                          className="purple-btn2"
                          // onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            add
                          </span>
                          Add
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
                          <th>Sr.No.</th>
                          <th>View ID</th>
                          <th>PR No.</th>
                          <th>Reference No.</th>
                          <th>Supplier Name</th>
                          <th>Created By</th>
                          <th>Created On</th>
                          <th>Last Approved By</th>
                          <th>Approved Status</th>
                          <th>PR Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>16520</td>
                          <td></td>
                          <td>18354</td>
                          <td>Natasha Green-Tech</td>
                          <td>Shimon Bankar</td>
                          <td>07/01/2025</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 56,961.40</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    navigate(`/service-details/1`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>16519</td>
                          <td></td>
                          <td>18353</td>
                          <td>Natasha Green-Tech</td>
                          <td>Shimon Bankar</td>
                          <td>07/01/2025</td>
                          <td>Pranav Deshmukh</td>
                          <td>Pending</td>
                          <td>₹ 240,000.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    navigate(`/service-details/1`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                              </td>
                        </tr>
                        {/* <tr>
                          <td>3</td>
                          <td>16508</td>
                          <td></td>
                          <td>18346</td>
                          <td>Global Airconditioning</td>
                          <td>SAMBHAJI GHADAGE</td>
                          <td>07/01/2025</td>
                          <td>Pranav Deshmukh</td>
                          <td>Pending</td>
                          <td>₹ 285,000.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>16505</td>
                          <td></td>
                          <td>18343</td>
                          <td>Shree Ganesh Enterprises</td>
                          <td>Shimon Bankar</td>
                          <td>07/01/2025</td>
                          <td>Pranav Deshmukh</td>
                          <td>Pending</td>
                          <td>₹ 11,200.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>

                        </tr>
                        <tr>
                          <td>5</td>
                          <td>16504</td>
                          <td></td>
                          <td>18342</td>
                          <td>A R Devkar</td>
                          <td>Shimon Bankar</td>
                          <td>07/01/2025</td>
                          <td>Pranav Deshmukh</td>
                          <td>Pending</td>
                          <td>₹ 4,900.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>16479</td>
                          <td>1000048307</td>
                          <td>18324</td>
                          <td>M.S.E.D.C.L (MSEDHT)</td>
                          <td>SAMBHAJI GHADAGE</td>
                          <td>04/01/2025</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 2,042,560.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>16477</td>
                          <td>1000048306</td>
                          <td>18322</td>
                          <td>M.S.E.D.C.L (MSEDHT)</td>
                          <td>SAMBHAJI GHADAGE</td>
                          <td>04/01/2025</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 3,941,430.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>16450</td>
                          <td></td>
                          <td>18308</td>
                          <td>Aqua Rise</td>
                          <td>SAMBHAJI GHADAGE</td>
                          <td>03/01/2025</td>
                          <td>Pranav Deshmukh</td>
                          <td>Pending</td>
                          <td>₹ 4,000.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td>16418</td>
                          <td>1000048188</td>
                          <td>18294</td>
                          <td>Aqualift Equipments</td>
                          <td>SAMBHAJI GHADAGE</td>
                          <td>02/01/2025</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 40,620.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>16382</td>
                          <td>1000048189</td>
                          <td>18275</td>
                          <td>Sonu G Enterprises</td>
                          <td>UJENDRA GADGE</td>
                          <td>28/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 14,100.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>11</td>
                          <td>16381</td>
                          <td>1000048190</td>
                          <td>18274</td>
                          <td>Aquadry Waterproofing Solutions</td>
                          <td>UJENDRA GADGE</td>
                          <td>28/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 89,474.90</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>12</td>
                          <td>16380</td>
                          <td>1000048191</td>
                          <td>18273</td>
                          <td>Sanyo Enterprises</td>
                          <td>UJENDRA GADGE</td>
                          <td>28/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 30,000.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>13</td>
                          <td>16360</td>
                          <td>1000048192</td>
                          <td>18269</td>
                          <td>Prompt Industrial Services Private</td>
                          <td>UJENDRA GADGE</td>
                          <td>27/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 25,963.50</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>14</td>
                          <td>16359</td>
                          <td>1000048193</td>
                          <td>18268</td>
                          <td>Prompt Industrial Services Private</td>
                          <td>UJENDRA GADGE</td>
                          <td>27/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 27,280.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr>
                        <tr>
                          <td>15</td>
                          <td>16355</td>
                          <td>1000048172</td>
                          <td>18265</td>
                          <td>British Safety Council (India) Llp</td>
                          <td>UJENDRA GADGE</td>
                          <td>26/12/2024</td>
                          <td>VIJITSINGH THOPTE</td>
                          <td>Approved</td>
                          <td>₹ 45,600.00</td>
                          <td></td>
                          <td>
                                <button
                                  className="btn "
                                  onClick={() =>
                                    Navigate(`/user-list/${event.id}`)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                  </svg>{" "}
                                </button>
                          </td>
                        </tr> */}
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
                        <button className="page-link">2</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">3</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">4</button>
                      </li>
                      <li className="page-item disabled">
                        <button className="page-link">5</button>
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
                { <Select
                          // options={filterOptions.event_titles}
                          // placeholder="Select an Event Title"
                          // isClearable
                          // value={filterOptions.event_titles.find(
                          //   (opt) => opt.value === filters.title_in
                          // )}
                          // onChange={(option) =>
                          //   handleFilterChange("title_in", option?.value || "")
                          // }
                        /> }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Product</label>
                { <Select
                          // options={filterOptions.material_name}
                          // placeholder="Select a Product"
                          // isClearable
                          // value={filterOptions.material_name.find(
                          //   (opt) =>
                          //     opt.value === filters.event_materials_inventory_id_in
                          // )}
                          // onChange={(option) =>
                          //   handleFilterChange(
                          //     "event_materials_inventory_id_in",
                          //     option?.value || ""
                          //   )
                          // }
                        /> }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Product Category</label>
                { <Select
                          // options={filterOptions.material_type}
                          // placeholder="Select a Product Category"
                          // isClearable
                          // value={filterOptions.material_type.find(
                          //   (opt) =>
                          //     opt.value ===
                          //     filters.event_materials_pms_inventory_inventory_type_id_in
                          // )}
                          // onChange={(option) =>
                          //   handleFilterChange(
                          //     "event_materials_pms_inventory_inventory_type_id_in",
                          //     option?.value || ""
                          //   )
                          // }
                        /> }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Location</label>
                { <Select
                          // options={filterOptions.locations}
                          // placeholder="Select a Location"
                          // isClearable
                          // value={filterOptions.locations.find(
                          //   (opt) => opt.value === filters.event_materials_id_in
                          // )}
                          // onChange={(option) =>
                          //   handleFilterChange(
                          //     "event_materials_id_in",
                          //     option?.value || ""
                          //   )
                          // }
                        /> }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Created By</label>
                { <Select
                          // options={filterOptions.creaters}
                          // placeholder="Select a Creator"
                          // isClearable
                          // value={filterOptions.creaters.find(
                          //   (opt) => opt.value === filters.created_by_id_in
                          // )}
                          // onChange={(option) =>
                          //   handleFilterChange(
                          //     "created_by_id_in",
                          //     option?.value || ""
                          //   )
                          // }
                        /> }
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
