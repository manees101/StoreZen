import express from "express"
import { sellerActivation, sellerLogin, sellerLogout, sellerRegistration } from "../controllers/authController.js"
import {isAdmin, isAuthenticated, isSeller } from "../middlewares/auth.js"
import { deleteSeller, getAllSellers, getSeller, sellerCount, shopInfo, updateSellerInfo, updateShopAvatar } from "../controllers/sellerController.js"
const sellerRouter=express.Router()
sellerRouter.route("/login").post(sellerLogin)
sellerRouter.route("/register").post(sellerRegistration)
sellerRouter.route("/logout").post(sellerLogout)
sellerRouter.route("/activation").post(sellerActivation)
sellerRouter.route("/").get(isSeller,getSeller)
sellerRouter.route("/updateShopAvatar").patch(isSeller,updateShopAvatar)
sellerRouter.route("/updateSellerInfo").patch(isSeller,updateSellerInfo)
sellerRouter.route("/shopInfo/:id").get(shopInfo)
sellerRouter.route("/count").get(sellerCount)
sellerRouter.route("/all").get(isAuthenticated,isAdmin("Admin"),getAllSellers)
sellerRouter.route("/:userId").delete(isAuthenticated,isAdmin("Admin"),deleteSeller)
export default sellerRouter
