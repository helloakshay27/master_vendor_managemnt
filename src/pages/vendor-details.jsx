import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Table, ShortTable, SelectBox } from "../components";
import "../styles/mor.css";
import { mumbaiLocations, product, unitMeasure } from "../constant/data";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ClockIcon from "../components/common/Icon/ClockIcon";

export default function VendorDetails() {
  const [freightData, setFreightData] = useState([
    { label: "Freight Charge", value: "₹4,000" },
    { label: "GST on Freight", value: "18%" },
    { label: "Realised Freight", value: "₹4,720" },
    { label: "Warranty Clause *", value: "mtc" },
    { label: "Payment Terms *", value: "advance" },
    { label: "Loading / Unloading *", value: "under buyer" },
  ]);

  const [remark, setRemark] = useState("");

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

  // const handleInputChange = (value, rowIndex, key) => {
  //   const updatedData = [...data];

  //   if (key === "quantity") {
  //     const maxQuantity = 3;
  //     if (parseFloat(value) > maxQuantity) {
  //       alert(`Quantity cannot exceed ${maxQuantity}`);
  //       value = maxQuantity;
  //     }
  //   }

  //   updatedData[rowIndex][key] = value;
  //   setData(updatedData);
  // };

  const handleInputChange = (value, rowIndex, key) => {
    const updatedData = [...data];
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
  // console.log("Event ID from URL:", eventId);

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
          eventMaterialId: item.id,
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

  // post api

  const freightChargeRaw =
    freightData.find((item) => item.label === "Freight Charge")?.value || "0";

  const freightCharge21 = parseFloat(freightChargeRaw.replace(/₹|,/g, "")) || 0; // Remove ₹ and commas, then parse to number
  console.log("freightCharge21", freightCharge21);

  const warrantyClause =
    freightData.find((item) => item.label === "Warranty Clause")?.value ||
    "1-year warranty";
  const paymentTerms =
    freightData.find((item) => item.label === "Payment Terms")?.value ||
    "Net 30";
  const loadingUnloadingClause =
    freightData.find((item) => item.label === "Loading / Unloading")?.value ||
    "Loading at supplier's location, unloading at buyer's location";

  const preparePayload = () => {
    const bidMaterialsAttributes = data.map((row) => ({
      event_material_id: row.eventMaterialId, // Use the ID from the API data
      quantity_available: row.quantityAvail || 0, // Use the updated quantity
      price: row.price || 0, // Use the updated price
      discount: row.discount || 0, // Use the updated discount
      total_amount:
        parseFloat(row.quantityAvail || 0) * parseFloat(row.price || 0), // Calculate total
    }));

    const freightChargeRaw =
      freightData.find((item) => item.label === "Freight Charge")?.value || "0";
    const freightCharge = parseFloat(freightChargeRaw.replace(/₹|,/g, "")) || 0; // Remove ₹ and commas, then parse to number

    const gstOnFreight =
      freightData.find((item) => item.label === "GST on Freight")?.value || "0";

    const gstOnFreightt = parseFloat(gstOnFreight.replace(/₹|,/g, "")) || 0; // Remove ₹ and commas, then parse to number

    const payload = {
      bid: {
        event_vendor_id: 10,
        price: freightCharge,
        discount: gstOnFreightt,
        warranty_clause: warrantyClause,
        payment_terms: paymentTerms,
        remark: remark,
        loading_unloading_clause: loadingUnloadingClause,
        bid_materials_attributes: bidMaterialsAttributes, // Pass the dynamically generated array
      },
    };

    console.log("Prepared Payload:", payload);
    return payload;
  };

  const handleSubmit = async () => {
    setLoading(true);

    let missingFields = [];

    // Loop through data to check which fields are empty
    for (let row of data) {
      if (!row.gst) missingFields.push("GST");
      if (!row.price) missingFields.push("Price");
      if (!row.discount) missingFields.push("Discount");
    }

    // If there are any missing fields, show an alert with the missing fields
    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(", ");
      alert(
        `Please fill the following mandatory fields: ${missingFieldsMessage}`
      );
      return; // Prevent further execution if validation fails
    }

    try {
      // Send POST request

      const payload = preparePayload();
      console.log("payloadssss", payload);

      const response = await axios.post(
        `https://vendors.lockated.com/rfq/events/${eventId}/bids?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`, // Replace with your API endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your auth token
          },
        }
      );

      console.log("API Response:", response.data);
      alert("Bid submitted successfully!");
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //user overview

  const [publishedStages, setPublishedStages] = useState(true);
  const [terms, setTerms] = useState(true);
  const [Contact, setContact] = useState(true);
  const [lineItems, setLineItems] = useState(true);
  const [isHistoryActive, setIsHistoryActive] = useState(false);

  const [data1, setData1] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log("Event ID:", eventId);
  useEffect(() => {
    const fetchEventMaterials = async () => {
      // const eventId = 8
      console.log("Event ID:", eventId);
      try {
        // Fetch data directly without headers
        const response = await axios.get(
          `https://vendors.lockated.com/rfq/events/${eventId}/vendor_show?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1`
        );

        // Transform the API response into the required table data format

        setData1(response.data);
        console.log("response:", response.data);
        const isoDate = response.data.event_schedule.start_time;
        setDate(response.data.event_schedule.start_time);
        setEndDate(response.data.event_schedule.end_time_duration);
        console.log("date:", isoDate);
      } catch (err) {
        console.error(
          "Error fetching event materials:",
          err.response || err.message || err
        );
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventMaterials();
  }, [eventId]);

  const handlepublishedStages = () => {
    setPublishedStages(!publishedStages);
  };

  const handleTerms = () => {
    setTerms(!terms);
  };

  const handleContact = () => {
    setContact(!Contact);
  };

  const handlelineItem = () => {
    setLineItems(!lineItems);
  };

  const formatDate = (date) => {
    const date1 = new Date(date);

    // Extract date parts
    const options = { month: "short" }; // Short month name like "Dec"
    const day = date1.getDate().toString().padStart(2, "0"); // Ensure 2 digits
    const month = (date1.getMonth() + 1).toString().padStart(2, "0"); // "Dec"
    const year = date1.getFullYear();

    // Extract time parts
    let hours = date1.getHours();
    const minutes = date1.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour

    // Combine into desired format
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const isoDate = date;

  // Call the function and log the result
  const formattedDate = formatDate(isoDate);
  console.log("Formatted Date:", formattedDate);

  //end date
  const calculateEndDate = (date) => {
    const date1 = new Date(date);

    // Extract date parts
    const options = { month: "short" }; // Short month name like "Dec"
    const day = date1.getDate().toString().padStart(2, "0"); // Ensure 2 digits
    const month = (date1.getMonth() + 1).toString().padStart(2, "0"); // "Dec"
    const year = date1.getFullYear();

    // Extract time parts
    let hours = date1.getHours();
    const minutes = date1.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour

    // Combine into desired format
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const formattedEndDate = calculateEndDate(endDate);

  console.log(formattedEndDate);
  console.log("end d", endDate);

  console.log("data1:", data1);

  // Function to handle button click and navigate
  const handleNavigate = () => {
    console.log("vendor list ");
    navigate("/vendor-list"); // Redirect to /vendor-list page
  };

  return (
    <div className="">
      <Header />

      <style>
        {`
          #project-header {
            display: flex;
            flex-direction: column;
            padding: 16px;
            // border-bottom: 1px solid #ccc;
            background-color: #f9f9f9;
          }
            #project-header2 {
            display: flex;
            flex-direction: column;
            // padding: 16px;
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

          // .styles_projectTitleContent__1Xu_Z {
          //   display: flex;
          //   align-items: center;
          //   gap: 8px; /* Space between button and text */
          // }

          .styles_headerCtaLink__2kCN6 {
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
          }

          .styles_headerCtaLink__2kCN6 svg {
            width: 24px;
            height: 24px;
            color: #DE7008; /* Blue color for back button */
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
              onClick={handleNavigate}
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
              [{data1?.event_no}] {data1?.event_title}
            </span>
          </div>
          <div className="styles_projectTitleExtra__3ePz7">
            <span>MARATHON REALTY PRIVATE LTD</span>
          </div>
        </div>
      </div>

      {/* <!-- Tab navigation --> */}
      <div
        style={{
          overflowY: "auto",
          height: "calc(100vh - 100px)",
        }}
      >
        <ul class="nav nav-tabs" id="myTabs" role="tablist">
          <li class="nav-item ms-4" role="presentation">
            <a
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              style={{ color: "black" }}
            >
              Event Overview
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              style={{ color: "black" }}
            >
              [1000291945] PLUMBIN...
            </a>
          </li>
        </ul>

        {/* <!-- Tab content --> */}
        <div class="tab-content " id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {/* user overview  */}

            <div
              className="p-3 mb-2 "
            // style={{
            //   overflowY: "auto",
            //   height: "calc(100vh - 100px)",
            // }}
            >
              {loading ? (
                "Loading...."
              ) : error ? (
                "Something went wrong..."
              ) : data1 ? (
                <div className="w-100 container-fluid">
                  <div className="main-content w-100 ">
                    <div className="w-100  pt-2 mb-2  pe-2">
                      {/* Published Stages */}

                      <div className="card mb-5 p-3 mt-2 rounded-3 ">
                        <div className="col-12">
                          <a
                            className="btn"
                            data-bs-toggle="collapse"
                            href="#participation-summary"
                            role="button"
                            aria-expanded={publishedStages}
                            aria-controls="participation-summary"
                            onClick={handlepublishedStages}
                            style={{ fontSize: "16px", fontWeight: "normal" }}
                          >
                            <span
                              id="participation-summary-icon"
                              className="icon-1 square"
                              style={{ marginRight: "8px" }}
                            >
                              {publishedStages ? (
                                <i className="bi bi-dash-lg"></i>
                              ) : (
                                <i className="bi bi-plus-lg"></i>
                              )}
                            </span>
                            <span
                              style={{ fontSize: "22px", fontWeight: "normal" }}
                            >
                              Published Stages
                            </span>
                          </a>
                          {publishedStages && (
                            <div
                              id="participation-summary"
                              className=""
                              style={{ paddingLeft: "24px" }}
                            >
                              <div className=" card card-body rounded-3 p-4  ">
                                <div className="tbl-container mt-3">
                                  <table className="w-100 table">
                                    <thead>
                                      <tr>
                                        <th className="text-start">
                                          Stage Title
                                        </th>
                                        <th className="text-start">Status</th>
                                        <th className="text-start">
                                          Bidding Starts At
                                        </th>
                                        <th className="text-start">
                                          Bidding Ends At
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {data1.material_title}
                                        </td>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {data1.status}
                                        </td>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {formattedDate}
                                        </td>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {formattedEndDate}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Terms & Conditions */}

                        <div
                          className="col-12 "
                          style={{
                            borderTop: "1px solid #ccc",
                            borderBottom: "1px solid #ccc",
                            paddingTop: "20px ", // Optional padding to add spacing between content and borders
                          }}
                        >
                          <a
                            className="btn"
                            data-bs-toggle="collapse"
                            href="#terms-conditions"
                            role="button"
                            aria-expanded={terms}
                            aria-controls="terms-conditions"
                            onClick={handleTerms}
                            style={{ fontSize: "16px", fontWeight: "normal" }}
                          >
                            <span
                              id="terms-conditions-icon"
                              className="icon-1 square"
                              style={{ marginRight: "8px" }}
                            >
                              {terms ? (
                                <i className="bi bi-dash-lg"></i>
                              ) : (
                                <i className="bi bi-plus-lg"></i>
                              )}
                            </span>
                            <span
                              style={{ fontSize: "22px", fontWeight: "normal" }}
                            >
                              Terms & Conditions
                            </span>
                          </a>
                          {terms && (
                            <div
                              id="terms-conditions"
                              className=""
                              style={{ paddingLeft: "24px" }}
                            >
                              <div className=" card card-body rounded-3 p-4">
                                <p>
                                  1. Payment terms: Net 30 days.
                                  <br />
                                  <br />
                                  2. Delivery within 15 business days.
                                  <br />
                                  <br />
                                  3. Warranty: 1 year from the date of purchase.
                                  <br />
                                  <br />
                                  4. Returns are subject to company policy.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* contact */}

                        <div
                          className="col-12 "
                          style={{
                            // borderTop: "1px solid #ccc",
                            borderBottom: "1px solid #ccc",
                            // padding: "20px 0", // Optional padding to add spacing between content and borders
                            paddingTop: "20px ",
                          }}
                        >
                          <a
                            className="btn"
                            data-bs-toggle="collapse"
                            href="#savings-summary"
                            role="button"
                            aria-expanded={Contact}
                            aria-controls="savings-summary"
                            onClick={handleContact}
                            style={{ fontSize: "16px", fontWeight: "normal" }}
                          >
                            <span
                              id="savings-summary-icon"
                              className="icon-1 square"
                              style={{ marginRight: "8px" }}
                            >
                              {Contact ? (
                                <i className="bi bi-dash-lg"></i>
                              ) : (
                                <i className="bi bi-plus-lg"></i>
                              )}
                            </span>
                            <span
                              style={{ fontSize: "22px", fontWeight: "normal" }}
                            >
                              Contact Info{" "}
                            </span>
                          </a>
                          {Contact && (
                            <div
                              id="savings-summary"
                              className=""
                              style={{ paddingLeft: "24px" }}
                            >
                              <div className=" card card-body rounded-3 p-4 ">
                                {/* Table Section */}
                                <div className="tbl-container mt-3">
                                  <table className="w-100 table">
                                    <thead>
                                      <tr>
                                        <th className="text-start">
                                          Buyer Name
                                        </th>
                                        <th className="text-start">Email</th>
                                        <th className="text-start">Phone</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {data1.created_by}
                                        </td>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {data1.created_by_email}
                                        </td>
                                        <td
                                          className="text-start"
                                          style={{ color: "#777777" }}
                                        >
                                          {data1.crated_by_mobile}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* line */}

                        <div className="col-12 pb-4 pt-3">
                          <a
                            className="btn d-flex  justify-content-between w-100"
                            data-bs-toggle="collapse"
                            href="#savings-summary"
                            role="button"
                            aria-expanded={lineItems}
                            aria-controls="savings-summary"
                            onClick={handlelineItem}
                            style={{ fontSize: "16px", fontWeight: "normal" }}
                          >
                            <div>
                              <span
                                id="savings-summary-icon"
                                className="icon-1 square"
                                style={{ marginRight: "8px" }} // Adds gap between icon and text
                              >
                                {lineItems ? (
                                  <i className="bi bi-dash-lg"></i>
                                ) : (
                                  <i className="bi bi-plus-lg"></i>
                                )}
                              </span>
                              <span
                                style={{
                                  fontSize: "22px",
                                  fontWeight: "normal",
                                }}
                              >
                                Line Items
                              </span>
                            </div>
                            {/* Right-aligned button */}
                            <div className="card-tools">
                              <button
                                className="purple-btn2"
                                data-bs-toggle="modal"
                                data-bs-target="#venderModal"
                                style={{
                                  backgroundColor: "#F0F0F0",
                                  color: "black",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="1"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                  <polyline points="7 10 12 15 17 10" />
                                  <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                <span>Download Attachment</span>
                              </button>
                            </div>
                          </a>
                          {lineItems && (
                            <div
                              id="savings-summary"
                              className="mt-2"
                              style={{ paddingLeft: "24px" }}
                            >
                              <div className="card card-body rounded-3 p-4 ">
                                {/* Table Section */}
                                <div className="tbl-container mt-3">
                                  <table className="w-100 table">
                                    <thead>
                                      <tr>
                                        <th className="text-start">Sr.No.</th>
                                        <th className="text-start">
                                          Line Item Name
                                        </th>
                                        <th className="text-start">PR No</th>
                                        <th className="text-start">Item No</th>
                                        <th className="text-start">
                                          Specification Needed
                                        </th>
                                        <th className="text-start">
                                          Attachment
                                        </th>
                                        <th className="text-start">Quantity</th>
                                        <th className="text-start">
                                          PR Creator
                                        </th>
                                        <th className="text-start">
                                          PR Creator Phone
                                        </th>
                                        <th className="text-start">
                                          PR Creator Email
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data1.event_materials.map((data,index) => (
                                        <tr key={data.id}>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            {index+1}
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            {data.inventory_name}
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            -
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          ></td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            NA - NA
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            -
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            {data.quantity}
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            -
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            -
                                          </td>
                                          <td
                                            className="text-start"
                                            style={{ color: "#777777" }}
                                          >
                                            -
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                "No data available"
              )}
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* user list data */}
            <div className="main-content ">
              <div
                className="p-3  "
                style={{
                  overflowX: "auto",
                  //   height: "calc(100vh - 100px)",
                  //   // height: "100vh"
                }}
              >
                <div className="card mx-3 p-4 mt-3 pb-5 mb-5 ">
                  <div className="d-flex flex-row-reverse">
                    <div className="eventList-child1 d-flex align-items-center gap-2 py-3">
                      {/* {event.endsIn ? ( */}
                      <div className="d-flex align-items-center gap-2">
                        <ClockIcon />
                        <p className="mb-0 eventList-p1">Ends In</p>
                      </div>
                      {/* ) : ( */}
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-hourglass-split"></i>
                        <p className="mb-0 eventList-p1">Bid Approves In</p>
                      </div>
                      {/* )} */}
                      {/* <span>{event.timeRemaining}</span> */}
                    </div>
                  </div>
                  <div className="card p-2 m-2">
                    <div className="card-header4">
                      <h4 className="">
                        Submission Sheet
                        <span
                          style={{
                            backgroundColor: "#fff2e8",
                            color: "#fa541c",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            marginLeft: "25px",
                            fontSize: "0.85rem",
                            fontWeight: "bold",
                            borderColor: "#ffbb96",
                          }}
                        >
                          RFQ
                        </span>
                      </h4>
                    </div>

                    <div className="card-body">
                      <div style={tableContainerStyle}>
                        <Table
                          columns={[
                            { label: "Material", key: "descriptionOfItem" },
                            { label: "Material Variant", key: "rate" },
                            { label: "Quantity Requested", key: "quantity" },
                            { label: "Delivery Location", key: "location" },
                            { label: "Creator Attachment", key: "attachment" },
                            {
                              label: "Quantity Available",
                              key: "quantityAvail",
                            },
                            { label: "Price *", key: "price" },
                            { label: "Discount *", key: "discount" },
                            {
                              label: "Realised Discount",
                              key: "realisedDiscount",
                            },
                            { label: "GST *", key: "gst" },
                            { label: "Realised GST", key: "realisedGst" },
                            { label: "Landed Amount", key: "landedAmount" },
                            {
                              label: "Participant Attachment",
                              key: "attachment",
                            },
                            { label: "Vendor Remark", key: "vendorRemark" },
                            { label: "Total", key: "total" },
                          ]}
                          data={data}
                          customRender={{
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
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "rate"
                                  )
                                }
                                placeholder="Enter Discount"
                                style={otherColumnsStyle}
                              />
                            ),

                            discount: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "discount"
                                  )
                                }
                                placeholder="Enter Discount in %"
                                style={otherColumnsStyle}
                                required // Ensure the field is required in the HTML
                              />
                            ),

                            realisedDiscount: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "realisedDiscount"
                                  )
                                }
                                placeholder="Enter Discount (%)"
                                style={otherColumnsStyle}
                              />
                            ),

                            gst: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "gst"
                                  )
                                }
                                placeholder="Enter GST (%)"
                                style={otherColumnsStyle}
                                required // Ensure the field is required in the HTML
                              />
                            ),
                            realisedGst: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "realisedGst"
                                  )
                                }
                                placeholder="Enter Realised GST"
                                style={otherColumnsStyle}
                              />
                            ),
                            landedAmount: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "landedAmount"
                                  )
                                }
                                placeholder="Enter Landed Amount"
                                style={otherColumnsStyle}
                              />
                            ),

                            vendorRemark: (cell, rowIndex) => (
                              <textarea
                                className="form-control"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "vendorRemark"
                                  )
                                }
                                placeholder="Enter Vendor Remark"
                                style={otherColumnsStyle}
                              />
                            ),
                            total: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "total"
                                  )
                                }
                                placeholder="Enter Total"
                                style={otherColumnsStyle}
                              />
                            ),

                            price: (cell, rowIndex) => (
                              <input
                                className="form-control"
                                type="number"
                                value={cell}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    "price"
                                  )
                                }
                                placeholder="Enter price "
                                style={otherColumnsStyle}
                                required // Ensure the field is required in the HTML
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
                      <div className=" d-flex justify-content-end">
                        <ShortTable
                          data={freightData}
                          editable={true} // Flag to enable input fields
                          onValueChange={(updatedData) =>
                            setFreightData(updatedData)
                          } // Callback for changes
                        />
                      </div>

                      {/* </div> */}
                      <div className="d-flex justify-content-end">
                        <h4>Sum Total 64684</h4>
                      </div>
                    </div>
                  </div>

                  <hr
                    style={{ borderTop: "2px solid #ccc", margin: "20px 0" }}
                  />

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
                        Enter the additional information required for placing
                        the bid
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

                    <hr
                      style={{ borderTop: "2px solid #ccc", margin: "20px 0" }}
                    />
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
                        value={remark} // Bind to state
                        onChange={(e) => setRemark(e.target.value)} // Update state on input
                      >
                        test for haven infoline
                      </textarea>
                    </div>

                    <hr
                      style={{ borderTop: "2px solid #ccc", margin: "20px 0" }}
                    />
                    {/* Terms and Conditions */}

                    <div style={{ marginTop: "30px" }}>
                      <h5 className="fw-bold head-material">
                        Terms and Conditions
                      </h5>
                      <p className="head-material  text-muted ">
                        Please find below the terms and conditions associated
                        with the orders
                      </p>
                      <ol
                        className="head-material  "
                        style={{ fontSize: "13px", marginLeft: "0px" }}
                      >
                        <li className="mb-3 mt-3">
                          90% ADVANCE ON BASIC AMOUNT (EXCLUDING GST) & BALANCE
                          PAYMENT WITHIN 30 WORKING DAYS AFTER SUBMISSION OF
                          INVOICES.
                        </li>
                        <li className="mb-3">
                          KINDLY MENTION YOUR REMARKS IN REMARKS FOR VENDOR
                          COLUMN.
                        </li>
                        <li className="mb-3">
                          DELIVERY OF MATERIAL AS PER SITE REQUIREMENT OR AS PER
                          DELIVERY SCHEDULE.
                        </li>
                        <li className="mb-3">UNLOADING WILL BE DONE BY US.</li>
                      </ol>
                    </div>
                  </div>

                  <div className=" d-flex justify-content-end">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="purple-btn2 m-0"
                    >
                      Create Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
