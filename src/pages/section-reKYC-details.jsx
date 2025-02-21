import React, { useState } from "react";
import CollapsedCardKYC from "../components/base/Card/CollapsedCardKYC";
import CardBodyKYC from "../components/base/Card/CardBodyKYC";
import CardBodyMsme from "../components/base/Card/CardBodyMsme";

import { SelectBox } from "../components";

const SectionReKYCDetails = () => {
  const [bankDetailsList, setBankDetailsList] = useState([{ id: Date.now() }]);
  
  // Function to add 
  const addBankDetails = () => {
    setBankDetailsList([
      ...bankDetailsList,
      { id: Date.now() }, 
    ]);
  };

  // Function to delete 
  const deleteBankDetails = (id) => {
    setBankDetailsList(bankDetailsList.filter((item) => item.id !== id)); 
  };

  return (
    <>
      <div className="website-content overflowY-auto">
        <div className="card mx-4 pb-4 mt-4">
          <div className="card-header3">
            <h3 className="card-title">Organization Details</h3>
          </div>
          <div className="card-body mt-0">
            <div className="row px-3">
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Company</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    A2Z Online Services Private Limited
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Certifying Company GSTIN</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    27AACCA5376J1ZG
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Site</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    A2Z Common
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Department</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    Billing
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Invited By</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    Abhishek Sharma
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Contact Number</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    2
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mx-4 pb-4 mt-4">
          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">Basic Information</h3>
            </div>
            <div className="card-body mt-0">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Vendor Organization Name</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Dell Organization Test
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Type of Organization</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Privite Limited
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Nature of Business</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Finicial Vendor
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Vendor Type</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Domestic Supplier
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Type of Industry</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Real Estate
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Full Name</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Dinesh Shinde
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Email</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      dinesh.shinde@lockated.com
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Mobile </label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      85303 12827
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>PAN No.</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      UWPCL6910T
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>PAN Attachment</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      dummy.pdf
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Schema Group</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Domestic
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>Date of Incorporation</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      01/03/2024
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Applicable</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      Yes
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Classification</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      SEZ Unit
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN No.</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      27AACCA8956J1ZG
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                  <div className="col-6 ">
                    <label>GSTIN Attachment</label>
                  </div>
                  <div className="col-6">
                    <label className="text">
                      <span className="me-3">
                        <span className="text-dark">:</span>
                      </span>
                      dummy.pdf
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {bankDetailsList.map((bankDetail) => (
              <CollapsedCardKYC
                key={bankDetail.id}
                title="Bank Details"
                onDelete={() => deleteBankDetails(bankDetail.id)}  
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        Bank Name <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Bank name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        Address<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>
                        County <span>*</span>
                      </label>
                      <SelectBox />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        State<span>*</span>
                      </label>
                      <SelectBox />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        City<span>*</span>
                      </label>
                      <SelectBox />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Pin Code<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="name"
                        placeholder="Enter Pin Code"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Account Type<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Account Type"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Account Number<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="name"
                        placeholder="Enter Account Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Confirm Account Number<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="name"
                        placeholder="Enter Confirm Account Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Branch Name<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter Branch Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        MICR No.<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder=" MICR No."
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        IFSC Code<span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter IFCS Code"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Beneficiary Name <span>*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter name"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Cancelled Cheque / Bank Copy<span>*</span>
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
                  <div className="col-md-4 mt-2">
                    <div className="form-group">
                      <label>
                        Remark<span>*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </CollapsedCardKYC>
            ))}

            <div className="row mt-2 ms-2 justify-content-start">
              <div className="col-md-2">
                <button className="purple-btn1" onClick={addBankDetails}>
                  Add Bank Details
                </button>
              </div>
            </div>
          </div>

          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">MSME Details</h3>
            </div>
            <CardBodyMsme />
          </div>
          <div className="card mx-3 pb-4 mt-4">
            <div className="card-header3">
              <h3 className="card-title">E-invice</h3>
            </div>
            <CardBodyKYC />
          </div>
          <div className="row mt-4 mx-3">
            <div className="col-md-12">
              <h5 className=" ">
                Declaration <span>*</span>
              </h5>
              <p>
                <span className="me-2 mt-2">
                  <input
                    type="checkbox"
                    id="declaration-checkbox"
                    required=""
                  />
                </span>{" "}
                I, undersigned, on behalf of M/S Dell Organization Test hereby
                certify that the information provided in this documents are the
                best of my knowledge &amp; particulars given in this submission
                are true and correct. I authorize M/S A2Z Online Services
                Private Limited to make direct inquiries and references to any
                person, firm, public official or organization named in this Form
                to verify information submitted herein or regarding the
                competence of the&nbsp;Organization
              </p>
              <div id="checkboxError" style={{ color: "red", display: "none" }}>
                Please check this box to proceed.
              </div>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-center">
          <div className="col-md-2">
            <button className="purple-btn2">Add Bank Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionReKYCDetails;
