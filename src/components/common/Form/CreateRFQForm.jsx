import { mumbaiLocations, product, unitMeasure } from "../../../constant/data";
import MultiSelector from "../../base/Select/MultiSelector";
import SelectBox from "../../base/Select/SelectBox";
import Table from "../../base/Table/Table";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function CreateRFQForm({ data, setData }) {
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
      rate: "100.00",
      amount: "100000.00",
      inventory_id: "",
    };
    setData([...data, newRow]);
  };

  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);


  useEffect(() => {
    // Fetch material data from API
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/rfq/events/material_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        ); // Replace with your API endpoint

        // console.log(response ,"hhhhhhhhhhhhhhhhhh")

        // setMaterials(response.data,materials);
        if (response.data && Array.isArray(response.data.materials)) {
          setMaterials(response.data.materials); // Set materials if it's an array
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleInputChange = (value, rowIndex, key) => {
    const updatedData = [...data];
    if (updatedData[rowIndex]["inventory_id"] === "") {
      updatedData[rowIndex]["inventory_id"] = materials[rowIndex].id;
    }
    updatedData[rowIndex][key] = value;
    setData(updatedData);
  };

  const materialOptions = materials.map((material) => ({
    value: material.name,
    label: material.name,
  }));

  const handleDescriptionOfItemChange = (selected, rowIndex) => {
    const updatedData = [...data];

    // Find the selected material
    const selectedMaterial = materials.find(
      (material) => material.name === selected
    );

    // Update descriptionOfItem
    updatedData[rowIndex].descriptionOfItem = selected;

    // Check if selectedMaterial exists and has a valid UOM
    if (selectedMaterial && selectedMaterial.uom) {
      updatedData[rowIndex].unit = selectedMaterial.uom.uom_short_name; // Update UOM short name
    } else {
      updatedData[rowIndex].unit = ""; // Set empty if no UOM found
    }

    setData(updatedData);
  };

  return (
    <div className="row ">
      <div className="card-body">
        {/* <div className="row align-items-end justify-items-end mx-2 mb-5">
          <div className="col-md-4 mt-0 mb-2">
            <div className="form-group">
              <label className="po-fontBold">Event Type</label>
            </div>
            <input
              className="form-control "
              onClick={handleEventTypeModalShow}
              placeholder="Configure The Event"
            />
          </div>
          <div className="col-md-4 mt-0 mb-2">
            <div className="form-group">
              <label className="po-fontBold">Event No.</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Event No."
              />
            </div>
          </div>
          <div className="col-md-4 mt-0 mb-2">
            <div className="form-group">
              <label className="po-fontBold">Created On</label>
              <input className="form-control" type="date" />
            </div>
          </div>
          {/* <div className="col-md-4 mt-2">
            <div className="form-group">
              <label className="po-fontBold">Material Type</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Material Type"
              />
            </div>
          </div> */}
        {/* <div className="col-md-4 mt-2">
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
        </div>   */}
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
                <SelectBox
                  label={""}
                  // options={product}
                  options={materialOptions}
                  defaultValue={cell}
                  onChange={(selected) =>
                    handleDescriptionOfItemChange(selected, rowIndex)
                  }
                />
                // <MultiSelector
                //   options={product}
                //   value={cell}
                //   onChange={(selected) =>
                //     handleDescriptionOfItemChange(selected, rowIndex)
                //   }
                //   placeholder="Select Items"
                // />
              ),
              unit: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="text"
                  value={cell}
                  readOnly
                />
                // <SelectBox
                //   isDisableFirstOption={true}
                //   label={""}
                //   options={unitMeasure}
                //   defaultValue={cell}
                //   onChange={(selected) => handleUnitChange(selected, rowIndex)}
                // />
              ),
              location: (cell, rowIndex) => (
                <input
                  type="text"
                  className="form-control"
                  value={cell}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, "location")
                  }
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
                  disabled
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
                  disabled
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
