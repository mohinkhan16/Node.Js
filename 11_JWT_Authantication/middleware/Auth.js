
import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";
import User from "../model/userModel.js";


const auth = async function (req,res,next) {
    try {
        
        const authHeader=req.header("Authorization")

        console.log("task:-1",authHeader);

        if(!authHeader){
            return next(new HttpError("auth header is required",401));
        }

        const token=authHeader.replace("Bearer ","");

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findOne({
            _id:decoded._id,
            "tokens.token":token,
        });

        if(!user){
            return next(new HttpError("authentication failed",401));
        }

        req.user=user;

        req.token = token;



    } catch (error) {
        next(new HttpError("authenticating failed"));
    }

}