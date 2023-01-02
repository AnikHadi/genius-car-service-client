import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  useEffect(() => {
    const serviceCallback = async () => {
      const url = `http://localhost:5001/service/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setService(data);
    };
    serviceCallback();
  }, [id]);
  return (
    <div className="container mt-3">
      <h1 className="fw-bold">This is details: {service.name}</h1>
      <div className="d-flex justify-content-center">
        <div className="mt-5">
          <img style={{ width: "100%" }} src={service.img} alt="" />
          <h1 className="fw-normal">Name: {service.name}</h1>
          <p>Price: {service.price}</p>
          <p>Description: {service.details}</p>
        </div>
      </div>
      <Link to="/checkout">
        <p className="text-center mt-5">
          <Button variant="primary">Process CheckOut</Button>
        </p>
      </Link>
    </div>
  );
};

export default ServiceDetails;
