import { AiOutlineDashboard } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineCategory   } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AdminSidebar = ({ setActive, active }) => {
  console.log("admin sidebar")
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/user/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-secondary shadow-sm rounded-[10px] p-8 ml-3 text-white">
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 1 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(1)}
      >
        <AiOutlineDashboard size={20} />
        <span className={`pl-3 md:block hidden`}>Dashboard</span>
      </div>
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 2 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(2)}
      >
        <RiUser3Line size={20} />
        <span className={`pl-3 md:block hidden`}>Users</span>
      </div>
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 3 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(3)}
      >
        <HiOutlineShoppingBag size={20} />
        <span className={`pl-3 md:block hidden`}>Orders</span>
      </div>
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 4 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(4)}
      >
        <MdOutlineCategory size={20} />
        <span className={`pl-3 md:block hidden`}>Products</span>
      </div>
      {/* <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 5 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(5)}
      >
        <TbPackage size={20} />
        <span className={`pl-3 md:block hidden`}>Categories</span>
      </div>
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md  ${
          active === 6 ? "bg-primary" : ""
        }`}
        onClick={() => setActive(6)}
      >
        <MdOutlineReport size={20} />
        <span className={`pl-3 md:block hidden`}>Reports</span>
      </div> */}
      <div
        className={`single_item flex items-center hover:bg-primary cursor-pointer w-full mb-6 p-2 rounded-md`}
        onClick={logoutHandler}
      >
        <FiLogOut size={20} />
        <span className={`pl-3 md:block hidden`}>Log out</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
