import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/ecommerce-animation.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h2 className="font-bold">
        Loading...
      </h2>
    </div>
  );
};

export default Loader;