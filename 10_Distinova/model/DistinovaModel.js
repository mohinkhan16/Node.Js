
import mongoose from "mongoose";

const DistinovaSchema=new mongoose.Schema(
    {
        DistinovaName:{
            type:String,
            required:true,
            trim:true,
        },
        Price :{
            type:Number,
            required:true,
            min:0
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
});

const Distinova = mongoose.model("Distinova",DistinovaSchema);

export default Distinova;