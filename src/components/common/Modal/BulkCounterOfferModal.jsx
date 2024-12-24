// @ts-nocheck
import React from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import Table from "../../base/Table/Table";
import ShortTable from "../../base/Table/ShortTable";
import { productTableColumns } from "../../../constant/data";

export default function BulkCounterOfferModal({
  show,
  handleClose,
  bidCounterData,
}) {
  const productTableData = bidCounterData?.bid_materials?.map((item) => {
    // Extract values from the bid material object
    const productName = item.material_name || "";
    const quantityRequested = item.quantity_requested || "N/A";  
    const quantityAvailable = item.quantity_available || "N/A";  
    const bestTotalAmount = item.best_total_amount || ""; 
    const price = item.price || "";
    const totalAmount = item.total_amount || "";
    const sno = item.sno || ""; 
    const discount = item.discount || "";
    const realisedDiscount = item.realised_discount || "";
    const gst = item.gst || "";
    const realisedGst = item.realised_gst || "";
    const landedAmount = item.landed_amount || "";
    const remark = item.remark || "";
    const vendorRemark = item.vendor_remark || "";
    
    const deliveryLocation = bidCounterData?.event?.delivary_location || "N/A";
    
    return {
      product: (
        <span>
          {productName}
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
      value: bidCounterData?.freight_charge_amount ? `₹${bidCounterData?.freight_charge_amount}` : "Not available",
    },
    {
      label: "GST on Freight",
      value: bidCounterData?.gst_on_freight ? `${bidCounterData?.gst_on_freight}%` : "Not available",
    },
    {
      label: "Realised Freight",
      value: bidCounterData?.realised_freight_charge_amount
        ? `₹${bidCounterData?.realised_freight_charge_amount}`
        : "Not available",
    },
    {
      label: "Warranty Clause",
      value: bidCounterData?.warranty_clause || "Not available",
    },
    {
      label: "Payment Terms",
      value: bidCounterData?.payment_terms || "Not available",
    },
    {
      label: "Loading / Unloading",
      value: bidCounterData?.loading_unloading_clause || "Not available",
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
        data={productTableData}
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
