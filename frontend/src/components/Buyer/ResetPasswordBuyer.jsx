import {useState} from 'react'
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import styles from '../../styles/styles'
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordBuyer = () => {
  const {email}=useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
   const passwordResetHandler = async (e) => {
    e.preventDefault();
    
    await axios
      .patch(
        `${server}/user/resetPassword`,
        { password, confirmPassword,email },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        navigate("/user/login")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false)
      });
      
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Reset Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={(e)=>{passwordResetHandler(e); setLoading(true)}}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] md:w-[50%] mt-5">
            <label className="block pb-2">Email</label>
            <input
              type="email"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={email}
              disabled
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={`w-[95%] h-[40px] border disabled:bg-gray-500 disabled:text-white border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              type="submit"
              disabled={loading}
            >
             {loading ? "Loading...":"Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordBuyer