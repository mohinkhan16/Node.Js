import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    GRID:{
        type:Number,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    Number:{
        type:Number,
        required:true,
        min:10
    },

    Course:{
        type:String,
        required:true,
        enum:[
            "Full Stack Devloper",
            "Graphic Design",
            "Video Editing",
            "Ui/Ux"
        ]
    }

});

const Student = mongoose.model("StudentData",StudentSchema);

export default Student;