import React from 'react'
import { DashboardHeader,DashboardSidebar,AllOrders } from '../../components'
const AllOrdersPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className=" flex w-full">
        <div className=" w-[15%] md:w-[20%] h-[90vh]">
          <DashboardSidebar active={2} />
        </div>
        <div className=" w-[85%] md:w-[80%] justify-center flex">
           <AllOrders />
        </div>
      </div>
</div>
  )
}

export default AllOrdersPage