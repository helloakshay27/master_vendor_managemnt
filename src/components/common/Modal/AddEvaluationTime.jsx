import React, { useState } from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";

const AddEvaluationTimeModal = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState(
    "Edit evaluation duration"
  ); // Default selection
  const [customEventDurationValue, setCustomEventDurationValue] = useState(""); // For custom duration
  const [customEventUnit, setCustomEventUnit] = useState("Min(s)"); // Default unit for duration
  const [fixedDateTime, setFixedDateTime] = useState(""); // For date-time input
  const [actionType, setActionType] = useState("increaseBy"); // New state for 'Increase By'/'Decrease By'

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Reset fields based on selection
    if (e.target.value !== "Edit evaluation duration") {
      setCustomEventDurationValue("");
      setCustomEventUnit("Min(s)");
      setActionType("increaseBy");
    }
    if (e.target.value !== "Edit evaluation ending time") {
      setFixedDateTime("");
    }
  };

  return (
    <DynamicModalBox
      show={show}
      onHide={handleClose}
      title="Edit Evaluation Time"
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
          onClick: handleClose,
          props: { className: "purple-btn2" },
        },
        // @ts-ignore
      ]}
    >
      <div className="row justify-content-between align-items-center">
        {["Edit evaluation duration", "Edit evaluation ending time"].map(
          (option, index) => (
            <div className="col-md-6" key={index}>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="evaluationTime"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Additional Inputs Based on Selection */}
      {selectedOption === "Edit evaluation duration" && (
        <div className="mt-2">
          <div className="form-group">
            <p>Enter event duration</p>
            <div className="d-flex" style={{ width: "100%" }}>
              <select
                style={{ width: "30%" }}
                className="form-control"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
              >
                <option value="increaseBy">Increase By</option>
                <option value="decreaseBy">Decrease By</option>
              </select>
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

      {selectedOption === "Edit evaluation ending time" && (
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
  );
};

export default AddEvaluationTimeModal;
