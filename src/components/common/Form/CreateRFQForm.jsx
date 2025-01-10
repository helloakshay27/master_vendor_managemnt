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
  const [sections, setSections] = useState([
    {
      sectionData: data,
      sectionId: Date.now(),
    },
  ]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [subSectionOptions, setSubSectionOptions] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/rfq/events/material_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        if (response.data && Array.isArray(response.data.materials)) {
          setMaterials(response.data.materials);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/pms/sections/section_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        if (response.data && Array.isArray(response.data.section_list)) {
          setSectionOptions(
            response.data.section_list.map((section) => ({
              label: section.name,
              value: section.value,
            }))
          );
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchSubSections = async () => {
      try {
        const response = await axios.get(
          "https://vendors.lockated.com/pms/sections/sub_section_list?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414"
        );
        if (response.data && Array.isArray(response.data.section_list)) {
          setSubSectionOptions(
            response.data.section_list.map((subSection) => ({
              label: subSection.name,
              value: subSection.value,
            }))
          );
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sub-sections:", error);
      }
    };

    fetchMaterials();
    fetchSections();
    fetchSubSections();
  }, []);

  const handleUnitChange = (selected, rowIndex, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionData[rowIndex].unit = selected;
    setSections(updatedSections);
  };

  const handleLocationChange = (selected, rowIndex, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionData[rowIndex].location = selected;
    setSections(updatedSections);
  };

  const handleRemoveRow = (rowIndex, sectionIndex) => {
    if (rowIndex > 0) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].sectionData = updatedSections[sectionIndex].sectionData.filter(
        (_, index) => index !== rowIndex
      );
      setSections(updatedSections);
    }
  };

  const handleAddRow = (sectionIndex) => {
    const newRow = {
      descriptionOfItem: [],
      quantity: "",
      unit: [],
      type: materials[0]?.type || "",
      location: [],
      rate: 0,
      amount: 0,
      inventory_id: "",
    };
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionData = [
      ...updatedSections[sectionIndex].sectionData,
      newRow,
    ];
    setSections(updatedSections);
  };

  const handleInputChange = (value, rowIndex, key, sectionIndex) => {
    const updatedSections = [...sections];
    if (updatedSections[sectionIndex].sectionData[rowIndex]["inventory_id"] === "") {
      updatedSections[sectionIndex].sectionData[rowIndex]["inventory_id"] = materials[rowIndex]?.id || "";
    }
    updatedSections[sectionIndex].sectionData[rowIndex][key] = value;
    setSections(updatedSections);
  };

  const handleDescriptionOfItemChange = (selected, rowIndex, sectionIndex) => {
    const updatedSections = [...sections];
    const selectedMaterial = materials.find(
      (material) => material.name === selected
    );

    updatedSections[sectionIndex].sectionData[rowIndex].descriptionOfItem = selected;

    if (selectedMaterial && selectedMaterial.uom) {
      updatedSections[sectionIndex].sectionData[rowIndex].unit = selectedMaterial.uom.uom_short_name;
    } else {
      updatedSections[sectionIndex].sectionData[rowIndex].unit = "";
    }
    updatedSections[sectionIndex].sectionData[rowIndex].type = selectedMaterial?.type || "N/A";
    updatedSections[sectionIndex].sectionData[rowIndex].inventory_id = selectedMaterial?.id || "";
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    const newSection = {
      sectionData: [
        {
          descriptionOfItem: [],
          quantity: "",
          unit: [],
          type: materials[0]?.type || "",
          location: [],
          rate: 0,
          amount: 0,
          inventory_id: "",
        },
      ],
      sectionId: Date.now(),
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (sectionIndex) => {
    if (sectionIndex > 0) {
      const updatedSections = sections.filter((_, index) => index !== sectionIndex);
      setSections(updatedSections);
    }
  };

  const materialOptions = materials.map((material) => ({
    value: material.name,
    label: material.name,
  }));

  return (
    <div className="row ">
      <div className="card-body">
        <div className="mx-3">
          <div className="head-material d-flex justify-content-between">
            <h4>
              Select Materials{" "}
              <span style={{ color: "red", fontSize: "16px" }}>*</span>
            </h4>
            
          </div>
          {sections.map((section, sectionIndex) => (
            <div key={section.sectionId} className="card p-4 mb-4">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-3">
                  <SelectBox
                    label={"Select Section"}
                    options={sectionOptions}
                    defaultValue={"Select Section"}
                    onChange={undefined}
                  />
                  <SelectBox
                    label={"Select Sub Section"}
                    options={subSectionOptions}
                    defaultValue={"Select Sub Section"}
                    onChange={undefined}
                  />
                </div>
                <div className="d-flex gap-3 py-3">
                  <button
                    className="purple-btn2"
                    onClick={() => handleAddRow(sectionIndex)}
                  >
                    <span className="material-symbols-outlined align-text-top">
                      add{" "}
                    </span>
                    <span>Add Row</span>
                  </button>
                  {sectionIndex > 0 && (
                    <button
                      className="purple-btn2"
                      onClick={() => handleRemoveSection(sectionIndex)}
                    >
                    Remove Section
                    </button>
                  )}
                </div>
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
                data={section.sectionData}
                customRender={{
                  srno: (cell, rowIndex) => <p>{rowIndex + 1}</p>,
                  descriptionOfItem: (cell, rowIndex) => (
                    <SelectBox
                      label={""}
                      options={materialOptions}
                      defaultValue={cell}
                      onChange={(selected) =>
                        handleDescriptionOfItemChange(selected, rowIndex, sectionIndex)
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
                    <p>{cell}</p>
                  ),
                  location: (cell, rowIndex) => (
                    <input
                      type="text"
                      className="form-control"
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(e.target.value, rowIndex, "location", sectionIndex)
                      }
                    />
                  ),
                  quantity: (cell, rowIndex) => (
                    <input
                      className="form-control"
                      type="number"
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(e.target.value, rowIndex, "quantity", sectionIndex)
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
                        handleInputChange(e.target.value, rowIndex, "rate", sectionIndex)
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
                        handleInputChange(e.target.value, rowIndex, "amount", sectionIndex)
                      }
                      placeholder="Enter Amount"
                      disabled
                    />
                  ),
                  actions: (_, rowIndex) => (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveRow(rowIndex, sectionIndex)}
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
          ))}
          <button
              className="purple-btn2"
              onClick={handleAddSection}
            >
              <span className="material-symbols-outlined align-text-top">
                add{" "}
              </span>
              <span>Add Section</span>
            </button>
        </div>
      </div>
    </div>
  );
}
