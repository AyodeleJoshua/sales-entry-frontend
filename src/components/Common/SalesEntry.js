import React, { useState } from "react";

const SalesEntry = () => {
  const [header, setHeader] = useState({
    // Header fields from header_table
    // Add necessary fields here
    companyName: "",
    date: "",
    // Add more fields as needed
  });

  const [details, setDetails] = useState([
    {
      // Detail fields for detail_table
      // Add necessary fields here
      item: "",
      quantity: 0,
      price: 0,
      // Add more fields as needed
    },
  ]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform data validation here
    if (
      !header.companyName ||
      !header.date ||
      details.some((d) => !d.item || d.quantity <= 0 || d.price <= 0)
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Save data to the database (you need to implement this part)

    // Clear the form after submission
    setHeader({
      // Header fields from header_table
      // Add necessary fields here
      companyName: "",
      date: "",
      // Add more fields as needed
    });
    setDetails([
      {
        // Detail fields for detail_table
        // Add necessary fields here
        item: "",
        quantity: 0,
        price: 0,
        // Add more fields as needed
      },
    ]);

    // Show a printable version of the saved voucher (you need to implement this part)
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <h1>Sales Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>HEADER</h2>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={header.companyName}
            onChange={handleHeaderChange}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={header.date}
            onChange={handleHeaderChange}
          />

          {/* Add more header fields as needed */}
        </div>

        <div>
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

              {index !== 0 && (
                <button type="button" onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddRow}>
            Add Row
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SalesEntry;
