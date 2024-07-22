import express from "express";
import { isSeller, isAuthenticated } from "../middlewares/auth.js";
import { createConversation, getSellerConversations, getUserConversations, updateLastMessage } from "../controllers/conversationController.js";
const conversationRouter = express.Router();
conversationRouter.post( "/createNewConversation",createConversation )
conversationRouter.get("/getSellerConversations/:id",isSeller, getSellerConversations)
conversationRouter.get("/getUserConversations/:id",isAuthenticated, getUserConversations)
conversationRouter.put("/updateLastMessage/:id", updateLastMessage)
export default conversationRouter