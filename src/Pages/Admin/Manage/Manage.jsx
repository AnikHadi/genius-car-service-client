import React from "react";
import { Link } from "react-router-dom";

const Manage = () => {
  return (
    <div className="w-75 mx-auto mt-4">
      <h2 className="text-center">This is Admin Manage page</h2>
      <div className="mt-4">
        <h3>Edit services Section</h3>
        <Link to="allService">Show all Service</Link> <br />
        <Link to="serviceAdd">Add Service</Link>
      </div>
      <div className="mt-5">
        <h3>Edit Expert Section</h3>
        <Link to="allExpert">Show all Expert</Link> <br />
        <Link to="addExpert">Add Expert</Link>
      </div>
    </div>
  );
};

export default Manage;
