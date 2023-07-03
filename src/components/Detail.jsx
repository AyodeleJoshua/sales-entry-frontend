import React, { useState } from "react";
import { getDetailData } from "../api/services/requests";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";

const Detail = () => {
  const [userEntry, setUserEntry] = useState({
    desc: { value: "", touched: false, error: true, message: "" },
    qty: { value: 0, touched: false, error: true, message: "" },
    rate: { value: 0, touched: false, error: true, message: "" },
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-detail-data"],
    queryFn: getDetailData,
  });

  const [pagination, setPagination] = useState(1);
  const PAGE_SIZE = 9;

  const handleAddNewDetail = (e) => {
    e.preventDefault();
    if (!userEntry.desc.touched || userEntry.desc.error) {
      setUserEntry({
        ...userEntry,
        desc: {
          ...userEntry.desc,
          touched: true,
          error: true,
          message: "Field required or too short",
        },
      });
      return;
    }
    if (!userEntry.qty.touched) {
      setUserEntry({
        ...userEntry,
        qty: {
          ...userEntry.qty,
          touched: true,
          error: true,
          message: "Field required",
        },
      });
      return;
    }
    if (!userEntry.rate.touched) {
      setUserEntry({
        ...userEntry,
        rate: {
          ...userEntry.rate,
          touched: true,
          error: true,
          message: "Field required",
        },
      });
      return;
    }

    // MAKE API CALL TO ADD NEW DETAIL
  };

  const handleDetailDelete = (vrNumber) => {
    // MAKE API CALL TO DELETE HEADER HERE
  };

  return (
    <>
      <h2>DETAIL</h2>
      <form className="form-section" onSubmit={handleAddNewDetail}>
        <div className="form-field">
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            name="desc"
            id="desc"
            onChange={(e) => {
              setUserEntry({
                ...userEntry,
                desc: {
                  value: e.target.value,
                  touched: true,
                  error: e.target.value.length < 2,
                  message: e.target.value.length < 2 ? "Name too short" : "",
                },
              });
            }}
          />
          <small className="error-meassage">
            {userEntry.desc.error && userEntry.desc.message}
          </small>
        </div>

        <div className="form-field">
          <label htmlFor="qty">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="qty"
            onChange={(e) => {
              setUserEntry({
                ...userEntry,
                qty: {
                  ...userEntry.qty,
                  value: parseInt(e.target.value),
                  touched: true,
                  error: !parseInt(e.target.value),
                  message: !parseInt(e.target.value) ? "Input number" : "",
                },
              });
            }}
          />
          <small className="error-meassage">
            {userEntry.qty.error && userEntry.qty.message}
          </small>
        </div>

        <div className="form-field">
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            name="rate"
            id="rate"
            onChange={(e) => {
              setUserEntry({
                ...userEntry,
                rate: {
                  ...userEntry.qty,
                  value: parseInt(e.target.value),
                  touched: true,
                  error: !parseInt(e.target.value),
                  message: !parseInt(e.target.value) ? "Input number" : "",
                },
              });
            }}
          />
          <small className="error-meassage">
            {userEntry.rate.error && userEntry.rate.message}
          </small>
        </div>
        <button>Add new detail</button>
      </form>

      {isLoading && "Loading Detail..."}
      {isError && "Detail fetching error"}
      {!isLoading && !isError && data && (
        <div>
          <table tabIndex="1" width="100%">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && "No detail found"}
              {data
                .slice(
                  (pagination - 1) * (PAGE_SIZE + 1),
                  pagination * (PAGE_SIZE + 1)
                )
                .map((row, i) => {
                  return (
                    <tr key={i}>
                      <td>{row.item_code}</td>
                      <td>{row.item_name}</td>
                      <td>{row.description}</td>
                      <td>{row.qty}</td>
                      <td>{row.rate}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDetailDelete(row.vr_no)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            tableDataLength={data?.length}
            actionOnButtonClick={(pageNumber) => setPagination(pageNumber + 1)}
          />
        </div>
      )}
    </>
  );
};

export default Detail;
