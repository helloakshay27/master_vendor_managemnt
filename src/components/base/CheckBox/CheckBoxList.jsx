import React, { useState } from "react";

export default function CheckBoxList({ title, items, onChange }) {
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle individual checkbox changes
  const handleCheckboxChange = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item) // Remove item if already selected
      : [...selectedItems, item]; // Add item if not selected

    setSelectedItems(updatedItems);
    if (onChange) onChange(updatedItems); // Trigger parent callback
  };

  // Handle "Select All" checkbox changes
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = isChecked ? items : [];
    setSelectedItems(updatedItems);
    if (onChange) onChange(updatedItems); // Trigger parent callback
  };

  // Check if "Select All" should be checked
  const isAllSelected = selectedItems.length === items.length && items.length > 0;

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center mb-3">
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={isAllSelected}
          onChange={handleSelectAllChange}
        />
        <p className="mb-0">{title}</p>
      </div>
      <div className="row border-bottom">
        {items.map((item, index) => (
          <div className="col-md-6" key={index}>
            <label className="form-check-label d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
