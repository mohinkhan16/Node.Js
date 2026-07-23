import RestaurantModel from "../model/Resturantmodel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req,res,next) =>{
    try {
        
const{
    RestaurantName,Address,phone,description,state,city,openTime,closeTime}=req.body;
    
const newRestaurant= await RestaurantModel({
    RestaurantName,
    Address,
    phone,
    description,
    state,
    city,
    openTime,
    closeTime,
    RestaurantImage:req.file?.path || null,
    cloudinary_id:req.file.filename || null,
});

await newRestaurant.save();

res.status(201).json({
    success:true,
    message:"new Restaurant added",
    newRestaurant
});

} catch (error) {
    next(new HttpError(error.message,500))        
    }
}


export default {add}