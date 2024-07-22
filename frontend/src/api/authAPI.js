import axios from "axios";

const authAPI=new axios.create({baseURL:"/api/v1"})

authAPI.registerUser=async({userData})=>{
   try
   {
      const result=await authAPI.post("/user/register",userData)
      console.log(result)
   }
   catch(err)
   {
     console.log(err)
   }
}

export default authAPI;