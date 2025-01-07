import React from "react";
export default function ShortDataTable({
  data,
  editable = false,
  onValueChange,
  ...rest
}) {
  // const handleInputChange = (index, newValue) => {
  //   const updatedData = [...data];

  //   // Clear values when input is empty
  //   if (!newValue.trim()) {
  //     updatedData[index].value.firstBid = "";
  //     updatedData[index].value.counterBid = "";
  //   } else {
  //     const [firstBid, counterBid] = newValue.split("→").map((v) => v.trim());
  //     updatedData[index].value.firstBid =
  //       firstBid || updatedData[index].value.firstBid;
  //     updatedData[index].value.counterBid = counterBid || "";
  //   }

  //   // Custom calculation logic
  //   if (updatedData[index].label === "Freight Charge") {
  //     const freightCharge =
  //       parseFloat(
  //         (
  //           updatedData[index].value.counterBid ||
  //           updatedData[index].value.firstBid ||
  //           "0"
  //         ).replace(/₹|,/g, "")
  //       ) || 0;

  //     const gstRow = updatedData.find((row) => row.label === "GST on Freight");
  //     const gstOnFreight = gstRow
  //       ? parseFloat(gstRow.value.firstBid.replace(/%/g, "")) || 0
  //       : 0;

  //     const realisedFreight = (freightCharge * gstOnFreight) / 100;

  //     // Update Realised Freight
  //     const realisedFreightIndex = updatedData.findIndex(
  //       (row) => row.label === "Realised Freight"
  //     );

  //     if (realisedFreightIndex !== -1) {
  //       updatedData[realisedFreightIndex].value.firstBid = `₹${(
  //         freightCharge + realisedFreight
  //       ).toFixed(2)}`;
  //       updatedData[realisedFreightIndex].value.counterBid = "";
  //     }
  //   } else if (updatedData[index].label === "GST on Freight") {
  //     const gstOnFreight =
  //       parseFloat(
  //         (
  //           updatedData[index].value.counterBid ||
  //           updatedData[index].value.firstBid ||
  //           "0"
  //         ).replace(/%/g, "")
  //       ) || 0;

  //     const freightRow = updatedData.find(
  //       (row) => row.label === "Freight Charge"
  //     );
  //     const freightCharge = freightRow
  //       ? parseFloat((freightRow.value.firstBid || "0").replace(/₹|,/g, ""))
  //       : 0;

  //     const realisedFreight = (freightCharge * gstOnFreight) / 100;

  //     // Update Realised Freight
  //     const realisedFreightIndex = updatedData.findIndex(
  //       (row) => row.label === "Realised Freight"
  //     );

  //     if (realisedFreightIndex !== -1) {
  //       updatedData[realisedFreightIndex].value.firstBid = `₹${(
  //         freightCharge + realisedFreight
  //       ).toFixed(2)}`;
  //       updatedData[realisedFreightIndex].value.counterBid = "";
  //     }
  //   }

  //   // Trigger state update
  //   onValueChange(updatedData);
  // };

  const handleInputChange = (index, newValue) => {
    const updatedData = [...data];

    if (!newValue.trim()) {
      updatedData[index].value.firstBid = "";
      updatedData[index].value.counterBid = "";
    } else {
      const [firstBid, counterBid] = newValue.split("→").map((v) => v.trim());
      updatedData[index].value.firstBid =
        firstBid || updatedData[index].value.firstBid;
      updatedData[index].value.counterBid = counterBid || "";
    }

    if (updatedData[index].label === "Freight Charge") {
      const freightCharge =
        parseFloat(
          (
            updatedData[index].value.counterBid ||
            updatedData[index].value.firstBid ||
            "0"
          ).replace(/₹|,/g, "")
        ) || 0;

      const gstRow = updatedData.find((row) => row.label === "GST on Freight");
      const gstOnFreight =
        gstRow && gstRow.value && typeof gstRow.value.firstBid === "string"
          ? parseFloat(gstRow.value.firstBid.replace(/%/g, "")) || 0
          : 0;

      const realisedFreight = (freightCharge * gstOnFreight) / 100;

      const realisedFreightIndex = updatedData.findIndex(
        (row) => row.label === "Realised Freight"
      );

      if (realisedFreightIndex !== -1) {
        updatedData[realisedFreightIndex].value.firstBid = `₹${(
          freightCharge + realisedFreight
        ).toFixed(2)}`;
        updatedData[realisedFreightIndex].value.counterBid = "";
      }
    } else if (updatedData[index].label === "GST on Freight") {
      const gstOnFreight =
        parseFloat(
          (
            updatedData[index].value.counterBid ||
            updatedData[index].value.firstBid ||
            "0"
          ).replace(/%/g, "")
        ) || 0;

      const freightRow = updatedData.find(
        (row) => row.label === "Freight Charge"
      );
      const freightCharge =
        freightRow &&
        freightRow.value &&
        typeof freightRow.value.firstBid === "string"
          ? parseFloat(freightRow.value.firstBid.replace(/₹|,/g, "")) || 0
          : 0;

      const realisedFreight = (freightCharge * gstOnFreight) / 100;

      const realisedFreightIndex = updatedData.findIndex(
        (row) => row.label === "Realised Freight"
      );

      if (realisedFreightIndex !== -1) {
        updatedData[realisedFreightIndex].value.firstBid = `₹${(
          freightCharge + realisedFreight
        ).toFixed(2)}`;
        updatedData[realisedFreightIndex].value.counterBid = "";
      }
    }

    onValueChange(updatedData);
  };

  return (
    <table
      className="tbl-container mt-4 ShortTable"
      style={{ width: "40% !important" }}
      {...rest}
    >
      <tbody>
        {data.map((row, index) => {
          const { firstBid, counterBid } = row.value;
          const showBothValues = firstBid !== counterBid;

          return (
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
              <td style={{ padding: "12px", color: "#777", textAlign: "left" }}>
                {row.label === "Realised Freight" ? (
                  // Non-editable for Realised Freight
                  <span className="form-control">
                    {counterBid ? (
                      <>
                        {showBothValues ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginRight: "8px",
                              }}
                            >
                              {firstBid}
                            </span>
                            <span>→ {counterBid}</span>
                          </>
                        ) : (
                          counterBid
                        )}
                      </>
                    ) : (
                      firstBid
                    )}
                  </span>
                ) : counterBid ? (
                  // Non-editable when counterBid is present
                  <span className="form-control">
                    {showBothValues ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginRight: "15px",
                          }}
                        >
                          {firstBid}
                        </span>
                        <span>→ {counterBid}</span>
                      </>
                    ) : (
                      counterBid
                    )}
                  </span>
                ) : // Editable if only firstBid is present
                editable ? (
                  <input
                    type="text"
                    className="form-control"
                    value={firstBid}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ) : (
                  firstBid
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
