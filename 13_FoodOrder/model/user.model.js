
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

//for password hasing
userSchema.pre("save",async function () {
    const user = this;

    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8)
    }
});

//use for user is valid or not 
userSchema.statics.findByCredentials = async function (email,password) {
    
    const user = await this.findOne({email});

    if(!user){
        throw new Error("user not found")
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("password incorrect")
    }
    return user;
}

//Generate Auth Token

userSchema.methods.generateAuthToken = async function () {
    
try {
       const user = this;

    const token =jwt.sign(
        {_id:user._id.toString() },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
    user.token = user.tokens.concat({token})

    await user.save()

    return token; 
} catch (error) {
    throw new Error(error.message)
}   
};


const User = mongoose.model("User",userSchema);
export default User;