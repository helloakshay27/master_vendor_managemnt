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
import PoDetail from "./PoDetail";

export default function PoPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleViewDetail = (poId) => {
    navigate(`/Po-Detail/${poId}`);
  };

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
                    PURCHASE ORDER
                  </li>
                </ol>
              </nav>
              <h5 className="mt-3 ms-3"> PURCHASE ORDER LIST</h5>
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
                      <h4 className="content-box-title">All </h4>
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
                      <h4 className="content-box-title">Approved </h4>
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
                      <h4 className="content-box-title">Rejected </h4>
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
                </div>

                <div className="card mt-4 pb-4">
                  <div className="d-flex mt-3 align-items-end px-3">
                    <div className="col-md-6 position-relative">
                      <form>
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
                            <button
                              type="sumbit"
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
                          </div>
                        </div>
                        {/* <div className="col-md-4">
                        <button
                          className="purple-btn2"
                          onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            add
                          </span>
                          New Event
                        </button>
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="tbl-container mt-3 px-3">
                    <table>
                      <thead>
                        <tr>
                          <th> ID</th>
                          <th>PO No.</th>
                          <th>Reference no.</th>
                          <th>Created by</th>
                          <th>Created on</th>
                          <th>Supplier</th>
                          <th>Payment Tenure(In Days)</th>
                          <th>Active/Inactive</th>
                          <th>Last Approved By</th>
                          <th>Approval status</th>
                          <th>Advance Amount</th>
                          <th>PO Amount</th>
                          <th>TDS Amount</th>
                          <th>Retention Amount</th>
                          <th>Retention Outstanding</th>
                          <th>QC Amount</th>
                          <th>QC Outstanding</th>
                          <th>No of Grns</th>
                          <th>Total Amount paid</th>
                          <th>Outstanding</th>
                          <th>Debit/Credit Note Raised</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>9041</td>
                          <td>4500004309</td>
                          <td>12127</td>

                          <td>Panchshil API</td>
                          <td>24/12/2024</td>
                          <td>Natasha Green-Tech</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td>- </td>
                          <td>Approved</td>
                          <td>-</td>
                          <td>10903.05</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>
                            <td>
                              <Link to="/PO-details/1" className="text-dark">
                                <span className="material-symbols-outlined">
                                  visibility
                                </span>
                              </Link>
                            </td>
                          </td>
                        </tr>
                        <tr>
                          <td> 9036</td>
                          <td>4500004304</td>
                          <td>12143</td>
                          <td>Panchshil API</td>
                          <td>24/12/2024</td>
                          <td> Sairaj Technologies</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td></td>
                          <td>Approved</td>
                          <td>0</td>
                          <td> 4684.60</td>
                          <td class="text-center"> </td>
                          <td class="text-center"> </td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0.0</td>

                          <td class="text-center"> 0.0</td>
                          <td class="text-center"> 0</td>

                          <td class="text-center"> 4684.60</td>
                          <td class="text-center"> No</td>
                          <td>
                            <Link to="/PO-details/1" className="text-dark">
                              <span className="material-symbols-outlined">
                                visibility
                              </span>
                            </Link>
                                       
                          </td>
                        </tr>
                        <tr>
                          <td>9004 </td>
                          <td>4500004291</td>
                          <td>12122</td>
                          <td>Panchshil API</td>
                          <td>29/12/2024</td>
                          <td>Wepro Solutions</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td></td>
                          <td>Approved</td>
                          <td>0</td>
                          <td>11357.50</td>
                          <td class="text-center"> </td>
                          <td class="text-center"> </td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0.0</td>

                          <td class="text-center"> 0.0</td>
                          <td class="text-center"> 0</td>

                          <td class="text-center"> 3024.0</td>
                          <td class="text-center"> No</td>
                          <td>
                            <a className="text-dark" href="/PO-details/1">
                              <span className="material-symbols-outlined">
                                visibility
                              </span>{" "}
                            </a>
                                       
                          </td>
                        </tr>
                        <tr>
                          <td>9038</td>
                          <td>4500004306</td>
                          <td>12126</td>
                          <td>Panchshil API</td>
                          <td>28/12/2024</td>
                          <td> Asmita Electric Infra Private Limit</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td></td>
                          <td>Approved</td>
                          <td>0</td>
                          <td>10903.05</td>
                          <td class="text-center"> </td>
                          <td class="text-center"> </td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0.0</td>

                          <td class="text-center"> 0.0</td>
                          <td class="text-center"> 0</td>

                          <td class="text-center"> 105267.2</td>
                          <td class="text-center"> No</td>
                          <td>
                            <a className="text-dark" href="/PO-details/1">
                              <span className="material-symbols-outlined">
                                visibility
                              </span>{" "}
                            </a>
                                       
                          </td>
                        </tr>
                        <tr>
                          <td>9038</td>
                          <td>4500004306</td>
                          <td>12126</td>
                          <td>Panchshil API</td>
                          <td>28/12/2024</td>
                          <td>M.S.Printers</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td></td>
                          <td>Approved</td>
                          <td>0</td>
                          <td>10903.05</td>
                          <td class="text-center"> </td>
                          <td class="text-center"> </td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0.0</td>

                          <td class="text-center"> 0.0</td>
                          <td class="text-center"> 0</td>

                          <td class="text-center"> 105267.2</td>
                          <td class="text-center"> No</td>
                          <td>
                            <a className="text-dark" href="/PO-details/1">
                              <span className="material-symbols-outlined">
                                visibility
                              </span>{" "}
                            </a>
                                       
                          </td>
                        </tr>
                        <tr>
                          <td>8829 </td>
                          <td>4500004197</td>
                          <td>12118</td>
                          <td>Panchshil API</td>
                          <td>21/12/2024</td>
                          <td>Nirman Sales</td>
                          <td>0</td>
                          <td>
                            <form
                              className="edit_pms_purchase_order"
                              id="edit_pms_purchase_order_9041"
                              action="/pms/purchase_orders/9041"
                              acceptCharset="UTF-8"
                              method="post"
                            >
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <input
                                type="hidden"
                                name="_method"
                                defaultValue="patch"
                              />
                              <input
                                type="hidden"
                                name="authenticity_token"
                                defaultValue="cXNpMF89szENgnLVzQjrH8IC6ttba8/er70cQqiMqhBQFuDBsGp7sQm+Df86bc97SXkMBqYimh5ePN1E4COOSg=="
                              />
                              <label className="switch">
                                <input
                                  name="pms_purchase_order[active]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  type="checkbox"
                                  defaultValue={1}
                                  defaultChecked="checked"
                                  name="pms_purchase_order[active]"
                                  id="pms_purchase_order_active"
                                />
                                <span className="slider round" />
                              </label>
                            </form>
                          </td>
                          <td></td>
                          <td>Approved</td>
                          <td>0</td>
                          <td>10903.05</td>
                          <td class="text-center"> </td>
                          <td class="text-center"> </td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0</td>
                          <td class="text-center"> 0.0</td>

                          <td class="text-center"> 0.0</td>
                          <td class="text-center"> 0</td>

                          <td class="text-center"> 105267.2</td>
                          <td class="text-center"> No</td>
                          <td>
                            <a className="text-dark" href="/PO-details/1">
                              <span className="material-symbols-outlined">
                                visibility
                              </span>{" "}
                            </a>
                          </td>
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
                <h3 className="modal-title m-0" style={{ fontWeight: 500 }}>
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
        <form>
          <div className="modal-body" style={{ overflowY: "scroll" }}>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Enter Title </label>
                {
                  <Select
                  // options={filterOptions.event_titles}
                  // placeholder="Select an Event Title"
                  // isClearable
                  // value={filterOptions.event_titles.find(
                  //   (opt) => opt.value === filters.title_in
                  // )}
                  // onChange={(option) =>
                  //   handleFilterChange("title_in", option?.value || "")
                  // }
                  />
                }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Product</label>
                {
                  <Select
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
                  />
                }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Product Category</label>
                {
                  <Select
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
                  />
                }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Location</label>
                {
                  <Select
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
                  />
                }
              </div>
            </div>
            <div className="form-group mb-4">
              <div className="form-group">
                <label htmlFor="mor-date-from">Created By</label>
                {
                  <Select
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
                  />
                }
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
