import React from 'react'
import { StyledDetail } from './Detail.styled';

const Detail = ({ details, setDetails }) => {

  const handleDetailChange = (e, index) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: value,
      };
      return updatedDetails;
    });
  };

  const handleAddRow = () => {
    setDetails((prevDetails) => [
      ...prevDetails,
      {
        // Detail fields for detail_table
        // Add necessary fields here
        item: "",
        quantity: 0,
        price: 0,
        // Add more fields as needed
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails.splice(index, 1);
      return updatedDetails;
    });
  };

  return (
    <StyledDetail>
      <h2>DETAIL</h2>
          {details.map((detail, index) => (
            <div key={index}>
              <label>Item:</label>
              <input
                type="text"
                name="item"
                value={detail.item}
                onChange={(e) => handleDetailChange(e, index)}
              />

              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={detail.quantity}
                onChange={(e) => handleDetailChange(e, index)}
              />

              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={detail.price}
                onChange={(e) => handleDetailChange(e, index)}
              />

              {/* Add more detail fields as needed */}

              { index !== 0 && (
                <button type="button" onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddRow}>
            Add Row
          </button>
    </StyledDetail>
  )
}

export default Detail
