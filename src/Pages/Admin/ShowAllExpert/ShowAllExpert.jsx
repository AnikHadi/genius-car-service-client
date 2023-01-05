import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowAllExpert = () => {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleClose = () => setShow(false);

  const [expert, setExpert] = useState([]);
  useEffect(() => {
    const serviceCallback = async () => {
      const res = await fetch("http://localhost:5001/expert");
      const data = await res.json();
      setExpert(data);
    };
    serviceCallback();
  }, []);

  const handleDelete = (id) => {
    setShow(true);
    setDeleteId(id);
  };

  const handleDeleteItem = async () => {
    const url = `http://localhost:5001/expertDelete/${deleteId}`;
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    if (data.deletedCount > 0) {
      const remaining = expert.filter((ser) => ser._id !== deleteId);
      setExpert(remaining);
      toast("Successfully deleted this Expert.");
    }
    setShow(false);
  };

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
                    {expert.name}
                  </Button>
                  <Button
                    className="ms-3 mt-1"
                    as={Link}
                    to={`/manage/expertUpdate/${expert._id}`}
                    variant="success"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    className=" ms-4 p-1"
                    style={{ width: "35px" }}
                    onClick={() => handleDelete(expert._id)}
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
        <Modal.Body>Are you sure, You want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteItem} variant="danger">
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ShowAllExpert;
