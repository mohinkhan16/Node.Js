

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

UserSchema.pre("save",async function () {
    
    const user = this;

    if(user.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10)
    }
});

UserSchema.static.findByCredentials= async function (Email,Password) {
    
    try {
        const user = await this.findOne({Email});

        if(!User){
            throw new Error("unable to login");
        }

        const isMatch= await bcrypt.compare (Password,user.Password);

        if(!isMatch){
            throw new Error("unable to login");
        }

        return user;

    } catch (error) {
     throw new Error(error.message);   
    }
}


const User =mongoose.model("user",UserSchema);

export default User;