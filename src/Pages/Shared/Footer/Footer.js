import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center mt-5">
      <p>
        &copy; {year} Author: <span className="fw-semibold">MD Hadi</span> IT
        Solution Production.
      </p>
    </div>
  );
};

export default Footer;
