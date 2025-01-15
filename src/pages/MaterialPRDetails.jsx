import React from 'react'
import { useState } from 'react';


const MaterialPRDetails = () => {
    const [historyEvents, setHistoryEvents] = useState({
        events: [],
        pagination: {},
      });
    const [liveEvents, setLiveEvents] = useState({ events: [], pagination: {} });
    const [activeTab, setActiveTab] = useState("all");
    const [allEventsData, setAllEventsData] = useState({
        events: [],
        pagination: {},
      });
    
    
    const handleTabChange = (tab) => {
        setActiveTab(tab);
      };
    
  return (
               <div className='main-content'> 
              <div className="website-content overflow-auto">
              <div className="module-data-section ">
              
            
            {/* <div className="row separteinto5 justify-content-left">
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
                </div> */}

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
                        backgroundColor:
                          activeTab === "all" ? "#de7008" : "#fff",
                        color: activeTab === "all" ? "white" : "black", // Adjust text color for better contrast
                      }}
                    >
                      <h4 className="content-box-title">All Events</h4>
                      <p className="content-box-sub">
                        {allEventsData.pagination?.total_count || 0}
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
                        backgroundColor:
                          activeTab === "live" ? "#de7008" : "#fff",
                        color: activeTab === "live" ? "white" : "black", // Adjust text color for better contrast
                      }}
                    >
                      <h4 className="content-box-title">Live Events</h4>
                      <p className="content-box-sub">
                        {liveEvents.pagination?.total_count}
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
                      <h4 className="content-box-title">History Events</h4>
                      <p className="content-box-sub">
                        {historyEvents.pagination?.total_count}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                 
                 {/* <div className='row'>
                <div className="row separteinto5 justify-content-left text-end">
                        <div className='col-md-2'>
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

                        <button 
                        className="purple-btn2 ">
                        <span className="material-symbols-outlined align-text-top"> 
                        comment 

                        </span>
                         Feeds
                          
                       </button>

                       <button 
                       className="purple-btn2">
                          <span className="material-symbols-outlined align-text-top"> print 
                            </span> 
                            Print
                         </button>

                         <button 
                       className="purple-btn2">
                          <span className="material-symbols-outlined align-text-top">  
                            </span> 
                            Send To SAP Team
                         </button>
                      
                      </div>
                      </div> */}
                      </div>

                      <div className='row justify-content-end text-end separte-5'>
                        <div className='col-md-2'>
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

                        <div className='col-md-2'>
                        <button 
                        className="purple-btn2 ">
                        <span className="material-symbols-outlined align-text-top"> 
                        comment 

                        </span>
                         Feeds
                          
                       </button>

                            
                            </div>

                            <div className='col-md-2'>
                            <button 
                       className="purple-btn2">
                          <span className="material-symbols-outlined align-text-top"> print 
                            </span> 
                            Print
                         </button>
                            
                            </div>

                            <div className='col-md-2'>
                            <button 
                       className="purple-btn2">
                          <span className="material-symbols-outlined align-text-top">  
                            </span> 
                            Send To SAP Team
                         </button>
                            
                            </div>
                      </div>

                  
                  <div className="card mt-4 pb-4">
                  <div className="card-header mb-5">
                  <h3 className="card-title">Business Bay</h3>
                   </div> 

                   <div className="details_page">
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

   
  <div className="card-header mb-5">
  <h3 className="card-title">Material PR</h3>
  </div> 
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

                  <div className="card mt-4 pb-4">
                                    <div className="tbl-container mt-3 px-3">
                                      <table className="w-100" >
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
                                                      navigate(`/material-pr-details/1`)
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
                                        <li className="page-item active">
                                          <button className="page-link">2</button>
                                        </li>
                                        <li className="page-item disabled">
                                          <button className="page-link">3</button>
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

  )
}

export default MaterialPRDetails
