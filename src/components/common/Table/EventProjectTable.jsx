import React from "react";
import Table from "../../base/Table/Table";
import { eventProjectColumns, eventProjectData } from "../../../constant/data";

export default function EventProjectTable({ eventData }) {
  const flattenedData = eventData.map((event, index) => ({
    srNo: index + 1,
    ...event,
    event_type: event.event_type_detail?.event_type || "N/A", // Extract 'event_type'
    event_configuration: event.event_type_detail?.event_configuration || "N/A", // Extract 'event_configuration'
  }));

  return (
    <Table
      columns={eventProjectColumns}
      data={flattenedData}
      showCheckbox={true} onRowSelect={undefined} handleCheckboxChange={undefined}    />
  );
}
