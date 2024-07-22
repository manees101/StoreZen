import mongoose from "mongoose";
import jsonwebtoken  from "jsonwebtoken"
import bcryptjs from "bcryptjs"
const sellerSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your shop name!"],
      },
      email: {
        type: String,
        required: [true, "Please enter your shop email address"],
      },
      password: {
        type: String,
        required: [true, "Please enter your password"],
      },
      description: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "Seller",
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      zipCode: {
        type: String,
        required: true,
      },
      withdrawMethod: {
        type: Object,
      },
      availableBalance: {
        type: Number,
        default: 0,
      },
      transections: [
        {
          amount: {
            type: Number,
            required: true,
          },
          status: {
            type: String,
            default: "Processing",
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          updatedAt: {
            type: Date,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      loginOTP:String,
      loginOTPExpires:Date,
      resetPasswordToken: String,
      resetPasswordTime: Date,
})
sellerSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next();
      }
      this.password = await bcryptjs.hash(this.password,     10);
})

sellerSchema.methods.getToken=function(){
    const token = jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
    return token
}
sellerSchema.methods.deleteToken=async function(tokenId){
    this.tokens=this.tokens.map((token)=>token._id!==tokenId)
    await this.save()
    return
}
sellerSchema.methods.comparePassword=async function(password){
    return await bcryptjs.compare(password,this.password)
}
const Seller=new mongoose.model("Seller",sellerSchema);
export default Seller;