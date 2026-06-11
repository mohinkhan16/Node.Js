

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,

    },
    Email :{
        type:String,
        required:true,
        unique:true,
    },

    Password:{
        type:String,
        required:true,
        minlength:6,
        validate:(value)=>{
            if(!value.endswith("@gmail.com")){
                throw new Error("password can't cannot be password")
            }
        }
    },
})

const User =mongoose.model("user",UserSchema);

export default User;