import Event from "../models/event";
import ErrorHandler from "../utils/ErrorHandler";
import Seller from "../models/seller";
import cloudinary from "cloudinary"

//create Event
export const createEvent=async(req,res,next)=>{
    try{
        const seller=await Seller.findById(req.body.sellerId)
        if(!seller)
            {
                return next(new ErrorHandler("Seller does not exist with this id",400))

            }

            let images = [];

            if (typeof req.body.images === "string") {
              images.push(req.body.images);
            } else {
              images = req.body.images;
            }
    
            const imagesLinks = [];
    
            for (let i = 0; i < images.length; i++) {
              const result = await cloudinary.v2.uploader.upload(images[i]);
    
              imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
              });
            }   
            const newEvent=req.body
            newEvent.images=imagesLinks
            newEvent.shop=seller
       const event=await Event.create(req.body)
       res.status(201).json({
        message:"Event created successfully",
        event
       })
    }
    catch(err)
    {
        return next(new ErrorHandler(err.message,500))
    }
}

//delete Event
export const deleteEvent=async(req,res,next)=>{
    try
    {
       await Event.deleteById(req.params.id)
       res.status(200).json({
        message:"Event deleted successfully"
       })
    }
    catch(err)
    {
        return next(new ErrorHandler(err.message,500))
    }
}

//get Shop All Events
export const getShopAllEvents=async(req,res,next)=>{
    try
    {
      const events=await Event.find({"shop._id":req.seller._id})
      res.status(200).json({
        events
      })
    }
    catch(err)
    {
       return next(new ErrorHandler(err.message,500))
    }
}
//get All Events
export const getAllEvents=async(req,res,next)=>{
    try
    {
       const events=await Event.find()
       res.status(200).json({
        events
       })
    }
    catch(err)
    {
       return next(new ErrorHandler(err.message,500))
    }
}