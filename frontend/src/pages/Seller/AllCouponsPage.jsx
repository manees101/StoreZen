import React from 'react'
import { DashboardHeader, DashboardSidebar, AllCoupons } from '../../components'

const AllCoupounsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[15%] md::w-[20%] h-[90vh]">
              <DashboardSidebar active={9} />
            </div>
            <div className="w-[85%]  md:w-[80%] justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default AllCoupounsPage