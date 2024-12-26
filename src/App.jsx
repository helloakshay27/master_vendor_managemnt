import React from "react";
import "./App.css";
import "../src/styles/mor.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Members from "./pages/members";

import CreateRfq from "./pages/create-rfq";
import ErpRfqAuctionEvents4h from "./pages/erp-rfq-auction-events-4h";
import ErpRfqDetailPriceTrends4h from "./pages/erp-rfq-detail-price-trends4h";


import EventList from "./pages/event-list";
import CreateEvent from "./pages/create-event";
import CreateBid from "./pages/create-bid";
import Dashboard from "./pages/dashboard";
import Header from "./components/Header";
import UserList from "./pages/vendor-details";
import UserOverview from "./pages/user-overview";
import VendorList from "./pages/vendor-list";
import VendorDetails from "./pages/vendor-details";
import AuthData from "./confi/authData";
import EventListPage from "./pages/admin_list";
import VendorListPage from "./pages/vendor-list";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Members />} />
          <Route path="/authData" element={<AuthData />} />

        
          {/* <Route path='/erp-stock-register-creation13c' element={<ErpStockRegisterCreation13C />} /> */}
    
          {/* <Route
            path="/erp-rfq-auction-events-4f"
            element={<ErpRfqAuctionEvents4f />}
          /> */}
          <Route
            path="/erp-rfq-auction-events-4h"
            element={<ErpRfqAuctionEvents4h />}
          />
          <Route
            path="/erp-rfq-detail-price-trends4h/:id"
            element={<ErpRfqDetailPriceTrends4h />}
          />
          <Route path="/create-rfq" element={<CreateRfq />} />
          {/* <Route path="/event-list" element={<ErpRfqA />} /> */}
          <Route path="/event-list" element={<EventListPage />} />

          {/* <Route path="/event-list" element={<EventList />} /> */}

          <Route path="/user-list/:eventId" element={<VendorDetails/>} />
          <Route path="/vendor-list" element={<VendorListPage />} />
          <Route path="/user-overview/:eventId" element={<UserOverview />} />

          <Route path="/create-event" element={<CreateEvent />} />

          {/* <Route path='/create-bid' element={<CreateBid />} /> */}
          <Route path="/create-bid/:eventId" element={<CreateBid />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
