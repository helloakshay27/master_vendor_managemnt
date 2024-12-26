import React from "react";
import {
  CheckedCircleIcon,
  EnvelopeIcon,
  ParticipantsIcon,
  ShowIcon,
  Table,
} from "../..";
import { participantsData } from "../../../constant/data";
import { Tab } from "react-bootstrap";

export default function OverviewTab({
  handleParticipants,
  handleSavings,
  handleBiddings,
  handleProducts,
  participantsOpen,
  participantsData,
  savingsOpen,
  biddingOpen,
  biddingData,
  overviewData,
  productOpen,
  termsOpen,
  orderConfOpen,
  orderDetails,
  handleTerms,
  handleOrderConf,
  handleOrderDetails,
}) {
  const participants = [
    {
      label: "Total Participants",
      id: "total-participants",
      value: participantsData.total_participant,
    },
    {
      label: "Active participants",
      id: "active-participants",
      value: participantsData.active_participant,
    },
    {
      label: "Total Bids",
      id: "total-bids",
      value: participantsData.total_bids,
    },
    {
      label: "Revised bids",
      id: "revised-bids",
      value:
        participantsData.revised_bids == null
          ? 0
          : participantsData.revised_bids, // Assuming 1 if revised_bids exists
    },
    {
      label: "Counter offers",
      id: "counter-offers",
      value:
        participantsData.counter_office  // Assuming 1 if counter_office exists
    },
    {
      label: "Accepted Counter Offers",
      id: "accepted-counter-offers",
      value:
        participantsData.active_counter_offers == null
          ? 0
          : participantsData.revised_bids, // Assuming 1 if active_counter_offers exists
    },
    {
      label: "Dynamic time extended",
      id: "dynamic-time-extended",
      value:
        participantsData.dynamic_time_extension == null
          ? "0 mins"
          : participantsData.revised_bids,
    },
  ];

  const calculateOrderDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const duration = new Date(endTime - startTime);
    const hours = duration.getUTCHours();
    const minutes = duration.getUTCMinutes();
    const seconds = duration.getUTCSeconds();
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  
  const OrderEndTime = new Date(overviewData?.event_schedule?.end_time);
  
  const orderConfig = [
    {
      label: "Order Type",
      value: overviewData?.event_type_detail?.event_type || "_",
    },
    {
      label: "Order Mode",
      value: overviewData?.event_type_detail?.award_scheme || "_",
    },
    {
      label: "Closing Mode",
      value: "_",
    },
    {
      label: "Started at",
      value: new Date(overviewData?.event_schedule?.start_time).toLocaleString() || "_",
    },
    {
      label: "Order Duration",
      value: calculateOrderDuration(overviewData?.event_schedule?.start_time, OrderEndTime) || "_",
    },
    {
      label: "Evaluation Time",
      value: overviewData?.event_schedule?.evaluation_time || "_",
    }
  ];

  const overviewDatas = overviewData?.event_materials?.map(item => ({
    product: item.inventory_name || "_",
    best_total_amount: item.amount || "_",
    product_variant: "_",
    quantity_requested: item.quantity || "_",
    delivery_location: item.location || "_",
    creator_attachment: "_",
    additional_info: "_",
    quantity_available: item.quantity_available || "_",
    price: item.price || "_",
    discount: item.discount || "_",
    realised_discount: "_",
    gst: "_",
    realised_gst: "_"
  }));
  
  console.log("overviewData", overviewData);
  

  return (
    <div
      className="tab-pane fade"
      id="overview"
      role="tabpanel"
      aria-labelledby="overview-tab"
      tabIndex={0}
    >
      <section className="Erp-overview overflow-auto">
        <div className="row my-2 mx-2">
          <div className="viewBy-main">
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
                    <EnvelopeIcon
                      // @ts-ignore
                      className="me-2"
                    />{" "}
                    4
                  </div>
                  <div
                    className="viewBy-main-child2-item d-flex align-items-center justify-content-center bg-light rounded-3 px-3 py-2"
                    aria-label="Views"
                  >
                    <ShowIcon
                      // @ts-ignore
                      className="me-2"
                    />{" "}
                    4
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
        </div>
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#participation-summary"
            role="button"
            aria-expanded={participantsOpen}
            aria-controls="participation-summary"
            onClick={handleParticipants}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="participation-summary-icon" className="icon-1">
              {participantsOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Participation Summary
          </a>
          {participantsOpen && (
            <div id="participation-summary" className="mx-5">
              <div className="card card-body p-2">
                <div className="participate-sec">
                  <div
                    className="totals-activity row mx-3"
                    style={{ gap: "0" }}
                  >
                    {participants.map((item) => (
                      <div
                        className="total-activity col-md-3 my-3"
                        key={item.id}
                      >
                        <p>{item.label}</p>
                        <p id={item.id}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#savings-summary"
            role="button"
            aria-expanded={savingsOpen}
            aria-controls="savings-summary"
            onClick={handleSavings}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="savings-summary-icon" className="icon-1">
              {savingsOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Savings Summary
          </a>
          {savingsOpen && (
            <div id="savings-summary" className="mx-5">
              <div className="card card-body p-4  pt-0 ">
                {/* View By Section */}
                {/* <div className="viewBy-main">
                  <div className="viewBy-main-child2">
                    <div className="view">View</div>
                  </div>
                </div> */}

                {/* Savings Reference Section */}
                {/* <div className="saving-ref">
                  <div className="default-sec d-flex align-items-center justify-content-between">
                    <div className="default d-flex gap-2 align-items-center">
                      <svg
                        width={13}
                        height={14}
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.35725 0.572266H0.285819C0.167962 0.572266 0.0715332 0.668694 0.0715332 0.786551V4.85798C0.0715332 4.97584 0.167962 5.07227 0.285819 5.07227H4.35725C4.4751 5.07227 4.57153 4.97584 4.57153 4.85798V0.786551C4.57153 0.668694 4.4751 0.572266 4.35725 0.572266ZM3.66082 4.16155H0.982248V1.48298H3.66082V4.16155ZM9.71439 0.572266H5.64296C5.52511 0.572266 5.42868 0.668694 5.42868 0.786551V4.85798C5.42868 4.97584 5.52511 5.07227 5.64296 5.07227H9.71439C9.83225 5.07227 9.92868 4.97584 9.92868 4.85798V0.786551C9.92868 0.668694 9.83225 0.572266 9.71439 0.572266ZM9.01796 4.16155H6.33939V1.48298H9.01796V4.16155ZM4.35725 5.92941H0.285819C0.167962 5.92941 0.0715332 6.02584 0.0715332 6.14369V10.2151C0.0715332 10.333 0.167962 10.4294 0.285819 10.4294H4.35725C4.4751 10.4294 4.57153 10.333 4.57153 10.2151V6.14369C4.57153 6.02584 4.4751 5.92941 4.35725 5.92941ZM3.66082 9.51869H0.982248V6.84012H3.66082V9.51869ZM9.71439 5.92941H5.64296C5.52511 5.92941 5.42868 6.02584 5.42868 6.14369V10.2151C5.42868 10.333 5.52511 10.4294 5.64296 10.4294H9.71439C9.83225 10.4294 9.92868 10.333 9.92868 10.2151V6.14369C9.92868 6.02584 9.83225 5.92941 9.71439 5.92941ZM9.01796 9.51869H6.33939V6.84012H9.01796V9.51869Z"
                          fill="#262626"
                        />
                      </svg>
                      <span>Default</span>
                    </div>
                    <span>-</span>
                  </div>

                  <div className="saving-sec d-flex justify-content-between align-items-center mt-2">
                    <div className="saving-text">SAVINGS REFERENCE</div>
                    <div className="default d-flex align-items-center gap-3">
                      <span>-</span>
                      <span className="saving-amount">₹58,05,671.79</span>
                    </div>
                  </div>
                </div> */}

                {/* Table Section */}
                <div className="tbl-container mt-3">
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Variant</th>
                        <th>Default Reference</th>
                        <th>Default Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array(6)
                        // @ts-ignore
                        .fill()
                        .map((_, index) => (
                          <tr key={index}>
                            <td>Wooden Frd Door</td>
                            <td>
                              WOODEN DOOR SHUTTER 2 HRS FIRE RATED (MAIN DOOR)
                            </td>
                            <td>₹ 12850 /Nos</td>
                            <td>₹ 0/Nos</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#bidding-summary"
            role="button"
            aria-expanded={biddingOpen}
            aria-controls="bidding-summary"
            onClick={handleBiddings}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="bidding-summary-icon" className="icon-1">
              {biddingOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Bidding Summary
          </a>
          {biddingOpen && (
            <div id="bidding-summary" className="mx-5">
              <div className="card card-body p-4 rounded-3">
                <div style={{ boxShadow: "none" }}>
                  <h5>Line Item Wise</h5>
                  {/* <div className="tbl-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Material</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {biddingData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.vendor_name}</td>
                            <td>{item.material_name}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
                  <Table
                    columns={[
                      { label: "Vendor", key: "vendor_name" },
                      { label: "Material", key: "material_name" },
                      { label: "Price", key: "price" },
                    ]}
                    data={biddingData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            role="button"
            href="#product-sheet"
            aria-controls="product-sheet"
            aria-expanded={productOpen}
            onClick={handleProducts}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="product-sheet-icon" className="icon-1">
              {productOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Product Sheet
          </a>
          {productOpen && (
            <div id="product-sheet" className="mx-5">
              <div className="card card-body p-4 rounded-3">
                <Table
                    columns={[
                      { label: "Product", key: "product" },
                      { label: "Best Total Amount", key: "best_total_amount" },
                      { label: "Product Variant", key: "product_variant" },
                      { label: "Quantity Requested", key: "quatity_requested" },
                      { label: "Delivery Location", key: "delivery_location" },
                      { label: "Creator Attachment", key: "creator_attachment" },
                      { label: "Additional Info", key: "additional_info" },
                      { label: "Quantity Available", key: "quantity_available" },
                      { label: "Price", key: "price" },
                      { label: "Discount", key: "discount" },
                      { label: "Realised Discount", key: "realised_discount" },
                      { label: "GST", key: "gst" },
                      { label: "Realised GST", key: "realised_gst" },
                    ]}
                    data={overviewDatas}
                  />
              </div>
            </div>
          )}
        </div>
        {/* New Section: Terms and Conditions */}
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#terms-conditions"
            role="button"
            aria-expanded={termsOpen}
            aria-controls="terms-conditions"
            onClick={handleTerms}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="terms-conditions-icon" className="icon-1">
              {termsOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Terms and Conditions
          </a>
          {termsOpen && (
            <div id="terms-conditions" className="mx-5">
              <div className="card card-body p-4">
                {overviewData.terms_and_conditions.map((item, index) => (
                  <p key={index}>{`${item.condition}`}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Section: Order Configuration */}
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#order-configuration"
            role="button"
            aria-expanded={orderConfOpen}
            aria-controls="order-configuration"
            onClick={handleOrderConf}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="order-configuration-icon" className="icon-1">
              {orderConfOpen ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Order Configuration
          </a>
          {orderConfOpen && (
            <div id="order-configuration" className="mx-5">
              <div className="card card-body p-4">
                <div className="participate-sec">
                  <div className="totals-activity row" style={{ gap: "0" }}>
                    {orderConfig.map((item) => (
                      <div
                        className="total-activity col-md-3 my-3"
                        key={item.id}
                      >
                        <p>{item.label}</p>
                        <p id={item.id}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Section: Order Details */}
        <div className="col-12 my-3">
          <a
            className="btn"
            data-bs-toggle="collapse"
            href="#order-details"
            role="button"
            aria-expanded={orderDetails}
            aria-controls="order-details"
            onClick={handleOrderDetails}
            style={{ fontSize: "16px", fontWeight: "normal" }}
          >
            <span id="order-details-icon" className="icon-1">
              {orderDetails ? (
                <i className="bi bi-dash-lg"></i>
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </span>
            Order Details
          </a>
          {orderDetails && (
            <div id="order-details" className="mx-5">
              <div className="card card-body p-4">
                <p>Event Title</p>
                <p>
                  {`${overviewData.event_no}  ${overviewData.event_title}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
