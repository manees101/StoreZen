import express from "express";
import {
  getAllProducts,
  createProduct,
  getAllSellerProducts,
  deleteProduct,
  getProductByCategory
} from "../controllers/productController.js";
import { isSeller } from "../middlewares/auth.js";
import Product from "../models/product.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(isSeller, createProduct)
  // .patch(async (req, res) => {
  //   await Product.updateMany(
  //     {},
  //     {
  //       discountPrice: 400,
  //     }
  //   );
  //   res.status(200).json({
  //     message: "Products updated succcessfully",
  //   });
  // });   //TODO: add auth middleware
productRouter.route("/getAllSellerProducts/:id").get(getAllSellerProducts);
productRouter.route("/:id").delete(isSeller, deleteProduct);
productRouter.route("/category/:category").get(getProductByCategory);
export default productRouter;