import React, { useState } from "react";
import DropArrowIcon from "../../common/Icon/DropArrowIcon";
import Table from "../Table/Table";

export default function Accordion({ title, isDefault, tableColumn, tableData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item py-3">
        <h2 className="accordion-header">
          <button
            className="accordion-button viewBy-collapT1"
            style={{ position: "relative", width: "100%" }}
            type="button"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            <span className="pe-3">
              <DropArrowIcon isOpen={isOpen} />
            </span>{" "}
            <span style={{ color: isOpen ? "#e95420" : "" }}>{title}</span>
          </button>
        </h2>
        <div
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="headingOne"
        >
          <div className="accordion-body">
            {/* <table className="tbl-container">
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cell.className}
                        style={cell.style || {}}
                      >
                        {cell.content}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table> */}

            <Table
              columns={
                [
                { label: "Best Total Amount", key: "bestTotalAmount" },
                { label: "Quantity Available", key: "quantityAvailable" },
                { label: "Price", key: "price" },
                { label: "Discount", key: "discount" },
                { label: "Realised Discount", key: "realisedDiscount" },
                { label: "GST", key: "gst" },
                { label: "Realised GST", key: "realisedGST" },
                { label: "Landed Amount", key: "landedAmount" },
                { label: "Participant Attachment", key: "participantAttachment" },
                { label: "Total Amount", key: "totalAmount" },
              ]
            }
              data={
                [
                {
                  bestTotalAmount: "₹ 3,717",
                  quantityAvailable: "3 Nos",
                  price: "₹ 1,500 /Nos",
                  discount: "-",
                  realisedDiscount: "-",
                  gst: "18%",
                  realisedGST: "₹ 567",
                  landedAmount: "₹ 3,150",
                  participantAttachment: "-",
                  totalAmount: "₹ 3,717",
                },
                {
                  bestTotalAmount: "₹ 3,717",
                  quantityAvailable: "3 Nos",
                  price: "₹ 1,500 /Nos",
                  discount: "-",
                  realisedDiscount: "-",
                  gst: "18%",
                  realisedGST: "₹ 567",
                  landedAmount: "₹ 3,150",
                  participantAttachment: "-",
                  totalAmount: "₹ 3,717",
                },
              ]}
            />
            {isDefault && (
              <div className="default-val">
                <div className="col-md-2">
                  <p className="d-flex gap-1 align-items-center">
                    Default: <span className="viewBy-tBody1-R">₹</span>
                    68{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
