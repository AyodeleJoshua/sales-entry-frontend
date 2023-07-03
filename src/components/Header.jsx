import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { format } from "date-fns";
import { getHeader } from "../api/services/requests";
import Pagination from "./Pagination";

const Header = () => {
  const [userEntry, setUserEntry] = useState({
    accName: { value: "", touched: false, error: true, message: "" },
    status: { value: "", error: false, touched: false, message: "" },
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-header"],
    queryFn: getHeader,
  });
  const [pagination, setPagination] = useState(1);
  const PAGE_SIZE = 9;

  const handleAddNewHeader = (e) => {
    e.preventDefault();
    if (!userEntry.accName.touched || userEntry.accName.error) {
      setUserEntry({
        ...userEntry,
        accName: {
          ...userEntry.accName,
          touched: true,
          error: true,
          message: "Field required or too short",
        },
      });
      return;
    }

    if (!userEntry.status.touched || userEntry.status.error) {
      setUserEntry({
        ...userEntry,
        status: {
          ...userEntry.status,
          touched: true,
          error: true,
          message: "Field required",
        },
      });
      return;
    }

    // TODO: MAKE API CALL TO ADD HEADER TO TABLE CREATED
  };

  const handleHeaderDelete = (vrNumber) => {
    // MAKE API CALL TO DELETE HEADER HERE
  };

  return (
    <div className="header-seection">
      <h2>HEADER</h2>

      <form className="form-section" onSubmit={handleAddNewHeader}>
        <div className="form-field">
          <label htmlFor="acc-name">Account Name:</label>
          <input
            type="text"
            id="acc-name"
            name="accountname"
            value={userEntry.accName.value}
            onChange={(e) => {
              setUserEntry({
                ...userEntry,
                accName: {
                  value: e.target.value,
                  touched: true,
                  error: e.target.value.length < 2,
                  message: e.target.value.length < 2 ? "Name too short" : "",
                },
              });
            }}
          />
          <small className="error-meassage">
            {userEntry.accName.error && userEntry.accName.message}
          </small>
        </div>

        <div className="form-field">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            id="status"
            onChange={(e) => {
              setUserEntry({
                ...userEntry,
                status: {
                  value: e.target.value,
                  touched: true,
                  error: e.target.value === "Select status",
                  message:
                    e.target.value.length > 0 ? "Please select status" : "",
                },
              });
            }}
          >
            <option value="" disabled hidden>
              Select status
            </option>
            <option>Select status</option>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
          <small className="error-meassage">
            {userEntry.status.error && userEntry.status.message}
          </small>
        </div>
        <button>Add new header</button>
      </form>

      {isLoading && "Loading header..."}
      {isError && "Header fetching error"}
      {!isLoading && !isError && data && (
        <div>
          <table tabIndex="1" width="100%">
            <thead>
              <tr>
                <th>VR No.</th>
                <th>VR Date</th>
                <th>Ac Name</th>
                <th>Ac Amount</th>
                <th>Ac Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && "No header found"}
              {data
                .slice(
                  (pagination - 1) * (PAGE_SIZE + 1),
                  pagination * (PAGE_SIZE + 1)
                )
                .map((row) => {
                  return (
                    <tr key={row.vr_no}>
                      <td>{row.vr_no}</td>
                      <td>{format(new Date(row.vr_date), "EEEE, 	io MMM y")}</td>
                      <td>{row.ac_name}</td>
                      <td>{row.ac_amt}</td>
                      <td>{row.status}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleHeaderDelete(row.vr_no)}
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
    </div>
  );
};

export default Header;
