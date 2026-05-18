import httpError from "../middleware/httpError.js";

import Student from "../model/student.js";

const add = async(req,res,next)=>{

    try{

       const { name, GRID, email, Number, Course } = req.body;

       const newStudent = new Student({
            name,
            GRID,
            email,
            Number,
            Course
       });

       await newStudent.save();

       res.status(201).json({
            success:true,
            message:"Student data added successfully",
            newStudent,
       });

    }
    catch(error){
        next(new httpError(error.message,500));
    }
} 

export const creatStudent = async(req,res,next)=>{

    try{

        const studentData = await Student.find({});

        if(studentData.length <= 0){

            return res.status(200).json({
                success:true,
                message:" student data added succesfully"
            });

        }

        res.status(200).json({
            success:true,
            total:studentData.length,
            message:"Student data found",
            student:studentData,
        });

    }
    catch(error){
        next(new httpError(error.message,500));
    }

};

export default { add, creatStudent };