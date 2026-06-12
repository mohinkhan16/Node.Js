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