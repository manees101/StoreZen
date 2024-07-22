import React from "react";
import { DashboardHeader, DashboardSidebar, ShopSettings } from "../../components";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[15%] md:w-[20%] h-[90vh]">
          <DashboardSidebar active={11} />
        </div>
        <div className="w-[85%] md:w-[80%]">
        <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
