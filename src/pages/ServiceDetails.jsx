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

export default function ServiceDetails() {
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
              <h5 className="mt-3 ms-3">RFQ &amp; Service PR Deatils</h5>
              <div style={{ width: "15%" }}></div>
            </div>

            <div className="material-boxes mt-3">
              <div className="container-fluid">
                

              
                
              {/* {Buttons} */}
               <div className="d-flex mt-3 justify-content-end align-items-end px-3">
               <div className="">
                         <button
                          className="purple-btn2"
                          onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            add
                          </span>
                          Clone
                        </button>
                </div>
                <div className=" ">
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
                <div className=" ">
                         <button
                          className="purple-btn2"
                          onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                          
                          </span>
                          Feeds
                        </button>
                </div>
                {/* <div className=" ">
                         <button
                          className="purple-btn2"
                          onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            
                          </span>
                          Send To SAP Team
                        </button>
                </div> */}
               </div>
                
               {/* {Main-card} */}
               <div className="card mx-3 mt-3">
                {/* {business bay card} */}
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
          Panchshil Corporate Park S.NO..103-H.NO-2,OPP. NETAJI HIGH SCHOOL, YERAWADA PUNE - 411006 - India
        </label>
      </div>
    </div>
  </div>

                  </div>
                 </div>
                </div>
                 
                 {/* {material-pr} */}
                <div className="card mx-3 mt-3">
                <div className="card-header3">
                  <h3 className="card-title">Service PR</h3>
                  <div className="card-body">
                  <div className="row px-3">
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>PR Number</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Reference No.</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          18391
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>PR Date</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          09-01-25
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>ID</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          16574
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Plant Detail</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          1050-S110-S110
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Kind Attention</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Dear Sir
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Contractor</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          POLYTEST LABORATORIES LIMITED
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Subject</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Common area half yearly legionella water test.
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
          22,Sonai Industril Estate, Prangut,, Pune
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Related To</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Business Bay Cooling tower & waterbody half yearly legionella water test.
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Phone</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          9881075950
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Payment Tenure(In Days)</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
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
        <label>Retention(%)</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
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
        <label>TDS(%)</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
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
          AAECP6861F
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>QC(%)</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Work Category</label>
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
        <label>Advance Amount</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Description</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Business Bay site cooling tower & waterbody half yearly legionella water testing done.
        </label>
      </div>
    </div>

  </div>

                  </div>
                 </div>
                </div>
                
                {/*Table Content*/}
                <div className="tbl-container mt-3 px-3">
                    <table className="w-100" >
                    <thead>
                    <tr>
            <th>S.No.</th>
            <th>BOQ Details</th>
            <th>Quantity</th>
            <th>UOM</th>
            <th>Expected Date</th>
            <th>Product Description</th>
            <th>Rate</th>
            <th>CGST (%)</th>
            <th>CGST Amount</th>
            <th>SGST (%)</th>
            <th>SGST Amount</th>
            <th>IGST (%)</th>
            <th>IGST Amount</th>
            <th>TCS (%)</th>
            <th>TCS Amount</th>
            <th>Tax Amount</th>
            <th>Total Amount</th>
          </tr>
    </thead>
    <tbody>
    <tr>
            <td>1</td>
            <td>WATER TESTING CHARGES - Six monthly legionella water test.</td>
            <td>1.0</td>
            <td>Job</td>
            <td>10/01/25</td>
            <td>Six monthly legionella water test.</td>
            <td>1890.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td></td>
            <td>1890.00</td>
          </tr>
          <tr>
            <td colSpan="16" className="text-right">
              <strong>Net Amount (INR):</strong> ₹1890.00
            </td>
            <td>1890.00</td>
          </tr>
          <tr>
            <td colSpan="16" className="text-right">
              <strong>Total Taxable Value of LOI:</strong> ₹1890.00
            </td>
            <td>1890.00</td>
          </tr>
          <tr>
            <td colSpan="16" className="text-right">
              <strong>Taxes (INR):</strong> ₹0.00
            </td>
            <td>0.00</td>
          </tr>
          <tr>
            <td colSpan="16" className="text-right">
              <strong>Total LOI Value (INR):</strong> ₹1890.00
            </td>
            <td>1890.00</td>
          </tr>
          <tr>
            <td colSpan="17" className="text-right">
              <strong>Amount in Words:</strong> One Thousand, Eight Hundred, Ninety Rupees Only
            </td>
            
          </tr>
      
    </tbody>

    
                    </table>
                   
                    </div>
                    

                    <div className="d-flex justify-content-between align-items-center px-3 mt-2 mb-2 pb-2">
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

                  <div className="m-2 ms-3">
                   <p className="fw-bold">Terms &amp; Conditions :</p>
                   <ul>
                      <li>
                       <div className="strong">
                      <p>GST 18% extra.</p>
                  </div>
                 </li>
                </ul>
              </div>
              <div className="m-2 fw-bold ms-3">
                 <p className="mb-5">For Business Bay We Confirm &amp; Accept,</p>
                 <p>PREPARED BY: SAMBHAJI GHADAGE</p>
                 <p>SIGNATURE:</p>
               </div>
            </div>

               
               <div className="row ms-3 mt-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
