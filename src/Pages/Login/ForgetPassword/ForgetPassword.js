import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

const ForgetPassword = (props) => {
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState("");

  if (sending) {
    return <Loading />;
  }

  const resetPassword = async () => {
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast("Sent email");
      setTimeout(() => {
        props.onHide();
      }, 3000);
      setEmail("");
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Your Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter your Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={resetPassword}>
          Send Reset Password
        </Button>
        <ToastContainer />
      </Modal.Footer>
    </Modal>
  );
};

export default ForgetPassword;
