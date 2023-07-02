import React, { useState } from "react";
import { StyledApp } from "./App.styled";
import Header from "./components/Header";
import Detail from "./components/Detail";

const App = () => {
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
  };
  return (
    <StyledApp>
      <h1>Sales Entry</h1>
      <form onSubmit={handleSubmit}>
        <Header header={header} setHeader={setHeader} />
        <Detail details={details} setDetails={setDetails} />
        <button type="submit">Submit</button>
      </form>
    </StyledApp>
  );
};

export default App;
