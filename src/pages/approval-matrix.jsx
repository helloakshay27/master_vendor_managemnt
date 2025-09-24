
import React from "react";
import CollapsibleCard from "../components/base/Card/CollapsibleCards";
import { MultiSelector, SelectBox } from "../components";
import Select from "react-select/base";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleSelector from "../components/base/Select/SingleSelector";
import { baseURL } from "../confi/apiDomain";

const ApprovalMatrix = () => {
   const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  const navigate = useNavigate(); //  navigate
  // const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [approvalLevels, setApprovalLevels] = useState([
    { order: "", name: "", users: [] }, // Initial level remains open
  ]);
  const [selectedKYCType, setSelectedKYCType] = useState(null);

  const [users, setUsers] = useState([]);
  const kycTypes = [
    { value: " General Rekyc", label: "General Re-KYC" },
    { value: "MSME Rekyc", label: "MSME Re-KYC" },
    { value: "E-invoicing Rekyc", label: "E-invoicing Re-KYC" },
    { value: "Bank Rekyc", label: "Bank Rekyc Re-KYC" },
    { value: "GSTIN Rekyc", label: "GSTIN Rekyc" },
      { value: "Name Rekyc", label: "Name Rekyc" },
  ];

  // Fetch Companies and Departments
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [departmentRes, userRes] = await Promise.all([
          // axios.get("https://vendors.lockated.com/pms/company_setups.json"),
          axios.get(`${baseURL}/pms/departments.json`),
          axios.get(`${baseURL}/users.json`),
        ]);

        // console.log("Raw Company Data:", companyRes.data);
        console.log("Raw Department Data:", departmentRes.data);

        // Correctly map company and department data
        // const companyOptions = companyRes.data.map(([id, name]) => ({
        //   value: id, // ID is the first element in the array
        //   label: name, // Name is the second element
        // }));

        const departmentOptions = departmentRes.data.map(([id, name]) => ({
          value: id,
          label: name,
        }));

        // console.log("Processed Companies:", companyOptions);
        console.log("Processed Departments:", departmentOptions);

        // setCompanies(companyOptions);
        setDepartments(departmentOptions);
        setUsers(
          userRes.data.map(({ id, full_name }) => ({
            value: id,
            label: full_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Add Approval Level
  // const handleAddLevel = () => {
  //   setApprovalLevels([...approvalLevels, { order: "", name: "", users: [] }]);
  // };

  // // Remove Approval Level
  // const handleRemoveLevel = (index) => {
  //   setApprovalLevels(approvalLevels.filter((_, i) => i !== index));
  // };

  // Handle Input Change
  const handleInputChange = (index, field, value) => {
    const updatedLevels = [...approvalLevels];
    updatedLevels[index][field] = value;
    setApprovalLevels(updatedLevels);
  };

  // Handle Company Selection

  const [formData, setFormData] = useState({
    company_id: null,
    department_id: null,
    approval_type: "",
  });
  useEffect(() => {
    setFormData({
      // company_id: selectedCompany ? selectedCompany.value : null,
      department_id: selectedDepartment ? selectedDepartment.value : null,
      approval_type: selectedKYCType ? selectedKYCType.value : "",
    });
  }, [
    ,
    // selectedCompany
    selectedDepartment,
    selectedKYCType,
  ]);

  // const handleCompanyChange = (selected) => {
  //   console.log("Selected Company:", selected);
  //   setSelectedCompany(selected);
  // };

  const handleDepartmentChange = (selected) => {
    console.log("Selected Department:", selected);
    setSelectedDepartment(selected);
  };

  // const handleKYCTypeChange = (selected) => {
  //   console.log("Selected KYC Type:", selected);

  //   // If MultiSelector returns an array, take the first selected value
  //   const selectedValue = Array.isArray(selected) ? selected[0] : selected;

  //   setSelectedKYCType(selectedValue);
  // };

  const handleKYCTypeChange = (selected) => {
    console.log("Selected KYC Types:", selected);
    setSelectedKYCType(selected); // Ensure this correctly stores selected values
  };

  // Extract a human-readable error message from various API error shapes
  const extractErrorMessage = (err) => {
    try {
      const data = err?.response?.data;
      if (!data) {
        // Network or unexpected error
        if (err?.message) return err.message;
        return "An unexpected error occurred.";
      }

      // Common patterns
      if (typeof data === "string") return data;

      if (data.message && typeof data.message === "string") return data.message;

      if (Array.isArray(data.message) && data.message.length) return data.message[0];

      if (data.error && typeof data.error === "string") return data.error;

      if (Array.isArray(data.error) && data.error.length) return data.error[0];

      if (data.errors) {
        // Rails/JSON:API style: errors can be array or object map
        if (typeof data.errors === "string") return data.errors;
        if (Array.isArray(data.errors) && data.errors.length) return data.errors[0];
        if (typeof data.errors === "object") {
          const firstKey = Object.keys(data.errors)[0];
          const firstVal = data.errors[firstKey];
          if (Array.isArray(firstVal) && firstVal.length) return `${firstKey} ${firstVal[0]}`.trim();
          if (typeof firstVal === "string") return `${firstKey} ${firstVal}`.trim();
        }
      }

      if (data.full_messages && Array.isArray(data.full_messages) && data.full_messages.length) {
        return data.full_messages[0];
      }

      // Fallback to first primitive value in data
      if (typeof data === "object") {
        const values = Object.values(data).flat?.() ?? Object.values(data);
        const first = Array.isArray(values) ? values[0] : values;
        if (typeof first === "string") return first;
        if (Array.isArray(first) && first.length && typeof first[0] === "string") return first[0];
      }

      return "Failed to process request.";
    } catch (_) {
      return "Failed to process request.";
    }
  };

  const handleCreate = async () => {
    const finalFormData = {
      // company_id: selectedCompany ? selectedCompany.value : null,
      department_id: selectedDepartment ? selectedDepartment.value : null,
      approval_type: selectedKYCType ? selectedKYCType.value : "", // Fix here
    };

    console.log("Final Form Data Before Submit:", finalFormData);

    if (
      // !finalFormData.company_id ||
      !finalFormData.department_id ||
      !finalFormData.approval_type
    ) {
      alert("Please select a Department, and KYC Type.");
      return;
    }

    for (let i = 0; i < approvalLevels.length; i++) {
      const level = approvalLevels[i];

      if (!level.order || level.order.toString().trim() === "") {
        alert(`Please enter an order `);
        return;
      }

      if (!level.name.trim()) {
        alert(`Please enter a name `);
        return;
      }

      if (!level.users || level.users.length === 0) {
        alert(`Please select at least one user`);
        return;
      }
    }

    const payload = {
      // company_id: finalFormData.company_id,
      department_id: finalFormData.department_id,
      approval_type: "vendor_rekyc",
      approval_function: finalFormData.approval_type,
      invoice_approval_levels_attributes: approvalLevels.map((level) => ({
        name: level.name,
        order: Number(level.order),
        active: true,
        escalate_to_users: level.users.map((user) => user.value),
      })),
    };

    console.log("Final Payload:", payload);

    try {
      const response = await axios.post(
        `${baseURL}/pms/admin/invoice_approvals.json?token=${token}`,
        payload
      );

      console.log("API Response:", response.data);
      alert("Approval Matrix Created Successfully!");

      // setSelectedCompany(null);
      setSelectedDepartment(null);
      setSelectedKYCType([]);
      setApprovalLevels([{ order: "", name: "", users: [] }]); // Reset to initial empty level

      navigate(`/approval-list/?token=${token}`);
    } catch (error) {
      console.error("Error updating approval matrix:", error);
      alert(extractErrorMessage(error));
    }
  };

  return (
    <div>
      <div
        className="website-content"
        data-select2-id="select2-data-192-0lua"
        style={{ overflowY: "auto" }}
      >
        <footer className="footer"></footer>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* Dynamic tabs will be inserted here */}
        </ul>
        <div
          className="tab-content"
          id="myTabContent"
          data-select2-id="select2-data-myTabContent"
        >
          <link
            rel="stylesheet"
            href="/assets/mail_room.debug-e60240217d99fc10e84cb08195762eaefdebfa65453cfc4907927bd997f6f9e5.css"
          />
          <div className="ms-3 mt-3" data-select2-id="select2-data-191-fles">
            <p>Setup &gt; Re-Kyc Approvals</p>
            <h5 className="mt-2">REKYC APPROVAL</h5>
            <div
              className="container-fluid p-3"
              data-select2-id="select2-data-190-iiua"
            >
              <div className="row">
                <div>
                  <input
                    type="hidden"
                    name="authenticity_token"
                    defaultValue="M7lSHxX9HuyNx5l_jkvdgnhAmhQ7gh3Vnv_wr6fKS30l24vqwHbNTnaUsp_NJu9LeGEhKm1hyNeP7XjH6dt6pA"
                    autoComplete="off"
                  />
                  <input
                    type="hidden"
                    name="subaction"
                    id="subaction"
                    autoComplete="off"
                  />
                  <div
                    className="row my-4 align-items-center"
                    data-select2-id="select2-data-188-ekbm"
                  >
                    <div
                      className="col-md-12 "
                      data-select2-id="select2-data-187-y2ya"
                    >
                      <div className="card mt-3 pb-4">
                        <CollapsibleCard title="Configure Details">
                          <div>
                            <div className="row my-2 align-items-end">
                              {/* Event Title */}
                              {/* <div className="col-md-3">
                                <label htmlFor="event-title-select">
                                  Select Comapny
                                </label>

                                <SingleSelector
                                  options={companies}
                                  value={selectedCompany}
                                  onChange={handleCompanyChange}
                                  placeholder="select comapny"
                                />
                              </div> */}

                              {/* Status */}
                              <div className="col-md-3">
                                <label htmlFor="status-select">
                                  Department
                                </label>
                                <SingleSelector
                                  id="status-select"
                                  options={departments}
                                  value={selectedDepartment}
                                  onChange={handleDepartmentChange} //
                                  placeholder="Select Department"
                                  isClearable
                                />
                              </div>

                              <div className="col-md-3 mt-4">
                                <label htmlFor="created-by-select">
                                  {" "}
                                  KYC Type
                                </label>
                                <SingleSelector
                                  id="module-select"
                                  options={kycTypes}
                                  value={selectedKYCType} // Store selected KYC type
                                  onChange={handleKYCTypeChange}
                                  isClearable
                                />
                              </div>
                            </div>
                          </div>
                        </CollapsibleCard>
                        <div className="card mt-3 pb-4 ms-3 ">
                          <div className="card-header mb-3 ">
                            <h3 className="card-title">Approval Levels</h3>
                          </div>

                          {approvalLevels.map((level, index) => (
                            <div
                              // key={index}
                              className="px-4"
                              style={{
                                display: "flex",
                                columnGap: 20,
                                alignItems: "center",
                              }}
                            >
                              <fieldset className="border">
                                <legend className="float-none">
                                  Order{" "}
                                  <span style={{ color: "#f69380" }}>*</span>
                                </legend>
                                <input
                                  className="form-group order"
                                  value={level.order}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "order",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Order"
                                  required
                                />
                              </fieldset>
                              <fieldset className="border ms-4">
                                <legend className="float-none">
                                  Name of Level{" "}
                                  <span style={{ color: "#f69380" }}>*</span>
                                </legend>
                                <input
                                  className="form-group name"
                                  value={level.name}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Name of Level"
                                  required
                                  type="text"
                                />
                              </fieldset>
                              <fieldset
                                className="user-list ms-3 mb-3"
                                style={{ width: "15%" }} //
                              >
                                <legend className="float-none mb-2">
                                  Users{" "}
                                  <span style={{ color: "#f69380" }}>*</span>
                                </legend>
                                <MultiSelector
                                  options={users}
                                  value={level.users}
                                  onChange={(selected) =>
                                    handleInputChange(index, "users", selected)
                                  }
                                  placeholder="Select Users"
                                />
                              </fieldset>
                              {/* <button
                                className="remove-item ms-4 mb-3 px-2 rounded purple-btn1"
                                style={{ padding: "1px 3px" }}
                                onClick={() => handleRemoveLevel(index)}
                              >
                                x
                              </button> */}
                            </div>
                          ))}
                          <div className="ms-3 mt-2">
                            {/* <button
                              className=" purple-btn1 submit-btn"
                              onClick={handleAddLevel}
                            >
                              +
                            </button> */}
                          </div>
                        </div>
                        <div></div>
                      </div>

                      {/* </div> */}
                      <div style={{ textAlign: "center" }}>
                        <button
                          className="purple-btn1 submit-btn"
                          onClick={handleCreate}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Dynamic tab content will be inserted here */}
        </div>
      </div>
    </div>
  );
};

export default ApprovalMatrix;
