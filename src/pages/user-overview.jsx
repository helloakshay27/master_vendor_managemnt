// import React from "react";
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Table, ShortTable, SelectBox, ResponseTab, OverviewTab, TabsList } from "../components";
import {
  freightData,
  mumbaiLocations,
  product,
  unitMeasure,
} from "../constant/data";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/mor.css";
import { Link } from "react-router-dom";

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

  const headerStyle = {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  };

  const linkStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '0 15px',
    backgroundColor: isActive ? '#4CAF50' : '#3f51b5',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  });


  const handleShowModal = (modalType) => {
    setCurrentModal(modalType);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const renderModal = () => {
    switch (currentModal) {
      // @ts-ignore
      case "Recreate":
        return (
          <>
            <RecreateOrderModal
              show={showModal}
              handleClose={handleCloseModal}
            />
          </>
        );
      // @ts-ignore
      case "Shared":
        return (
          <NotificationInfoModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        );
      // @ts-ignore
      case "Extend":
        return (
          <IncreaseEventTimeModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        );
      // @ts-ignore
      case "Withdraw":
        return (
          <WithdrawOrderModal show={showModal} handleClose={handleCloseModal} />
        );
      // @ts-ignore
      case "Convert":
        return (
          <ConvertToAuctionModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        );
      // @ts-ignore
      case "Rejected":
        return (
          <RejectedBidsModal show={showModal} handleClose={handleCloseModal} />
        );
      // @ts-ignore
      case "Order":
        return (
          <ActivityModal show={showModal} handleClose={handleCloseModal} />
        );
      // @ts-ignore
      case "Evaluation":
        return (
          <AddEvaluationTimeModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        );
      // @ts-ignore
      case "Counter":
        return (
          <BulkCounterOfferModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };


  return (
    <>




      {/* <Header /> */}

      <style>
        {`
          #project-header {
            display: flex;
            flex-direction: column;
            padding: 16px;
            border-bottom: 1px solid #ccc;
            background-color: #f9f9f9;
          }

          #project-header2 {
            display: flex;
            flex-direction: column;
            padding-top: 5px;
            // border-bottom: 1px solid #ccc;
            background-color: #f9f9f9;
          }


          .styles_projectTitle__3f7Yw {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }

          .styles_projectTitleContent__1Xu_Z {
            display: flex;
            align-items: center;
            gap: 8px; /* Space between button and text */
          }

          .styles_headerCtaLink__2kCN6 {
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
          }

          .styles_headerCtaLink__2kCN6 svg {
            width: 24px;
            height: 24px;
            color: #007bff; /* Blue color for back button */
          }

          .styles_projectTitleContent__1Xu_Z span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .styles_projectTitleExtra__3ePz7 {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .styles_projectTitleExtra__3ePz7 span {
            font-size: 14px;
            color: #555;
          }

          .styles_strategyTag__2icur {
            background-color: #f0f0f0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: #333;
          }

          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        `}
      </style>


      {/* <TabsList
          handleShowModal={handleShowModal}
          renderModal={renderModal}
        
        /> */}

      {/* Tabs Section */}

      <div className="styles_projectTabsHeader__148No" id="project-header">
        {/* Project Title Section */}
        <div className="styles_projectTitle__3f7Yw">
          <div className="styles_projectTitleContent__1Xu_Z">
            <button
              type="button"
              className="ant-btn styles_headerCtaLink__2kCN6 ant-btn-link"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                className="pro-icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.707 4.293a1 1 0 0 1 0 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <span>
              [1000291945] PLUMBING MATERIAL products - SWAYAM REALTORS AND
              TRADERS LLP
            </span>
          </div>
          <div className="styles_projectTitleExtra__3ePz7">
            <span>PANCHSHIL REALTY PRIVATE LTD</span>
          </div>
        </div>
      </div>

      {/* <div className="styles_projectTabsHeader__148No" id="project-header2">
 <ul
        className="nav nav-tabs border-0  styles_projectTitleContent__1Xu_Z"
        id="eventTabs"
        role="tablist"
      >
        {[
          { id: "responses", label: "Event Overview" },
          { id: "overview", label: "[1000291945] PLUMBIN... Submitted" },
          // { id: "participants", label: "Participants" },
          // { id: "analytics", label: "Analytics" },
          // // { id: "priceTrends", label: "Price Trends" },
          // { id: "participantRemarks", label: "Participant Remarks" },
        ].map((tab) => (
          <li className="nav-item" role="presentation" key={tab.id}>
            <button
              className={`nav-link setting-link ${
                tab.id === "responses" ? "active" : ""
              }`}
              id={`${tab.id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${tab.id}`}
              type="button"
              role="tab"
              aria-controls={tab.id}
              aria-selected={tab.id === "responses"}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
 </div> */}

      <div className="styles_projectTabsHeader__148No" id="project-header2">
        <ul
          className="nav nav-tabs border-0 "
          id="eventTabs"
          role="tablist"
        >
          {[
            { id: "responses", label: "Event Overview", path: "/user-overview" },

            { id: "overview", label: "[1000291945] PLUMBIN...", path: "/user-list", badge: "Submitted"  },

          ].map((tab) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <Link
                className={`nav-link setting-link ${tab.id === "responses" ? "active" : ""
                  }`}
                to={tab.path}  // Use `to` from react-router-dom for navigation
                id={`${tab.id}-tab`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={tab.id === "responses"}
              >
                {tab.label}

                {tab.badge && (
                  <span className="badge bg-success ms-2">{tab.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content container-fluid">


        {/* <Sidebar /> */}




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
                      <td className="text-start" style={{ color: "#777777" }}>[1000291947] Plumbing Material - SWAYAM REALTORS AND TRADERS LLP</td>
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

              <button onClick={handleTerms} style={{ background: 'white', borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
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
              <button onClick={handleContact} style={{ background: 'white', borderColor: '#e2e8f0', borderRadius: '5px' }} className="me-2">
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
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="head-material">
                <button
                  onClick={handlelineItem}
                  style={{ background: "white", borderColor: "#e2e8f0", borderRadius: "5px" }}
                  className="me-2"
                >
                  {lineItems ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="currentColor"
                      strokeWidth="1"
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
                      {/* Plus Icon */}
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  )}
                </button>
                Line Items
              </h4>
              <div className="card-tools">
                <button
                  className="purple-btn2"
                  data-bs-toggle="modal"
                  data-bs-target="#venderModal"
                  style={{ backgroundColor: "#F0F0F0", color: 'black' }}
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Attachment</span>
                </button>
              </div>
            </div>


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
