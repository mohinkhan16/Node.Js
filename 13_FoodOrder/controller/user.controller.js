
import  HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import cloudinary from "../config/Cloudniaray.js";


//for user add
const add = async (req, res, next) => {
  try {
     const {
            name,
            email,
            password,
            address,
            PhoneNumber,
            role,
            ProfilePic,
            cloudinaryId
       
        } = req.body;

        const newUser = new User({
            name,
            email,
            password,
            address,
            PhoneNumber,
            role,
            ProfilePic:req.file ? req.file.path :"null",
            cloudinaryId:req.file ?req.file.filename:"null"
        });

    
     await newUser.save();
 
    res.status(201).json({ success: true, message: "new User added", newUser });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


//for how many user there are for check
const getAll = async (req,res,next)=>{
    try {
        const users = await User.find();

        if(!users){
            return next(new HttpError("user not found",404))
        }

        res.status(200).json({
            success:true,
            message:"All data can found successfully",
            total:users.length,
            users
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//for auth login 
const Authlogin =async (req,res,next)=>{
    try {
        const user= req.user;

        if(!user){
            return next(new HttpError("unable to login",401));
        }

        res.status(200).json({
            success:true,
            message:"Auth login successfully",
            user
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//for user login
const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findByCredentials(email,password);
         
           const token = await user.generateAuthToken();

        res.status(200).json({
            success:true,
            message:"login successfully",
            user,
            token,
            
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

//for user
const logout = async(req,res,next)=>{
    try {
        req.user.token = req.user.token.filter((t)=>t.token !=req.token);
         
        req.user.save();

        req.status(200).json({
            success:true,
            message:"user logout successfully"
        });

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//logout all user 
const  logoutAll = async (req,res,next)=>{
    try {
        
        req.user.token = [];

        req.user.save();

        res.status(200).json({
            success:true,
            message:"user logout all successfully",
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//delete all user 
const deleteUser = async (req,res,next)=>{
    try {

        const targetUser = req.params.id || req.user._id;

            const user = await User.findById(targetUser);

            await cloudinary.uploader.destroy(user.cloudinaryId)

            await user.deleteOne();

            res.status(200).json({
                success:true,
                message:"user deleted successfully"
            })
    } catch (error) {
        next (new HttpError(error.message,500))
    }
}

//user can be update and admin can be update user also
const UpdateUser = async (req,res,next)=>{
    try {
        const targetUser= req.params.id || req.user_.id;
        const user = await User.findById(targetUser);

        const update = object.keys(req.body);

        const allowFiled = ["name","password","phoneNumber"];

        if(req.user.role === "admin"){
            allowFiled = [...allowFiled,"isVerified"];
        }

        const isValidUpdate = update.every((filed)=>{
            return allowFiled.includes(filed)
        });

        if(!isValidUpdate){
            return next(new HttpError("only allow filed can be update"))
        }

        if(req.file){
            if(user.cloudinaryId){
                await cloudinary.update.destroy(user.cloudinaryId);
            }
            user.ProfilePic = req.file.path;
            user.cloudinaryId= req.file.filename;
        }

        update.forEach((update)=>{
            user[update]= req.body[update];
        })

        await user.save();

        res.status(200).json({
            message:"user data updated successfully",
            user
        })
    } catch (error) {
        next(new HttpError(error.message));
    }
}

const GetAllUser =async (req,res,next)=>{
    try {
        const user = await User.find();

      if(user.length === 0){
        return next(new HttpError("User data not found",404));
      }

      res.status(200).json({
        success:true,
        message:"All user data added successfully"
        ,Total :user.length,
        user
      })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



export default {add,getAll,login,Authlogin,logout,logoutAll,deleteUser,UpdateUser,GetAllUser}