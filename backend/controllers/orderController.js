import Order from "../models/order.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import Product from "../models/product.js"
import Seller from "../models/seller.js"
export const paymentProcess=async(req,res,next)=>{
    try
    {
        
    }
    catch(error)
    {
        return next(new ErrorHandler(err.message,500))
    }
}

export const createOrder=async(req,res,next)=>{
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
  
        //   group cart items by shopId
        const shopItemsMap = new Map();
  
        for (const item of cart) {
          const shopId = item.shopId;
          if (!shopItemsMap.has(shopId)) {
            shopItemsMap.set(shopId, []);
          }
          shopItemsMap.get(shopId).push(item);
        }
  
        // create an order for each shop
        const orders = [];
  
        for (const [shopId, items] of shopItemsMap) {
          const order = await Order.create({
            cart: items,
            shippingAddress,
            user,
            totalPrice,
            paymentInfo,
          });
          orders.push(order);
        }
  
        res.status(201).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}

//get all orders of a user
export const getAllOrdersOfUser=async(req,res,next)=>{
    try {
        const orders = await Order.find({ "user._id": req.params.userId }).sort({
          createdAt: -1,
        });
  
        res.status(200).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}

// get Al orders of seller
export const getAllOrdersOfSeller=async(req,res,next)=>{
    try {
        const orders = await Order.aggregate(
          [
            {
              $unwind: "$cart",
            },
            {
              $match: {
                "cart.sellerId":String(req.seller._id),
              },
            },
            {
              $group: {
                _id: "$_id",
                user: { $first: "$user" },
                totalPrice: { $first: "$totalPrice" },
                status: { $first: "$status" },
                createdAt: { $first: "$createdAt" },
                cart: { $push: "$cart" },
              },
            },
          ]
      );
        res.status(200).json({
          orders
        })
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}

// update order status
export const updateOrderStatus=async(req,res,next)=>{
    try {
        const order = await Order.findById(req.params.id);
  
        if (!order) {
          return next(new ErrorHandler("Order not found with this id", 400));
        }
        if (req.body.status === "Transferred to delivery partner") {
          order.cart.forEach(async (o) => {
            await updateOrder(o._id, o.qty);
          });
        }
  
        order.status = req.body.status;
  
        if (req.body.status === "Delivered") {
          order.deliveredAt = Date.now();
          order.paymentInfo.status = "Succeeded";
          const serviceCharge = order.totalPrice * .10;
          await updateSellerInfo(order.totalPrice - serviceCharge);
        }
  
        await order.save({ validateBeforeSave: false });
  
        res.status(200).json({
          success: true,
          order,
        });
  
        async function updateOrder(id, qty) {
          const product = await Product.findById(id);
  
          product.stock -= qty;
          product.sold_out += qty;
  
          await product.save({ validateBeforeSave: false });
        }
  
        async function updateSellerInfo(amount) {
          const seller = await Seller.findById(req.seller.id);
          
          seller.availableBalance = amount;
  
          await seller.save();
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}

// get all orders admin
export const getAllOrders=async(req,res,next)=>{
    try {
        const orders = await Order.find().sort({
          deliveredAt: -1,
          createdAt: -1,
        });
        res.status(201).json({
          success: true,
          orders,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
}