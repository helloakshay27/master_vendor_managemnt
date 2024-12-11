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
      totalAmt:"",
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
          <div className="head-material text-center">
            <h4>Create Bid</h4>
          </div>
          <div className="head-material">
            <h4>Create Bid for Pratik</h4>
          </div>
          <Table
            columns={[
              { label: "Product", key: "descriptionOfItem" },
              { label: "Quantity", key: "quantity" },
              { label: "Quantity Available", key: "quantityAvail" },
              { label: "Best Total Amount ", key: "bestAmount" },
              { label: "Price", key: "rate" },
              { label: "Total Amount", key: "amount" },
              { label: "Location", key: "location" },
              { label: "Creator Attachment", key: "attachment" },
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
                />
              ),
              unit: (cell, rowIndex) => (
                <SelectBox
                  isDisableFirstOption={true}
                  label={""}
                  options={unitMeasure}
                  defaultValue={cell}
                  onChange={(selected) => handleUnitChange(selected, rowIndex)}
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
                />
              ),
              quantityAvail: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, "quantityAvail")
                  }
                  placeholder="Enter Quantity Available"
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
                />
              ),
              bestAmount: (cell, rowIndex) => {
                const quantity = parseFloat(data[rowIndex].quantityAvail) || 0;
                const rate = parseFloat(data[rowIndex].rate) || 0;
                const totalAmount = quantity * rate;

                return (
                  <input
                    className="form-control"
                    type="text"
                    value={totalAmount.toFixed(2)}
                    readOnly
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
                />
              ),
              amount: (_, rowIndex) => {
                const quantity = parseFloat(data[rowIndex].quantityAvail) || 0;
                const rate = parseFloat(data[rowIndex].rate) || 0;
                const totalAmount = quantity * rate;

                return (
                  <input
                    className="form-control"
                    type="text"
                    value={totalAmount.toFixed(2)}
                    readOnly 
                  />
                );
              },
            }}
          />

          <div className="d-flex justify-content-end">
            <ShortTable data={freightData} />
          </div>
          <div className="d-flex justify-content-end">
            <button className="purple-btn2" onClick={() =>navigate('/event-list')}>Create</button>
            <button className="purple-btn1" onClick={() =>navigate('/event-list')}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
