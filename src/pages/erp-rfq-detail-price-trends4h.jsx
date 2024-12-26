import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/event.css";
import {
  BulkCounterOfferModal,
  AddEvaluationTimeModal,
  ActivityModal,
  RejectedBidsModal,
  ConvertToAuctionModal,
  WithdrawOrderModal,
  IncreaseEventTimeModal,
  NotificationInfoModal,
  RecreateOrderModal,
  AnalyticsTab,
  ClockIcon,
  OverviewTab,
  ParticipantsTab,
  TabsList,
  PriceTrendsTab,
  ResponseTab,
  ParicipantsRemarksTab,
} from "../components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function ErpRfqDetailPriceTrends4h() {
  const { id } = useParams(); // Get the id from the URL params
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [participantsOpen, setParticipantsOpen] = useState(true);
  const [savingsOpen, setSavingsOpen] = useState(false);
  const [biddingOpen, setBiddingOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [termAndCond, setTermAndCond] = useState(false);
  const [orderConf, setOrderConf] = useState(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [remainingTime, setRemainingTime] = useState(86400); // Initial time in seconds (24 hours, 5 minutes, 10 seconds)
  const [response, setResponse] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [bidding, setBidding] = useState([]);
  const [participantsTabData, setParticipantsTabData] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState([]);

  


  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}H:${mins}M:${secs}s`;
  };

  const participantsAccordion = () => {
    setParticipantsOpen(!participantsOpen);
  };
  const savingsAccordion = () => {
    setSavingsOpen(!savingsOpen);
  };
  const biddingsAccordion = () => {
    setBiddingOpen(!biddingOpen);
  };
  const productAccordion = () => {
    setProductOpen(!productOpen);
  };
  const termsAccordion = () => {
    setTermAndCond(!termAndCond);
  };
  const orderConfAccordion = () => {
    setOrderConf(!orderConf);
  };
  const orderDetailsAccordion = () => {
    setOrderDetails(!orderDetails);
  };

  const handleShowModal = (modalType) => {
    setCurrentModal(modalType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentModal(null);
  };

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
            handleClose={handleCloseModal} bidCounterData={undefined}          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}/event_responses?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResponse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, [id]);

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOverviewData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, [id]);

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}/bidding_summary?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1h`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBidding(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, [id]);

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}/event_overview?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1h`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setParticipantsTabData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, [id]);

  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}/event_vendors/event_vendor_remarks?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRemarks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRemarks();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}/event_vendors?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);


  


  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="website-content overflow-auto">
          <div className="module-data-section p-0 ">
            <div className="event-order-page">
              <div className=" event-tabs">
                <div>
                  <h4 className="event-head px-2 ">Events</h4>
                </div>
                <div className="d-flex flex-row-reverse ">
                  <div
                    className="eventList-child1 event-participant-time py-3"
                    style={{ width: "250px" }}
                  >
                    <div className="eventList-time d-flex align-items-center gap-2">
                      <ClockIcon />
                      <span>{formatTime(remainingTime)}</span>
                      <span>Upcoming </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center align-bottom">
                    <button className="buyEvent-mainBtn download-reportBtn">
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between eventList-child2">
                  <div className="m-2">
                    <p className="event-participant-cardHead mb-1">
                      ''Event No: RFQ1233132 | Companies: MNRL, MRPL | Projects:
                      Nexttown, Nexzone | Material: Doors, Door Frames.
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-column justify-content-center text-center">
                    <button className="event-participant-cardBtn d-flex align-items-center justify-content-between" style={{width:"80px",backgroundColor: "#de700885", padding:"5px 15px", color: "#000", border:'1px solid #de7008'}}>
                      <samp>
                        <svg
                          width={12}
                          height={12}
                          viewBox="0 0 12 12"
                          fill="#fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx={6} cy={6} r={6} fill="#de7008" />
                        </svg>
                      </samp>{" "}
                      Live
                    </button>
                  </div>
                </div>
                <TabsList
                  handleShowModal={handleShowModal}
                  renderModal={renderModal}
                />
                <div className="tab-content mt-3 main-scroll-div">
                  <ResponseTab data={response} />
                  <OverviewTab
                    overviewData={overviewData}
                    participantsOpen={participantsOpen}
                    participantsData={participantsTabData}
                    savingsOpen={savingsOpen}
                    biddingOpen={biddingOpen}
                    biddingData={bidding}
                    productOpen={productOpen}
                    handleParticipants={participantsAccordion}
                    handleSavings={savingsAccordion}
                    handleBiddings={biddingsAccordion}
                    handleProducts={productAccordion}
                    handleTerms={termsAccordion}
                    handleOrderConf={orderConfAccordion}
                    handleOrderDetails={orderDetailsAccordion}
                    termsOpen={termAndCond}
                    orderConfOpen={orderConf}
                    orderDetails={orderDetails}
                  />
                  <ParticipantsTab data={participants} />
                  <AnalyticsTab id={id} />
                  <ParicipantsRemarksTab data={remarks} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
