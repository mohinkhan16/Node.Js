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
    const users = await User.find({});

    if(!users){
      return next(new HttpError("user not found"));
    }

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

const logOut = async (req,res,next)=>{
  try {
    
    req.user.tokens = req.user.tokens.filter((t)=>t.token !=req.token);

    req.user.save();

    req.status(200).json({
      success:true,
      message:"user logout successfully"
    });

  } catch (error) {
    next(new HttpError(error.message,500));
  }
}

const logOutAll = async (req,res,next)=>{

  try {
    req.user.token=[];

    req.user.save();

    res.status(200).json({
      message:"user logout all device successfully"
    });
  } catch (error) {
    next(new HttpError(error.message,500))
  }
}

const DeleteUser = async(req,res,next)=>{
  try {
    const user=req.user;

    // console.log(user)

    await user.deleteOne();

    res.status(200).json({
      success:true,
      message:"user deleted successfully"
    })
    
  } catch (error) {
    next(new HttpError(error.message,500))
  }
}

const UpdateUser = async(req,res,next)=>{
  try {

    const user = req.user;

    if(!user){
      return next(new HttpError("No user found",400));
    }

    const updates= Object.key(req.body);
    // console.log(updates)

    const AllowedFiled=["name","password"];
    // console.log(AllowedFiled);

    const isValid= updates.every((filed)=>AllowedFiled.includes(filed));
    console.log(isValid);

    if(!isValid){
      return next(new HttpError("only Allowed filed can be update ",400));
    }

    updates.forEach((update) => {
      return (user[update]=req.body[update]);
    });

    // console.log(updates);
    await user.save();

    res.status(200).json({
      success:true,
      message:"user data update",
      user
    })
    
  } catch (error) {
    next(new HttpError(error.message,500))
  }
}


export default { add, getAll, login,AuthLogin,logOut,logOutAll,DeleteUser,UpdateUser};