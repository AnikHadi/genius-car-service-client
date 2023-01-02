import React from "react";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Shared/Loading/Loading";
import auth from "./../../../firebase.init";
import facebook from "./../../../images/social/facebook.png";
import github from "./../../../images/social/github.png";
import google from "./../../../images/social/google.png";
import "./SocialLogin.css";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const [signInWithFacebook, user2, loading2, error2] =
    useSignInWithFacebook(auth);

  const errorMsg = async () => {
    if (error || error1 || error2) {
      await toast(error?.message);
      await toast(error1?.message);
      await toast(error2?.message);
      // return (
      //   <div>
      //     <p>
      //       Error: {error?.message} {error1?.message} {error2?.message}
      //     </p>
      //   </div>
      // );
    }
  };

  errorMsg();

  if (loading || loading1 || loading2) {
    return <Loading />;
  }
  if (user || user1 || user2) {
    toast(user?.email);
    toast(user1?.email);
    toast(user2?.email);
    // return (
    //   <div>
    //     <p>
    //       Signed In User: {user?.email} {user1?.email} {user2?.email}
    //     </p>
    //   </div>
    // );
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>

      <div className="social-login mx-auto my-4">
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-info w-50 d-block mx-auto mb-2"
        >
          <img style={{ width: "30px" }} src={google} alt="" />
          <span className="px-2">Google Sign In</span>
        </button>
        <button
          onClick={() => signInWithFacebook()}
          className="btn btn-info w-50 d-block mx-auto mb-2"
        >
          <img style={{ width: "30px" }} src={facebook} alt="" />
          <span className="px-2">Facebook Sign In</span>
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-info w-50 d-block mx-auto"
        >
          <img style={{ width: "30px" }} src={github} alt="" />
          <span className="px-2">Github Sign In</span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SocialLogin;
