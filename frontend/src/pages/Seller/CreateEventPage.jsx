import React from 'react'
import { DashboardHeader,DashboardSidebar,CreateEvent } from '../../components'

const CreateEventsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center w-full">
      <div className=" w-[15%] md:w-[20%] h-[90vh]">
        <DashboardSidebar active={6} />
      </div>
      <div className="w-[85%] md:w-[80%] justify-center flex">
        <CreateEvent />
      </div>
    </div>
    </div>
  )
}

export default CreateEventsPage