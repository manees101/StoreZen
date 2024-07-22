
import {  AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);
 console.log(user)
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
        <RxPerson size={20} />
        <span
          className={`pl-3  md:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 2 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} />
        <span
          className={`pl-3  md:block hidden`}
        >
          Orders
        </span>
      </div>
      {/* <div
        className={`flex items-center cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 3 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "primary" : ""} />
        <span
          className={`pl-3 md:block hidden`}
        >
          Reviews
        </span>
      </div> */}

      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 4 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} />
        <span
          className={`pl-3  md:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 5 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} />
        <span
          className={`pl-3 md:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 6 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} />
        <span
          className={`pl-3 md:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md  ${
            active === 7 ? "bg-primary" : ""
          }
        `}
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} />
        <span
          className={`pl-3 md:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className={`flex items-center hover:bg-primary cursor-pointer w-full mb-6
            
            `}
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
            />
            <span
              className={`pl-3 md:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className={`single_item flex items-center hover:bg-primary cursor-pointer w-full mb-6
        p-2 rounded-md
        `}
        onClick={logoutHandler}
      >
        <FiLogOut size={20} />
        <span
          className={`pl-3 md:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;