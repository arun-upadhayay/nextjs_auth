import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username:{
    type:String, 
    required:[true, 'Username is required pls provide'],
    unique:[true, 'This username already exists please use another one'],
},
email:{
    type:String, 
    required:[true, 'Email is required pls provide'],
    unique:[true, 'This email already exists please use another one'],
},
password:{
    type: String, 
    required: [true,'Password is required'],
    
},
isVerified:{
    type: Boolean, 
    default: false,
},
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken: String,
forgotPasswordTokenExpire: Date,
verifyToken:String ,
verifyTokenExpiry:Date,
})