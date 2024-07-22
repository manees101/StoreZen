import React from 'react'
import { DashboardHeader, DashboardSidebar,AllProducts } from '../../components'
const AllProductsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex w-full">
            <div className=" w-[15%] md:w-[20%] h-[90vh]">
              <DashboardSidebar active={3} />
            </div>
            <div className="w-[85%] md:w-[80%] justify-center flex">
                <AllProducts />
            </div>
          </div>
    </div>
  )
}

export default AllProductsPage