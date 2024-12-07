import React from "react";
import Select from "react-select";

export default function MultiSelector({
  options,
  value,
  onChange,
  placeholder,
}) {
  const customStyles = {
    control: (base) => ({
      ...base,
      maxHeight: "65px",
      overflowY: "auto",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999, // Ensure the dropdown appears above other elements
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // Ensure portal menu is on top
    }),
  };
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
}
