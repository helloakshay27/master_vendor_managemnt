import {
  mumbaiLocations,
  product,
  unitMeasure,
} from "../../../constant/data";
import MultiSelector from "../../base/Select/MultiSelector";
import SelectBox from "../../base/Select/SelectBox";
import Table from "../../base/Table/Table";
import React, { useState } from "react";

export default function CreateRFQForm({
  handleEventTypeModalShow,
  handleEventScheduleModalShow,
  handleSettingModalShow,
}) {
  const [data, setData] = useState([
    {
      descriptionOfItem: [],
      quantity: "",
      unit: [],
      location: [],
      rate: "",
      amount: "",
    },
  ]);

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
    updatedData[rowIndex][key] = value;
    setData(updatedData);
  };

  // Remove row by index (except the first row)
  const handleRemoveRow = (rowIndex) => {
    if (rowIndex > 0) {
      const updatedData = data.filter((_, index) => index !== rowIndex);
      setData(updatedData);
    }
  };

  // Add a new row
  const handleAddRow = () => {
    const newRow = {
      descriptionOfItem: [],
      quantity: "",
      unit: [],
      location: [],
      rate: "",
      amount: "",
    };
    setData([...data, newRow]);
  };

  return (
    <div className="row ">
      <div className="card-body">
        <div className="row align-items-end justify-items-end mx-2 mb-5">
          <div className="col-md-4 mt-0">
            <div className="form-group">
              <label className="po-fontBold">Event Type</label>
            </div>
            <input
              className="form-control "
              onClick={handleEventTypeModalShow}
              placeholder="Configure The Event"
            />
          </div>
          <div className="col-md-4 mt-0">
            <div className="form-group">
              <label className="po-fontBold">Event No.</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Event No."
              />
            </div>
          </div>
          <div className="col-md-4 mt-0">
            <div className="form-group">
              <label className="po-fontBold">Created On</label>
              <input className="form-control" type="date" />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="form-group">
              <label className="po-fontBold">Material Type</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Material Type"
              />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="form-group">
              <label className="po-fontBold">Event Schedule</label>
            </div>
            <input
              className="form-control "
              onClick={handleEventScheduleModalShow}
              placeholder="From [dd-mm-yy hh:mm] To [dd-mm-yy hh:mm] ([DD] Days
                                                          [HH] Hrs [MM] Mins)"
            />
          </div>
        </div>
        <div className="mx-3">
          <div className="head-material d-flex justify-content-between">
            <h4>Select Materials</h4>
            <button
              className="purple-btn2"
              data-bs-toggle="modal"
              data-bs-target="#venderModal"
              onClick={handleAddRow}
            >
              <span className="material-symbols-outlined align-text-top me-2">
                add{" "}
              </span>
              <span>Add</span>
            </button>
          </div>
          <Table
            columns={[
              { label: "Description of Item", key: "descriptionOfItem" },
              { label: "Quantity", key: "quantity" },
              { label: "UOM", key: "unit" },
              { label: "Location", key: "location" },
              { label: "Rate", key: "rate" },
              { label: "Amount", key: "amount" },
              { label: "Actions", key: "actions" }, 
            ]}
            data={data} 
            customRender={{
              descriptionOfItem: (cell, rowIndex) => (
                <MultiSelector
                  options={product}
                  value={cell}
                  onChange={(selected) =>
                    handleDescriptionOfItemChange(selected, rowIndex)
                  }
                  placeholder="Select Items"
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
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, "quantity")
                  }
                  placeholder="Enter Quantity"
                />
              ),
              rate: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="number"
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, "rate")
                  }
                  placeholder="Enter Rate"
                />
              ),
              amount: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="number"
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, "amount")
                  }
                  placeholder="Enter Amount"
                />
              ),
              actions: (_, rowIndex) => (
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveRow(rowIndex)}
                  disabled={rowIndex === 0} // Disable the button for the first row
                >
                  Remove
                </button>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
