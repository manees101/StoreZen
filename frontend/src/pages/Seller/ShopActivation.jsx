import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { server } from "../../server";

const ShopActivation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        axios
          .post(`${server}/seller/activation`, {
            activationToken:activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
     <p>Your token is expired!</p>
       ) : (
        <div className="w-full h-full flex  flex-col items-center justify-center gap-4">

            <p>Your account has been created suceessfully!</p>
            <button className=" h-[40px] p-2 font-bold texxt-[15px] md:text-[20px]
             bg-secondary text-white rounded-lg text-center"
             onClick={()=>{navigate("/dashboard");window.location.reload()}}
             >Go to dashboard</button>
        </div>
      )}
    </div>
  );
};

export default ShopActivation;