import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React from "react";

function Members() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token") || "bfa5004e7b0175622be8f7e69b37d01290b737f82e078414";

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="website-content overflow-auto">
          {/* <div className="module-data-section container-fluid">
            <h1>RFQ Module</h1>
            <ul>
              <li>
                <Link to="/create-event">create_event</Link>
              </li>
              <li>
                <Link to={`/event-list?token=${token}`}>
                  event_list
                </Link>
              </li>
              <li>
                <Link to="/erp-rfq-detail-price-trends4h">
                  event_details_price
                </Link>
              </li>

              <li>
                <Link to={`/vendor-list?token=${token}`}>
                  vendor_list
                </Link>
              </li>

              <li>
                <Link to="/work-list">work list</Link>
              </li>

              <li>
                <Link to="/material-list">Material List</Link>
              </li>

              <li>
                <Link to="/service-list">Service List</Link>
              </li>

              <li>
                <Link to="/Po">Po lists</Link>
              </li>
              <li>
                <Link to="/Wo">Wo list</Link>
              </li>
              <li>
                <Link to="/approval-matrix">Approval matrix</Link>
              </li>
              <li>
                <Link to={`/approval-list?token=${token}`}>
                  Approval List
                </Link>
              </li>

              <li>
                <Link to="/approval-edit">Approval Edit</Link>
              </li>
              <li>
                <Link to="/rekyc">Section Re KYC Details</Link>
              </li>
              <li>
                <Link to="/vendor-registration-form">
                  Vendor Registration Form
                </Link>
              </li>
              <li>
                <Link to="/vendor-registration-step-by-step-form">
                  Vendor Registration Form step by step
                </Link>
              </li>
             
              <li>
                <Link to="/vendor-detail-form-stepper">
                  Vendor Detail Form Stepper
                </Link>
              </li>

              <li>
                <Link to="/rekyc-detail">Rekyc Detail</Link>
              </li>
              <li>
                <Link to={`/vendor-assesment-livedata-dashboard?token=${token}`}>
                  Vendor Assesment live Data
                </Link>
              </li>
              <li>
                <Link to={`/vendor-management-dashboard?token=${token}`}>
                  Vendor Management (PQ) Dashboard
                </Link>
              </li>

              <div className="d-flex gap-3">
                <li className="list-unstyled">
                  <Link to={`/re-kyc-dashboard?token=${token}`}>Re Kyc Dashboard</Link>
                </li>

                <li className="list-unstyled">
                  <Link to={`/re-kyc-dashboard-sec?token=${token}`}>Re Kyc Dashboard 2</Link>
                </li>
              </div>
            
            </ul>
          
          </div> */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Members;
