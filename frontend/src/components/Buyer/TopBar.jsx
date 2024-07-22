import React,{useState} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
const TopBar = () => {
   const [search, setSearch] = useState("")
   const navigate=useNavigate()
  return (
    <div className='w-[95%] h-[80%] mx-auto flex'>
        <h1 className='font-bold text-[30px] text-primary w-[15%] h-full flexCenter'>
            <span className='text-secondary'>S</span>tore<span className='text-secondary'>Z</span>en
        </h1>
        <div className='w-[70%] flexCenter gap-2'>
          <input type="text" name="search" 
          id="search" 
          placeholder='Search Products'
          className='w-[70%] h-[70%] border-[2px] border-black rounded-full p-4'
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          />
          <button className='w-[80px] h-[40px] rounded-lg
           bg-primary md:text-[18px] text-[15px]
            text-white'
            onClick={()=>navigate(`/search/products?q=${search}`)}
            >
            search
          </button>
        </div>
        <div className='w-[15%] h-full flexCenter'>
        <Link to={'/seller/register'} className='w-[80%] h-[60%]'>
        <button className='text-white  rounded-lg bg-black w-full h-full flex items-center justify-center gap-2'>
           Become a seller <FaArrowRight/>
         </button>
        </Link> 
        </div>
    </div>
  )
}

export default TopBar