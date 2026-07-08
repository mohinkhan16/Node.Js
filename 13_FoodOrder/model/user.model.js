
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!value.toLowerCase()==="password"){
                throw new Error("password can't be password")
            }
        }
    },
    address:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["customer","provider","admin"],
        default:"customer"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
},
{
    timestamps:true,
});


userSchema.pre("save",async function () {
    const user = this;

    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8)
    }
})


const User = mongoose.model("User",userSchema);
export default User;