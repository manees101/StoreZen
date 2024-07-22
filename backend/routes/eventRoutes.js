import express from "express"
import { isAdmin,isAuthenticated,isSeller } from "../middlewares/auth"
import { createEvent, deleteEvent, getAllEvents,getShopAllEvents } from "../controllers/eventController"
const eventRouter=express.Router()

eventRouter.route("/").post(isSeller,createEvent).get(isSeller,getShopAllEvents)
eventRouter.route("/all").get(isAuthenticated,isAdmin,getAllEvents)
eventRouter.route("/:id").delete(isSeller,deleteEvent)
export default eventRouter