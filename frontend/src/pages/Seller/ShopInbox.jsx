
import { DashboardMessages, DashboardSidebar } from '../../components'
const ShopInbox = () => {
  return (
    <div className='flex w-full justify-between items-start'>
       <div className='md:w-[20%] w-[15%] h-screen'>
           <DashboardSidebar active={8}/>
       </div>
       <div className='md:w-[80%] w-[85%]'>
        <DashboardMessages/>
       </div>
    </div>
  )
}

export default ShopInbox