import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowAllService = () => {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleClose = () => setShow(false);

  const [services, setServices] = useState([]);
  useEffect(() => {
    const serviceCallback = async () => {
      const res = await fetch("http://localhost:5001/service");
      const data = await res.json();
      setServices(data);
    };
    serviceCallback();
  }, []);

  const handleDelete = (id) => {
    setShow(true);
    setDeleteId(id);
  };

  const handleDeleteItem = async () => {
    const url = `http://localhost:5001/serviceDelete/${deleteId}`;
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    if (data.deletedCount > 0) {
      const remaining = services.filter((ser) => ser._id !== deleteId);
      setServices(remaining);
      toast("Successfully deleted this service.");
    }
    setShow(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">All services</h2>
      <div id="service" className="container ">
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
                      {service.name}
                    </Button>
                    <Button
                      className="ms-5"
                      as={Link}
                      to={`/manage/serviceUpdate/${service._id}`}
                      variant="primary"
                    >
                      Update
                    </Button>
                    <Button
                      className=" ms-4 p-1"
                      style={{ width: "35px" }}
                      onClick={() => handleDelete(service._id)}
                      variant="danger"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              // </div>
            );
          })}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure, You want to delete this service?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDeleteItem} variant="danger">
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowAllService;
