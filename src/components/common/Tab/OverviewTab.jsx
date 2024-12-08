import React from "react";
import {
  CheckedCircleIcon,
  EnvelopeIcon,
  ParticipantsIcon,
  ShowIcon,
} from "../..";
import { biddingData, participantsData } from "../../../constant/data";

export default function OverviewTab({
  handleParticipants,
  handleSavings,
  handleBiddings,
  handleProducts,
  participantsOpen,
  savingsOpen,
  biddingOpen,
  productOpen,
  termsOpen,
  orderConfOpen,
  orderDetails,
  handleTerms,
  handleOrderConf,
  handleOrderDetails,
}) {
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
                    {participantsData.map((item) => (
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
                <div className="table-responsive" style={{boxShadow:'none'}}>
                  <h5>Line Item Wise</h5>
                  <div className="tbl-container">
                    <table>
                      <thead>
                        <tr>
                          <th scope="row" />
                          <th>Best Market Price</th>
                          <th>Rank 2 Market Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {biddingData.map(({ description, vendors }, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <th style={{ textAlign: "left" }}>
                                {description}
                              </th>
                            </tr>
                            {vendors.map(
                              ({ vendorName, priceQuoted }, vendorIndex) => (
                                <tr key={vendorIndex}>
                                  <th scope="row">
                                    {vendorIndex === 0
                                      ? "Vendor Name"
                                      : "Price Quoted"}
                                  </th>
                                  <td>{vendorName}</td>
                                  <td>{priceQuoted}</td>
                                </tr>
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
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
                <div className="tbl-container">
                  <table className="">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Product*</th>
                        <th scope="col">Best Total Amount</th>
                        <th scope="col">Product Variant*</th>
                        <th scope="col">Quantity Requested*</th>
                        <th scope="col">Delivery location*</th>
                        <th scope="col">Creator Attachment</th>
                        <th scope="col">AIDDITIONAL INFO</th>
                        <th scope="col">Quantity Available</th>
                        <th scope="col">Price*</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Realised Discount*</th>
                        <th scope="col">GST*</th>
                        <th scope="col">Realised GST</th>
                        <th scope="col">Landed Amount*</th>
                        <th scope="col">Participant Attachment</th>
                        <th scope="col">DOOR FRAME MATERIAL</th>
                        <th>DENSITY OF WOOD</th>
                        <th>MOISTURE OF WOOD</th>
                        <th>Total Amount*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          Wooden Frd Door{" "}
                          <span
                            style={{
                              color: "var(--red)",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Details
                          </span>
                        </th>
                        <td />
                        <td>WOODEN DOOR SHUTTER 2 HRS...</td>
                        <td>257 Nos</td>
                        <td>Sanvo Resorts Pvt. Ltd. </td>
                        <td />
                        <td>Main door Outer size of ...</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <th scope="row">
                          Wooden Frd Door{" "}
                          <span
                            style={{
                              color: "var(--red)",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Details
                          </span>
                        </th>
                        <td />
                        <td>WOODEN DOOR SHUTTER 2 HRS...</td>
                        <td>257 Nos</td>
                        <td>Sanvo Resorts Pvt. Ltd. </td>
                        <td />
                        <td>Main door Outer size of ...</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <th scope="row">
                          Wooden Frd Door{" "}
                          <span
                            style={{
                              color: "var(--red)",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Details
                          </span>
                        </th>
                        <td />
                        <td>WOODEN DOOR SHUTTER 2 HRS...</td>
                        <td>257 Nos</td>
                        <td>Sanvo Resorts Pvt. Ltd. </td>
                        <td />
                        <td>Main door Outer size of ...</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <th scope="row">
                          Wooden Frd Door{" "}
                          <span
                            style={{
                              color: "var(--red)",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Details
                          </span>
                        </th>
                        <td />
                        <td>WOODEN DOOR SHUTTER 2 HRS...</td>
                        <td>257 Nos</td>
                        <td>Sanvo Resorts Pvt. Ltd. </td>
                        <td />
                        <td>Main door Outer size of ...</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <th scope="row">
                          Wooden Frd Door{" "}
                          <span
                            style={{
                              color: "var(--red)",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            Details
                          </span>
                        </th>
                        <td />
                        <td>WOODEN DOOR SHUTTER 2 HRS...</td>
                        <td>257 Nos</td>
                        <td>Sanvo Resorts Pvt. Ltd. </td>
                        <td />
                        <td>Main door Outer size of ...</td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                <p>
                  1. Payment terms: Net 30 days.
                  <br />
                  <br />
                  2. Delivery within 15 business days.
                  <br />
                  <br />
                  3. Warranty: 1 year from the date of purchase.
                  <br />
                  <br />
                  4. Returns are subject to company policy.
                </p>
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
                  <div
                    className="totals-activity row"
                    style={{ gap: "0" }}
                  >
                    {participantsData.map((item) => (
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
                  [IN/NZR01/NRI01/641] Plumbing Material - NEXZONE-RESIDENTIAL -
                  Panvel
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
