import express from "express"
import { sellerActivation, sellerLogin, sellerLogout, sellerRegistration } from "../controllers/authController.js"
import {isSeller } from "../middlewares/auth.js"
import { getSeller, shopInfo, updateSellerInfo, updateShopAvatar } from "../controllers/sellerController.js"
const sellerRouter=express.Router()
sellerRouter.route("/login").post(sellerLogin)
sellerRouter.route("/register").post(sellerRegistration)
sellerRouter.route("/logout").post(sellerLogout)
sellerRouter.route("/activation").post(sellerActivation)
sellerRouter.route("/").get(isSeller,getSeller)
sellerRouter.route("/updateShopAvatar").patch(isSeller,updateShopAvatar)
sellerRouter.route("/updateSellerInfo").patch(isSeller,updateSellerInfo)
sellerRouter.route("/shopInfo/:id").get(shopInfo)
export default sellerRouter
