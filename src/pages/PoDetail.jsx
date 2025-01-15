import React from "react";
import "../styles/mor.css";

const PoDetail = () => {
  return (
    <div>
      <div className="d-flex mt-3 justify-content-end align-items-end px-3">
        <div className="">
          <button
            className="purple-btn2"
            onClick={() => navigate("/create-event")}
          >
            <span className="Po-symbols-outlined align-text-top">add</span>
            Clone
          </button>
        </div>
        <div className=" ">
          <button
            className="purple-btn2"
            onClick={() => navigate("/create-event")}
          >
            <span className="material-symbols-outlined align-text-top">
              comment
            </span>
            Feeds
          </button>
        </div>
        <div className=" ">
          <button
            className="purple-btn2"
            onClick={() => navigate("/create-event")}
          >
            <span className="material-symbols-outlined align-text-top">
              print
            </span>
            Print
          </button>
        </div>
        <div className=" ">
          <button
            className="purple-btn2"
            onClick={() => navigate("/create-event")}
          >
            <span className="material-symbols-outlined align-text-top"></span>
            Send To SAP Team
          </button>
        </div>
      </div>

      {/* {Main-card} */}
      <div className="card mx-3 mt-3">
        {/* {business bay card} */}
        <div className="card mx-3 mt-3">
          <div className="card-header3">
            <h3 className="card-title">Business Bay</h3>
            <div className="card-body">
              <div className="col-lg-6 col-md-6 col-sm-12 row px-3 ">
                <div className="col-6 ">
                  <label>Phone</label>
                </div>
                <div className="col-6">
                  <label className="text">
                    <span className="me-3">
                      <span className="text-dark">:</span>
                    </span>
                    NA
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {material-pr} */}
        <div className="card mx-3 mt-3">
          <div className="card-header3">
            <h3 className="card-title"> Quick Filter</h3>
            <div className="card-body">
              <h1>hii</h1>
            </div>
          </div>
        </div>

        {/Table Content/}
        <div className="tbl-container mt-3 px-3">
          <table className="w-100">
            <thead></thead>
            <tbody></tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center px-3 mt-2 mb-2">
          <ul className="pagination justify-content-center d-flex">
            <li className="page-item disabled">
              <button className="page-link">First</button>
            </li>
            <li className="page-item disabled">
              <button className="page-link">Prev</button>
            </li>
            <li className="page-item active">
              <button className="page-link">1</button>
            </li>
            <li className="page-item active">
              <button className="page-link">2</button>
            </li>
            <li className="page-item disabled">
              <button className="page-link">3</button>
            </li>
            <li className="page-item disabled">
              <button className="page-link">Next</button>
            </li>
            <li className="page-item disabled">
              <button className="page-link">Last</button>
            </li>
          </ul>

          <div>
            <p>Showing 0 to 0 of 0 entries</p>
          </div>
        </div>
      </div>

      <div className="row ms-2">
        <div className="col-md-6">
          <div className="form-group">
            <h5>
              Attchment <span />
            </h5>
            <input
              className="form-control"
              type="file"
              placeholder="Default input"
              onchange="uploadFile(this)"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoDetail;
