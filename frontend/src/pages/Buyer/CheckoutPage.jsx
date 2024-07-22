import React from "react";
import { Checkout, CheckoutSteps, Header } from "../../components";
const CheckoutPage = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-[20%]">
        <Header />
      </div>
      <div className="w-full">
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
      </div>
    </div>
  );
};

export default CheckoutPage;
