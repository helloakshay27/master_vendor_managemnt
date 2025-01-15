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

export default function MaterialDetails() {
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
              <h5 className="mt-3 ms-3">RFQ &amp; Material PR Deatils</h5>
              <div style={{ width: "15%" }}></div>
            </div>

            <div className="material-boxes mt-3">
              <div className="container-fluid">
                

                {/* <div className="d-flex mt-3 align-items-end px-3">
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

                  { <div className="col-md-6">
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
                      <div className="col-md-4">
                        <button
                          className="purple-btn2"
                          onClick={() => navigate("/create-event")}
                        >
                          <span className="material-symbols-outlined align-text-top">
                            add
                          </span>
                          Add
                        </button>
                      </div>
                    </div>
                  </div> }
                </div> */}
                
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
                          comment
                          </span>
                          Feeds
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
                          Send To SAP Team
                        </button>
                </div>
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
                  <h3 className="card-title">Material PR</h3>
                  <div className="card-body">
                  <div className="row px-3">
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>MPR No.</label>
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
          12163
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>MPR Date</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          06-01-25
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
          9197
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
        <label>Supplier</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Trident Services Private Limited
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
          At And Post Shivane, Tal Havali,, Pune
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
          25292790
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
          receivables@tridents.net
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
          AACCT0173G
        </label>
      </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
      <div className="col-6 ">
        <label>Delivery Address</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Business Bay
          Panchshil Corporate Park S.NO..103-H.NO-2,OPP. NETAJI HIGH SCHOOL, YERAWADA PUNE - 411006 - India
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
        <label>Related To</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          Tower A & B for the DG Set quotation for critical spare part.
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
        <label>Advance Amount</label>
      </div>
      <div className="col-6">
        <label className="text">
          <span className="me-3">
            <span className="text-dark">:</span>
          </span>
          0.0
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
        <th>Item</th>
        <th>Availability</th>
        <th>SAC/HSN Code</th>
        <th>Expected Date</th>
        <th>Product Description</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Moving Avg Rate</th>
        <th>Rate</th>
        <th>Amount</th>
        <th>Approved Qty</th>
        <th>Transfer Qty</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>VEE BELT</td>
        <td></td>
        <td>40103190</td>
        <td>06/01/25</td>
        <td>BELT,V RIBBED</td>
        <td>1.0</td>
        <td>EA</td>
        <td>6513.0</td>
        <td>5432.42</td>
        <td>5432.42</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>2</td>
        <td>OIL SEAL</td>
        <td></td>
        <td>40169330</td>
        <td>06/01/25</td>
        <td>SEAL,OIL</td>
        <td>1.0</td>
        <td>EA</td>
        <td>100.0</td>
        <td>46422.58</td>
        <td>46422.58</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>3</td>
        <td>DG ACCESS.- ENGINE AND DG PARTS CLEANER</td>
        <td></td>
        <td>38140010</td>
        <td>06/01/25</td>
        <td>SENSOR,BLOWBY FLOW</td>
        <td>1.0</td>
        <td>EA</td>
        <td>397.0</td>
        <td>21638.05</td>
        <td>21638.05</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>4</td>
        <td>DG SPARE-PRESSURE SENDER</td>
        <td></td>
        <td>90262000</td>
        <td>06/01/25</td>
        <td>SENSOR,PRESSURE</td>
        <td>1.0</td>
        <td>EA</td>
        <td>8512.0</td>
        <td>45445.18</td>
        <td>45445.18</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>5</td>
        <td>DG SPARE-PRESSURE SENDER</td>
        <td></td>
        <td>90262000</td>
        <td>06/01/25</td>
        <td>SENSOR,PRESSURE</td>
        <td>1.0</td>
        <td>EA</td>
        <td>8512.0</td>
        <td>52279.30</td>
        <td>52279.30</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>6</td>
        <td>SENSOR LEVEL</td>
        <td></td>
        <td>90268090</td>
        <td>06/01/25</td>
        <td>SENSOR,ENGINE SPEED</td>
        <td>1.0</td>
        <td>EA</td>
        <td>43705.2</td>
        <td>14382.34</td>
        <td>14382.34</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>7</td>
        <td>TEMP. SENSOR</td>
        <td></td>
        <td>90251910</td>
        <td>06/01/25</td>
        <td>SENSOR,TEMPERATURE</td>
        <td>1.0</td>
        <td>EA</td>
        <td>10535.6</td>
        <td>9454.27</td>
        <td>9454.27</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>8</td>
        <td>DG SPARES- SOLENOID SWITCH</td>
        <td></td>
        <td>85119000</td>
        <td>06/01/25</td>
        <td>SWITCH,COOLANT LEVEL</td>
        <td>1.0</td>
        <td>EA</td>
        <td>7560.0</td>
        <td>24447.56</td>
        <td>24447.56</td>
        <td>1</td>
        <td></td>
      </tr>
      <tr>
        <td>9</td>
        <td>MATERIAL- LOADING / UNLOADING /TRANSPORT</td>
        <td></td>
        <td>996519</td>
        <td>06/01/25</td>
        <td>TRANSPORT CHARGES</td>
        <td>1.0</td>
        <td>EA</td>
        <td>1.0</td>
        <td>800.00</td>
        <td>800.00</td>
        <td>1</td>
        <td></td>
      </tr>
    </tbody>
                    </table>
                    <div className="mt-3 pb-1">
    <strong>Net Amount (INR):</strong> 220301.70
  </div>
  <div className="pb-2">
    <strong>Amount in Words:</strong> Two Lakh, Twenty Thousand, Three Hundred, One Rupees Only
  </div>
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

               <div className=" row ms-2 p-2 border border-secondary mx-2">
              <span className="fw-bold">Terms &amp; Conditions:</span>
  <ul className="list-group">
    <ol>
      <li style={{ wordBreak: "break-word" }}>
        The above prices are Ex-Trident Services Pvt. Ltd. Govt. Levies if
        applicable at destination will be to your Account. Taxes: GST as
        applicable. Prices are subject to change by our Principle without notice
        and the prices ruling on the date of supply would be applicable.
        Payment: 100% advance along with the firm order. Delivery Lead Time:
        Ex-stocks for fast moving parts and remaining within 2 to 4 weeks.
        Please indicate the engine serial number and model while ordering/or any
        enquiry. Warranty: As Per Cummins Norms. The validity of this quotation
        is 10 days. Thanking you and assuring you best of our services all the
        time. NOTE: - IN CASE OF ANY ISSUE OF UNLOADING OF MATERIAL RELATED TO
        MATHADE KAMGAR UNION, THE COST OF UNLOADING WILL BE BORN BY CUSTOMER
        ONLY.
      </li>
    </ol>
  </ul>
</div>

<div className="row ms-2 purchase-form   p-3 me-4">
  <div className=" row px-2 ">
    <h6>SAP Response</h6>
    <div className="col-lg-12 col-md-12 col-sm-12 row px-2">
      <div className="col-4">Code: 500 </div>
      <div className="col-8">
        Message: Material 1010017320 not maintained in plant S110 - 1010017320
      </div>
    </div>
    <h6>SAP Response</h6>
    <div className="col-lg-12 col-md-12 col-sm-12 row px-2">
      <div className="col-4">Code: 500 </div>
      <div className="col-8">
        Message: Material 1010017320 not maintained in plant S110 - 1010017320
      </div>
    </div>
    <h6>SAP Response</h6>
    <div className="col-lg-12 col-md-12 col-sm-12 row px-2">
      <div className="col-4">Code: 500 </div>
      <div className="col-8">
        Message: Material 1010017320 not maintained in plant S110 - 1010017320
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
