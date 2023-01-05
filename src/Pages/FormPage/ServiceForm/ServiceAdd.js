import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceAdd = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    //Post service Data
    fetch("http://localhost:5001/serviceAdd", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Service Add successfully");
      });
  };

  return (
    <div className="w-50 container shadow-sm p-3 mb-5 bg-body-tertiary rounded border border-0 mt-4">
      <h1 className="text-center m-3">Service Add form</h1>
      <div className="mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                {...register("img", { required: true })}
                type="text"
                placeholder="Enter your Photo URL"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                {...register("price", { required: true })}
                type="text"
                placeholder="Price"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              {...register("details", { required: true })}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ServiceAdd;
