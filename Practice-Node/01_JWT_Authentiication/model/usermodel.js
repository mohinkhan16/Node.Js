
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type :String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase()==="password")
        {
            throw new Error("password can't be password")
        }}
    },
    tokens:[{
        token:{
            type:String,
            require:true,
        }
    }]
},
{
    timestamps:true,
})

UserSchema.pre("save",async function () {
    
    const user =this;

if(user.isModified("password")){
    user.password= await bcrypt.hash(user.password,10);
}
});

UserSchema.static.findByCredential = async function (email,password) {
    try {
        const user =await this.findOne({email});

        if(!user){
            throw new Error("unable to login")
        }
        const isMatched = await bcrypt.compare(password,user.password);

        if(!isMatched){
            throw new Error("unable to login")
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

UserSchema.methods.generatAuthToken = async function () {
    try {
        const user = this;

        const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET,{expiresIn:"7d"});
        console.log("token",token)

        if(!token){
            throw new Error("failed to generate auth token")
        }

        user.token=user.tokens.concat({token});

        await user.save();

        return token;

    } catch (error) {
        throw new Error(error.message);
    }
}


const user = mongoose.model.user || mongoose.model ("user",UserSchema);
export default user;

