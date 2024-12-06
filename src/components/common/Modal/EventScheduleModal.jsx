import React, { useState } from "react";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import SelectBox from "../../base/Select/SelectBox";

const EventScheduleModal = ({ show, onHide }) => {
  const [isLater, setIsLater] = useState(false);
  const [isFixedEndTime, setIsFixedEndTime] = useState(false);
  const [isCustomEndTimeSelected, setIsCustomEndTimeSelected] = useState(false);
  const [isDurationTime, setIsDurationTime] = useState(false);
  const [isCustomEvaluationSelected, setIsCustomEvaluationSelected] =
    useState(false);

  const handleStartTimeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Schedule for later") {
      setIsLater(true);
    } else {
      setIsLater(false);
    }
  };
  const handleEndTimeChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Fixed Time") {
      setIsFixedEndTime(true);
    } else {
      setIsFixedEndTime(false);
    }
  };
  const handleEvaluationChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Duration") {
      setIsDurationTime(true);
    } else {
      setIsDurationTime(false);
    }
  };
  const handleEndTimeDurationChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Custom Duration") {
      setIsCustomEndTimeSelected(true);
    } else {
      setIsCustomEndTimeSelected(false);
    }
  };
  const handleEvaluationTimeDurationChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Custom Duration") {
      setIsCustomEvaluationSelected(true);
    } else {
      setIsCustomEvaluationSelected(false);
    }
  };
  return (
    <DynamicModalBox
      size="md"
      modalType={true}
      show={show}
      onHide={onHide}
      title="Event Schedule"
      footerButtons={[
        {
          label: "Back",
          onClick: onHide,
          props: {
            className: "purple-btn1",
          },
        },
        {
          label: "Save",
          onClick: onHide,
          props: {
            className: "purple-btn2",
          },
        },
      ]}
    >
      <div className="pb-4">
        <p>Start Time</p>
        <div className="row">
          <div className="col-md-4">
            <SelectBox
              label={""}
              options={[
                { value: "Start Now", label: "Start Now" },
                { value: "Schedule for later", label: "Schedule for later" },
              ]}
              defaultValue={"Start Now"}
              onChange={handleStartTimeChange}
            />
          </div>
          {isLater && (
            <>
              <div className="col-md-4">
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-4">
                <input type="time" className="form-control" />
              </div>
            </>
          )}
        </div>
        <p className="mt-2">End Time</p>
        <div className="row">
          <div className="col-md-4">
            <SelectBox
              label={""}
              options={[
                { value: "Duration", label: "Duration" },
                { value: "Fixed Time", label: "Fixed Time" },
              ]}
              defaultValue={"Duration"}
              onChange={handleEndTimeChange}
            />
          </div>
          {isFixedEndTime && (
            <>
              <div className="col-md-4">
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-4">
                <input type="time" className="form-control" />
              </div>
            </>
          )}

          {isCustomEndTimeSelected && (
             <div className="col-md-4">
             <input type="time" className="form-control" />
           </div>
          )}
        </div>
        <p className="my-2" style={{ color: "var(--light-grey)" }}>
          Event will end at 05 Apr 2024 at 11:24 am
        </p>
        <p className="mt-2">Evaluation time</p>
        <div className="d-flex gap-2   mt-2">
          <div className="col-md-4">
            <SelectBox
              label={""}
              options={[
                { value: "Duration", label: "Duration" },
                { value: "Not Applicable", label: "Not Applicable" },
              ]}
              defaultValue={"Duration"}
              onChange={handleEvaluationChange}
            />
          </div>

          {isDurationTime && (
            <SelectBox
              label={""}
              options={[
                { value: "Mins(s)", label: "Mins(s)" },
                { value: "Hour(s)", label: "Hour(s)" },
                { value: "Day(s)", label: "Day(s)" },
                { value: "Custom Duration", label: "Custom Duration" },
              ]}
              defaultValue={"Mins(s)"}
              onChange={handleEvaluationTimeDurationChange}
            />
          )}

          {isCustomEvaluationSelected && (
            <div className="col-md-4">
              <input type="time" className="form-control" />
            </div>
          )}
        </div>
      </div>
    </DynamicModalBox>
  );
};

export default EventScheduleModal;
