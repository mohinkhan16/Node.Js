import mongoose from "mongoose";

const RestaurantSchema = await mongoose.Schema({
    RestaurantName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    openTime:{
        type:String,
        required:true
    },
    closeTime:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    RestaurantImage:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String
    },
},{timestamps:true

});

const RestaurantModel=mongoose.model("Restaurant",RestaurantSchema);
export default RestaurantModel;