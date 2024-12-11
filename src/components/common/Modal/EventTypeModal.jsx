import React from "react";
import PropTypes from "prop-types";
import DynamicModalBox from "../../base/Modal/DynamicModalBox";
import SelectBox from "../../base/Select/SelectBox";
import { bidsType } from "../../../constant/data";

const Card = ({
  title,
  middleText,
  placeholder,
  bgColor,
  color,
  circleColor,
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: circleColor,
        borderRadius: "4px",
        textAlign: "left",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "64%",
        marginTop: "-8px",
        height: "50px",
      }}
    >
      <h5 style={{ margin: 0, fontSize: "15px", paddingTop: "15px" }}>
        {" "}
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="10" fill={circleColor} />
        </svg>
        {title}
      </h5>

      <p
        style={{
          margin: 0,
          fontSize: "15px",
          color: "rgba(0, 0, 0, 0.5)",
          width: "15%",
          paddingTop: "12px",
        }}
      >
        {middleText}
      </p>

      <input
        type="text"
        placeholder={placeholder}
        style={{
          padding: "4px",
          borderRadius: "3px",
          border: "1px solid #ccc",
          outline: "none",
          marginRight: "10px",
          width: "48%",
        }}
      />
    </div>
  );
};

const EventTypeModal = ({
  size,
  show,
  onHide,
  title,
  footerButtons,
  eventType,
  handleEventTypeChange,
  eventTypeModal,
  handleEventTypeModalClose,
  selectedStrategy,
  handleRadioChange,
  awardType,
  handleAwardTypeChange,
  dynamicExtension,
  handleDynamicExtensionChange,
  trafficType,
  handleTrafficChange,
}) => (
  <DynamicModalBox
    size="xl"
    show={eventTypeModal}
    onHide={handleEventTypeModalClose}
    title="Configuration for Event"
    footerButtons={[
      // @ts-ignore
      {
        label: "Close",
        onClick: handleEventTypeModalClose,
        props: {
          className: "purple-btn1",
        },
      },
      // @ts-ignore
      {
        label: "Save Changes",
        onClick: handleEventTypeModalClose,
        props: {
          className: "purple-btn2",
        },
      },
    ]}
    // @ts-ignore
    modalType={true}
  >
    <div className="ant-drawer-body setting-modal">
      <div className="ant-row ant-form-item">
        <div className="ant-col ant-form-item-label">
          <label title="Event Type">Event Type</label>
        </div>
        <div className="ant-col ant-form-item-control-wrapper">
          <div
            className="pro-radio-tabs"
            style={{ gridTemplateColumns: "6fr 6fr" }}
          >
            <div
              className={`pro-radio-tabs__tab ${
                eventType === "Auction" ? "pro-radio-tabs__tab__selected" : ""
              }`}
              role="radio"
              aria-checked={eventType === "Auction"}
            >
              <div className="pro-radio-tabs__check-icon">
                <label
                  className={`ant-radio-wrapper ${
                    eventType === "Auction" ? "ant-radio-wrapper-checked" : ""
                  }`}
                >
                  <span
                    className={`ant-radio ${
                      eventType === "Auction" ? "ant-radio-checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="ant-radio-input"
                      value="Auction"
                      checked={eventType === "Auction"}
                      onChange={handleEventTypeChange}
                    />
                    <div className="ant-radio-inner"></div>
                  </span>
                </label>
              </div>
              <p className="pro-text pro-body pro-text--normal">Auction</p>
            </div>
            <div
              className={`pro-radio-tabs__tab ${
                eventType === "RFQ" ? "pro-radio-tabs__tab__selected" : ""
              }`}
              role="radio"
              aria-checked={eventType === "RFQ"}
            >
              <div className="pro-radio-tabs__check-icon">
                <label
                  className={`ant-radio-wrapper ${
                    eventType === "RFQ" ? "ant-radio-wrapper-checked" : ""
                  }`}
                >
                  <span
                    className={`ant-radio ${
                      eventType === "RFQ" ? "ant-radio-checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="ant-radio-input"
                      value="RFQ"
                      checked={eventType === "RFQ"}
                      onChange={handleEventTypeChange}
                    />
                    <div className="ant-radio-inner"></div>
                  </span>
                </label>
              </div>
              <p className="pro-text pro-body pro-text--normal">RFQ</p>
            </div>
          </div>
        </div>
      </div>
      {eventType === "Auction" && (
        <div
          className="pro-radio-tabs pro-radio-tabs2 rfq-tab-hide my-3"
          style={{ gridTemplateColumns: "6fr 6fr" }}
        >
          <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Rank Based"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Rank Based"}
            onClick={() => handleRadioChange("Rank Based")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Rank Based" ? "ant-radio-checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Rank Based"}
                    onChange={() => handleRadioChange("Rank Based")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">Rank Based</p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  Vendors will be ranked on bid price
                </p>
              </div>
            </div>
          </div>
          <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Price Based"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Price Based"}
            onClick={() => handleRadioChange("Price Based")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Price Based"
                      ? "ant-radio-checked"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Price Based"}
                    onChange={() => handleRadioChange("Price Based")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">
                  Price Based
                </p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  Minimum bid price visible to vendors
                </p>
              </div>
            </div>
          </div>

          {/* Traffic Light Radio Button */}
          {/* <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Traffic Light"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Traffic Light"}
            onClick={() => handleRadioChange("Traffic Light")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Traffic Light"
                      ? "ant-radio-checked"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Traffic Light"}
                    onChange={() => handleRadioChange("Traffic Light")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">
                  Traffic Light
                </p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  Vendors will be divided based on a specified range
                </p>
              </div>
            </div>
          </div> */}

          <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Traffic Light"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Traffic Light"}
            onClick={() => handleRadioChange("Traffic Light")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Traffic Light"
                      ? "ant-radio-checked"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Traffic Light"}
                    onChange={() => handleRadioChange("Traffic Light")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">
                  Traffic Light
                </p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  Vendors will be divided based on a specified range
                </p>
              </div>
            </div>
          </div>

          {/* <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Knockout"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Knockout"}
            onClick={() => handleRadioChange("Knockout")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Knockout" ? "ant-radio-checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Knockout"}
                    onChange={() => handleRadioChange("Knockout")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">Knockout</p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  Vendors will accept/reject your offer
                </p>
              </div>
            </div>
          </div> */}
          {/* <div
            className={`pro-radio-tabs__tab ${
              selectedStrategy === "Dutch Auction"
                ? "pro-radio-tabs__tab__selected"
                : ""
            }`}
            tabIndex={0}
            role="radio"
            aria-checked={selectedStrategy === "Dutch Auction"}
            onClick={() => handleRadioChange("Dutch Auction")}
          >
            <div className="pro-radio-tabs__check-icon">
              <label className="ant-radio-wrapper">
                <span
                  className={`ant-radio ${
                    selectedStrategy === "Dutch Auction"
                      ? "ant-radio-checked"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    tabIndex={-1}
                    className="ant-radio-input"
                    checked={selectedStrategy === "Dutch Auction"}
                    onChange={() => handleRadioChange("Dutch Auction")}
                  />
                  <div className="ant-radio-inner" />
                </span>
              </label>
            </div>
            <div className="styles_strategy__xc2r+">
              <div className="styles_strategyContent__c-1Di">
                <p className="pro-text pro-body pro-text--medium">
                  Dutch Auction
                </p>
                <p className="pro-text pro-body pro-text--normal styles_strategySub__R7Aot">
                  First come first serve allocation.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      )}
      {selectedStrategy === "Traffic Light" && (
        <div className="ant-row ant-form-item mt-3">
          <div className="ant-row ant-form-item mt-3">
            <div className="ant-col">
              <label title="How will you award the event?">
                Group traffic light by:
              </label>
            </div>
            <div className="ant-col">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="groupTrafficLight"
                    value="price"
                    style={{ marginRight: "5px" }}
                  />
                  Price
                </label>
                <label
                  style={{
                    marginLeft: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="groupTrafficLight"
                    value="checked"
                    style={{ marginRight: "5px" }}
                  />
                  Rank
                </label>
              </div>
            </div>
          </div>
          {/* // card  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Card
              title="GREEN"
              middleText="Gross Total Less Than"
              placeholder="223"
              // bgColor="rgba(0, 128, 0, 0.3)"
              bgColor="rgba(220,255,220,1)"
              circleColor="green"
              color={""}
            />

            {/* Card for Yellow */}
            <Card
              title="YELLOW"
              color="yellow"
              middleText="Gross Total Less Than"
              placeholder="2323"
              bgColor="rgba(255,255,220,1)"
              circleColor="orange"
            />

            {/* Card for Green */}
          </div>
        </div>
      )}

      <div className="ant-col ant-form-item-label">
        <label title="How will you award the event?">
          How will you award the event?
        </label>
      </div>

      <div className="ant-col ant-form-item-control-wrapper">
        <div className="ant-form-item-control">
          <span className="ant-form-item-children">
            <div style={{ maxWidth: 700 }}>
              <div
                className="pro-radio-tabs"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <div
                  className={`pro-radio-tabs__tab ${
                    awardType === "SingleVendor"
                      ? "pro-radio-tabs__tab__selected"
                      : ""
                  }`}
                  role="radio"
                  aria-checked={awardType === "SingleVendor"}
                >
                  <div className="pro-radio-tabs__check-icon">
                    <label
                      className={`ant-radio-wrapper ${
                        awardType === "SingleVendor"
                          ? "ant-radio-wrapper-checked"
                          : ""
                      }`}
                    >
                      <span
                        className={`ant-radio ${
                          awardType === "SingleVendor"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          className="ant-radio-input"
                          value="SingleVendor"
                          checked={awardType === "SingleVendor"}
                          onChange={handleAwardTypeChange}
                        />
                        <div className="ant-radio-inner"></div>
                      </span>
                    </label>
                  </div>
                  <p className="pro-text pro-body pro-text--normal">
                    I'll award the entire lot to single vendor
                  </p>
                </div>
                <div
                  className={`pro-radio-tabs__tab ${
                    awardType === "MultipleVendors"
                      ? "pro-radio-tabs__tab__selected"
                      : ""
                  }`}
                  role="radio"
                  aria-checked={awardType === "MultipleVendors"}
                >
                  <div className="pro-radio-tabs__check-icon">
                    <label
                      className={`ant-radio-wrapper ${
                        awardType === "MultipleVendors"
                          ? "ant-radio-wrapper-checked"
                          : ""
                      }`}
                    >
                      <span
                        className={`ant-radio ${
                          awardType === "MultipleVendors"
                            ? "ant-radio-checked"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          className="ant-radio-input"
                          value="MultipleVendors"
                          checked={awardType === "MultipleVendors"}
                          onChange={handleAwardTypeChange}
                        />
                        <div className="ant-radio-inner"></div>
                      </span>
                    </label>
                  </div>
                  <p className="pro-text pro-body pro-text--normal">
                    I may partially award the event to multiple vendors
                  </p>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
      <form className="ant-form-item my-4">
        <div>
          {selectedStrategy === "Rank Based" && (
            <div className="d-flex align-items-center gap-2 my-3">
              <input
                type="checkbox"
                checked={dynamicExtension[0]}
                onChange={(e) =>
                  handleDynamicExtensionChange(0, e.target.checked)
                }
              />
              <div className="ant-col ant-form-item-label">
                Show rank to vendor for individual item.
              </div>
            </div>
          )}
          <div className="d-flex align-items-center gap-2 my-3">
            <input
              type="checkbox"
              checked={dynamicExtension[1]}
              onChange={(e) =>
                handleDynamicExtensionChange(1, e.target.checked)
              }
            />
            <div className="ant-col ant-form-item-label">
              Dynamic Event Extension
            </div>
          </div>
          {dynamicExtension[1] && (
            <>
              <label htmlFor="Datepicker">
                Extend closing time in last 1 min in case of rank / price
                changes in top selected bids.
              </label>
              <div className="d-flex align-items-center gap-2">
                <div
                  className={`pro-radio-tabs__tab ${
                    selectedStrategy === "price"
                      ? "pro-radio-tabs__tab__selected"
                      : ""
                  }`}
                  style={{ width: "50%" }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={selectedStrategy === "Price"}
                  onClick={() => handleRadioChange("Price")}
                >
                  <span
                    className={`ant-radio ${
                      selectedStrategy === "Price" ? "ant-radio-checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      tabIndex={-1}
                      className="ant-radio-input"
                      checked={selectedStrategy === "Price"}
                      onChange={() => handleRadioChange("Price")}
                    />
                    <div className="ant-radio-inner" />
                  </span>
                  <p className="pro-text pro-body pro-text--medium ps-2">
                    Price
                  </p>
                </div>
                <div
                  className={`pro-radio-tabs__tab col-md-6 ${
                    selectedStrategy === "Rank"
                      ? "pro-radio-tabs__tab__selected"
                      : ""
                  }`}
                  style={{ width: "50%" }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={selectedStrategy === "Rank"}
                  onClick={() => handleRadioChange("Rank")}
                >
                  <span
                    className={`ant-radio ${
                      selectedStrategy === "Rank" ? "ant-radio-checked" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      tabIndex={-1}
                      className="ant-radio-input"
                      checked={selectedStrategy === "Rank"}
                      onChange={() => handleRadioChange("Rank")}
                    />
                    <div className="ant-radio-inner" />
                  </span>
                  <p className="pro-text pro-body pro-text--medium ps-2">
                    Rank
                  </p>
                </div>
              </div>
              <div
                className="dynamic-time d-grid w-100 align-items-end mt-3 gap-2"
                style={{ gridTemplateColumns: "6fr 6fr" }}
              >
                <div className="trigger-time">
                  <label>Trigger time extension on last</label>
                  <input
                    type="number"
                    placeholder="Min(s)"
                    className="form-control"
                    style={{ marginLeft: "5px" }}
                  />
                </div>
                <div className="extend-time">
                  <label>Extend time by</label>
                  <input
                    type="number"
                    placeholder="Min(s)"
                    className="form-control"
                    style={{ marginLeft: "5px" }}
                  />
                </div>
                <div className="time-extention">
                  <SelectBox
                    label={"Time extension on change in:"}
                    options={bidsType}
                    defaultValue={"Select Top bids"}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            </>
          )}
          <div className="d-flex align-items-center gap-2 my-3">
            <input
              type="checkbox"
              checked={dynamicExtension[2]}
              onChange={(e) =>
                handleDynamicExtensionChange(2, e.target.checked)
              }
            />
            <div className="ant-col ant-form-item-label">
              Set minimum revisions to show Rank
            </div>
          </div>
          {dynamicExtension[2] && (
            <input
              type="number"
              className="form-control"
              placeholder="Eneter number of revisions required"
            />
          )}
          <div className="d-flex align-items-center gap-2 my-3">
            <input
              type="checkbox"
              checked={dynamicExtension[3]}
              onChange={(e) =>
                handleDynamicExtensionChange(3, e.target.checked)
              }
            />
            <div className="ant-col ant-form-item-label">Delivery Date</div>
          </div>
          {dynamicExtension[3] && (
            <input
              type="date"
              placeholder="Select Date"
              className="form-control"
            />
          )}
        </div>
      </form>
    </div>
  </DynamicModalBox>
);

export default EventTypeModal;
