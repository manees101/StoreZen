import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.js";
import Seller from "../models/seller.js";
import jsonwebtoken from "jsonwebtoken";
export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;
    
    if(!token)
        {
            return next(new ErrorHandler("Please login to continue",401))
        }
    const decoded= jsonwebtoken.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id)
   
    next()
}
export const isSeller=async(req,res,next)=>{
    const {seller_token}=req.cookies;
    if(!seller_token)
        {
            return next(new ErrorHandler("Please login to continue",401))
        }

    const decoded=jsonwebtoken.verify(seller_token,process.env.JWT_SECRET_KEY);
    req.seller=await Seller.findById(decoded.id)
    next()
}

export const isAdmin=(...roles)=>{
   return (req,res,next)=>{
    if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(`${req.user.name} cannot access this resource!`,403)
            )
        }
        next()
   }
}