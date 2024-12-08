// @ts-nocheck
import React, { useState } from "react";
import Table from "../../base/Table/Table";
import {
  participantsTabColumns,
  participantsTabData,
} from "../../../constant/data";
import SearchIcon from "../Icon/SearchIcon";

export default function ParticipantsTab() {
  // State to track if only selected vendors should be shown
  const [isSelectCheckboxes, setIsSelectCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSwitchChange = (e) => {
    const checked = e.target.checked;
  
    // Set the isSelectCheckboxes state
    setIsSelectCheckboxes(checked);
  
    // If the switch is turned off, clear the selected rows
    if (!checked) {
      setSelectedRows([]); // Clear selected checkboxes
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="participants"
      role="tabpanel"
      aria-labelledby="participants-tab"
      tabIndex={0}
    >
      <div>
        <div className="d-flex justify-content-between mt-4 align-items-center">
          <div className="input-group">
            <input
              type="search"
              id="searchInput"
              className="w-50 tbl-search"
              placeholder="Type your vendors here"
              style={{ width: '100px !important', marginLeft: '20px', paddingLeft: '10px' }}
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-md btn-default">
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <p className="eventList-p1 mb-0 me-2" style={{textWrap:'nowrap'}}>
                Show only selected vendors
              </p>
              <div className="form-check form-switch mt-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isSelectCheckboxes}
                  onChange={handleSwitchChange} // Handle switch toggle
                />
              </div>
            </div>
            <div>
              <img
                className="me-2"
                src="../erp_event_module/img/Separator-dark.svg"
                alt=""
              />
            </div>
            <select
              name="language"
              className="event-participant-select eventD-forms buyEvent-forms"
              required
            >
              <option value="" disabled selected hidden>
                Filter by city
              </option>
              <option value="indian">xxxxxxxx</option>
              <option value="nepali">xxxxxxxx</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <Table
          columns={participantsTabColumns}
          data={participantsTabData}
          showCheckbox={true}
          isSelectCheckboxes={isSelectCheckboxes} // Pass dynamic state to Table
        />
      </div>
    </div>
  );
}
