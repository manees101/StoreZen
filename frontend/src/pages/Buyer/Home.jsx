
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Buyer/Layout/Header'
const Home = () => {
    const navigate=useNavigate()
  return (
    <div className='w-full h-screen'>
      <div className='w-full h-[20%]'>
      <Header activeHeading={1}/>
      </div>
      
      <div className='flex flex-col items-center w-[100%] h-[80%] gap-4 justify-center'>
        <h1 className='text-secondary text-[40px] font-semibold'>
            Every purchase will be<br/> made with pleasure
        </h1>
        <h1 className='text-[35px] font-semibold'>
            Enjoy buying and selling<br/> with StoreZen
        </h1>
        <button className='w-[150px] h-[40px] rounded-full
         text-white font-bold flex items-center
          justify-center bg-primary'
          onClick={()=>navigate("/products")}
          >
            Start Shoppping
        </button>
      </div>
    </div>
  )
}

export default Home