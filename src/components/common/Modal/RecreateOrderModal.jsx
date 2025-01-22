import React, { useState, useEffect } from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import { useParams } from "react-router-dom";

const RecreateOrderModal = ({ show, handleClose }) => {
  const durations = [
    "15 Mins",
    "30 Mins",
    "60 Mins",
    "4 Hrs",
    "24 Hrs",
    "Custom",
  ];
  const evaluationDurations = [
    "15 Mins",
    "30 Mins",
    "45 Mins",
    "60 Mins",
    "Custom",
  ];

  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [customEventDurationValue, setCustomEventDurationValue] = useState("");
  const [customEventUnit, setCustomEventUnit] = useState("Min(s)");

  const [selectedEvaluationDuration, setSelectedEvaluationDuration] = useState(
    evaluationDurations[0]
  );
  const [customEvaluationValue, setCustomEvaluationValue] = useState("");
  const [customEvaluationUnit, setCustomEvaluationUnit] = useState("Min(s)");

  const [scheduleEvent, setScheduleEvent] = useState(false);
  const [tableData, setTableData] = useState([]); // To store fetched data
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const { id } = useParams();

  const [eventData, setEventData] = useState(null); // To store fetched event data

  const [vendorId, setVendorId] = useState(() => {
    // Retrieve the vendorId from sessionStorage or default to an empty string
    return sessionStorage.getItem("vendorId") || "";
  });

  // Fetch data from API
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://vendors.lockated.com/rfq/events/${id}?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414&page=1`
        );
        const result = await response.json();
        console.log("API Response Structure", result); // Inspect the API response structure
        // setTableData(Array.isArray(result.data) ? result.data.eve : []); // Ensure it's always an array
        setEventData(result); // Store the entire event data

        setTableData(result.event_materials || []);
      } catch (error) {
        console.error("Error fetching table data:", error);
        alert("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, []);

  // Function to handle form submission

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Prepare POST payload
  //   const payload = {
  //     event: {
  //       event_title: "AAAAAAA", // Set the event title (you can dynamically set this as needed)
  //       created_on: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  //       status: "pending", // Set the status as "pending"
  //       created_by_id: 2,
  //       event_schedule_attributes: {
  //         start_time: "2025-01-13T08:59:35.028Z", // Example start time, replace as needed
  //         end_time: customEventDurationValue || selectedDuration, // Example end time, replace as needed
  //         evaluation_time: "10 Mins", // Set a default evaluation time or use dynamic data
  //         event_type_id: 1,
  //       },
  //       event_type_detail_attributes: {
  //         event_type: "rfq", // Set the event type to "rfq"
  //         award_scheme: "single_vendor", // Set the award scheme
  //         event_configuration: false, // Set event configuration
  //         time_extension_type: "", // If any, replace or leave empty
  //         triggered_time_extension_on_last: "", // If any, replace or leave empty
  //         extend_event_time_by: 0, // Set as per your requirements
  //         enable_english_auction: true, // Set to true or false as per your requirement
  //         extension_time_min: 5, // Example value, set as needed
  //         extend_time_min: 10, // Example value, set as needed
  //         time_extension_change: "", // If any, replace or leave empty
  //         delivery_date: "2025-01-17T17:29", // Example delivery date, replace as needed
  //       },
  //       event_materials_attributes: tableData.map((material) => ({
  //         descriptionOfItem: material.inventory_name,
  //         inventory_id: material.id,
  //         quantity: material.quantity,
  //         unit: material.uom,
  //         location: material.delivary_location,
  //         rate: material.rate, // Replace with actual rate if available
  //         amount: material.amount, // Replace with actual amount calculation if available
  //       })),
  //       event_vendors_attributes: [
  //         { status: 1, pms_supplier_id: 7397 },
  //         { status: 1, pms_supplier_id: 7398 },
  //       ],
  //       status_logs_attributes: [
  //         {
  //           status: "pending", // Set status as "pending"
  //           created_by_id: 2,
  //           remarks: "Initial status",
  //           comments: "No comments",
  //         },
  //       ],
  //       terms_and_conditions: [
  //         "1. testtttt111", // Add terms and conditions here
  //         "2. testttt22", // Add terms and conditions here
  //       ],
  //     },
  //   };

  //   console.log("Formatted Payload", payload);

  //   try {
  //     // Send POST request
  //     const response = await fetch(
  //       "https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     if (response.ok) {
  //       alert("Event Recreated successfully!");
  //       handleClose(); // Close modal
  //     } else {
  //       console.error("Error:", result);
  //       alert("Failed to create event: " + (result.message || "Unknown error"));
  //     }
  //   } catch (error) {
  //     console.error("Error during submission:", error);
  //     alert("An error occurred while submitting data.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!eventData) {
      alert("Event data is not loaded yet. Please wait.");
      return;
    }

    const payload = {
      event: {
        event_title: eventData.event_title,
        created_on: new Date(eventData.created_on).toISOString().split("T")[0],
        status: eventData.status,
        created_by_id: eventData.created_by_id,
        event_schedule_attributes: {
          start_time: eventData.event_schedule.start_time,
          end_time: customEventDurationValue || selectedDuration,
          evaluation_time: eventData.event_schedule.evaluation_time,
          event_type_id: 1, // Example static value
        },
        event_type_detail_attributes: {
          event_type: eventData.event_type_detail.event_type,
          award_scheme: eventData.event_type_detail.award_scheme,
          event_configuration: eventData.event_type_detail.event_configuration,
          time_extension_type: eventData.event_type_detail.time_extension_type,
          triggered_time_extension_on_last:
            eventData.event_type_detail.triggered_time_extension_on_last,
          extend_event_time_by:
            eventData.event_type_detail.extend_event_time_by,
          enable_english_auction:
            eventData.event_type_detail.enable_english_auction,
          extension_time_min: eventData.event_type_detail.extension_time_min,
          extend_time_min: eventData.event_type_detail.extend_time_min,
          time_extension_change:
            eventData.event_type_detail.time_extension_change,
          delivery_date: eventData.event_type_detail.delivery_date,
        },
        event_materials_attributes: tableData.map((material) => ({
          descriptionOfItem: material.inventory_name,
          inventory_id: material.inventory_id,
          quantity: material.quantity,
          unit: material.uom,
          location: material.location || "N/A",
          rate: material.rate,
          amount: material.amount,
        })),
        event_vendors_attributes: eventData.event_vendors.map((vendor) => ({
          status: vendor.status,
          pms_supplier_id: vendor.pms_supplier_id,
        })),
        status_logs_attributes: eventData.status_logs.map((log) => ({
          status: log.status,
          created_by_id: log.created_by_id,
          remarks: log.remarks,
          comments: log.comments,
        })),
        terms_and_conditions: eventData.resource_term_conditions.map(
          (term) => term.term_condition.condition
        ),
      },
    };

    console.log("Dynamic Payload:", payload);

    try {
      const response = await fetch(
        "https://vendors.lockated.com/rfq/events?token=bfa5004e7b0175622be8f7e69b37d01290b737f82e078414",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Event recreated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting data.");
    }
  };

  // Render table rows dynamically based on fetched data
  const renderTableRows = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            Loading data...
          </td>
        </tr>
      );
    }
    if (!Array.isArray(tableData) || tableData.length === 0) {
      return (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            No data available
          </td>
        </tr>
      );
    }
    return tableData.map((material, index) => (
      <tr key={index}>
        <td>{material.inventory_name}</td>
        <td>{material.material_type}</td>
        <td>
          {material.quantity} {material.uom}
        </td>
        {/* <td>{material.rate}</td>
        <td>{material.amount}</td> */}
        <td>{material.location}</td>
        {/* <td>{material.material_type}</td> */}
      </tr>
    ));
  };

  return (
    <DynamicModalBox
      show={show}
      onHide={handleClose}
      size="xl"
      title="Recreate Order"
      footerButtons={[
        {
          label: "Save",
          onClick: handleSubmit,
          props: { className: "purple-btn2" },
        },
      ]}
    >
      <div className="row mt-3">
        <div className="col-md-2">
          <div className="form-group">
            <label className="form-group">Order Type</label>
            <p style={{ fontWeight: 600 }}>Buy</p>
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label className="form-group">ORDER MODE</label>
            <p style={{ fontWeight: 600 }}>RFQ</p>
          </div>
        </div>
      </div>

      <h5 className="mt-5">Product Sheet</h5>
      <div className="tbl-container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Materials*</th>
              <th>Material Variant*</th>
              <th>Quantity Requested*</th>
              <th>Delivery location*</th>
              {/* <th>Additional Info*</th> */}
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>

      <h5 className="mt-5">Auction Configurations</h5>

      {/* Event End Time Duration */}
      <div className="row justify-content-between align-items-center mt-3">
        <p>Event End Time Duration</p>
        {durations.map((duration, index) => (
          <div className="col-md-2" key={index}>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="eventDuration"
                  value={duration}
                  checked={selectedDuration === duration}
                  onChange={() => setSelectedDuration(duration)}
                />
                <label className="form-check-label">{duration}</label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDuration === "Custom" && (
        <div className="col-md-3 mt-2">
          <div className="form-group">
            <p>Enter event duration</p>
            <div className="d-flex" style={{ width: "100%" }}>
              <input
                style={{ width: "70%" }}
                className="form-control"
                placeholder="Enter value"
                type="number"
                value={customEventDurationValue}
                onChange={(e) => setCustomEventDurationValue(e.target.value)}
              />
              <select
                style={{ width: "30%" }}
                className="form-control"
                value={customEventUnit}
                onChange={(e) => setCustomEventUnit(e.target.value)}
              >
                <option value="Min(s)">Min(s)</option>
                <option value="Hour(s)">Hour(s)</option>
                <option value="Day(s)">Day(s)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </DynamicModalBox>
  );
};

export default RecreateOrderModal;
