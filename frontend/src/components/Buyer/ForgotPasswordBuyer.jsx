import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPasswordBuyer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  // const [loading, setLoading] = useState(false)
  const [isSending, setIsSending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleEmail = async () => {
    setIsSending(true);
    axios
      .get(`${server}/user/forgotPassword/${email}`)
      .then((response) => {
        setIsSending(false);
        setIsVisible(true);
        toast(response.data.message);
      })
      .catch((err) => {
        setIsSending(false);
        toast(err.response.message);
      });
  };
  const handleOTP = async () => {
    setIsSubmitting(true);
    axios
      .post(`${server}/user/forgotOTP`, { otp: OTP, email })
      .then((response) => {
        toast(response.data.message);
        setIsSubmitting(false);
        navigate(`/user/reset-password/${email}`);
      })
      .catch((err) => {
        toast(err.response.message);
        setIsSubmitting(false);
      });
  };
  return (
    <div className="h-screen w-full flex justify-center mt-8">
      <div className=" w-[40%] h-[100px] flex flex-col gap-4">
        <h1 className=" font-bold text-[20px]">Forgot Password</h1>
        <p>
          Please enter your email. we will send an OTP to reset your password
        </p>
        <div className="grid grid-cols-4 gap-2">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email address"
            className=" col-span-3 p-2 border-[2px] rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="p-2 col-span-1 rounded-lg bg-secondary hover:bg-primary
         text-white disabled:bg-gray-500"
            onClick={handleEmail}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
        {isVisible && (
          <div className="grid grid-cols-4 gap-2">
            <input
              type="number"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
              required
              className=" col-span-3 p-2 border-[2px] rounded-lg"
            />
            <button
              className="p-2 col-span-1 rounded-lg
         bg-black text-white hover:bg-gray-800"
              onClick={handleOTP}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordBuyer;
