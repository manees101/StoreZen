import express from "express"
import { OTPVerification, UserLogin, UserRegister, userActivation, userLogout } from "../controllers/authController.js"
import {isAuthenticated,isAdmin} from "../middlewares/auth.js"
import { getUser, updateUser, updateUserPasssword,deleteAddress,updateAddress, getAllUsers, deleteUser,getUserInfo, updateAvatar, forgotPassword, verifyForgotOTP, resetPassword, userCount } from "../controllers/userController.js"
const userRouter=express.Router()
userRouter.route("/login").post(UserLogin)
userRouter.route("/register").post(UserRegister)
userRouter.route("/logout").get(userLogout)
userRouter.route("/activation").post(userActivation)
userRouter.route("/getUser").get(isAuthenticated,getUser)
userRouter.route("/updateUserPassword").patch(isAuthenticated,updateUserPasssword)
userRouter.route("/updateAddress",isAuthenticated,updateAddress)
userRouter.route("/deleteAddress/:addressId",isAuthenticated,deleteAddress)
userRouter.route("getAllUsers").get(isAuthenticated,isAdmin("Admin"),getAllUsers)
userRouter.route("/:userId").delete(isAuthenticated,isAdmin("Admin"),deleteUser)
userRouter.route("/getUserInfo/:userId",getUserInfo)
userRouter.route("/otp").post(OTPVerification)
userRouter.route("/updatePassword").put(isAuthenticated,updateUserPasssword)
userRouter.route("/updateAddress").put(isAuthenticated,updateAddress)
userRouter.route("/deleteAddress/:addressId").delete(isAuthenticated,deleteAddress)
userRouter.route("/updateInfo").put(isAuthenticated,updateUser)
userRouter.route("/all").get(isAuthenticated,isAdmin("Admin"),getAllUsers)
userRouter.route("/updateAvatar").patch(isAuthenticated,updateAvatar)
userRouter.route("/forgotPassword/:email").get(forgotPassword)
userRouter.route("/forgotOTP").post(verifyForgotOTP)
userRouter.route("/resetPassword").patch(resetPassword)
userRouter.route("/count").get(userCount)
export default userRouter