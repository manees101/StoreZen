import React from 'react'
import { DashboardHeader, DashboardSidebar, CreateProduct } from '../../components'
const CreateProductPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex w-full">
            <div className="w-[5%] md:w-[20%] h-[90vh]">
              <DashboardSidebar active={4} />
            </div>
            <div className="w-[95%] md:w-[80%] justify-center flex">
                <CreateProduct />
            </div>
          </div>
    </div>
  )
}

export default CreateProductPage