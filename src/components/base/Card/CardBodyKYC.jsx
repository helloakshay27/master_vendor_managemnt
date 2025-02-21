import React, { useState } from "react";

const CardBodyKYC = () => {
  // States to track the dropdown selections
  const [eInvoicingApplicable, setEInvoicingApplicable] = useState("Yes");
  const [msmeUdyamApplicable, setMsmeUdyamApplicable] = useState("Yes");

  // Handle change in "E-invoicing Applicable" dropdown
  const handleEInvoicingChange = (event) => {
    setEInvoicingApplicable(event.target.value);
  };

  // Handle change in "MSME/Udyam Number Applicable" dropdown
  const handleMsmeUdyamChange = (event) => {
    setMsmeUdyamApplicable(event.target.value);
  };

  return (
    <>
        <div className="card-body mt-0">
          <div className="row">
            {/* Delivery Lead Period */}
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Delivery Lead Period (In Days) <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder=""
                />
              </div>
            </div>

            {/* Warranty Period */}
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Specify Warranty Period (In Years) <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="name"
                  placeholder=""
                />
              </div>
            </div>

            {/* AMC Provided */}
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  AMC Provided <span>*</span>
                </label>
                <select className="form-control">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Website */}
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <label>
                  Website <span>*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder=""
                />
              </div>
            </div>

            {/* Currency Type */}
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <label>
                  Currency Type <span>*</span>
                </label>
                <select className="form-control">
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* MSME/Udyam Number Applicable */}
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <label>
                  MSME/Udyam Number Applicable <span>*</span>
                </label>
                <select
                  value={msmeUdyamApplicable}
                  onChange={handleMsmeUdyamChange}
                  className="form-control"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* MSME/Udyam Number */}
            {msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    MSME/Udyam Number <span>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="name"
                    placeholder=""
                  />
                </div>
              </div>
            )}

            {/* MSME/Udyam Valid From */}
            {msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    MSME/Udyam Valid From <span>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="name"
                    placeholder=""
                  />
                </div>
              </div>
            )}

            {/* MSME/Udyam Valid Till */}
            {msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    MSME/Udyam Valid Till <span>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="name"
                    placeholder=""
                  />
                </div>
              </div>
            )}

            {/* MSME Enterprise Type */}
            {msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    MSME Enterprise Type <span>*</span>
                  </label>
                  <select className="form-control">
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                  </select>
                </div>
              </div>
            )}
{/*  */}
{msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                  Download Specimen <span>*</span>
                  </label>
                  <a
                    download="Specimen_E-Invoicing_Declaration.docx"
                    className="text-primary d-flex align-items-center"
                    href="/assets/Specimen_E-Invoicing_Declaration.docx"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className="bi bi-download"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                        style={{ fill: "#de7008!important" }}
                      />
                      <path
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                        style={{ fill: "#de7008!important" }}
                      />
                    </svg>
                    <span className="mt-2 ms-2">
                      Specimen For E-Invoicing Declaration.pdf
                    </span>
                  </a>
                </div>
              </div>
            )}
            {/* MSME/Udyam Attachment */}
            {msmeUdyamApplicable === "Yes" && (
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    MSME/Udyam Attachment <span>*</span>
                  </label>
                  <input className="form-control" type="file" name="" />
                </div>
              </div>
            )}
          </div>

          {/* E-Invoicing Applicable */}
          <div className="row">
            <div className="col-md-4 mt-2">
              <div className="form-group">
                <label>
                  E-invoicing Applicable <span>*</span>
                </label>
                <select
                  value={eInvoicingApplicable}
                  onChange={handleEInvoicingChange}
                  className="form-control"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conditional rendering for E-Invoicing - Hide Download Specimen and Upload Declaration */}
          {eInvoicingApplicable === "No" && (
            <div className="row">
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    Download Specimen <span>*</span>
                  </label>
                  <a
                    download="Specimen_E-Invoicing_Declaration.docx"
                    className="text-primary d-flex align-items-center"
                    href="/assets/Specimen_E-Invoicing_Declaration.docx"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className="bi bi-download"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                        style={{ fill: "#de7008!important" }}
                      />
                      <path
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                        style={{ fill: "#de7008!important" }}
                      />
                    </svg>
                    <span className="mt-2 ms-2">
                      Specimen For E-Invoicing Declaration.pdf
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    Upload Declaration <span>*</span>
                  </label>
                  <input
                    id="attachment"
                    accept=" "
                    className="form-control"
                    type="file"
                    name=""
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditional rendering for MSME/Udyam - Hide Download Specimen and Upload Declaration */}
          {msmeUdyamApplicable === "No" && (
            <div className="row">
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    Download Specimen <span>*</span>
                  </label>
                  <a
                    download="Specimen_MSME_Udyam_Declaration.docx"
                    className="text-primary d-flex align-items-center"
                    href="/assets/Specimen_MSME_Udyam_Declaration.docx"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="currentColor"
                      className="bi bi-download"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                        style={{ fill: "#de7008!important" }}
                      />
                      <path
                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                        style={{ fill: "#de7008!important" }}
                      />
                    </svg>
                    <span className="mt-2 ms-2">
                      Specimen For MSME/Udyam Declaration.pdf
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-md-4 mt-2">
                <div className="form-group">
                  <label>
                    Upload Declaration <span>*</span>
                  </label>
                  <input
                    id="attachment"
                    accept=" "
                    className="form-control"
                    type="file"
                    name=""
                  />
                </div>
              </div>
            </div>
          )}
        </div>
    </>
  );
};

export default CardBodyKYC;
