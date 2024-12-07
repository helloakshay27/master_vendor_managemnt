import React from 'react';

export default function SelectBox({
  label,
  options,
  defaultValue,
  onChange,
  style = {},
  className = "form-control form-select",
  isDisableFirstOption = false, // New prop
}) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select
        className={className}
        style={{ width: "100%", ...style }}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            selected={isDisableFirstOption && index === 0} 
            hidden={isDisableFirstOption && index === 0} 
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
