import React from "react";
import { Header } from "../../components";
import Lottie from "react-lottie";
import animationData from "../../assets/success.json";
import { useNavigate } from "react-router-dom";

const OrderSuccess= () => {
  const navigate=useNavigate()
  return (
    <div>
      <Header />
      <Success />
      <div className="mt-2 w-full flex justify-center">
      <button className="p-2 bg-secondary rounded-md text-white font-semibold"
      onClick={()=>navigate("/products")}
      >
        Continue Shopping
      </button>
      </div>
    </div>
  );
};

const Success = () => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccess;