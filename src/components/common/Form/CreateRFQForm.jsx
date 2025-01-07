import { mumbaiLocations, product, unitMeasure } from "../../../constant/data";
import MultiSelector from "../../base/Select/MultiSelector";
import SelectBox from "../../base/Select/SelectBox";
import Table from "../../base/Table/Table";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { type } from "jquery";

export default function CreateRFQForm({ data, setData }) {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/rfq/events/material_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        ); 
        if (response.data && Array.isArray(response.data.materials)) {
          setMaterials(response.data.materials);           
          // console.log("Materials fetched successfully:", response.data.materials);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);
  console.log("setData :----",data, materials);
  
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
      type: materials[0].type,
      location: [],
      rate: 0,
      amount: 0,
      inventory_id: "",
    };
    setData([...data, newRow]);
  };


  const handleInputChange = (value, rowIndex, key) => {
    const updatedData = [...data];
    if (updatedData[rowIndex]["inventory_id"] === "") {
      updatedData[rowIndex]["inventory_id"] = materials[rowIndex].id;
    }
    updatedData[rowIndex][key] = value;
    setData(updatedData);
  };

  const materialOptions = materials
    .filter(
      (material) => !data.some((row) => row.descriptionOfItem === material.name)
    )
    .map((material) => ({
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
      updatedData[rowIndex].type = selectedMaterial?.type || "N/A";
      updatedData[rowIndex].inventory_id = selectedMaterial?.id || "";
      setData(updatedData);
    };

  return (
    <div className="row ">
      <div className="card-body">
        <div className="mx-3">
          <div className="head-material d-flex justify-content-between">
            <h4>Select Materials <span style={{ color: 'red', fontSize:'16px' }}>*</span></h4>
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
              { label: "Sr no.", key: "srno" },
              { label: "Description of Item", key: "descriptionOfItem" },
              { label: "Quantity", key: "quantity" },
              { label: "UOM", key: "unit" },
              { label: "Type", key: "type" },
              { label: "Location", key: "location" },
              { label: "Rate", key: "rate" },
              { label: "Amount", key: "amount" },
              { label: "Actions", key: "actions" },
            ]}
            data={data}
            customRender={{
              srno: (cell, rowIndex) => (
                <p>{rowIndex + 1}</p>
              ),
              descriptionOfItem: (cell, rowIndex) => (
                <SelectBox
                  label={""}
                  options={materialOptions}
                  defaultValue={cell}
                  onChange={(selected) =>
                    handleDescriptionOfItemChange(selected, rowIndex)
                  }
                />
              ),
              unit: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="text"
                  value={cell}
                  readOnly
                />
              ),
              type: (cell, rowIndex) => (
                // <input
                //   className="form-control"
                //   type="text"
                //   value={cell}
                //   readOnly
                // />
                <p>{cell}</p>
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
                />
              ),
              amount: (cell, rowIndex) => (
                <input
                  className="form-control"
                  type="number"
                  value={""}
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
                  disabled={rowIndex === 0}
                >
                  Remove
                </button>
              ),
            }}
            onRowSelect={undefined}
            handleCheckboxChange={undefined}
            resetSelectedRows={undefined}
            onResetComplete={undefined}
          />
        </div>
      </div>
    </div>
  );
}
