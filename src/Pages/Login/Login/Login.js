import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";

const Login = () => {
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
  const eye = <FontAwesomeIcon icon={faEye} />;
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [passwordShown, setPasswordShown] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (error) {
    toast(error?.message);
  }

  if (loading) {
    return <Loading />;
  }

  if (user) {
    navigate(from, { replace: true });
  }

  const passErrorMsg = () => {
    if (errors.password || errors.ConfirmPassword) {
      // return (
      //   <p className="text-danger">
      //     Use at least 8 character 1 Upper case later 1 Number and 1 special
      //     character
      //   </p>
      // );
      toast(
        "Use at least 8 character 1 Upper case later 1 Number and 1 special   character"
      );
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/.test(password)) {
      if (password) {
        const success = await signInWithEmailAndPassword(email, password);
        if (success) {
          console.log(data);
          toast("You are successfully Login");
          reset();
        }
      } else {
        toast("Please enter your password!");
      }
    }
  };

  return (
    <div className="register-form  mx-auto">
      <h2 className="text-primary text-center mt-5">Please Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <p className="ps-2 pb-1">
          Create Your Account? <Link to="/register">Please Register</Link>
        </p>
        {/* <p className="ps-2 pb-1">
          Forget your Password? <Link to="/forgetPassword">Reset Password</Link>
        </p> */}
        <div>
          <div className="link-btn ps-2 pb-1">
            <span>
              Forget your Password?{" "}
              <Link to="" onClick={() => setModalShow(true)}>
                Reset Password
              </Link>
            </span>
          </div>
          <ForgetPassword show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        {passErrorMsg()}
        <input type="submit" value="Login" />
      </form>
      <SocialLogin />
      <ToastContainer />
    </div>
  );
};

export default Login;
