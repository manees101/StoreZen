import {useState} from 'react'
import {Header} from "../../components"
import styles from '../../styles/styles'
import AdminSidebar from '../../components/Admin/Sidebar'
import AdminContent from '../../components/Admin/AdminContent'
const AdminDashboard = () => {
  const [active, setActive] = useState(1)
  return (
    <div className='w-full h-screen overflow-y-scroll'>
      <div className='w-full h-[20%] flex items-center justify-center'>
        <h1 className='font-bold text-[30px]'>
          Admin Dashboard
        </h1>
      </div>
      <div className={`w-full ${styles.section} h-[80%] bg-[#f5f5f5] py-10 flex gap-8`}>
        <div className='w-[310px]'>
         <AdminSidebar active={active} setActive={setActive}/>
        </div>
        <div className='flex-1'>
        <AdminContent active={active}/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard