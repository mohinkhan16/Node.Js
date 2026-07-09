

import HttpError from "./HttpError.js";

const validate = (Schema) => (req,res,next) =>{
    try {
        const {error,value}=Schema.validate(req.body,{
            abortEarly:true,
            allowUnknown:false,
        });
        
        if(error){
            return next(new HttpError(error.message[0].message));
        }
        next();
        return value;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default validate;