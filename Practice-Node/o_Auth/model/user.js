
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    googleId:{
        type:String,
        required:true,
        unique:true
    },
},{
    timestamps:true
});

const user = mongoose.model("User",userSchema);

export default user;