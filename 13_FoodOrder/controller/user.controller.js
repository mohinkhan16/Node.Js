

import  HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";

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

export default {add};