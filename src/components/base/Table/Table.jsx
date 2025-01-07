import React, { useState, useEffect } from "react";

// Utility to transpose data for horizontal alignment
const transposeData = (data, columns) => {
  const keys = columns.map((col) => col.key);
  return keys.map((key, colIndex) => ({
    header: columns[colIndex].label,
    values: data.map((row) => row[key]),
  }));
};

export default function Table({
  columns,
  data = [], // Ensure data is always an array
  onActionClick = null,
  showCheckbox = false,
  actionIcon = null,
  isSelectCheckboxes = null,
  customRender = {},
  isHorizontal = false,
  onRowSelect,
  handleCheckboxChange = (index, newSelectAll) => {}, // Provide a default function
  resetSelectedRows,
  onResetComplete,
  ...rest
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (isSelectCheckboxes) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  }, [isSelectCheckboxes, data.length]);

  useEffect(() => {
    if (selectedRows.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, data.length]);

  useEffect(() => {
    if (resetSelectedRows) {
      setSelectedRows([]);
      onResetComplete();
    }
  }, [resetSelectedRows, onResetComplete]);

  const handleRowSelection = (rowIndex) => {
    const vendor = data[rowIndex];
    const isSelected = selectedRows.some((row) => row.id === vendor.id);

    const updatedSelectedRows = isSelected
      ? selectedRows.filter((row) => row.id !== vendor.id)
      : [...selectedRows, vendor];

    setSelectedRows(updatedSelectedRows);
    handleCheckboxChange(vendor, !isSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedSelectedRows = newSelectAll
      ? [
          ...selectedRows,
          ...data.filter(
            (vendor) => !selectedRows.some((row) => row.id === vendor.id)
          ),
        ]
      : selectedRows.filter(
          (vendor) => !data.some((row) => row.id === vendor.id)
        );

    setSelectedRows(updatedSelectedRows);

    if (newSelectAll) {
      data.forEach((vendor) => {
        handleCheckboxChange(vendor, true);
      });
    } else {
      data.forEach((vendor) => {
        handleCheckboxChange(vendor, false);
      });
    }
  };

  if (isHorizontal) {
    const transposedData = transposeData(data, columns);
    return (
      <div className="bid-tbl mb-0" {...rest} style={{ overflowX: "auto" }}>
        <table className="w-100">
          <thead>
            <tr style={{ backgroundColor: "#d3d3d3" }}>
              <th style={{ width: "200px", display:'none' }} />
              {data.map((_, index) => (
                <th key={index} className="main2-th" style={{ width: "200px", display:'none' }}></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transposedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td
                  className="main2-th"
                  style={{ fontWeight: "bold", textAlign: "left", width: "200px" }}
                >
                  {row.header}
                </td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} style={{ width: "200px", textAlign: "left" }}>
                    {customRender[columns[rowIndex]?.key]
                      ? customRender[columns[rowIndex]?.key](
                          value,
                          valueIndex,
                          data[valueIndex]
                        )
                      : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className="tbl-container px-0 mt-3"
      {...rest}
      style={{ maxHeight: "300px" }}
    >
      <table className="w-100">
        <thead>
          <tr>
            {showCheckbox && (
              <th style={{ width: "50px", textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={data.every((vendor) =>
                    selectedRows.some((row) => row.id === vendor.id)
                  )}
                  onChange={handleSelectAllChange}
                />
              </th>
            )}
            {columns.map((col, index) => (
              <th key={index} className="main2-th" style={{ whiteSpace: "nowrap" }}>
                {col.label}
              </th>
            ))}
            {actionIcon && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {showCheckbox && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selectedRow) => selectedRow.id === row.id
                    )}
                    onChange={() => handleRowSelection(rowIndex)}
                  />
                </td>
              )}
              {columns.map((col, cellIndex) => {
                const cell = row[col.key];
                const cellContent = customRender[col.key]
                  ? customRender[col.key](cell, rowIndex, row)
                  : cell;

                return <td key={cellIndex}>{cellContent}</td>;
              })}
              {actionIcon && onActionClick && (
                <td>
                  <button
                    className="p-2 bg-white border"
                    style={{
                      color: "#de7008",
                      backgroundColor: "transparent", // Remove background
                      border: "none", // Remove border
                      padding: "0", // Optional: Adjust padding
                      cursor: "pointer", // Ensure pointer cursor for interactivity
                    }}
                    onClick={() => onActionClick(row)} // Pass the row data
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
