import React from "react";

export default function ShortTable({ data, editable = false, onValueChange }) {
  const handleInputChange = (index, newValue) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    onValueChange(updatedData);
  };

  return (
    <table
      className="tbl-container mt-4 ShortTable"
      style={{ width: "40% !important" }}
    >
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            style={{ borderBottom: "1px solid #ddd", color: "#fff" }}
          >
            <td
              style={{
                padding: "12px",
                fontWeight: "bold",
                background: "#de7008",
              }}
            >
              {row.label}
            </td>
            <td style={{ padding: "12px", color: "#777" }}>
              {editable ? (
                <input
                  type="text"
                  className="form-control"
                  value={row.value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ) : (
                row.value
              )}

              {/* {row.value} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
