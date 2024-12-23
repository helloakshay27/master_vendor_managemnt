// @ts-nocheck
import React from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import Table from "../../base/Table/Table";
import ShortTable from "../../base/Table/ShortTable";
import {
  eventProjectColumns,
  eventProjectData,
} from "../../../constant/data";

export default function BulkCounterOfferModal({
  show,
  handleClose,
  bidCounterData,
}) {
  const renderProductRows = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <tr key={index}>
        <td>
          <input type="checkbox" />
        </td>
        <th scope="row">
          Wooden Frd Door{" "}
          <span style={{ color: "var(--red)", cursor: "pointer" }}>
            Details
          </span>
        </th>
        <td>257 Nos</td>
        <td />
        <td />
        <td />
        <td />
        <td>Sanvo Resorts Pvt. Ltd.</td>
        <td>
          <input type="file" />
        </td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td>
          <input type="file" />
        </td>
        <td>WOODEN DOOR SHUTTER 2 HRS.</td>
        <td>Main door Outer size of ...</td>
      </tr>
    ));
  };

  const renderFreightDetails = () => (
    <table className="w-100">
      <tbody>
        <tr>
          <th>Freight Charge Amount</th>
          <th scope="col">210000.00</th>
        </tr>
        <tr>
          <td>GST on Freight</td>
          <th scope="row">18</th>
        </tr>
        <tr>
          <td>Realised Freight Amount</td>
          <th scope="row">5 YEARS</th>
        </tr>
        <tr>
          <td>Payment Term</td>
          <th scope="row">90% - 10%</th>
        </tr>
        <tr>
          <td>Loading / Unloading Clause</td>
          <th scope="row">IN OUR SCOPE</th>
        </tr>
      </tbody>
    </table>
  );

  const productTableColumns = [
    { label: "Product*", key: "product" },
    { label: "Quantity Requested*", key: "quantityRequested" },
    { label: "Quantity Available", key: "quantityAvailable" },
    { label: "Best Total Amount", key: "bestTotalAmount" },
    { label: "Price*", key: "price" },
    { label: "Total Amount*", key: "totalAmount" },
    { label: "S no.*", key: "Sno" },
    { label: "Delivery location*", key: "deliveryLocation" },
    { label: "Creator Attachment", key: "creatorAttachment" },
    { label: "Discount", key: "discount" },
    { label: "Realised Discount*", key: "realisedDiscount" },
    { label: "GST*", key: "gst" },
    { label: "Realised GST", key: "realisedGst" },
    { label: "Landed Amount*", key: "landedAmount" },
    { label: "Participant Attachment", key: "participantAttachment" },
    { label: "Remark*", key: "remark" },
    { label: "Vendor Remark*", key: "vendorRemark" },
  ];

  const productTableData = [
    {
      product: (
        <span>
          Wooden Frd Door{" "}
          <span style={{ color: "var(--red)", cursor: "pointer" }}>
            Details
          </span>
        </span>
      ),
      quantityRequested: "257 Nos",
      quantityAvailable: "",
      bestTotalAmount: "",
      price: "",
      totalAmount: "",
      deliveryLocation: "Sanvo Resorts Pvt. Ltd.",
      creatorAttachment: <input type="file" />,
      discount: "",
      realisedDiscount: "",
      gst: "",
      realisedGst: "",
      landedAmount: "",
      doorFrameMaterial: "",
      participantAttachment: <input type="file" />,
      productVariant: "WOODEN DOOR SHUTTER 2 HRS.",
      additionalInfo: "Main door Outer size of ...",
      densityOfWood: "",
      moistureOfWood: "",
    },
  ];

  const productTableDatas = bidCounterData?.bid_materials?.map((item) => {
    // Extract values from the bid material object
    const productName = item.material_name || "";
    const quantityRequested = item.quantity_requested || "N/A";  // Ensure that quantity_requested exists, or set a default
    const quantityAvailable = item.quantity_available || "N/A";  // Same for quantity_available
    const bestTotalAmount = item.best_total_amount || ""; // Assuming this value comes from the data
    const price = item.price || "";
    const totalAmount = item.total_amount || "";
    const sno = item.sno || "";  // Assuming sno exists in the item
    const discount = item.discount || "";
    const realisedDiscount = item.realised_discount || "";
    const gst = item.gst || "";
    const realisedGst = item.realised_gst || "";
    const landedAmount = item.landed_amount || "";
    const remark = item.remark || "";
    const vendorRemark = item.vendor_remark || "";
    
    // Extract values from bidCounter.event for the delivery location
    const deliveryLocation = bidCounterData?.event?.delivary_location || "N/A";
    
    return {
      product: (
        <span>
          {productName}{" "}
          <span style={{ color: "var(--red)", cursor: "pointer" }}>
            Details
          </span>
        </span>
      ),
      quantityRequested,
      quantityAvailable,
      bestTotalAmount,
      price,
      totalAmount,
      Sno: sno,
      deliveryLocation,
      creatorAttachment: <input type="file" />,
      discount,
      realisedDiscount,
      gst,
      realisedGst,
      landedAmount,
      participantAttachment: <input type="file" />,
      remark,
      vendorRemark,
    };
  }) || [];

  console.log("productTableDatas:", bidCounterData);

  const freightData = [
    {
      label: "Freight Charge",
      value: bidCounterData.freight_charge_amount ? `₹${bidCounterData.freight_charge_amount}` : "Not available",
    },
    {
      label: "GST on Freight",
      value: bidCounterData.gst_on_freight ? `${bidCounterData.gst_on_freight}%` : "Not available",
    },
    {
      label: "Realised Freight",
      value: bidCounterData.realised_freight_charge_amount
        ? `₹${bidCounterData.realised_freight_charge_amount}`
        : "Not available",
    },
    {
      label: "Warranty Clause",
      value: bidCounterData.warranty_clause || "Not available",
    },
    {
      label: "Payment Terms",
      value: bidCounterData.payment_terms || "Not available",
    },
    {
      label: "Loading / Unloading",
      value: bidCounterData.loading_unloading_clause || "Not available",
    },
  ];

  return (
    <DynamicModalBox
      show={show}
      onHide={handleClose}
      title="Bulk Counter Offer"
      size="xl"
      footerButtons={[
        {
          label: "Save",
          onClick: handleClose,
          props: { className: "purple-btn2" },
        },
      ]}
    >
      <h5 className="mt-5">Product Sheet</h5>
      <Table
        columns={productTableColumns}
        data={productTableDatas}
        showCheckbox={true}
      />

      <div className="d-flex justify-content-end">
        <ShortTable data={freightData} />
      </div>

      <div className="form-group">
        <label htmlFor="counterOfferRemarks">Counter Offer Remarks</label>
        <input
          className="form-control"
          placeholder="Enter your remarks here"
          type="text"
          id="counterOfferRemarks"
        />
      </div>
    </DynamicModalBox>
  );
}
