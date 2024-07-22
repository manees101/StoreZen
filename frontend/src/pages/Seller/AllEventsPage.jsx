import React from 'react'
import { DashboardHeader, DashboardSidebar, AllEvents } from '../../components'

const AllEventsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex w-full">
            <div className="w-[15%] md:w-[20%]  h-[90vh]">
              <DashboardSidebar active={5} />
            </div>
            <div className="w-[85%] md:w-[80%] justify-center flex">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default AllEventsPage