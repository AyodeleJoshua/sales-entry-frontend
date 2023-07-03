import React from "react";

const Pagination = ({ tableDataLength, actionOnButtonClick }) => {
  const PAGE_SIZE = 9;
  const PAGE_BUTTON_LENGTH = tableDataLength / PAGE_SIZE;
  return (
    <div className="pagination">
      {tableDataLength > PAGE_SIZE + 1 && `showing 10 of ${tableDataLength}`}
      <div className="pagination-button-set">
        {new Array(Math.floor(PAGE_BUTTON_LENGTH))
          .fill(null)
          .map((arrValue, index) => (
            <button
              key={index}
              onClick={() => actionOnButtonClick(index + 1)}
              className="pagination-button"
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Pagination;
