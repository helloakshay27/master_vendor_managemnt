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

export default function POdeta() {
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
                      Purchase Order
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Purchase Order Details
                  </li>
                </ol>
              </nav>
              <h5 className="mt-3 ms-3">PURCHASE ORDER DETAILS</h5>
              <div style={{ width: "15%" }}></div>
            </div>

            <div className="material-boxes mt-3">
              <div className="container-fluid">
                 
                {/* Buttons */}
                <div className="d-flex mt-3 justify-content-end align-items-end px-3">
                  <div>
                    <button
                      className="purple-btn2"
                      onClick={() => navigate("/create-event")}
                    >
                      <span className="material-symbols-outlined align-text-top">
                        comment
                      </span>
                      Feeds
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
                      <h3 className="card-title">Purchase Order</h3>
                      <div className="card-body">
                        <div className="row px-2">
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">PO No.</div>
                            <div className="col-8">: 4500004309</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Reference No.
                            </div>
                            <div className="col-8">: 12127</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">PO Date</div>
                            <div className="col-8">: 24-12-24</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">ID</div>
                            <div className="col-8">: 9041</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Plant Detail</div>
                            <div className="col-8">: 1050-S110-S110</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Supplier</div>
                            <div className="col-8">
                              : Trident Services Private Limited
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Address</div>
                            <div className="col-8">
                              : At And Post Shivane, Tal Havali,, Pune
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Phone</div>
                            <div className="col-8">: 25292790</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Email</div>
                            <div className="col-8">
                              : receivables@tridents.net
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">GST</div>
                            <div className="col-8">: NA</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">PAN</div>
                            <div className="col-8">:AACCT0173G</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Delivery Address
                            </div>
                            <div className="col-8">
                              : Business Bay
                              <br />
                              Panchshil Corporate Park S.NO..103-H.NO-2,OPP.
                              NETAJI HIGH SCHOOL, YERAWADA PUNE - 411006 - India
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Phone</div>
                            <div className="col-8">: NA</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Email</div>
                            <div className="col-8">: NA </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Related To</div>
                            <div className="col-8">: NA</div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Payment Tenure(In Days)
                            </div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">Retention(%)</div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">TDS(%)</div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">QC(%)</div>
                            <div className="col-8">: </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 row px-2">
                            <div className="col-4 text-muted">
                              Advance Amount
                            </div>
                            <div className="col-8 ps-2">: </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3 mx-3">
                    <div className="card-body">
                      <div className="tbl-container mt-3 px-3 ">
                        <table className="w-100">
                          <thead>
                            <tr>
                              <th rowSpan={2}>S.No.</th>
                              <th rowSpan={2}>Item Details</th>
                              <th rowSpan={2}>SAC/HSN Code</th>
                              <th rowSpan={2}>Expected Date</th>
                              <th rowSpan={2}>Quantity</th>
                              <th rowSpan={2}>Unit</th>
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
                                DIESEL
                              </td>
                              <td style={{ textAlign: "left !important" }}>
                                NA
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
                                1000.0
                              </td>
                              <td
                                border={2}
                                style={{ textAlign: "right !important" }}
                              ></td>

                              <td
                                border={2}
                                style={{ textAlign: "right !important" }}
                              >
                                90.64
                              </td>
                              <td
                                border={2}
                                style={{ textAlign: "right !important" }}
                              >
                                0.00
                              </td>
                              <td style={{ textAlign: "right !important" }}>
                                0.00
                              </td>
                              <td
                                border={2}
                                style={{ textAlign: "right !important" }}
                              >
                                0.00
                              </td>
                              <td style={{ textAlign: "right !important" }}>
                                0.00
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
                              ></td>
                              <td
                                sborder={2}
                                style={{ textAlign: "right !important" }}
                              >
                                0.00
                              </td>
                              <td
                                border={2}
                                style={{ textAlign: "right !important" }}
                              >
                                90640.00
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
                                90640.00
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ textAlign: "left !important" }}
                                colSpan={16}
                              >
                                Gross Amount::
                              </td>
                              <td
                                style={{ textAlign: "right !important" }}
                                colSpan={1}
                              >
                                90640.00
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
                                0.00
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ textAlign: "left !important" }}
                                colSpan={16}
                              >
                                Net Invoice Amount:
                              </td>
                              <td
                                style={{ textAlign: "right !important" }}
                                colSpan={1}
                              >
                                90640.00
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{ textAlign: "left !important" }}
                                colSpan={17}
                              >
                                Amount In Words: Ninty Thousand, Six Hundred,
                                Fourty Rupees Only
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 ms-3">
                    <span className="fw-bold">Notes:</span>
                    <ul className="list-group">
                      <ol>NA</ol>
                    </ul>
                  </div>
                  <div className="p-2 ms-3">
                    <span className="fw-bold">Terms &amp; Conditions:</span>
                    <ul className="list-group">
                      <ol>NA</ol>
                    </ul>
                  </div>

                  <div className="p-2 pb-3 ms-3 fw-bold">
                    For Business Bay we Confirm &amp; Accept,
                    <br />
                    <br />
                    <br />
                    <span className="border-top border-dark">
                      Authorised Signatory
                    </span>
                  </div>
                </div>
                <div className="row ms-2 mt-2 ms-1">
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
                            
                  <div className="card mt-4 pb-4">
                    <div className="card mx-3 mt-3">
                      <div className="card-header3">
                        <h3 className="card-title">GRN Details</h3>
                        <div className="card-body">
                          <div className="tbl-container mt-3 px-3 ">
                            <table className="w-100">
                              <thead>
                                <tr style={{ background: "#de7008" }}>
                                  <th>Action</th>
                                  <th>ID</th>
                                  <th> Inventory</th>
                                  <th>Supplier</th>
                                  <th>Invoice Number</th>
                                  <th>Total GRN Amount</th>
                                  <th>Payable Amount</th>
                                  <th>Retention Amount</th>
                                  <th>TDS Amount</th>
                                  <th>QC Amount</th>
                                  <th>Invoice Date</th>
                                  <th>Payment Mode </th>
                                  <th>Other Expense</th>
                                  <th>Loading Expense </th>
                                  <th>Adjustment Amount</th>
                                  <th>QC Approval Status</th>
                                  <th>HSE Approval Status</th>
                                  <th>Admin Approval Status</th>
                                  <th>Physical Invoice Sent to Accounts</th>
                                  <th>Physical Invoice Received by Accounts</th>
                                  <th>Amount Paid</th>
                                  <th>Balance Amount</th>
                                  <th>Payment Status</th>
                                  <th>Created On</th>
                                  <th>Created By</th>
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
                                  <th>GRN ID</th>
                                  <th> Amount</th>
                                  <th>Payment Mode</th>
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
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mx-3 mt-3">
                      <div className="card-header3">
                        <h3 className="card-title">
                          Debit/Credit Note Details
                        </h3>
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
                  {/* <div className="btn-search my-2 d-flex justify-content-between flex-wrap me-3">
                    <div className="d-flex ">
                      <h6 className="m-0">GRN Details</h6>{" "}
                    </div>
                  </div>
                  <div className="tbl-container h-auto me-3 ">
                    <table className="w-100">
                      <thead>
                        <tr style={{ background: "#F6EFF4" }}>
                          <td>Action</td>
                          <td>ID</td>
                          <td>Inventory</td>
                          <td>Supplier</td>
                          <td>Invoice Number</td>
                          <td>Total GRN Amount</td>
                          <td>Payable Amount</td>
                          <td>Retention Amount</td>
                          <td>TDS Amount</td>
                          <td>QC Amount</td>
                          <td>Invoice Date</td>
                          <td>Payment Mode</td>
                          <td>Other Expense</td>
                          <td>Loading Expense</td>
                          <td>Adjustment Amount</td>
                          <td>QC Approval Status</td>
                          <td>HSE Approval Status</td>
                          <td>Admin Approval Status</td>
                          <td>Physical Invoice Sent to Accounts</td>
                          <td>Physical Invoice Received by Accounts</td>
                          <td>Amount Paid </td>
                          <td>Balance Amount </td>
                          <td>Payment Status </td>
                          <td>Created On</td>
                          <td>Created By</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    <div className="my-2" id="pagination" />
                  </div>
                  <br />
                  
                  <div className="btn-search my-2 d-flex justify-content-between flex-wrap me-3">
                    <div className="d-flex ">
                      <h6 className="m-0">Payment Details</h6>{" "}
                    </div>
                  </div>
                  <div className="tbl-container h-auto me-3 ">
                    <table className="w-100">
                      <thead>
                        <tr style={{ background: "#F6EFF4" }}>
                          <td>GRN ID</td>
                          <td>Amount</td>
                          <td>Payment Mode</td>
                          <td>Transaction Number</td>
                          <td>Status</td>
                          <td>Payment Date</td>
                          <td>Note </td>
                          <td>Date Of Entry</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    <div className="my-2" id="pagination" />
                  </div>
                  <br />
                  
                  <div className="btn-search my-2 d-flex justify-content-between flex-wrap me-3">
                    <div className="d-flex ">
                      <h6 className="m-0">Debit/Credit Note Details</h6>{" "}
                    </div>
                  </div>
                  <div className="tbl-container h-auto me-3">
                    <table className="w-100">
                      <thead>
                        <tr>
                          <td> ID</td>
                          <td>Type</td>
                          <td>Amount</td>
                          <td>Description</td>
                          <td>Approved</td>
                          <td>Approved On</td>
                          <td>Approved By </td>
                          <td>Created On</td>
                          <td>Created By</td>
                          <td>Attachment</td>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                    <div className="my-2" id="pagination" />
                  </div>
                  <div className="purchase-form   p-3 me-4">
                    <div className=" row px-2 "></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
