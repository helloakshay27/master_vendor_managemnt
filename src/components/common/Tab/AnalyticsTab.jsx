import React from "react";
import ScatterChart from "../Chart/ScatterChart";

export default function AnalyticsTab() {
  return (
    <div
      className="tab-pane fade analytics"
      id="analytics"
      role="tabpanel"
      aria-labelledby="analytics-tab"
      tabIndex={0}
    >
      {/* Details Section */}
      <div className="details d-flex align-items-center my-4">
        <label htmlFor="details" className="me-2 fw-bold" style={{textWrap:'nowrap'}}>
          Show the details according to:
        </label>
        <select id="details" className="form-select me-3" aria-label="Details filter">
          <option value="productPrice">Product Price</option>
        </select>
        <span className="me-2">for</span>
        <select id="product" className="form-select" aria-label="Product filter">
          <option value="woodenDoorFrame">Wooden Door Frame (...</option>
        </select>
      </div>

      {/* Quotes and Timing Section */}
      <div className="d-flex justify-content-between mb-4">
        {/* Quote Section */}
        <div className="quote d-flex justify-content-between flex-grow-1">
          <div>
            <label className="d-block fw-semibold">Initial Quote</label>
            <p className="text-muted">₹10,800 / Nos</p>
          </div>
          <div>
            <label className="d-block fw-semibold">Final Best Price</label>
            <p className="text-muted">₹10,800 / Nos</p>
          </div>
          <div>
            <label className="d-block fw-semibold">Realized Savings</label>
            <p className="text-muted">₹0 - 0%</p>
          </div>
        </div>

        {/* Time Section */}
        <div className="time ms-4 flex-grow-1">
          <div>
            <label className="d-block fw-semibold">Start Time</label>
            <p className="text-muted">06:10 PM Apr 01, 24</p>
          </div>
          <div>
            <label className="d-block fw-semibold">End Time</label>
            <p className="text-muted">03:35 PM Apr 06, 24</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div id="container" className="mt-4 card p-4 pt-5 h-100 rounded-3">
        <ScatterChart />
      </div>
    </div>
  );
}
