import {useState} from 'react'
import {Header} from "../../components"
import styles from '../../styles/styles'
import ProfileSidebar from '../../components/Buyer/ProfileSidebar'
import ProfileContent from '../../components/Buyer/ProfileContent'
const UserProfile = () => {
  const [active, setActive] = useState(1)
  return (
    <div className='w-full h-screen overflow-y-scroll'>
      <div className='w-full h-[20%]'>
        <Header/>
      </div>
      <div className={`w-full ${styles.section} bg-[#f5f5f5] py-10 flex gap-8`}>
        <div className='w-[310px]'>
         <ProfileSidebar active={active} setActive={setActive}/>
        </div>
        <div className='flex-1'>
        <ProfileContent active={active}/>
        </div>
      </div>
    </div>
  )
}

export default UserProfile