import React, { useState } from "react";
import { Link} from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { CartItem } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromCart, addTocart } from "../../store/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  const totalPrice=cart.reduce((accumulator, item) => {
    return accumulator +item.qty*item.discountPrice;
  }, 0)
  //quantity change handler
  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };
  //remove from cart handler
  const removeFromCartHandler=(data)=>{
    try
    {
       dispatch(removeFromCart(data))
       toast.success("item removed from cart successfully")
    }
    catch(err)
    {
      toast.error("Oops! Something went wrong")
    }
    }
  return (
    // <div className="w-full h-screen overflow-scroll">
    //   <div className="w-full h-[10%] p-4">
    //     <Link to={".."}>
    //       <button
    //         className="w-[120px] h-[35px] px-2 flex justify-center gap-1 items-center
    //     rounded-md bg-secondary text-[15px] md:text-[18px] font-semibold text-white"
    //       >
    //         <IoArrowBack size={20} /> Go Back
    //       </button>
    //     </Link>
    //   </div>
    //   <div className="w-full h-[90%] flex flex-col justify-between gap-4">
    //     <div>
    //       {cart?.map((item) => (
    //         <CartItem data={item} key={item._id} removeFromCartHandler={removeFromCartHandler} quantityChangeHandler={quantityChangeHandler}/>
    //       ))}
    //     </div>
    //     <div className="w-[250px] h-[300px] border-[2px] flex flex-col justify-around border-black self-end rounded-md p-4">
    //       <h1 className="text-[20px] font-bold">Summary</h1>
    //       <h2 className="w-full flex justify-between font-semibold">
    //         <span>Subtotal</span>
    //         <span>
    //           {subtotal}
    //         </span>
    //       </h2>
    //       <div className="w-[100%] h-[40px] flex border-[2px] border-black rounded-md">
    //         <input type="text" placeholder="Coupen code" className="w-[75%] h-full p-2 rounded-md" value={coupen} onChange={(e)=>setCoupen(e.target.value)}/>
    //         <button className="w-[25%] h-full bg-black
    //          text-white flex items-center justify-center "
    //          onClick={applyCoupen}
    //          >
    //           Apply
    //         </button>
    //       </div>
    //       <h2 className="w-full flex justify-between font-semibold">
    //         <span>Total</span>
    //         <span>
    //          {total}
    //         </span>
    //       </h2>
    //       <button className="w-[160px] h-[40px] mx-auto rounded-md bg-secondary text-white"
    //       onClick={()=>navigate("/order/payment")}
    //       >
    //         Proceed to checkout
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
    <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
      {cart && cart.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          <h5>Cart Items is empty!</h5>
        </div>
      ) : (
        <>
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            {/* Item length */}
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cart && cart.length} items
              </h5>
            </div>

            {/* cart Single Items */}
            <br />
            <div className="w-full border-t">
              {cart &&
                cart.map((i, index) => (
                  <CartItem
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
          </div>

          <div className="px-5 mb-3">
            {/* checkout buttons */}
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now (USD${totalPrice})
                </h1>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default Cart;
