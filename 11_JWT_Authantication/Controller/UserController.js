

import httpError from "../../10_Distinova/middleware/httpError.js";
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

export default {add}