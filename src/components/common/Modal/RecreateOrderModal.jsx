import React, { useState } from "react";  
import DynamicModalBox from "../../base/Modal/DynamicModalBox";  

const RecreateOrderModal = ({ show, handleClose }) => {  
  const durations = ["15 Mins", "30 Mins", "60 Mins", "4 Hrs", "24 Hrs", "Custom"];  
  const evaluationDurations = ["15 Mins", "30 Mins","45 Mins", "60 Mins", "Custom"]; // Evaluation durations available  

  const [selectedDuration, setSelectedDuration] = useState(durations[0]); // Managing event end time duration  
  const [customEventDurationValue, setCustomEventDurationValue] = useState(""); // For custom value (Event End)  
  const [customEventUnit, setCustomEventUnit] = useState("Min(s)"); // For custom unit (Event End)  

  const [selectedEvaluationDuration, setSelectedEvaluationDuration] = useState(evaluationDurations[0]); // Managing evaluation duration  
  const [customEvaluationValue, setCustomEvaluationValue] = useState(""); // For custom value (Evaluation Duration)  
  const [customEvaluationUnit, setCustomEvaluationUnit] = useState("Min(s)"); // For custom unit (Evaluation Duration)  

  const [scheduleEvent, setScheduleEvent] = useState(false); // For the checkbox toggle on scheduling an event  

  // Handle the event end time duration selection  
  const handleEventDurationChange = (duration) => {  
    setSelectedDuration(duration);  
    if (duration !== "Custom") {  
      setCustomEventDurationValue("");  
      setCustomEventUnit("Min(s)");  
    }  
  };  

  // Handle the evaluation duration selection  
  const handleEvaluationDurationChange = (duration) => {  
    setSelectedEvaluationDuration(duration);  
    if (duration !== "Custom") {  
      setCustomEvaluationValue("");  
      setCustomEvaluationUnit("Min(s)");  
    }  
  };  

  // Utility function: Renders radio options for durations  
  const renderDurationOptions = (  
    name,
    options,  
    selectedValue,
    onChange
  ) => {  
    return options.map((duration, index) => (  
      <div className="col-md-2" key={index}>  
        <div className="form-group">  
          <div className="form-check">  
            <input  
              className="form-check-input"  
              type="radio"  
              name={name}  
              value={duration}  
              checked={selectedValue === duration}  
              onChange={() => onChange(duration)}  
            />  
            <label className="form-check-label">{duration}</label>  
          </div>  
        </div>  
      </div>  
    ));  
  };  

  const renderTableRows = () => {  
    return [...Array(5)].map((_, index) => (  
      <tr key={index}>  
        <th scope="row">  
          Wooden Frd Door{" "}  
          <span style={{ color: "var(--red)", cursor: "pointer" }}>  
            Details  
          </span>  
        </th>  
        <td></td>  
        <td>WOODEN DOOR SHUTTER 2 HRS...</td>  
        <td>257 Nos</td>  
        <td>Sanvo Resorts Pvt. Ltd.</td>  
        <td></td>  
        <td>Main door Outer size of ...</td>  
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
        // @ts-ignore
        {  
          label: "Save",  
          onClick: handleClose,  
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
        <table>  
          <thead className="thead-dark">  
            <tr>  
              <th>Product*</th>  
              <th>Best Total Amount</th>  
              <th>Product Variant*</th>  
              <th>Quantity Requested*</th>  
              <th>Delivery location*</th>  
              <th>Creator Attachment</th>  
              <th>ADDITIONAL INFO</th>  
            </tr>  
          </thead>  
          <tbody>{renderTableRows()}</tbody>  
        </table>  
      </div>  

      <h5 className="mt-5">Auction Configurations</h5>  

      {/* Event End Time Duration */}  
      <div className="row justify-content-between align-items-center mt-3">  
        <p>Event End Time Duration</p>  
        {renderDurationOptions(  
          "eventDuration",  
          durations,  
          selectedDuration,  
          handleEventDurationChange  
        )}  
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

      {/* Evaluation Duration */}  
      <div className="row align-items-center mt-2">  
        <p>Evaluation Duration</p>  
        {renderDurationOptions(  
          "evaluationDuration",  
          evaluationDurations,  
          selectedEvaluationDuration,  
          handleEvaluationDurationChange  
        )}  
      </div>  

      {selectedEvaluationDuration === "Custom" && (  
        <div className="col-md-3 mt-2">  
          <div className="form-group">  
            <p>Enter evaluation duration</p>  
            <div className="d-flex" style={{ width: "100%" }}>  
              <input  
                style={{ width: "70%" }}  
                className="form-control"  
                placeholder="Enter value"  
                type="number"  
                value={customEvaluationValue}  
                onChange={(e) => setCustomEvaluationValue(e.target.value)}  
              />  
              <select  
                style={{ width: "30%" }}  
                className="form-control"  
                value={customEvaluationUnit}  
                onChange={(e) => setCustomEvaluationUnit(e.target.value)}  
              >  
                <option value="Min(s)">Min(s)</option>  
                <option value="Hour(s)">Hour(s)</option>  
                <option value="Day(s)">Day(s)</option>  
              </select>  
            </div>  
          </div>  
        </div>  
      )}  

      <div className="row mt-3 align-items-end pb-3">  
        <div className="col-md-3">  
          <label htmlFor="">Delivery Date</label>  
          <input className="form-control" type="date" />  
        </div>  
        <div className="col-md-3">  
          <div className="form-check">  
            <input  
              className="form-check-input"  
              type="checkbox"  
              checked={scheduleEvent}  
              onChange={(e) => setScheduleEvent(e.target.checked)}  
            />  
            <label className="form-check-label">Schedule this event?</label>  
          </div>  
          {scheduleEvent && <input className="form-control" type="date" />}  
        </div>  
        {scheduleEvent && 
        <div className="col-md-2">  
          <input  
            className="form-control"  
            placeholder="select time"  
            type="time"  
          />  
        </div>  
        }
      </div>  
    </DynamicModalBox>  
  );  
};  

export default RecreateOrderModal;