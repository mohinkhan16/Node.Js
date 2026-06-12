
import HttpError from "../middleware/HttpError.js";

import model from "../model/userModel.js";

const add = async (req,res,next)=>{

    try{
   const {name,Email,Password}=req.body;

    const newUser={
        name,
        Email,
        Password
    };

    await newUser.save()

    res.staus(201).json({
        success:true,
        message:"new user added successfully ",
        newUser
    })


    }catch(error){
        next (new httpError(error.message,500));
    }
}

const getAll = async (req,res,next)=>{
    try {
        const Users=await Users.find();

        res.status(200).json({
            success:true,
            message:"All data found successfully"
        })

    } catch (error) {
        next(new httpError(error.message,500))
    }
}


const login = async (req,res,next)=> {
    
    try{
        const {Email,Password}= req.body;

        const user=await User.findByCredentials(Email,Password);

        if(!user){
            next(new HttpError("Unable to login"));
        }

        res.status(200).json({
            success:true,
            message:"unable to login",
        })

    }catch(error){

        next(new httpError(error.message,500))
    }
}

export default {add,getAll,login}