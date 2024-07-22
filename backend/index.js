import dotenv from "dotenv"
dotenv.config()
import express from "express"
import "colors"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import sellerRouter from "./routes/sellerRoutes.js"
import connectDB from "./db/connectDB.js"
import productRouter from "./routes/productRoutes.js"
import { error } from "./middlewares/error.js"
import cloudinary from "cloudinary"
import orderRouter from "./routes/orderRoutes.js"
import conversationRouter from "./routes/conversationRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import morgan from "morgan"
const PORT=process.env.PORT || 5000
const app=new express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5174"],
  credentials:true
}))
app.use(morgan("tiny"))
//cloudinary configurations
cloudinary.v2.config(
  { 
    cloud_name: "dtilxclrk", 
    api_key: "758923278183115", 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
}
)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/seller",sellerRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)  
app.use("/api/v1/conversation",conversationRouter)
app.use("/api/v1/message",messageRouter)
app.use(error)
const startServer=async()=>{
    try
    {
      await connectDB(process.env.MONGO_URI)
      console.log('Connected to DB successfully'.blue.bold)
      app.listen(PORT,()=>console.log(`server is listening on port ${PORT}`.yellow.bold))

    }
    catch(err)
    {
        console.log(err)
    }
}
startServer()