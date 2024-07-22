import React,{useEffect} from 'react'
import {Login} from '../../components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UserLogin = () => {
  const navigate=useNavigate()
  const {isAuthenticated}=useSelector(state=>state.user)

  useEffect(()=>{
   if(isAuthenticated)
    {
      navigate("/")
    }
  },[])
  return (
    <div className=''>
      <Login/>
    </div>
  )
}

export default UserLogin