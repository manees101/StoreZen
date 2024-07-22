import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full bg-secondary h-full text-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className={`w-[80%] p-1 flex items-center ${
              active === 1 ? "bg-primary rounded-md" : ""
            }`}>
          <RxDashboard
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] `}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/orders" className={`w-[80%] p-1 flex items-center rounded-md
        ${active ===2 ? "bg-primary":""}
        `}>
          <FiShoppingBag
            size={30}
            color={'#fff'}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/products" className={`w-[80%] p-1 rounded-md flex items-center
        ${active ===3 ? "bg-primary":""}
        `}>
          <FiPackage size={30} color={`#fff`} />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/create-product"
          className={`w-[80%] rounded-md p-1 flex items-center
          ${active===4 ? "bg-primary":""}
          `}
        >
          <AiOutlineFolderAdd
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/events" className={`w-[80%] rounded-md p-1 flex items-center
        ${active===5 ? "bg-primary":""}
        `}>
          <MdOutlineLocalOffer
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/create-event" className={`w-[80%] rounded-md p-1 flex items-center
        ${active ===6 ? "bg-primary":""}
        `}>
          <VscNewFile
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard/withdraw-money"
          className={`w-[80%] rounded-md p-1 flex items-center
          ${active === 7 ? "bg-primary" : ""}
          `}
        >
          <CiMoneyBill
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/messages" className={`w-[80%] p-1 rounded-md flex items-center
        ${active === 8 ? "bg-primary" : ""}
        `}>
          <BiMessageSquareDetail
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/coupons" className={`w-full rounded-md p-1 flex items-center
        ${active === 9 ? "bg-primary" : ""}
        `}>
          <AiOutlineGift
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/refunds" className={`w-[80%] flex items-center rounded-md p-1
        ${active === 10 ? "bg-primary" : ""}
        `}>
          <HiOutlineReceiptRefund
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/settings" className={`w-[80%] rounded-md p-1 flex items-center
        ${active === 11 ? "bg-primary" : ""}
        `}>
          <CiSettings
            size={30}
            color={`#fff`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400]`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;