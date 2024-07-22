import React,{useEffect} from 'react'
import {Register} from '../../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserRegisteration = () => {
  const navigate=useNavigate()
  const {isAuthenticated}=useSelector(state=>state.user)

  useEffect(()=>{
   if(isAuthenticated)
    {
      navigate("/")
    }
  },[])
  return (
    <div className='w-full h-full'>
        <Register/>
    </div>
  )
}

export default UserRegisteration