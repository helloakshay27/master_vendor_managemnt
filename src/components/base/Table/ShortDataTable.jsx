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
    // <table
    //   className="tbl-container mt-4 ShortTable"
    //   style={{ width: "40% !important" }}
    //   {...rest}
    // >
    //   <tbody>
    //     {data.map((row, index) => {
    //       const { firstBid, counterBid } = row.value;
    //       const showBothValues = firstBid !== counterBid;

    //       return (
    //         <tr
    //           key={index}
    //           style={{ borderBottom: "1px solid #ddd", color: "#fff" }}
    //         >
    //           <td
    //             style={{
    //               padding: "12px",
    //               fontWeight: "bold",
    //               background: "#de7008",
    //             }}
    //           >
    //             {row.label}
    //           </td>
    //           <td style={{ padding: "12px", color: "#777", textAlign: "left" }}>
    //             {row.label === "Realised Freight" ? (
    //               // Non-editable for Realised Freight
    //               <span className="form-control">
    //                 {counterBid ? (
    //                   <>
    //                     {showBothValues ? (
    //                       <>
    //                         <span
    //                           style={{
    //                             textDecoration: "line-through",
    //                             marginRight: "8px",
    //                           }}
    //                         >
    //                           {firstBid}
    //                         </span>
    //                         <span>→ {counterBid}</span>
    //                       </>
    //                     ) : (
    //                       counterBid
    //                     )}
    //                   </>
    //                 ) : (
    //                   firstBid
    //                 )}
    //               </span>
    //             ) : counterBid ? (
    //               // Non-editable when counterBid is present
    //               <span className="form-control">
    //                 {showBothValues ? (
    //                   <>
    //                     <span
    //                       style={{
    //                         textDecoration: "line-through",
    //                         marginRight: "15px",
    //                       }}
    //                     >
    //                       {firstBid}
    //                     </span>
    //                     <span>→ {counterBid}</span>
    //                   </>
    //                 ) : (
    //                   counterBid
    //                 )}
    //               </span>
    //             ) : // Editable if only firstBid is present
    //             editable ? (
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 value={firstBid}
    //                 onChange={(e) => handleInputChange(index, e.target.value)}
    //               />
    //             ) : (
    //               firstBid
    //             )}
    //           </td>
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>

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
                  <span className="">
                    {counterBid ? (
                      <>
                        {showBothValues ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                marginRight: "5px",
                                color: "gray",
                              }}
                            >
                              ₹{firstBid}
                            </span>
                            <span className="me-2">
                              <svg
                                className="me-2"
                                viewBox="64 64 896 896"
                                focusable="false"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                              </svg>
                            </span>
                            <span
                              style={{
                                backgroundColor: "#fcc17e", // Yellow background
                                padding: "4px 10px",
                                borderRadius: "5px",
                                color: "#7c2d12",
                              }}
                            >
                              ₹{counterBid}
                            </span>
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
                  <span>
                    {showBothValues ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginRight: "5px",
                            color: "gray",
                          }}
                        >
                          {firstBid}
                        </span>
                        <span className="me-2">
                          <svg
                            className="me-2"
                            viewBox="64 64 896 896"
                            focusable="false"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                          </svg>
                        </span>
                        <span
                          style={{
                            backgroundColor: "#fcc17e", // Yellow background
                            padding: "4px 10px",
                            borderRadius: "5px",
                            color: "#7c2d12",
                          }}
                        >
                          {counterBid}
                        </span>
                      </>
                    ) : (
                      counterBid
                    )}
                  </span>
                ) : editable ? (
                  // Editable if only firstBid is present
                  <input
                    type="text"
                    className="form-control"
                    value={firstBid}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={{ backgroundColor: "#fff", color: "#000" }}
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
