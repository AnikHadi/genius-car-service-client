import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpertAdd = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);

    //Post Expert Data
    const addExpertCallBack = async () => {
      const res = await fetch("http://localhost:5001/expertAdd", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const expertAddResult = await res.json();
      if (expertAddResult) {
        // console.log(expertAddResult);
        toast("New Expert details added successfully.");
      }
    };
    addExpertCallBack();
  };

  return (
    <div className="w-50 container shadow-sm p-3 mb-5 bg-body-tertiary rounded border border-0 mt-4">
      <h1 className="text-center m-3">Expert Add form</h1>
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
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Expert Details textarea</Form.Label>
            <Form.Control
              {...register("details", { required: true })}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Expert Details
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExpertAdd;
