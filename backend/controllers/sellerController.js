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
//get All sellers
export const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

//delete seller
export const deleteSeller=async(req,res,next)=>{
  try
  {
    const seller = await Seller.findById(req.params.userId);
    if (!seller) {
      return next(new ErrorHandler("User does not exists with this id", 404));
    }
    if(seller.avatar.public_id)
    {
      const imageId = seller.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
    }
    
    await Seller.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message))
  }
}
//get sellers count
export const sellerCount=async(req,res,next)=>{
  try
  {
    const count=await Seller.countDocuments();
    res.status(200).json(count)
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
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