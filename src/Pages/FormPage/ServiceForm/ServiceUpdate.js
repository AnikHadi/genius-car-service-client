import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    //Post service Data
    const url = `http://localhost:5001/serviceUpdate/${id}`;
    const serviceUpdateCallBack = async () => {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await res.json();
      if (result) {
        toast("Successfully update your Profile.");
      }
    };
    serviceUpdateCallBack();
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
                defaultValue={service.name}
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                defaultValue={service.img}
                {...register("img", { required: true })}
                type="text"
                placeholder="Enter your Photo URL"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                defaultValue={service.price}
                {...register("price", { required: true })}
                type="text"
                placeholder="Price"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              defaultValue={service.details}
              {...register("details", { required: true })}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Service Update
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ServiceUpdate;
