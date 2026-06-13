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

       password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password word as password";
        }
      },
    },
  },
  {
    timestamps: true,
  },
);


UserSchema.pre("save", async function(){

    const user = this;

    if(user.isModified("Password")){
        user.password = await bcrypt.hash(user.password,10);
    }

});

UserSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new error("unable to login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new error("unable to login");
    }

    return user;
  } catch (error) {
    throw new error(error.message);
  }
};


UserSchema.method.generateAuthToken = async function () {
    
    try {
        
        const user = this;

        const token=JWT.sign(
            {_id: user._id.toString()},
            process.env.JWT_SECRET,
            {
                expiresIn:"7d",
            },
        ),

        if(!token){
            throw new Error("failed to generate token");
        }

        user.tokens = user.tokens.concat({token});

        await user.save();

    } catch (error) {
        throw new error(error.message);
    }
}




const User = mongoose.model("user",UserSchema);

export default User;