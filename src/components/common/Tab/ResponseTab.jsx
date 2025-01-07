import React, { useState, useEffect } from "react";
import FullClipIcon from "../Icon/FullClipIcon";
import FullScreenIcon from "../Icon/FullScreenIcon";
import ShowIcon from "../Icon/ShowIcon";
import ParticipantsIcon from "../Icon/ParticipantsIcon";
import Accordion from "../../base/Accordion/Accordion";
import ResponseVendor from "../ResponseVendor";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BulkCounterOfferModal from "../Modal/BulkCounterOfferModal";
import axios from "axios";
import { event } from "jquery";
import SelectBox from "../../base/Select/SelectBox";

export default function ResponseTab({ data }) {
  const [isVendor, setIsVendor] = useState(false);
  const [counterModal, setCounterModal] = useState(false);
  const [BidCounterData, setBidCounterData] = useState(null);
  const [responseTableData, setResponseTableData] = useState([]);
  const [bidId, setBidId] = useState(null);
  const [eventId, setEventId] = useState(data?.vendors?.[0]?.bids?.[0]?.event_id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handle = useFullScreenHandle();
  

  const handleCounterModalShow = () => {
    setCounterModal(true);
  };

  const handleCounterModalClose = () => {
    setCounterModal(false);
  };

  const handleChange = (event) => {
    if (event.target.value === "vendor") {
      setIsVendor(true);
    } else {
      setIsVendor(false);
    }
  };

  // const handleSelectChange = async (vendorId, e) => {
  //   const revisionNumber = e;
  //   console.log("revisionNumber :---------", e);
    
  //   if (revisionNumber === "currentBid") return;

  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(
  //       `https://vendors.lockated.com/rfq/events/${eventId}/bids/bids_by_revision?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&revision_number=${revisionNumber}`
  //     );

  //     // const updatedVendors = eventVendors.map((vendor) => {
  //     //   if (vendor.id === vendorId) {
  //     //     return {
  //     //       ...vendor,
  //     //       bids: response.data,
  //     //     };
  //     //   }
  //     //   return vendor;
  //     // });
  //     // console.log("updatedVendors :-----",updatedVendors);
      
  //     setResponseTableData(response.data);
  //     console.log("responseTableData :-----",responseTableData);
      
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://vendors.lockated.com/rfq/events/49/bids/${bidId}?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414`
        );

        setBidCounterData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId, bidId]);
  console.log("data :----",data);
  
  const eventVendors = Array.isArray(data?.vendors) ? data.vendors : [];

  const formatDate = (dateString) => {
    if (!dateString) return "_";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "_";
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div
      className="tab-pane fade show active"
      id="responses"
      role="tabpanel"
      aria-labelledby="responses-tab"
      tabIndex={0}
    >
      <div className="viewBy-main">
        <div className="viewBy-main-child1">
          <div className="d-flex align-items-center mb-3">
            {/* <select
              style={{ marginRight: "20px" }}
              name="language"
              className=" viewBy-headerForm"
              onChange={handleChange}
              required
            >
              <option value="" selected>
                View by Product
              </option>
              <option value="vendor">Vendor</option>
              <option value="product">Product</option>
            </select> */}
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "20px" }}
            >
              {/* <div className="">
                <p className="viewBy-headerFormP">
                  <span className="me-1">
                    <ShowIcon />
                  </span>
                  Show / Hide
                </p>
              </div> */}
              {/* <div className="me-2">
                <p className="viewBy-headerFormP" onClick={handle.enter}>
                  <span className="me-1">
                    <FullScreenIcon />
                  </span>
                  Fullscreen
                </p>
              </div>
              <div>
                <FullClipIcon />
              </div> */}
            </div>
          </div>
        </div>
        <div className="viewBy-main-child2 mb-3">
          <div className="d-flex align-items-center">
            <p className="viewBy-main-child2P mb-0">
              <ParticipantsIcon />
              <span className="me-2">Participation:</span>
            </p>
            <div className="d-flex align-items-center gap-3">
              <div
                className="viewBy-main-child2-item d-flex align-items-center justify-content-center bg-light rounded-3 px-3 py-2"
                aria-label="Participants"
              >
                <i className="bi bi-check2 me-2"></i>4
              </div>
              <div
                className="viewBy-main-child2-item d-flex align-items-center justify-content-center bg-light rounded-3 px-3 py-2"
                aria-label="Emails"
              >
                <i className="bi bi-envelope me-2"></i>4
              </div>
              <div
                className="viewBy-main-child2-item d-flex align-items-center justify-content-center bg-light rounded-3 px-3 py-2"
                aria-label="Views"
              >
                <i className="bi bi-eye me-2"></i>4
              </div>
              <div
                className="viewBy-main-child2-item d-flex align-items-center justify-content-center bg-light rounded-3 px-3 py-2"
                aria-label="Completed"
              >
                <i className="bi bi-check-circle me-2"></i> 4
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVendor ? (
        <ResponseVendor />
      ) : (
        <FullScreen handle={handle}>
          <div className="">
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            {eventVendors.length > 0 ? (
              <>
                <div style={{ overflowX: "auto" }}>
                  <table
                    className="tbl-container w-100 mb-0"
                    style={{ boxShadow: "none" }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "200px" }}></td>
                        {eventVendors.map((vendor, index) => {
                          return (
                            <td key={vendor.id} style={{ width: "200px" }}>
                              <div
                                className="d-flex flex-column align-items-center justify-content-between"
                                style={{ height: "150px" }}
                              >
                                <div className="">
                                  {vendor.organization_name}
                                  <p>
                                    {vendor.bids.map((item) =>
                                      formatDate(item.created_at)
                                    )}
                                  </p>
                                </div>
                                {/* <SelectBox
                                  label={""}
                                  options={[
                                    { label: "Current Bid", value: "currentBid" },
                                    { label: "Initial Bid", value: "0" },
                                    { label: "1st Revision", value: "1" },
                                  ]}
                                  defaultValue={""}
                                  onChange={(e) => handleSelectChange(vendor.id, e)}
                                /> */}
                                <button
                                  className="purple-btn2 d-block"
                                  onClick={() => {
                                    if (vendor.bids && vendor.bids.length > 0 && vendor.bids[0].bid_materials && vendor.bids[0].bid_materials.length > 0) {
                                      handleCounterModalShow();
                                      setEventId(vendor.bids[0].event_id);
                                      setBidId(vendor.bids[0].bid_materials[0].bid_id);
                                    }
                                  }}
                                >
                                  Counter
                                </button>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td
                          className="viewBy-tBody1-p"
                          style={{ width: "200px" }}
                        >
                          Gross Total
                        </td>
                        {eventVendors.map((vendor) => {
                          return (
                            <td>
                              {vendor.bids.map((item) => item.gross_total) ||
                                "_"}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                {eventVendors.map((vendor, ind) => {
                  if (vendor.bids.length > 1) {
                    vendor.bids = [vendor.bids[vendor.bids.length - 1]];                    
                  }
                  return (
                    <Accordion
                      key={ind}
                      title={vendor.bids.map((bid) => bid.bid_materials.map((material, idx) => {
                            return (
                              <div key={idx}>
                                {material.material_name}
                              </div>
                            );                         
                        }
                      ))}
                      isDefault={true}
                      tableColumn={[
                        {
                          label: "Best Total Amount",
                          key: "bestTotalAmount",
                        },
                        {
                          label: "Quantity Available",
                          key: "quantityAvailable",
                        },
                        { label: "Price", key: "price" },
                        { label: "Discount", key: "discount" },
                        {
                          label: "Realised Discount",
                          key: "realisedDiscount",
                        },
                        { label: "GST", key: "gst" },
                        { label: "Realised GST", key: "realisedGST" },
                        { label: "Landed Amount", key: "landedAmount" },
                        {
                          label: "Participant Attachment",
                          key: "participantAttachment",
                        },
                        { label: "Total Amount", key: "totalAmount" },
                      ]}
                      tableData={vendor.bids?.flatMap((bid) =>
                        bid.bid_materials.map((material) => ({
                          bestTotalAmount: material.total_amount || "_",
                          quantityAvailable: material.quantity_available || "_",
                          price: material.price || "_",
                          discount: material.discount || "_",
                          realisedDiscount: material.discount || "_",
                          gst: material.gst || "_",
                          realisedGST: material.realised_gst || "_",
                          landedAmount: material.total_amount || "_",
                          participantAttachment: "_",
                          totalAmount: material.total_amount || "_",
                        }))
                      )}
                    />
                  );
                })}
                <Accordion
                  title={"Other Charges"}
                  isDefault={true}
                  tableColumn={[
                    {
                      label: "Freight Charge Amount",
                      key: "freightChrg",
                    },
                    { label: "GST on Freight", key: "freightGst" },
                    {
                      label: "Realised Freight Amount",
                      key: "freightRealised",
                    },
                    { label: "Warranty Clause", key: "warranty" },
                    { label: "Payment Terms", key: "payment" },
                    {
                      label: "Loading / Unloading Clause",
                      key: "loading",
                    },
                    { label: "Gross Total", key: "grossTotal" },
                  ]}
                  tableData={eventVendors.flatMap((vendor) =>
                    vendor.bids.flatMap((bid) => [
                      {
                        freightChrg: bid.freight_charge_amount || "_",
                        freightGst: bid.gst_on_freight || "_",
                        freightRealised: bid.realised_freight_charge_amount || "_",
                        warranty: bid.warranty_clause || "_",
                        payment: bid.payment_terms || "_",
                        loading: bid.loading_unloading_clause || "_",
                        grossTotal: bid.gross_total || "_",
                      },
                    ])
                  )}
                />
              </>
            ) : (
              <h4 className="h-100 w-100 d-flex justify-content-center align-items-center pt-5">
                No Bid Details found
              </h4>
            )}
          </div>
        </FullScreen>
      )}

      <BulkCounterOfferModal
        show={counterModal}
        handleClose={handleCounterModalClose}
        bidCounterData={BidCounterData}
      />
    </div>
  );
}
