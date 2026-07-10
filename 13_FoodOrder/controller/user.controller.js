
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

        const token= await user.findByCredentials(email,password)
        
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
         
        const token=await user.generatAuthToken();

        res.status(200).json({
            success:true,
            message:"login successfully",
            user,
            
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

const deleteUser = async (req,res,next)=>{
    try {
            const user = req.user;

            await user.deleteOne();

            res.status(200).json({
                success:true,
                message:"user deleted successfully"
            })
    } catch (error) {
        next (new HttpError(error.message,500))
    }
}

const UpdateUser = async (req,res,next)=>{
    try {
        const user = req.user;

        if(!user){
            return next(new HttpError("No user found"));
        }

        const update = Object.keys(req.body);

        const AllowedFiled =["name","password"];

        const isValid = update.every((filed)=>AllowedFiled.includes(filed));

        if(!isValid){
            return next(new next("only allow field can be update",400))
        }

        update.forEach((update)=>{
            return (user[update]= req.body[update])
        })

        await user.save();

        res.status(200).json
        ({
            success:true,
            message:"user data update successfully",
            user
        })

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}


export default {add,getAll,login,Authlogin,logout,logoutAll,deleteUser,UpdateUser};