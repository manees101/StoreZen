import React, { useState } from "react";
import AdminSidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Orders from "./Orders";
import Products from "./Products";

const AdminContent = ({active}) => {
//   const [active, setActive] = useState(1);
  console.log("active",active)
  const renderContent = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Users />;
      case 3:
        return <Orders />;
      case 4:
        return <Products />;
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
};

export default AdminContent;
