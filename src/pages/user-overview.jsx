// import React from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";

const UserOverview = () => {
  const [publishedStages, setPublishedStages] = useState(false);
  const [terms, setTerms] = useState(false);
  const [Contact, setContact] = useState(false);
  const [lineItems, setLineItems] = useState(false);


  const handlepublishedStages = () => {
    setPublishedStages(!publishedStages)
  };

  const handleTerms = () => {
    setTerms(!terms)
  };

  const handleContact = () => {
    setContact(!Contact)
  };

  const handlelineItem = () => {
    setLineItems(!lineItems)
  };

  return (
    <>




      <Header />
      <div className="main-content container-fluid">
        <Sidebar />
        <div
          className=" w-100 p-4 mb-2"
          style={{
            overflowY: "auto",
            height: "calc(100vh - 100px)",
          }}
        >
          {/* Published Stages */}
          <div className="mx-3">



            <h4 className="mt-4 head-material">
              <button onClick={handlepublishedStages} style={{ background: 'white', borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
                {publishedStages ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  // strokeLinecap="round"
                  // strokeLinejoin="round"
                  >

                    {/* Minus Icon */}
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    {/* Plus Icon  */}
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
              </button>

              Published Stages</h4>
            {/* <div className="mx-3"> */}
            {publishedStages && (
              <div className="tbl-container px-0 mt-3 head-material mx-3">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-start">Stage Title</th>
                      <th className="text-start">Status</th>
                      <th className="text-start">Bidding Starts At</th>
                      <th className="text-start">Bidding Ends At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start"  style={{ color: "#777777" }}>[1000291947] Plumbing Material - SWAYAM REALTORS AND TRADERS LLP</td>
                      <td className="text-start" style={{ color: "#777777" }}> Active</td>
                      <td className="text-start" style={{ color: "#777777" }}>17/12/2024 13:30 pm</td>
                      <td className="text-start" style={{ color: "#777777" }}>18/12/2024 13:30 pm</td>

                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>
          {/* Terms & Conditions */}

          <div className="mt-4 mx-3"
            style={{
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              padding: "20px 0", // Optional padding to add spacing between content and borders
            }}
          >
            <h4 class="mt-4 head-material">

              <button onClick={handleTerms} style={{ background: 'white',borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
                {terms ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  >

                    {/* Minus Icon */}
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    {/* Plus Icon  */}
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
              </button>

              Terms & Conditions</h4>

            {terms && (
              <div className=" mx-3 mt-4 head-material mx-3" style={{ color: "#777777" }}>
                <ol>
                  <li>90% ADVANCE ON BASIC AMOUNT (EXCLUDING GST) & BALANCE PAYMENT WITHIN WORKING 30 DAYS AFTER SUBMISSION OF INVOICES AT HO 9TH FLOOR BILLING DEPARTMENT AND ALSO INVOICES SHALL BE UPLOADED ON BILLING PORTAL "https://bs.marathonrealty.com" BOTH ARE MANDATORY</li>
                  <li>KINLDY MENTION YOUR REMARKS IN REMARKS FOR VENDOR COLUMN</li>
                  <li>DELIVERY OF MATERIAL AS PER SITE REQUIREMENT OR AS PER DELIVERY SCHEDULE</li>
                  <li>UNLOADING WILL BE DONE BY US.</li>
                </ol>
              

              </div>
            )}

          </div>

          {/* contact */}

          <div className="mt-4 mx-3"
            style={{

              borderBottom: "1px solid #ccc",
              padding: "20px 0", // Optional padding to add spacing between content and borders
            }}
          >

            <h4 class=" head-material">
              <button onClick={handleContact} style={{ background: 'white',borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
                {Contact ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  >

                    {/* Minus Icon */}
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    {/* Plus Icon  */}
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
              </button>


              Contact Info</h4>
            {Contact && (
              <div className=" tbl-container px-0 mt-3 head-material mx-3  ">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-start">Buyer Name</th>
                      <th className="text-start">Email</th>
                      <th className="text-start">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start" style={{ color: "#777777" }}>ANKITA MANKAME</td>
                      <td className="text-start" style={{ color: "#777777" }}>ankita.mankame@marathonrealty.com</td>
                      <td className="text-start" style={{ color: "#777777" }}>+91 9867743700</td>

                    </tr>
                  </tbody>
                </table>
              </div>
            )}


          </div>

          <div className="mt-4 mx-3">
            <h4 class="mt-4 head-material ">
              <button onClick={handlelineItem} style={{ background: 'white',borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
                {lineItems ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                  // strokeLinecap="round"
                  // strokeLinejoin="round"
                  >

                    {/* Minus Icon */}
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    {/* Plus Icon  */}
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
              </button>


              Line Items</h4>

            {lineItems && (
              <div className="tbl-container px-0 mt-3 head-material mx-3">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-start">S No.</th>
                      <th className="text-start">Line Item Name</th>
                      <th className="text-start">PR No</th>
                      <th className="text-start">Item No</th>
                      <th className="text-start">Specification Needed</th>
                      <th className="text-start">Attachment</th>
                      <th className="text-start">Quantity</th>
                      <th className="text-start">PR Creator</th>
                      <th className="text-start">PR Creator Phone</th>
                      <th className="text-start">PR Creator Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start" style={{ color: "#777777" }}>1</td>
                      <td className="text-start" style={{ color: "#777777" }}>Plumbing Material</td>
                      <td className="text-start" style={{ color: "#777777" }}>-</td>
                      <td className="text-start" style={{ color: "#777777" }}></td>
                      <td className="text-start" style={{ color: "#777777" }}>NA - NA</td>
                      <td className="text-start" style={{ color: "#777777" }}>-</td>
                      <td className="text-start" style={{ color: "#777777" }}>6.0 Nos</td>
                      <td className="text-start" style={{ color: "#777777" }}>-</td>
                      <td className="text-start" style={{ color: "#777777" }}>-</td>
                      <td className="text-start" style={{ color: "#777777" }}>-</td>

                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>



        </div>
      </div>
    </>
  );
};

export default UserOverview;
