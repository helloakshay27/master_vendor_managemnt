import React, { useState } from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import { evaluationOptions } from "../../../constant/data";

const IncreaseEventTimeModal = ({ show, handleClose }) => {
  const [selectedDuration, setSelectedDuration] = useState(
    evaluationOptions[0].value
  );
  const [customEventDurationValue, setCustomEventDurationValue] = useState("");
  const [customEventUnit, setCustomEventUnit] = useState("Min(s)");
  const [fixedDateTime, setFixedDateTime] = useState("");

  const handleEventDurationChange = (duration) => {
    setSelectedDuration(duration);
    if (duration !== "Custom") {
      setCustomEventDurationValue("");
      setCustomEventUnit("Min(s)");
    }
    if (duration !== "Fixed Time") {
      setFixedDateTime("");
    }
    console.log("selectedDuration :-", selectedDuration);
  };

  return (
    <>
      <DynamicModalBox
        show={show}
        onHide={handleClose}
        title="Increased Event Time"
        footerButtons={[
          // @ts-ignore
          {
            label: "Cancel",
            onClick: handleClose,
            props: { className: "purple-btn1" },
          },
          // @ts-ignore
          {
            label: "Save",
            props: { className: "purple-btn2" },
          },
        ]}
      >
        <div className="row justify-content-between align-items-center">
          {evaluationOptions.map((option, index) => (
            <div className="col-md-3" key={index}>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eventTime"
                    value={option.value}
                    defaultChecked={index === 0}
                    checked={selectedDuration === option.value}
                    onChange={() => handleEventDurationChange(option.value)}
                  />
                  <label className="form-check-label">{option.label}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedDuration === "Custom" && (
          <div className="mt-2">
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

        {selectedDuration === "Fixed Time" && (
          <div className="mt-2">
            <div className="form-group">
              <p>Select Date and Time</p>
              <input
                type="datetime-local"
                className="form-control"
                value={fixedDateTime}
                onChange={(e) => setFixedDateTime(e.target.value)}
              />
            </div>
          </div>
        )}
      </DynamicModalBox>
    </>
  );
};

export default IncreaseEventTimeModal;
