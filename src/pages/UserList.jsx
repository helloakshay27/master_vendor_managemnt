import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Table, ShortTable, SelectBox } from "../components";
import "../styles/mor.css";
import { mumbaiLocations, product, unitMeasure } from "../constant/data";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CreateBid() {
  const [freightData, setFreightData] = useState([
    { label: "Freight Charge", value: "₹4,000" },
    { label: "GST on Freight", value: "18%" },
    { label: "Realised Freight", value: "₹4,720" },
    { label: "Warranty Clause", value: "mtc" },
    { label: "Payment Terms", value: "advance" },
    { label: "Loading / Unloading", value: "under buyer" },
  ]);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDescriptionOfItemChange = (selected, rowIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex].descriptionOfItem = selected;
    setData(updatedData);
  };
  const handleUnitChange = (selected, rowIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex].unit = selected;
    setData(updatedData);
  };
  const handleLocationChange = (selected, rowIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex].location = selected;
    setData(updatedData);
  };

  const handleInputChange = (value, rowIndex, key) => {
    const updatedData = [...data];

    if (key === "quantity") {
      const maxQuantity = 3;
      if (parseFloat(value) > maxQuantity) {
        alert(`Quantity cannot exceed ${maxQuantity}`);
        value = maxQuantity;
      }
    }

    updatedData[rowIndex][key] = value;
    setData(updatedData);
  };

  const tableContainerStyle = {
    overflowX: "auto", // Enable horizontal scrolling
    maxWidth: "100%", // Ensure the table doesn't overflow its container
    marginTop: "10px",
  };

  const fixedColumnStyle = {
    position: "sticky", // Make the first column sticky
    left: 0, // Align it to the left of the table
    backgroundColor: "white", // Ensure the first column is visible over other columns
    zIndex: 10, // Make sure it stays on top of other columns
    minWidth: "200px", // Set a fixed width for the first column
    width: "200px", // Fixed width for the sticky column (adjust as needed)
  };

  const otherColumnsStyle = {
    minWidth: "120px", // Set a fixed minimum width for other columns
    width: "auto", // Allow the other columns to take up available space
  };

  const { eventId } = useParams();
  console.log("Event ID from URL:", eventId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventMaterials = async () => {
      console.log("Event ID:", eventId);
      try {
        // Fetch data directly without headers
        const response = await axios.get(
          `https://vendors.lockated.com/rfq/events/${eventId}/event_materials?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1&q[event_vendor_id_cont]=10`
        );

        // Transform the API response into the required table data format
        const formattedData = response.data.map((item) => ({
          descriptionOfItem: item.inventory_name,
          quantity: item.quantity,
          quantityAvail: "",
          unit: item.uom,
          location: item.location,
          rate: "",
          amount: item.amount,
          totalAmt: "",
          attachment: null,
        }));

        setData(formattedData);
        console.log(formattedData);
      } catch (err) {
        console.error("Error fetching event materials:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventMaterials();
  }, [eventId]);

  return (
    <div className="website-content">
      <Header />

      <style>
        {`
          #project-header {
            display: flex;
            flex-direction: column;
            padding: 16px;
            border-bottom: 1px solid #ccc;
            background-color: #f9f9f9;
          }

          .styles_projectTitle__3f7Yw {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }

          .styles_projectTitleContent__1Xu_Z {
            display: flex;
            align-items: center;
            gap: 8px; /* Space between button and text */
          }

          .styles_headerCtaLink__2kCN6 {
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
          }

          .styles_headerCtaLink__2kCN6 svg {
            width: 24px;
            height: 24px;
            color: #007bff; /* Blue color for back button */
          }

          .styles_projectTitleContent__1Xu_Z span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .styles_projectTitleExtra__3ePz7 {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .styles_projectTitleExtra__3ePz7 span {
            font-size: 14px;
            color: #555;
          }

          .styles_strategyTag__2icur {
            background-color: #f0f0f0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: #333;
          }

         
        `}
      </style>

      <div className="styles_projectTabsHeader__148No" id="project-header">
        {/* Project Title Section */}
        <div className="styles_projectTitle__3f7Yw">
          <div className="styles_projectTitleContent__1Xu_Z">
            <button
              type="button"
              className="ant-btn styles_headerCtaLink__2kCN6 ant-btn-link"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                className="pro-icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.707 4.293a1 1 0 0 1 0 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <span>
              [1000291945] PLUMBING MATERIAL products - SWAYAM REALTORS AND
              TRADERS LLP
            </span>
          </div>
          <div className="styles_projectTitleExtra__3ePz7">
            <span>MARATHON REALTY PRIVATE LTD</span>
          </div>
        </div>
      </div>

      <div
        className="styles_projectTabsHeader__148No mt-1 ms-3"
        id="project-header2"
      >
        <ul className="nav nav-tabs border-0 " id="eventTabs" role="tablist">
          {[
            {
              id: "responses",
              label: "Event Overview",
              path: "/user-overview",
            },

            {
              id: "overview",
              label: "[1000291945] PLUMBIN...",
              path: "/user-list/:eventId",
              badge: "Submitted",
            },
          ].map((tab) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <Link
                className={`nav-link setting-link ${
                  tab.id === "responses" ? "active" : ""
                }`}
                to={tab.path} // Use `to` from react-router-dom for navigation
                id={`${tab.id}-tab`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={tab.id === "responses"}
              >
                {tab.label}

                {tab.badge && (
                  <span className="badge bg-success ms-2">{tab.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content ">
        {/* <Sidebar /> */}
        <div className="card mx-3 p-2 mt-3 pb-5">
          <div
            className="p-3 mb-2 "
            // style={{
            //   overflowY: "auto",
            //   height: "calc(100vh - 100px)",
            // }}
          >
            {/* <div className="head-material text-center">
            <h4>Submission Sheet</h4>
          </div> */}

            <div className="card p-2">
              <div className="card-header4">
                <h3 className="card-title">Submission Sheet</h3>
              </div>

              {/* <div className=" d-flex justify-content-end">
            <p>Submission end in</p>
          </div> */}

              <div className="card-body">
                <div style={tableContainerStyle}>
                  <Table
                    columns={[
                      { label: "Material", key: "descriptionOfItem" },
                      { label: "Material Variant", key: "rate" },
                      { label: "Quantity Requested", key: "quantity" },
                      { label: "Delivery Location", key: "location" },
                      { label: "Creator Attachment", key: "attachment" },
                      { label: "Quantity Available", key: "quantityAvail" },
                      { label: "Price", key: "quantityAvail" },
                      { label: "Discount", key: "quantityAvail" },
                      { label: "Realised Discount", key: "quantityAvail" },
                      { label: "GST", key: "quantityAvail" },
                      { label: "Realised GST", key: "quantityAvail" },
                      { label: "Landed Amount", key: "quantityAvail" },
                      { label: "Participant Attachment", key: "quantityAvail" },
                      { label: "Vendor Remark", key: "quantityAvail" },
                      { label: "Total", key: "quantityAvail" },
                    ]}
                    data={data}
                    customRender={{
                      // descriptionOfItem: (cell, rowIndex) => (
                      // <SelectBox
                      //   label={""}
                      //   options={product}
                      //   defaultValue={cell}
                      //   onChange={(selected) =>
                      //     handleDescriptionOfItemChange(selected, rowIndex)
                      //   }
                      //   style={fixedColumnStyle} // Sticky style for first column
                      // />

                      descriptionOfItem: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="text"
                          value={cell}
                          readOnly
                          style={otherColumnsStyle}
                        />
                      ),
                      unit: (cell, rowIndex) => (
                        <SelectBox
                          isDisableFirstOption={true}
                          label={""}
                          options={unitMeasure}
                          defaultValue={cell}
                          onChange={(selected) =>
                            handleUnitChange(selected, rowIndex)
                          }
                          style={otherColumnsStyle} // Other columns are scrollable
                        />
                      ),
                      location: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="text"
                          value={cell}
                          readOnly
                          style={otherColumnsStyle}
                        />
                      ),
                      quantity: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              rowIndex,
                              "quantity"
                            )
                          }
                          placeholder="Enter Quantity"
                          disabled
                          style={otherColumnsStyle}
                        />
                      ),
                      quantityAvail: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              rowIndex,
                              "quantityAvail"
                            )
                          }
                          placeholder="Enter Quantity Available"
                          style={otherColumnsStyle}
                        />
                      ),
                      rate: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(e.target.value, rowIndex, "rate")
                          }
                          placeholder="Enter Rate"
                          style={otherColumnsStyle}
                        />
                      ),
                      bestAmount: (cell, rowIndex) => {
                        const quantity =
                          parseFloat(data[rowIndex].quantityAvail) || 0;
                        const rate = parseFloat(data[rowIndex].rate) || 0;
                        const totalAmount = quantity * rate;

                        return (
                          <input
                            className="form-control"
                            type="text"
                            value={totalAmount.toFixed(2)}
                            readOnly
                            style={otherColumnsStyle}
                          />
                        );
                      },
                      attachment: (cell, rowIndex) => (
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const updatedData = [...data];
                              updatedData[rowIndex].attachment = file;
                              setData(updatedData);
                            }
                          }}
                          style={otherColumnsStyle}
                        />
                      ),
                      amount: (_, rowIndex) => {
                        const quantity =
                          parseFloat(data[rowIndex].quantityAvail) || 0;
                        const rate = parseFloat(data[rowIndex].rate) || 0;
                        const totalAmount = quantity * rate;

                        return (
                          <input
                            className="form-control"
                            type="text"
                            value={totalAmount.toFixed(2)}
                            readOnlyn
                            style={otherColumsStyle}
                          />
                        );
                      },
                    }}
                  />
                </div>
                {/* <div className="row"> */}
                <div className=" d-flex justify-content-end">
                  {/* <ShortTable data={freightData} /> */}

                  <ShortTable
                    data={freightData}
                    editable={true} // Flag to enable input fields
                    onValueChange={(updatedData) => setFreightData(updatedData)} // Callback for changes
                  />
                </div>

                {/* </div> */}
                <div className="d-flex justify-content-end">
                  <h4>Sum Total 64684</h4>
                </div>
              </div>
            </div>

            <hr style={{ borderTop: "2px solid #ccc", margin: "20px 0" }} />

            <div style={{ marginTop: "20px" }}>
              {/* Heading and Subtext */}
              <div className="mb-3">
                <h5 className="head-material mb-1 fw-bold">
                  Additional Information
                </h5>
                <p
                  className="head-material  text-muted "
                  style={{ fontSize: "14px", marginBottom: "10px" }}
                >
                  Enter the additional information required for placing the bid
                </p>
              </div>

              {/* Select Company for this Bidding */}
              <div
                className="mb-3 d-flex align-items-center pt-3 "
                style={{ gap: "200px" }}
              >
                {/* Label */}
                <label
                  className=" head-material "
                  style={{
                    minWidth: "250px",
                    marginRight: "10px",
                    marginBottom: "0",
                    fontSize: "14px", // Align label vertically
                  }}
                >
                  Select company for this bidding
                </label>
                {/* Select Dropdown */}
                <select
                  className="form-control fw-bold"
                  style={{
                    maxWidth: "300px",
                    flex: "1",
                    // paddingLeftLeft: "155px",
                  }}
                >
                  <option>HAVEN INFOLINE PRIVATE LIMITED</option>
                </select>
              </div>

              <hr style={{ borderTop: "2px solid #ccc", margin: "20px 0" }} />
              {/* Remarks Section */}
              <div
                className="mb-3 d-flex align-items-center pt-2 "
                style={{ gap: "200px" }}
              >
                <label
                  className=" head-material"
                  style={{
                    minWidth: "250px",
                    marginRight: "10px",
                    marginBottom: "0",
                    fontSize: "16px",
                  }}
                >
                  Remarks
                </label>
                {/* Textarea */}
                <textarea
                  className="form-control"
                  placeholder="Enter remarks"
                  rows="3"
                  style={{ maxWidth: "300px", flex: "1" }}
                >
                  test for haven infoline
                </textarea>
              </div>

              <hr style={{ borderTop: "2px solid #ccc", margin: "20px 0" }} />
              {/* Terms and Conditions */}

              <div style={{ marginTop: "30px" }}>
                <h5 className="fw-bold head-material">Terms and Conditions</h5>
                <p className="head-material  text-muted ">
                  Please find below the terms and conditions associated with the
                  orders
                </p>
                <ol
                  className="head-material  "
                  style={{ fontSize: "13px", marginLeft: "0px" }}
                >
                  <li className="mb-3 mt-3">
                    90% ADVANCE ON BASIC AMOUNT (EXCLUDING GST) & BALANCE
                    PAYMENT WITHIN 30 WORKING DAYS AFTER SUBMISSION OF INVOICES.
                  </li>
                  <li className="mb-3">
                    KINDLY MENTION YOUR REMARKS IN REMARKS FOR VENDOR COLUMN.
                  </li>
                  <li className="mb-3">
                    DELIVERY OF MATERIAL AS PER SITE REQUIREMENT OR AS PER
                    DELIVERY SCHEDULE.
                  </li>
                  <li className="mb-3">UNLOADING WILL BE DONE BY US.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
