import { randomInt, verify } from "crypto";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail.js";
//get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ErrorHandler("User does not exists!", 404));
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//get users count
export const userCount=async(req,res,next)=>{
  try
  {
    const count=await User.countDocuments();
    res.status(200).json(count)
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}
// update user
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User does not exists!", 404));
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return next(new ErrorHandler("Please provide correct inform"));
    }
   
    user.name = name;
    user.email = email;
    user.phone = phoneNo;
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//update password
export const updateUserPasssword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isValidPassword = await user.comparePassword(req.body.oldPassword);
    if (!isValidPassword) {
      return next(new ErrorHandler("Old password is not correct", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match"), 400);
    }
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated succefully!",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//update address
export const updateAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const isSameAddress = user.addresses.find(
      (address) => address.type === req.body.addressType
    );
    if (isSameAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} already exsits`, 400)
      );
    }
    const addressExists = user.addresses.find(
      (address) => address._id === req.body.addressId
    );
    if (addressExists) {
      Object.assign(addressExists, req.body);
    } else {
      user.addresses.push(req.body);
    }
    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//delete address
export const deleteAddress = async (req, res, next) => {
  try {
    console.log("delete address route");
    const { addressId } = req.params;
    const user = await User.findById(req.user._id);
    const addressExists = user.addresses.find(
      (address) => address._id == addressId
    );
    if (!addressExists) {
      return next(new ErrorHandler("Address doesn't exists", 404));
    }
    user.addresses = user.addresses.filter(
      (address) => address._id != addressId
    );
    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//Get user info by id
export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
//update avatar
export const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return next(new ErrorHandler("User does not exist", 404));
    }
    const uploadData = await cloudinary.v2.uploader.upload(avatar);
    const newAvatar = {
      public_id: uploadData.public_id,
      url: uploadData.url,
    };
    user.avatar = newAvatar;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
//delete user
export const 
deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new ErrorHandler("User does not exists with this id", 404));
    }
    if(user.avatar.public_id)
    {
      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
    }
    
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

// forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User does not exist!", 401));
    } 

    const otp = randomInt(100000, 1000000);
    user.passwordResetOTP = otp;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    try {
      sendMail({
        email: email,
        subject: "Forgot Password OTP",
        message: `Hello ${user.name}. This is your OTP to reset your password. It will expire in 5m ${otp}`,
      });
      res.status(200).json({
        message: "Please check your email for OTP",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
// verify forgot OTP
export const verifyForgotOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    console.log(email,otp)
    if (!email || !otp) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }
    const user = await User.findOne({ email });
    if (user.passwordResetExpires < Date.now()) {
      return next(new ErrorHandler("OTP has been expired", 400));
    }
    if(user.passwordResetOTP!==Number(otp))
    {
      return next(new ErrorHandler("OTP is not correct",400))
    }
    user.passwordResetExpires=Date.now()+24*60*60*1000;
    await user.save()
    res.status(200).json({
      message: "OTP verification successfull",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
// Forgot Password
export const resetPassword=async(req,res,next)=>{
  try
  {
    const {password,confirmPassword,email}=req.body;
    if(!password || !confirmPassword || !email)
    {
      return next(new ErrorHandler("Please provide all fields",400))
    }
    if(password!==confirmPassword)
    {
      return next(new ErrorHandler("Passwords does not match",400))
    }
    const user=await User.findOne({email})
    user.password=password;
    user.passwordChangesAt=Date.now();
    await user.save()
    res.status(200).json({
      message:"Password updated succefully"
    })
  }
  catch(err)
  {
    return next(new ErrorHandler(err.message,500))
  }
}