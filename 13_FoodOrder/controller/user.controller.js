
import  HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";

//for user add
const add = async (req,res,next)=>{
    try {
        const {name,email,password,role,PhoneNumber,address,isVerified}=req.body;

        const newUser={
            name,
            email,
            password,
            role,
            PhoneNumber,
            address,
            isVerified,
        };
        // console.log(newUser);

        const user =new User(newUser);

        await user.save();

        res.status(201).json({
            success:true,
            message:"new user created successfully",
            user    
        })
        
    } catch (error) {
        next (new HttpError(error.message,500));
    }
}

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


//for user login
const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findByCredentials(email,password);
         
        // const token=await user.generatAuthToken();

        res.status(200).json({
            success:true,
            message:"login succesfully",
            user,
            
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

//for user


export default {add,getAll,login};