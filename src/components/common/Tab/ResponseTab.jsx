import React, { useState } from "react";
import FullClipIcon from "../Icon/FullClipIcon";
import FullScreenIcon from "../Icon/FullScreenIcon";
import ShowIcon from "../Icon/ShowIcon";
import ParticipantsIcon from "../Icon/ParticipantsIcon";
import Accordion from "../../base/Accordion/Accordion";
import ResponseVendor from "../ResponseVendor";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function ResponseTab({ data }) {
  const [isVendor, setIsVendor] = useState(false);
  const handle = useFullScreenHandle();

  const handleChange = (event) => {
    if (event.target.value === "vendor") {
      setIsVendor(true);
    } else {
      setIsVendor(false);
    }
  };

  console.log("data prop received in ResponseTab:", data);

  const eventVendors = Array.isArray(data?.vendors) ? data.vendors : [];
  console.log(
    "eventVendors:",
    eventVendors.map((item) => item.full_name)
  );

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
            <select
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
            </select>
            <select
              style={{ marginRight: "20px" }}
              name="language"
              className="viewBy-headerForm"
              required
            >
              <option value="">Actions</option>
              <option value="indian">xxxxxxxx</option>
              <option value="nepali">xxxxxxxx</option>
              <option value="others">Others</option>
            </select>
            <div
              className="d-flex align-items-center"
              style={{ marginRight: "20px" }}
            >
              <div className="">
                <p className="viewBy-headerFormP">
                  <span className="me-1">
                    <ShowIcon />
                  </span>
                  Show / Hide
                </p>
              </div>
              <div className="me-2">
                <p className="viewBy-headerFormP" onClick={handle.enter}>
                  <span className="me-1">
                    <FullScreenIcon />
                  </span>
                  Fullscreen
                </p>
              </div>
              <div>
                <FullClipIcon />
              </div>
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
        <FullScreen handle={handle} >
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
            <div className="px-4">
              <table
                className="tbl-container w-100"
                style={{ boxShadow: "none", tableLayout: "fixed" }}
              >
                <tbody>
                  <tr>
                    <td></td>
                    {eventVendors.map((vendor) => {
                      console.log("vendor:", vendor);

                      return <td>{vendor.organization_name}</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="viewBy-tBody1-p">Gross Total</td>
                    {eventVendors.map((vendor) => {
                      console.log("vendor:", vendor);

                      return <td>{vendor.gross_total || "_"}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            <Accordion
              tableColumn={[
                { label: "Best Total Amount", key: "bestTotalAmount" },
                { label: "Quantity Available", key: "quantityAvailable" },
                { label: "Price", key: "price" },
                { label: "Discount", key: "discount" },
                { label: "Realised Discount", key: "realisedDiscount" },
                { label: "GST", key: "gst" },
                { label: "Realised GST", key: "realisedGST" },
                { label: "Landed Amount", key: "landedAmount" },
                {
                  label: "Participant Attachment",
                  key: "participantAttachment",
                },
                { label: "Total Amount", key: "totalAmount" },
              ]}
              tableData={eventVendors?.flatMap((vendor) =>
                Array.isArray(vendor.bids)
                  ? vendor.bids.flatMap((bid) =>
                      bid.bid_materials.map((material) => ({
                        bestTotalAmount: material.total_amount || "_",
                        quantityAvailable: material.quantity_available || "_",
                        price: material.price || "_",
                        discount: material.discount || "_",
                        realisedDiscount: material.discount || "_",
                        gst: "_",
                        realisedGST: "_",
                        landedAmount: material.total_amount,
                        participantAttachment: "_",
                        totalAmount: material.total_amount,
                      }))
                    )
                  : []
              )}
              title={"Material Details"}
              isDefault={true}
            />
            <Accordion
              tableColumn={[
                { label: "Freight Charge Amount", key: "freightChrg" },
                { label: "GST on Freight", key: "freightGst" },
                { label: "Realised Freight Amount", key: "freightRealised" },
                { label: "Warranty Clause", key: "warranty" },
                { label: "Payment Terms", key: "payment" },
                { label: "Loading / Unloading Clause", key: "loading" },
                { label: "Gross Total", key: "grossTotal" },
              ]}
              tableData={eventVendors?.flatMap(
                (vendor) =>
                  vendor.bids?.flatMap((bid) =>
                    bid.bid_materials?.map((material) => ({
                      freightChrg: "_",
                      freightGst: "_",
                      freightRealised: "_",
                      warranty: bid.warranty_clause || "_",
                      payment: bid.payment_terms || "_",
                      loading: bid.loading_unloading_clause || "_",
                      grossTotal: bid.price || "_",
                    }))
                  ) || []
              )}
              title="Other Charges"
              isDefault={false}
            />
          </div>
        </FullScreen>
      )}
    </div>
  );
}
