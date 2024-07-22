import Seller from "../models/seller.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary"
//get seller
export const getSeller=async(req,res,next)=>{
    try {
        const seller = await Seller.findById(req.seller._id);
        if (!seller) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          seller,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}
//get seller info  - Admin
export const shopInfo=async(req,res,next)=>{
    try {
        const shop = await Seller.findById(req.params.id);
        res.status(201).json({
          success: true,
          shop,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}

//update shop avatar
export const updateShopAvatar=async(req,res,next)=>{
  try
  {
     const {avatar}=req.body
     if(!avatar)
     {
      return next(new ErrorHandler("Please provide avatar",400))
     }
     const seller=await Seller.findById(req.seller._id)
     const newAvatar=await cloudinary.v2.uploader.upload(avatar)
     seller.avatar.public_url=newAvatar.public_id
     seller.avatar.url=newAvatar.url
     await seller.save()
     res.status(200).json({
      message:"Avatar updated successfully"
     })   
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}

//update seller info
export const updateSellerInfo=async(req,res,next)=>{
  try
  {
    await Seller.findByIdAndUpdate(req.seller.id,req.body)
    res.status(200).json({
      message:"Seller info updated succcessfully"
    })
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}