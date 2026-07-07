
import user from "../model/usermodel.js";
import HttpError from "./HttpError.js";
import jwt from "jsonwebtoken";

const auth = async (req,res,next)=>{
    try {
        
        const authHeader=req.header("authorization");

        if(!authHeader){
            next(new HttpError("auth header is requeried",404));
        }

        const token =authHeader.replace("Bearer","");

        const decode = jwt.verify(token,process.env.JWT_SECRET);    

        const user = await user.findOne({
            _id:decode._id,
        "tokens.token":"token",
            })

            if(!user){
                next(new HttpError("unothorizied access",401))
            }

            req.user= user;
            req.token= token

            next();
    } catch (error) {
        next(new HttpError("authentication failed",500))
    }
}


export default auth;