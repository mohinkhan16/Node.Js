
import user from "../model/usermodel.js"

import HttpError from "../middleware/HttpError.js"


const add = async (req,res,next)=>{

    try{
        const {name,email,password}= req.body;

        const newUser = new user ({email,name,password});

        await newUser.save();

        res
        .status(201)
        .json({success:true,Message:"user added successfully",newUser})
    }catch{
        return next(new HttpError(error.Message,500))
    }
};


const getAlluser=async (req,res,next)=>{
    try {
        const users=await user.find();

        if(users.length===0){
            return next(new HttpError("no user data found",404));
        }

        res.status(200).json({
            success:true,
            message:"all user fetched successfully",
            users
        })
    } catch (error) {
        return next(new HttpError(error.message,500))
    }
}


const login = async (req,res,next)=>{
    try {
        const {email,password}= req.body;

        const user = await user.findByCredential({email,password});

        if(!user){
            next(new HttpError("unable to login",404));
        }

        const token= await user.generatAuthToken();
        console.log("token",token);

        res.status(200)
        .json({success:true,message:"user logged in suceesfully",user,token})
    } catch (error) {
        return next (new HttpError(error.message,500))
    }
}


const authlogin = async (req,res,next)=>{
   const user = req.user;

   res.status(200).json({success:true,message:"auth login succesfully",user});
    
}

const deleteuser = async (req,res,next)=>{
    try {
        const   user = req.user;

        await user.deleteOne(user);

        res.status(200).json({
           success:true,message:"user deleted succesfully"
        })
    } catch (error) {
        return next (new HttpError(error.message,500));
    }
}

const update = async(req,res,next)=>{
    try {
        
        const user = req.user;

    const updates = Object.keys(req.body);

    const allowedField = ["name", "password"];

    const isValidUpdates = updates.every((field) =>
      allowedField.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be update", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user data updated successfully", user });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}

export default{add,getAlluser,login,authlogin,deleteuser,update};