import React from "react";
import { StyledHeader } from "./Header.styled";

const Header = ({ header, setHeader }) => {
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };
  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

export default Header;
