  import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Please enter valid gmail");
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase() === "password") {
        throw new Error("Password can't be 'password'");
      }
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

UserSchema.statics.findByCredentials = async function (Email, password) {

  // console.log("Email:", Email);

  const user = await this.findOne({ Email });

  // console.log("User:", user);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  // console.log("Password Match:", isMatched);

  if (!isMatched) {
    throw new Error("Password incorrect");
  }

  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = JWT.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

UserSchema.methods.toJSON = function(){

  const user = this;
  console.log("user",user);

  const userObject = user.toObject();
  console.log("user object",userObject);

  delete userObject.password;
  delete userObject.tokens;
  delete userObject._v
  return userObject
}

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
