// @ts-nocheck
import React, { useState, useEffect } from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import Table from "../../base/Table/Table";
import ShortTable from "../../base/Table/ShortTable";
import { productTableColumns } from "../../../constant/data";

export default function BulkCounterOfferModal({
  show,
  handleClose,
  bidCounterData,
}) {
  
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(bidCounterData);
  }, [bidCounterData]);
  
  const handleInputChange = (e, field) => {
    const newFormData = { ...formData };
    newFormData[field] = e.target.value;
    setFormData(newFormData);
  };

  const handleMaterialInputChange = (e, field, index) => {
    const newFormData = { ...formData };
    newFormData.bid_materials[index][field] = e.target.value;
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    const payload = {
      counter_bid: {
        event_vendor_id: formData.event_vendor_id,
        price: formData.price,
        discount: formData.discount,
        freight_charge_amount: formData.freight_charge_amount,
        gst_on_freight: formData.gst_on_freight,
        realised_freight_charge_amount: formData.realised_freight_charge_amount,
        gross_total: formData.gross_total,
        warranty_clause: formData.warranty_clause,
        payment_terms: formData.payment_terms,
        loading_unloading_clause: formData.loading_unloading_clause,
        counter_bid_materials_attributes: formData.bid_materials.map((item) => ({
          event_material_id: item.event_material_id,
          quantity_available: item.quantity_available,
          price: item.price,
          discount: item.discount,
          total_amount: item.total_amount,
          realised_discount: item.realised_discount,
          gst: item.gst,
          realised_gst: item.realised_gst,
          vendor_remark: item.vendor_remark,
        })),
      },
    };
    console.log(payload, "payload");
    

    const response = await fetch('https://vendors.lockated.com/rfq/events/31/bids/37/counter_bids?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      handleClose();
    } else {
      console.error('Failed to submit counter bid');
    }
  };
  
  const productTableData = formData?.bid_materials?.map((item, index) => {
    const productName = item.material_name || "_";
    const quantityRequested = item.quantity_requested || "N/A";  
    const quantityAvailable = (
      <input
      type="number"
      className="form-control"
      value={item.quantity_available}
        onChange={(e) => handleMaterialInputChange(e, 'quantity_available', index)}
      />
    );
    const bestTotalAmount = item.best_total_amount || "_"; 
    const price = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.price}
        onChange={(e) => handleMaterialInputChange(e, 'price', index)}
      />
    );
    const totalAmount = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.total_amount}
        onChange={(e) => handleMaterialInputChange(e, 'total_amount', index)}
      />
    );
    const sno = item.sno || "_"; 
    const discount = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.discount}
        onChange={(e) => handleMaterialInputChange(e, 'discount', index)}
      />
    );
    const realisedDiscount = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.realised_discount}
        onChange={(e) => handleMaterialInputChange(e, 'realised_discount', index)}
      />
    );
    const gst = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.gst}
        onChange={(e) => handleMaterialInputChange(e, 'gst', index)}
      />
    );
    const realisedGst = (
      <input
        type="number"
        className="form-control" style={{width: "auto"}}
        value={item.realised_gst}
        onChange={(e) => handleMaterialInputChange(e, 'realised_gst', index)}
      />
    );
    const landedAmount = item.landed_amount || "_";
    const remark = item.remark || "_";
    const vendorRemark = (
      <input
        type="text"
        className="form-control" style={{width: "auto"}}
        value={item.vendor_remark}
        onChange={(e) => handleMaterialInputChange(e, 'vendor_remark', index)}
      />
    );
    
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
      Sno: index + 1,
      deliveryLocation,
      creatorAttachment: <input type="file" className="form-control" style={{width: "auto"}} />,
      discount,
      realisedDiscount,
      gst,
      realisedGst,
      landedAmount,
      participantAttachment: <input type="file" className="form-control" style={{width: "auto"}} />,
      remark,
      vendorRemark,
    };
  }) || [];

  // console.log("productTableDatas:", productTableData, bidCounterData);
  

  const freightData = [
    {
      label: "Freight Charge",
      value: (
        <input
          type="number"
          className="form-control" style={{width: "auto"}}
          value={formData?.freight_charge_amount || "_"}
          onChange={(e) => handleInputChange(e, 'freight_charge_amount')}
        />
      ),
    },
    {
      label: "GST on Freight",
      value: (
        <input
          type="number"
          className="form-control" style={{width: "auto"}}
          value={formData?.gst_on_freight || "_"}
          onChange={(e) => handleInputChange(e, 'gst_on_freight')}
        />
      ),
    },
    {
      label: "Realised Freight",
      value: (
        <input
          type="number"
          className="form-control" style={{width: "auto"}}
          value={formData?.realised_freight_charge_amount || "_"}
          onChange={(e) => handleInputChange(e, 'realised_freight_charge_amount')}
        />
      ),
    },
    {
      label: "Warranty Clause",
      value: (
        <input
          type="text"
          className="form-control" style={{width: "auto"}}
          value={formData?.warranty_clause || "_"}
          onChange={(e) => handleInputChange(e, 'warranty_clause')}
        />
      ),
    },
    {
      label: "Payment Terms",
      value: (
        <input
          type="text"
          className="form-control" style={{width: "auto"}}
          value={formData?.payment_terms || "_"}
          onChange={(e) => handleInputChange(e, 'payment_terms')}
        />
      ),
    },
    {
      label: "Loading / Unloading",
      value: (
        <input
          type="text"
          className="form-control" style={{width: "auto"}}
          value={formData?.loading_unloading_clause || "_"}
          onChange={(e) => handleInputChange(e, 'loading_unloading_clause')}
        />
      ),
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
          onClick: handleSubmit,
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
