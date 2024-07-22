import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../store/actions/user";
import { toast } from "react-toastify";
import Loader from "../Buyer/Layout/Loader";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .patch(
            `${server}/seller/updateShopAvatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .patch(
        `${server}/seller/updateSellerInfo`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false)
      });
  };

  return !seller ? (
    <Loader />
  ) : (
    <div className="w-full h-[90vh] overflow-y-scroll flex flex-col items-center ">
      <div className="flex w-full md:w-[80%] flex-col justify-center my-2">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller?.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                accept=".jpg,.png,.jpeg"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className=" hover:cursor-pointer">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-required={true}
          className="flex flex-col items-center"
          onSubmit={(e)=>{updateHandler(e);setLoading(true)}}
        >
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller?.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col md:w-[50%] mt-5">
            <button
              className={`${styles.input} !w-[95%] mb-4 md:mb-0 disabled:text-gray-500`}
              type="submit"
              disabled={loading}
            >
          {loading ? "Loading...":"Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
