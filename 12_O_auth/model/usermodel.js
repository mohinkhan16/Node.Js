

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
    }
});

const User = mongoose.model("user model",userSchema);

export default User;