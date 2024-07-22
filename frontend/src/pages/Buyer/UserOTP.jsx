import axios from 'axios'
import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { server } from '../../server'
import { useNavigate,useParams } from 'react-router-dom'
const UserOTP = () => {
    const {email}=useParams()
    const [OTP, setOTP] = useState("")
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false)
    const handleSubmit=async()=>{
       setLoading(true)
        try
        {
          if(OTP==="" || OTP.length !==6)
            {
              toast.error("Please provide correct OTP")
              setLoading(false)
              return
            }
            
           await axios.post(`${server}/user/otp`,{otp:OTP,email},
           { withCredentials: true })
            navigate("/")
            window.location.reload()
        }
        catch(err)
        {
           toast.error(err.response.data.message)
        }
        setLoading(false)
    }
  return (
    <div className='h-screen w-full flex justify-center items-center flex-col gap-4'>
      <input type="text" className='w-[200px] h-[40px] border-[2px] border-black 
      rounded-md p-2' required value={OTP} 
      onChange={(e)=>setOTP(e.target.value)}/>
      <button onClick={(handleSubmit)} className='bg-secondary text-white hover:bg-primary px-4 py-2 rounded-md'>
       {loading ? "Loading..." : "Send"}
      </button>
    </div>
  )
}

export default UserOTP