import { orderSummaryColumns, orderSummaryData } from "../../../constant/data";
import SelectBox from "../../base/Select/SelectBox";
import Table from "../../base/Table/Table";
import SettingIcon from "../Icon/SettingIcon";
import React from "react";

export default function CreateRFQForm({
  handleEventTypeModalShow,
  handleEventScheduleModalShow,
  handleSettingModalShow,
}) {
  return (
    <div className="row ">
      <div className="card-body">
        <div className="row align-items-end justify-items-end mx-2 mb-5">
          <div className="col-md-4 mt-0">
            <div className="form-group">
              <label className="po-fontBold">Event Type</label>
            </div>
            <input
              className="form-control "
              onClick={handleEventTypeModalShow}
              placeholder="Configure The Event"
            />
          </div>
          <div className="col-md-4 mt-0">
            <div className="form-group">
              <label className="po-fontBold">Event No.</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Event No."
              />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="form-group">
              <label className="po-fontBold">Event Schedule</label>
            </div>
            <input
              className="form-control "
              onClick={handleEventScheduleModalShow}
              placeholder="From [dd-mm-yy hh:mm] To [dd-mm-yy hh:mm] ([DD] Days
                                                          [HH] Hrs [MM] Mins)"
            />
          </div>
          <div className="col-md-4 mt-2">
            <SelectBox
              label={"Templates"}
              options={[
                { value: "Select Template", label: "Select Template" },
                { value: "Buy Template", label: "Buy Template" },
                { value: "BOQ Project", label: "BOQ Project" },
                { value: "BOQ Marathon", label: "BOQ Marathon" },
                {
                  value: "Buy Template(Freight and Clause)",
                  label: "Buy Template(Freight and Clause)",
                },
              ]}
              defaultValue={"Alaska"}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="mx-3">
          <Table
            columns={orderSummaryColumns}
            data={orderSummaryData}
            showCheckbox={true}
          />
        </div>
      </div>
    </div>
  );
}
