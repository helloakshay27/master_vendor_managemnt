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

export default function Wodetails() {
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
                      Work Order
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Work Order Details
                  </li>
                </ol>
              </nav>
              <h5 className="mt-3 ms-3">Work Order Details</h5>
              <div style={{ width: "15%" }}></div>
            </div>

            <div className="material-boxes mt-3">
              <div className="container-fluid">
                <div className="row separteinto5 justify-content-left">
                  <div className="container">
                   
                  </div>
                </div>
                {/* Buttons */}
                <div className="d-flex mt-3 justify-content-end align-items-end px-3">
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top"></span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pen"
                        viewBox="0 0 16 16"
                      >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                      </svg>
                    </button>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top"></span>
                      Clone
                    </button>
                  </div>
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top">
                        print
                      </span>
                      Print
                    </button>
                  </div>
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top"></span>
                      Feeds
                    </button>
                  </div>
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top"></span>
                      Add invoice/SES
                    </button>
                  </div>
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top"></span>
                      Debit/Credit Node
                    </button>
                  </div>
                </div>

                {/* Main-card */}
                <div className="card mx-3 mt-3">
                  {/* Business bay card */}
                  <div className="card mx-3 mt-3">
                    <div className="card-header3">
                      <h3 className="card-title">Business Bay</h3>
                      <div className="card-body">
                        <div className="row px-3">
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>Phone</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                NA
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>Fax</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                NA
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>Email</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                NA
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>GST</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                NA
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>PAN</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                NA
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                            <div className="col-6 ">
                              <label>Address</label>
                            </div>
                            <div className="col-6">
                              <label className="text">
                                <span className="me-3">
                                  <span className="text-dark">:</span>
                                </span>
                                Panchshil Corporate Park S.NO..103-H.NO-2,OPP.
                                NETAJI HIGH SCHOOL, YERAWADA PUNE - 411006 -
                                India
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material-pr */}
                  <div className="card mx-3 mt-3">
                    <div className="card-header3">
                      <h3 className="card-title">Work Order (Pending)</h3>
                      <div className="card-body">
                        <div className="row px-2">
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">WO Number.</div>
                            <div className="col-8">: 6100010052</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Reference No.
                            </div>
                            <div className="col-8">: 18341</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">WO Date</div>
                            <div className="col-8">: 01-12-24</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">ID</div>
                            <div className="col-8">: 16591</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Plant Detail</div>
                            <div className="col-8">:1020-I050-I050</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Kind Attention
                            </div>
                            <div className="col-8">:</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Contractor</div>
                            <div className="col-8">Global Airconditioning</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Subject</div>
                            <div className="col-8">:</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Address</div>
                            <div className="col-8">
                              : 208, Mangalwar Peth,, Behind Modi Petrol Pump,,
                              Pune
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Related To</div>
                            <div className="col-8">:</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Phone</div>
                            <div className="col-8">: 020-26051213</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Payment Tenure(In Days)
                            </div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Email</div>
                            <div className="col-8">
                              : receivables@tridents.net
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Retention(%)</div>
                            <div className="col-8">:</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">GST</div>
                            <div className="col-8">: NA</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">TDS(%)</div>
                            <div className="col-8">:</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">PAN</div>
                            <div className="col-8">:AAFFG5877N</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">QC(%)</div>
                            <div className="col-8">
                              :
                              <br />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Work Category
                            </div>
                            <div className="col-8">: NA</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Advance Amount
                            </div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Description</div>
                            <div className="col-8">: </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3 mx-3">
                    <div className="card-header3">
                      <div className="card-body">
                        <div className="tbl-container mt-3 px-3 ">
                          <table className="w-100">
                            <thead>
                              <tr>
                                <th rowSpan={2}>S.No.</th>
                                <th rowSpan={2}>BOQ Details Details</th>
                                <th rowSpan={2}>Quantity</th>
                                <th rowSpan={2}>UOM</th>
                                <th rowSpan={2}>Expected Date</th>
                                <th rowSpan={2}>Product Description</th>
                                <th rowSpan={2}>Rate</th>
                                <th
                                  style={{
                                    paddingLeft: 20,
                                    textAlign: "center",
                                  }}
                                  colSpan={2}
                                >
                                  CGST{" "}
                                </th>
                                <th
                                  style={{
                                    paddingLeft: 20,
                                    textAlign: "center",
                                  }}
                                  colSpan={2}
                                >
                                  SGST
                                </th>
                                <th
                                  style={{
                                    paddingLeft: 20,
                                    textAlign: "center",
                                  }}
                                  colSpan={2}
                                >
                                  IGST
                                </th>
                                <th
                                  style={{
                                    paddingLeft: 20,
                                    textAlign: "center",
                                  }}
                                  colSpan={2}
                                >
                                  TCS
                                </th>
                                <th rowSpan={2}>Tax Amount</th>
                                <th rowSpan={2}>Total Amount</th>
                              </tr>
                              <tr>
                                <th>Rate(%)</th>
                                <th>Amount</th>
                                <th>Rate(%)</th>
                                <th>Amount</th>
                                <th>Rate(%)</th>
                                <th>Amount</th>
                                <th>Rate(%)</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td style={{ textAlign: "left !important" }}>
                                  INSTALLATION OF HVAC WORK - BMS room new AC
                                  installation work
                                </td>
                                <td style={{ textAlign: "left !important" }}>
                                  1.0
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  JOB
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  NA
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  BMS room new AC installation work
                                </td>

                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  285000.00
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  9.00
                                </td>
                                <td style={{ textAlign: "right !important" }}>
                                  25650.00
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  9.00
                                </td>
                                <td style={{ textAlign: "right !important" }}>
                                  25650.00
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  0.00
                                </td>
                                <td style={{ textAlign: "right !important" }} />
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  0.00
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  0.00
                                </td>
                                <td
                                  sborder={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  51300.00
                                </td>
                                <td
                                  border={2}
                                  style={{ textAlign: "right !important" }}
                                >
                                  285000.000
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: "left !important" }}
                                  colSpan={16}
                                >
                                  Net Amount(INR):
                                </td>
                                <td
                                  style={{ textAlign: "right !important" }}
                                  colSpan={1}
                                >
                                  285000.000
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: "left !important" }}
                                  colSpan={16}
                                >
                                  Total Taxable Value Of WO :
                                </td>
                                <td
                                  style={{ textAlign: "right !important" }}
                                  colSpan={1}
                                >
                                  285000.000
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: "left !important" }}
                                  colSpan={16}
                                >
                                  Taxes:
                                </td>
                                <td
                                  style={{ textAlign: "right !important" }}
                                  colSpan={1}
                                >
                                  51300.000
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: "left !important" }}
                                  colSpan={16}
                                >
                                  Total WO Value (INR):
                                </td>
                                <td
                                  style={{ textAlign: "right !important" }}
                                  colSpan={1}
                                >
                                  336300.00
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ textAlign: "left !important" }}
                                  colSpan={17}
                                >
                                  Amount In Words: Three Lakh, Thirty Six
                                  Thousand, Three Hundred Rupees Only
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 ms-3">
                    <span className="fw-bold">Terms &amp; Conditions:</span>
                    <ul className="list-group">
                      <ol>NA</ol>
                    </ul>
                  </div>

                  <div className="p-2 ms-3 pb-3 fw-bold">
                    For Business Bay we Confirm &amp; Accept,
                    <br />
                    <br />
                    <br />
                    <span className="border-top border-dark">
                      PREPARED BY: Panchshil API SIGNATURE:
                    </span>
                  </div>
                </div>
                <div className="row mt-2 ms-1">
                  <div className="col-md-6">
                    <div className="form-group">
                      <h5>
                        Attchment <span />
                      </h5>
                      <input
                        className="form-control"
                        type="file"
                        placeholder="Default input"
                        onchange="uploadFile(this)"
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                            
                </div>

                <div className="card mt-4 pb-4">
                  <div className="card mx-3 mt-3">
                    <div className="card-header3">
                      <h3 className="card-title">Invoices/SES Details</h3>
                      <div className="card-body">
                        <div className="tbl-container mt-3 px-3 ">
                          <table className="w-100">
                            <thead>
                              <tr style={{ background: "#de7008" }}>
                                <th>ID</th>
                                <th>Invoice Number</th>
                                <th>Invoice Date</th>
                                <th>Total Invoice Amount</th>
                                <th>Payable Amount</th>
                                <th>Retention Amount</th>
                                <th>TDS Amount</th>
                                <th>QC Amount</th>
                                <th>W.O. Number</th>
                                <th>Physical Invoice Sent to Accounts</th>
                                <th>Physical Invoice Received by Accounts</th>
                                <th>Days Passed </th>
                                <th>Amount Paid </th>
                                <th>Balance Amount </th>
                                <th>Payment Status</th>
                                <th>Aging</th>
                                <th>Created On</th>
                                <th>Created By</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mx-3 mt-3">
                    <div className="card-header3">
                      <h3 className="card-title">Payment Details</h3>
                      <div className="card-body">
                        <div className="tbl-container mt-3 px-3 ">
                          <table className="w-100">
                            <thead>
                              <tr style={{ background: "#de7008" }}>
                                <th>Invoice ID</th>
                                <th> Amount</th>

                                <th> Payment Mode</th>
                                <th> Transaction Number</th>
                                <th> Status</th>
                                <th> Payment Date</th>
                                <th>Note</th>
                                <th> Date Of Entry</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mx-3 mt-3">
                    <div className="card-header3">
                      <h3 className="card-title">Debit/Credit Note Details</h3>
                      <div className="card-body">
                        <div className="tbl-container mt-3 px-3 ">
                          <table className="w-100">
                            <thead>
                              <tr style={{ background: "#de7008" }}>
                                <th> ID</th>
                                <th> Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Approved</th>
                                <th>Approved On</th>
                                <th>Approved By</th>
                                <th>Created On</th>
                                <th>Created By</th>
                                <th>Attachment</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
