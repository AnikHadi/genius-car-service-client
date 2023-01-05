import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./register.css";

const Register = () => {
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
  const eye = <FontAwesomeIcon icon={faEye} />;

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShownC, setPasswordShownC] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, error1] = useUpdateProfile(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (error || error1) {
    toast(error?.message);
    toast(error1?.message);
  }

  if (loading || updating) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    const { name, email, password, ConfirmPassword } = data;

    if (/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/.test(password)) {
      if (password === ConfirmPassword) {
        const success = await createUserWithEmailAndPassword(email, password);
        if (success) {
          await updateProfile({ displayName: name });
          toast("Sent email Verification");
          reset();
        }
      } else {
        toast("Your password didn't match!");
      }
    } else {
      toast(
        "Use at least 8 character 1 Upper case later 1 Number and 1 special character"
      );
    }
  };

  return (
    <div className="register-form  mx-auto">
      <h2 className="text-primary text-center mt-5">Please Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="ps-2 pb-1 fw-semibold">{"Name"}</label>
        <input
          type={"name"}
          placeholder="Enter your Name"
          //   defaultValue="test"
          {...register("name", { required: true })}
        />
        <label className="ps-2 pb-1 fw-semibold">{"Email"}</label>
        <input
          type={"email"}
          placeholder="Email"
          //   defaultValue="test"
          {...register("email", { required: true })}
        />
        {errors.email && <p className="text-danger">This field is required</p>}
        <label className="ps-2 pb-1 fw-semibold">{"Password"}</label>
        <div className="pass-wrapper">
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
          />{" "}
          <i onClick={() => setPasswordShown(passwordShown ? false : true)}>
            {passwordShown ? eye : eyeSlash}
          </i>
        </div>

        <label className="ps-2 pb-1 fw-semibold">{"Confirm Password"}</label>
        <div className="pass-wrapper">
          <input
            type={passwordShownC ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("ConfirmPassword", { required: true })}
          />{" "}
          <i onClick={() => setPasswordShownC(passwordShownC ? false : true)}>
            {passwordShownC ? eye : eyeSlash}
          </i>
        </div>
        <p className="ps-2 pb-1">
          Already have an account? <Link to="/login">Please Login</Link>
        </p>
        <input
          type="submit"
          className="mx-auto btn btn-primary text-white mt-2"
          value="Register"
        />
      </form>
      <SocialLogin />
      <ToastContainer />
    </div>
  );
};

export default Register;
