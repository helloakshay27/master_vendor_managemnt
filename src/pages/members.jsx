import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React from "react";

function Members() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="website-content overflow-auto">
          <div className="module-data-section container-fluid">
            <h1>RFQ Module</h1>
            <ul>
              <li>
                <Link to="/create-event">create_event</Link>
              </li>
              <li>
                <Link to="/event-list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414">event_list</Link>
              </li>
              <li>
                <Link to="/erp-rfq-detail-price-trends4h">
                  event_details_price
                </Link>
              </li>
              <li>
                <Link to="/contract-invitation">
                  contract_invitation
                </Link>
              </li>

              <li>
                <Link to="/vendor-list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414">vendor_list</Link>
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
              {/* <li>
                <Link to="/user-lists">user_list</Link>
              </li>

              <li>
                <Link to="/user-overview">user_overview</Link>
              </li> */}

              {/* <li>
                <Link to="good_receive_notes/:id">grn_detaisl</Link>
              </li> */}
              {/* <li>
                <Link to="/create-rfq">create_rfq</Link>
              </li>
              <li>
                <Link to="/erp-rfq-auction-events-4f">erp_rfq_auction_events_4f</Link>
              </li>
              <li>
                <Link to="/erp-rfq-auction-events-4h">erp_rfq_auction_events_4h</Link>
              </li>
              <li>
                <Link to="/erp-rfq-detail-price-trends4h">erp_rfq_detail_price_trends4h</Link>
              </li> */}
              {/* <li>
                <Link to="/stock_register_detail/47">stock_register detail</Link>
              </li> */}
              {/* <li>
                <Link to="/erp-stock-register-creation13c">erp_stock_register_creation13c</Link>
              </li> */}
              {/* <li>
                <Link to="/stock_register_list?token=4ad0c1cd2506a717ae19ed050c28d7f078b0210991571e47"> stock register list</Link>
              </li>
              <li>
                <Link to="/approvals-list">approvals_list</Link>
              </li> */}
            </ul>
            {/* 
            <h1>BOQ</h1>
            <ul>
              <li>
                <Link to="/create-BOQ">Create BOQ</Link>
              </li>
              <li>
                <Link to="/view-BOQ">View BOQ</Link>
              </li>
              <li>
                <Link to="/boq-approval-list">BOQ Approval List</Link>
              </li>
              <li>
                <Link to="/boq-details-page-master">BOQ Details Page Master</Link>
              </li>
              <li>
                <Link to="/boq-approval-details">BOQ Approval Details</Link>
              </li>
            </ul> */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Members;
