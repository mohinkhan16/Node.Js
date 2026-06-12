import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    Email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!value.endsWith("@gmail.com")){
                throw new Error("Please enter valid gmail");
            }
        }
    },

    Password:{
        type:String,
        required:true,
        minlength:6
    }

});

UserSchema.pre("save", async function(){

    const user = this;

    if(user.isModified("Password")){
        user.Password = await bcrypt.hash(user.Password,10);
    }

});

UserSchema.statics.findByCredentials = async function(Email,Password){

    const user = await this.findOne({ Email });

    if(!user){
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(
        Password,
        user.Password
    );

    if(!isMatch){
        throw new Error("Unable to login");
    }

    return user;
};

const User = mongoose.model("user",UserSchema);

export default User;