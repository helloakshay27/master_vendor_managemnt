import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // initialize useNavigate hook

  //
  const handleLiveEventsClick = () => {
    navigate("/event-list?tab=live"); // Navigate to the Events page and pass a query parameter for live events
  };

  const handleAllEventsClick = () => {
    navigate("/event-list?tab=all"); // Navigate to the Events page and pass a query parameter for live events
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />

        <div className="dashboard-container">
          {/* Top Header Metrics */}
          <div className="metrics">
            <div className="card blue" onClick={handleLiveEventsClick}>
              <p>Live Events</p>
              <h2>4</h2>
              <div className="status-dot"></div>
            </div>
            <div className="card" onClick={handleAllEventsClick}>
              <p className="title">Total Events</p>
              <h2>13</h2>
            </div>
            <div className="card">
              <p className="title">Event Closed</p>
              <h2>0</h2>
            </div>
            <div className="card">
              <p className="title">Bids Received</p>
              <h2>31</h2>
            </div>
            <div className="card">
              <p className="title">Purchase Value</p>
              <h2>₹0.00 Cr</h2>
            </div>
            <div className="card">
              <p className="title">New Vendors</p>
              <h2>5</h2>
            </div>
            <div className="card">
              <p className="title">Engaged Vendors</p>
              <h2>18</h2>
            </div>
          </div>

          {/* Procurement and Spend Analysis */}
          <div className="content">
            <div className="procurement">
              <h3>Procurement</h3>
              <div className="tabs">
                <span className="active">VALUE</span>
                <span>QUANTITY</span>
                <span>COUNT</span>
              </div>
              <div className="chart-placeholder">
                <div className="dot"></div>
              </div>
            </div>

            <div className="spend-analysis">
              <h3>Spend Analysis</h3>
              <div className="no-data">
                <img src="https://via.placeholder.com/50" alt="No Data" />
                <p>No Data Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
