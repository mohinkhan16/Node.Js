
import { JsonWebTokenError } from "jsonwebtoken";

import User from "../model/user.model.js";
import HttpError from "./HttpError.js";

const auth = async(req,res,next)=>{
    try {
        

        const authHeader= req.header("Authorization");

        if(!authHeader){
            return next(new HttpError("auth header is required",401))
        }

        const token= authHeader.replace("Bearer","");

        const decode =Jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({
            _id:decode._id,
            "tokens.toke":token,
        });

        if(!user){
            return next(new HttpError("authentication failed",401))
        }

        req.user=user;
        req.token= token;

        next();
    } catch (error) {
        next (new HttpError("authentication failed"))
    }
}

export default auth;