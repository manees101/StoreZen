import express from "express"
import { isAdmin, isAuthenticated, isSeller } from "../middlewares/auth.js"
import { createOrder, 
    getAllOrders, 
    getAllOrdersOfSeller, 
    getAllOrdersOfUser, 
    paymentProcess, 
    updateOrderStatus 
} from "../controllers/orderController.js"

const orderRouter=express.Router()

orderRouter.route("/payment/process").post(isAuthenticated,paymentProcess)
orderRouter.route("/createOrder").post(isAuthenticated,createOrder)
orderRouter.route("/getAllOrdersOfUser/:userId").get(isAuthenticated,getAllOrdersOfUser)
orderRouter.route("/getAllOrdersOfSeller").get(isSeller,getAllOrdersOfSeller)
orderRouter.route("getAllOrders").get(isAuthenticated,isAdmin("Admin"),getAllOrders)
orderRouter.route("/updateOrderStatus/:id").patch(isSeller,updateOrderStatus)
export default orderRouter