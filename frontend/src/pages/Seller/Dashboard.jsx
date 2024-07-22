import React from "react";
import { DashboardHeader,DashboardSidebar,DashboardHero } from "../../components";

const ShopDashboard = () => {
  return (
        <div className="w-full">
          <DashboardHeader />
          <div className="w-full flex">
            <div className="w-[20%] h-[90vh]">
              <DashboardSidebar active={1} />
            </div>
            <div className="w-[80%]">
            <DashboardHero />
            </div>
          </div>
        </div>
  );
};

export default ShopDashboard;