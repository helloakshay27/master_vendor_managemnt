import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Table, ShortTable, SelectBox } from "../components";
import {
  freightData,
  mumbaiLocations,
  product,
  unitMeasure,
} from "../constant/data";
import { useNavigate } from "react-router-dom";

export default function CreateBid() {
  const [data, setData] = useState([
    {
      descriptionOfItem: [],
      quantity: "",
      quantityAvail: "",
      unit: [],
      location: [],
      rate: "",
      amount: "",
      totalAmt: "",
      attachment: null,
    },
  ]);

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

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div
          className="w-100 p-4 mb-2"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          {/* <div className="head-material text-center">
            <h4>Submission Sheet</h4>
          </div> */}
          <div className="head-material">
            <h4>Submission Sheet</h4>
          </div>

          <div style={tableContainerStyle}>
            <Table
              columns={[
                { label: "Material", key: "descriptionOfItem" },
                { label: "Material Variant", key: "quantity" },
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
                descriptionOfItem: (cell, rowIndex) => (
                  <SelectBox
                    label={""}
                    options={product}
                    defaultValue={cell}
                    onChange={(selected) =>
                      handleDescriptionOfItemChange(selected, rowIndex)
                    }
                    style={fixedColumnStyle} // Sticky style for first column
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
                  <SelectBox
                    label={""}
                    defaultValue={cell}
                    onChange={(selected) =>
                      handleLocationChange(selected, rowIndex)
                    }
                    options={mumbaiLocations}
                    isDisableFirstOption={true}
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
                      handleInputChange(e.target.value, rowIndex, "quantity")
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
                      readOnly
                      style={otherColumnsStyle}
                    />
                  );
                },
              }}
            />
          </div>
          {/* <div className="row"> */}
          <div className=" d-flex justify-content-end">
            <ShortTable data={freightData} />
          </div>
          {/* </div> */}
          <div className="d-flex justify-content-end">
            <h4>Sum Total 64684</h4>
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
                  90% ADVANCE ON BASIC AMOUNT (EXCLUDING GST) & BALANCE PAYMENT
                  WITHIN 30 WORKING DAYS AFTER SUBMISSION OF INVOICES.
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
    </>
  );
}
