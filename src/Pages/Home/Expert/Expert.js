import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Expert = () => {
  const [expert, setExpert] = useState([]);
  useEffect(() => {
    const serviceCallback = async () => {
      const res = await fetch("http://localhost:5001/expert");
      const data = await res.json();
      setExpert(data);
    };
    serviceCallback();
  }, []);
  return (
    <div id="expert" className="container">
      <h1 className="text-center text-primary mt-5">Our Experts</h1>
      <div className="row d-flex ms-5">
        {" "}
        {expert.map((expert) => {
          return (
            <div
              className="col-12 col-sm-6 cal-md-6 col-lg-4 mt-4"
              key={expert._id}
            >
              <Card style={{ width: "80%" }} className="col">
                <Card.Img height={"280px"} variant="top" src={expert.img} />
                <Card.Body>
                  <Card.Title>{expert.name}</Card.Title>
                  <Card.Text
                    style={{ height: "80px" }}
                    className="overflow-auto"
                  >
                    {expert.details}
                  </Card.Text>
                  <Button
                    className="mt-1"
                    as={Link}
                    to={`/expert/${expert._id}`}
                    variant="primary"
                  >
                    Book: {expert.name}
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

export default Expert;
