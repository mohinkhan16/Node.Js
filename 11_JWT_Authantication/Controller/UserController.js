import HttpError from "../middleware/HttpError.js";
import User from "../Model/UserModel.js";

const add = async (req, res, next) => {
  try {
    const { name, Email, password } = req.body;

    const newUser = new User({
      name,
      Email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user added successfully",
      newUser,
    });

  } catch (error) {
    console.log(error);
    next(new HttpError(error.message, 500));
  }
};
const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: "All data found successfully",
      users,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => { 
  try {
    const { Email, password } = req.body;

    const user = await User.findByCredentials(Email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    next(new HttpError(error.message, 500));
  }
};

const AuthLogin = async (req,res,next)=>{
  try {
    
    const user = req.user;

    if(!user){
      return next(new HttpError("unable to login",401));
    }

    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    next(new HttpError(error.message,500));
  }
}

export default { add, getAll, login,AuthLogin };