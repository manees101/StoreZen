import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
      title:{
        type:String,
        required:[true,"Please provide title"]
      },
      description:{
        type:String,
        required:[true,"Please provide description"]
      },
      originalPrice:{
        type:Number,
        required:[true,"Price is required."]
      },
      discountPrice:{
        type:Number,
      },
      images:[],
      sellerId:{
        type:Object,
        required:[true,"Seller id is required"]
      },
      category: {
        type: String,
        required: [true, "Please enter your product category!"],
      },
      tags: [],
      stock: {
        type: Number,
        required: [true, "Please enter your product stock!"],
      },
      reviews: [
        {
          user: {
            type: Object,
          },
          rating: {
            type: Number,
          },
          comment: {
            type: String,
          },
          createdAt:{
            type: Date,
            default: Date.now(),
          }
        },
      ],
      ratings: {
        type: Number,
      },
      sold_out:{
       type:Number,
       default:0
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
})
// Pre-save middleware to calculate the average rating
productSchema.pre('save', function (next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings = totalRating / this.reviews.length;
  } else {
    this.ratings = 0;
  }
  next();
});
const Product=new mongoose.model("Product",productSchema)

export default Product