import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:String,
    addresses:[{
        country: {
            type: String,
          },
          city:{
            type: String,
          },
          address1:{
            type: String,
          },
          address2:{
            type: String,
          },
          zipCode:{
            type: String,
          },
          addressType:{
            type: String,
          },
        }
    ],
    role:{
    type:String,
    default:'user'
    },
    city:String,
    password:{
        type:String,
        required:true
    },
    avatar:{
        public_id: {
            type: String,
          },
        url:{
            type:String,
        },
    },
    loginOTP:String,
    loginOTPExpires:Date,
    passwordResetOTP:Number,
    passwordResetExpires:Date,
    passwordChangesAt:Date,
    tokens:[{
        token:String
    }],
    cart:[{
        productId:String,
    }],
    wishlist:[{
        productId:String,
    }]
})
userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
       return next();
      }
      this.password = await bcryptjs.hash(this.password,10);
})

userSchema.methods.getToken=function(){
    const token=jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
    // this.tokens=[...this.tokens,token]
    // await this.save()
    return token
}
userSchema.methods.deleteToken=async function(tokenId){
   this.tokens=this.tokens.map((token)=>token._id!==tokenId)
   return await this.save()
}
userSchema.methods.comparePassword=async function(password){
    return await bcryptjs.compare(password,this.password)
}
const User=new mongoose.model('User',userSchema)
export default User