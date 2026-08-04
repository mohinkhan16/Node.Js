
import { required, string } from "joi";
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({

    providerName:{
        type :String,
        ref:User,
        required:true,
    },
    restaurantName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:restaurant,
        required:true,
    },
    document:{
        type:String,
        required:true
    },
    Cloudinary_id:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    bankNumber:{
        type:String,
        required:true
    },
    bankName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Reject"],
        default:"pending"
    }
});

const ProviderModel = mongoose.model("provider",providerSchema);
export default ProviderModel;