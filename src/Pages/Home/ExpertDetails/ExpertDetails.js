import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExpertDetails = () => {
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
  return (
    <div className="container mt-5 d-flex justify-contain-center">
      <div className="mx-auto">
        <img style={{ width: "80%" }} src={expert.img} alt="" />
        <h1 className="mt-3"> {expert.name}</h1>
        <p>{expert.details}</p>
        <p className="text-center mt-4">
          <button
            className="btn w-50 btn-primary"
            onClick={() => {
              "";
            }}
          >
            Contact
          </button>
        </p>
      </div>
    </div>
  );
};

export default ExpertDetails;
