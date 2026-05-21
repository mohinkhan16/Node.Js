

import mongoose from "mongoose";


const studentSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true
    },

    GRID:{
        type:Number,
        require:true,
        uniqe:true
    },

    Number:{
        type:Number,
        require:true,
    },

    email:{
        type:String,
        require:true,
        uniqe:true,
        trim:true
    },

    Course:{
        type:String,
        require:true,

        enum:[
            "FullStack",
            "Ui/Ux",
            "Graphic",
            "Ai/Ml"
        ]
    }
})

const student=mongoose.model(
    "studentData",
    studentSchema
)

export default student;