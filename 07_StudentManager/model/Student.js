
import mongoose, { Types } from "mongoose";

const StudentSchema = new mongoose.Schema({

    name:{
        Types:String,
        required:true,
        trim:true
    },

    GRID:{
        Types:Number,
        required:true,
        unique:true
    },

    email:{
        Types:String,
        required:true,
        unique:true
    },
    Number:{
        Types:Number,
        required:true,
        min:10
    },
    Course:{
        Types:String,
        required:true,
        enum:[
            "Full Stack Devloper",
            "Graphic Design",
            "Video Editing",
            "Ui/Ux"
        ]
    },

})

const Student =mongoose.model("StudentData",StudentSchema);