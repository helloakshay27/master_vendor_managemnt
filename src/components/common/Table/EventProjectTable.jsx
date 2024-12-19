import React from "react";
import Table from "../../base/Table/Table";
import { eventProjectColumns, eventProjectData } from "../../../constant/data";

import { useNavigate } from "react-router-dom";

export default function EventProjectTable({ eventData }) {
  const navigate = useNavigate();

  const flattenedData = eventData.map((event, index) => ({
    srNo: index + 1,
    ...event,
    event_type: event.event_type_detail?.event_type || "N/A", // Extract 'event_type'
    event_configuration: event.event_type_detail?.event_configuration || "N/A", // Extract 'event_configuration'
  }));

  const handleActionClick = (row) => {
    // Define what happens when the eye icon is clicked for a row

    navigate(`/erp-rfq-detail-price-trends4h`);

    console.log("View details for:", row);
  };

  return (
    <Table
      columns={eventProjectColumns}
      data={flattenedData}
      // showCheckbox={true}
      actionIcon={true}
      // onRowSelect={undefined}
      // handleCheckboxChange={undefined}

      onActionClick={handleActionClick} // Pass the callback
    />
  );
}
