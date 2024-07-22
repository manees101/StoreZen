import User from "../models/user.js";
import Seller from "../models/seller.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import sendToken from "../utils/jwtToken.js";
import sendMail from "../utils/sendMail.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendShopToken from "../utils/shopToken.js";
import { randomInt, randomUUID } from "crypto";
//=====================================================================================
//=============================  User Controlller  ====================================
//=====================================================================================

// create activation token
const createActivationToken = (user) => {
  return jsonwebtoken.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//user Login
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 404));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }
    const otp=randomInt(100000,1000000)
    const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    user.loginOTP = otp;
    user.loginOTPExpires = otpExpires;
    await user.save();
    try {
      await sendMail({
        email: user.email,
        subject: `OTP`,
        message: `Hello ${user.name}, This is your OTP for sign in ${otp}`,
      });
      res.status(200).json({
        message: `please check your email for OTP`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
// OTP Verification
export const OTPVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return next(new ErrorHandler("Please provide all the fields!", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User doesn't exist!", 404));
    }
   
    if (user.loginOTP !== otp) {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    if (user.loginOTPExpires < Date.now()) {
      return next(new ErrorHandler("OTP has expired", 400));
    }

    // OTP is valid and not expired
    // send token to user

    sendToken(user, 200, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//user registration
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name ) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
    
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = {
      name,
      email,
      password,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: `Activate your account`,
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//Account Activation
export const userActivation = async (req, res, next) => {
  try {
    const { activationToken } = req.body;
    const verifyUser = jsonwebtoken.verify(
      activationToken,
      process.env.ACTIVATION_SECRET
    );
    if (!verifyUser) {
      return next(new ErrorHandler("Invalid Token", 400));
    }
    const { name, email, password } = verifyUser;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(new ErrorHandler("User already exists", 400));
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//user logout
export const userLogout=async(req,res,next)=>{
    try
    {
      res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
      })
      res.status(200).json({
        success:true,
        message:"Log out successfully!"
      })
    }
    catch(err)
    {
    return next(new ErrorHandler(err.message,500))
    }
}

//=====================================================================================
//============================= Seller Controlller ====================================
//=====================================================================================

//Seller Activation token generator
const createSellerActivationToken = (user) => {
  return jsonwebtoken.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//Seller registration
export const sellerRegistration = async (req, res, next) => {
  try {
    console.log("seller register route hit")
    const { name, email, password, avatar,zipCode,address,phoneNumber } = req.body;
    const checkUser = await Seller.findOne({ email });
    if (checkUser) {
      return next(new ErrorHandler("Seller already exists", 400));
    }
    const uploadData = await cloudinary.v2.uploader.upload(avatar);
    const newSeller = {
      email,
      name,
      password,
      avatar:{
        public_id:uploadData.public_id,
        url:uploadData.secure_url
      },
      zipCode,
      address,
      phoneNumber
    };
    console.log(newSeller)
    const activationToken = createSellerActivationToken(newSeller);
    const activationUrl = `${process.env.CLIENT_URL}/seller/activation/${activationToken}`;
    try {
      sendMail({
        email: newSeller.email,
        subject: "Activate your account",
        message: `Hello ${newSeller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${newSeller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message, 400));
  }
};

//Seller Activation
export const sellerActivation = async (req, res, next) => {
  try {
    const { activationToken } = req.body;
    console.log("Activation route hit")
    const verifySeller = jsonwebtoken.verify(
      activationToken,
      process.env.ACTIVATION_SECRET
    );
    if (!verifySeller) {
      return next(new ErrorHandler("Invalid Token", 400));
    }
    const { name, email, password, avatar,address, zipCode,phoneNumber } = verifySeller;
    const checkSeller = await Seller.findOne({ email });
    if (checkSeller) {
      return next(new ErrorHandler("Seller already exists", 400));
    }
    const newSeller=await Seller.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber
    })
    console.log(newSeller)
    sendShopToken(newSeller,201,res)
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message,500))
  }
};

//Seller Login
export const sellerLogin=async(req,res,next)=>{
    try
    {
      const {email,password}=req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      const checkUser=await Seller.findOne({email})

      if(!checkUser)
        {
            return next(new ErrorHandler("User does not exist",404));
        }

        const checkPassword=await checkUser.comparePassword(password)
      if(!checkPassword)
        {
            return next(new ErrorHandler("Please provide correct information",400));
        }
      sendShopToken(checkUser,200,res)
    }
    catch(error)
    {
       return next(new ErrorHandler(error.message,500))
    }
}

//Seller Logout
export const sellerLogout=async(req,res,next)=>{
    try
    {
       res.cookie("seller_token",null,{
        expires:new Data(Date.now()),
        httpOnly:true,
        sameSite:"none",
        secure:true

       })
      res.status(200).json({
        success:true,
        message:"Log out successfully!"
      })
    }
    catch(error)
    {
      return next(new ErrorHandler(error.message,500))
    }
}