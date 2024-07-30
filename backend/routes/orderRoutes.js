import express from "express"
import { isAdmin, isAuthenticated, isSeller } from "../middlewares/auth.js"
import { createOrder, 
    getAllOrders, 
    getAllOrdersOfSeller, 
    getAllOrdersOfUser, 
    orderCount, 
    paymentProcess, 
    updateOrderStatus 
} from "../controllers/orderController.js"
import Order from "../models/order.js"
const orders = [
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 2,
          "price": 20
        },
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 1,
          "price": 50
        }
      ],
      "shippingAddress": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zip": "62701",
        "country": "USA"
      },
      "user": {
        "userId": "user123",
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      "totalPrice": 90,
      "status": "Delivered",
      "paymentInfo": {
        "id": "payment123",
        "status": "Completed",
        "type": "Credit Card"
      },
      "paidAt": "2024-04-15T10:00:00Z",
      "deliveredAt": "2024-04-20T10:00:00Z",
      "createdAt": "2024-04-15T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 3,
          "price": 15
        }
      ],
      "shippingAddress": {
        "street": "456 Elm St",
        "city": "Metropolis",
        "state": "NY",
        "zip": "10001",
        "country": "USA"
      },
      "user": {
        "userId": "user456",
        "name": "Jane Smith",
        "email": "janesmith@example.com"
      },
      "totalPrice": 45,
      "status": "Processing",
      "paymentInfo": {
        "id": "payment456",
        "status": "Pending",
        "type": "PayPal"
      },
      "paidAt": "2024-05-01T10:00:00Z",
      "createdAt": "2024-05-01T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 5,
          "price": 10
        }
      ],
      "shippingAddress": {
        "street": "789 Oak St",
        "city": "Gotham",
        "state": "NJ",
        "zip": "07001",
        "country": "USA"
      },
      "user": {
        "userId": "user789",
        "name": "Bruce Wayne",
        "email": "brucewayne@example.com"
      },
      "totalPrice": 50,
      "status": "Delivered",
      "paymentInfo": {
        "id": "payment789",
        "status": "Completed",
        "type": "Credit Card"
      },
      "paidAt": "2024-06-10T10:00:00Z",
      "deliveredAt": "2024-06-15T10:00:00Z",
      "createdAt": "2024-06-10T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 4,
          "price": 25
        }
      ],
      "shippingAddress": {
        "street": "101 Pine St",
        "city": "Riverdale",
        "state": "CA",
        "zip": "93203",
        "country": "USA"
      },
      "user": {
        "userId": "user101",
        "name": "Alice Johnson",
        "email": "alicejohnson@example.com"
      },
      "totalPrice": 100,
      "status": "Shipped",
      "paymentInfo": {
        "id": "payment101",
        "status": "Completed",
        "type": "Debit Card"
      },
      "paidAt": "2024-07-01T10:00:00Z",
      "createdAt": "2024-07-01T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 1,
          "price": 150
        }
      ],
      "shippingAddress": {
        "street": "202 Maple St",
        "city": "Smallville",
        "state": "KS",
        "zip": "66701",
        "country": "USA"
      },
      "user": {
        "userId": "user202",
        "name": "Clark Kent",
        "email": "clarkkent@example.com"
      },
      "totalPrice": 150,
      "status": "Delivered",
      "paymentInfo": {
        "id": "payment202",
        "status": "Completed",
        "type": "Credit Card"
      },
      "paidAt": "2024-06-25T10:00:00Z",
      "deliveredAt": "2024-06-30T10:00:00Z",
      "createdAt": "2024-06-25T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 2,
          "price": 40
        }
      ],
      "shippingAddress": {
        "street": "303 Cedar St",
        "city": "Metropolis",
        "state": "IL",
        "zip": "62960",
        "country": "USA"
      },
      "user": {
        "userId": "user303",
        "name": "Lois Lane",
        "email": "loislane@example.com"
      },
      "totalPrice": 80,
      "status": "Processing",
      "paymentInfo": {
        "id": "payment303",
        "status": "Pending",
        "type": "PayPal"
      },
      "paidAt": "2024-06-10T10:00:00Z",
      "createdAt": "2024-06-10T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 10,
          "price": 5
        }
      ],
      "shippingAddress": {
        "street": "404 Birch St",
        "city": "Central City",
        "state": "NE",
        "zip": "68826",
        "country": "USA"
      },
      "user": {
        "userId": "user404",
        "name": "Barry Allen",
        "email": "barryallen@example.com"
      },
      "totalPrice": 50,
      "status": "Delivered",
      "paymentInfo": {
        "id": "payment404",
        "status": "Completed",
        "type": "Credit Card"
      },
      "paidAt": "2024-05-20T10:00:00Z",
      "deliveredAt": "2024-05-25T10:00:00Z",
      "createdAt": "2024-05-20T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    },
    {
      "cart": [
        {
          "_id": "665c6333841559ceb2fe594f",
          "quantity": 3,
          "price": 30
        }
      ],
      "shippingAddress": {
        "street": "505 Willow St",
        "city": "Star City",
        "state": "SC",
        "zip": "29056",
        "country": "USA"
      },
      "user": {
        "userId": "user505",
        "name": "Oliver Queen",
        "email": "oliverqueen@example.com"
      },
      "totalPrice": 90,
      "status": "Shipped",
      "paymentInfo": {
        "id": "payment505",
        "status": "Completed",
        "type": "Debit Card"
      },
      "paidAt": "2024-04-05T10:00:00Z",
      "createdAt": "2024-04-05T10:00:00Z",
      "sellerId": "6686a8bcb23684cef5fd70fa"
    }
  ]
  
  
const orderRouter=express.Router()
orderRouter.route("/").post(async(req,res,next)=>{
   await Order.insertMany(orders)
   res.status(200).json({
    message:"order created successfully"
   })
})
orderRouter.route("/payment/process").post(isAuthenticated,paymentProcess)
orderRouter.route("/createOrder").post(isAuthenticated,createOrder)
orderRouter.route("/getAllOrdersOfUser/:userId").get(isAuthenticated,getAllOrdersOfUser)
orderRouter.route("/getAllOrdersOfSeller").get(isSeller,getAllOrdersOfSeller)
orderRouter.route("getAllOrders").get(isAuthenticated,isAdmin("Admin"),getAllOrders)
orderRouter.route("/updateOrderStatus/:id").patch(isSeller,updateOrderStatus)
orderRouter.route("/count").get(orderCount)
export default orderRouter