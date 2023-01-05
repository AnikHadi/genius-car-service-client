import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpertUpdate = () => {
  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();
  const [expert, setExpert] = useState({});
  useEffect(() => {
    const expertCallBack = async () => {
      const url = `http://localhost:5001/expert/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setExpert(data);
    };
    expertCallBack();
  }, [id]);

  const onSubmit = (data) => {
    // console.log(data);

    //Post Expert Data
    const addExpertCallBack = async () => {
      const url = `http://localhost:5001/expertUpdate/${id}`;
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const expertAddResult = await res.json();
      if (expertAddResult.modifiedCount > 0) {
        console.log(expertAddResult);
        toast("Expert details Update successfully.");
        reset();
      }
    };
    addExpertCallBack();
  };

  return (
    <div className="w-50 container shadow-sm p-3 mb-5 bg-body-tertiary rounded border border-0 mt-4">
      <h1 className="text-center m-3">Expert Update form</h1>
      <div className="mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={expert.name}
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter your Name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                defaultValue={expert.img}
                {...register("img", { required: true })}
                type="text"
                placeholder="Enter your Photo URL"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Expert Details textarea</Form.Label>
            <Form.Control
              defaultValue={expert.details}
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

export default ExpertUpdate;
