import express from "express";
import {isAuthenticated } from "../middlewares/auth.js";
import { createMessage, getAllMessages } from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.post( "/createNewMessage",createMessage )
messageRouter.get("/getAllMessages/:id", getAllMessages)

export default messageRouter