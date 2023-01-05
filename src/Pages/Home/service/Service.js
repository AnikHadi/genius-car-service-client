import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Service = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const serviceCallback = async () => {
      const res = await fetch("http://localhost:5001/service");
      const data = await res.json();
      setServices(data);
    };
    serviceCallback();
  }, []);
  return (
    <div id="service" className="container ">
      <h1 className="text-center text-primary mt-4">Our Services</h1>
      <div className="row">
        {" "}
        {/* d-flex flex-row */}
        {services.map((service) => {
          return (
            // <div className=" mt-5">
            <div
              className="col-12 col-sm-6 cal-md-6 col-lg-4 mt-4"
              key={service._id}
            >
              <Card style={{ width: "100%" }} className="col">
                <Card.Img
                  style={{ height: "235px" }}
                  variant="top"
                  src={service.img}
                />
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>Price: {service.price}</Card.Text>
                  <Card.Text
                    style={{ height: "100px" }}
                    className="overflow-auto"
                  >
                    {service.details}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/service/${service._id}`}
                    variant="primary"
                  >
                    Book: {service.name}
                  </Button>
                </Card.Body>
              </Card>
            </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
