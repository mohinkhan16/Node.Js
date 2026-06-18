
import mongoose, { Types } from "mongoose";

const packageSchema = new mongoose.Schema ({

    packageName:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:String,
        required:true
    },

   startDate:{
        type:Date,
        required:true,
    },
     endDate:{
        type:Date,
        required:true,
    },
   destination:{
        type:String,
        required:true,
    },
   packageImage:{
        type:[String],
        required:true,
    },
    packageType:{
        type:String,
        require:true
    },
    Cloudinary_id:{
        type:String
    }
},{
    timestamps:true
},);

const packages= await mongoose.model("package",packageSchema);
export default packages;