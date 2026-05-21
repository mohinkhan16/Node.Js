import httpError from "../middleware/httpError.js";
import student from "../model/studentModel.js";

const add = async (req, res, next) => {
    try {
        const { name, GRID, Number, email, Course } = req.body;

        const newStudent = new student({
            name,
            GRID,
            Number,
            email,
            Course
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student data added successfully",
            newStudent
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
};

const getAllStudent = async (req, res, next) => {
    try {

        const students = await student.find();

        res.status(200).json({
            success: true,
            total: students.length,
            students
        });

    } catch (error) {
        next(new httpError(error.message, 500));
    }
};


const deleteAllStudent = async (req, res, next) => {

try{

  const deleteStudent=await student.deleteMany({});

  res.status(200).json({
    success:true,
    message:"All student data deleted successfully"
  });

}catch(error){
next(
  new httpError(
    error.message,500
  )
)
}}


const updatemanually = async (req, res, next) => {
  try {

    const { id } = req.params;

    const studentData = await student.findById(id);

    if (!studentData) {
      return next(new httpError("Student not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "name",
      "email",
      "Number"
    ];

    const isValidUpdate = updates.every((field) => {
      return allowedFields.includes(field);
    });

    if (!isValidUpdate) {
      return next(new httpError("Invalid update fields", 400));
    }

    updates.forEach((update) => {
      studentData[update] = req.body[update];
    });

    await studentData.save();

    res.status(200).json({
      message: "Student data updated successfully",
      studentData
    });

  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const updateById = async (req,res,next)=>{


  try{
    const {id} = req.params;

    const studentData=await student.findByIdAndDelete(id);

    if(!studentData){
      return(new httpError("student not found",404))
    }

    res.status(200).json({
      success:true,
      message:"Student updated successfully",updateById
    })

  }catch(error){
    next(new httpError(error.message,500))
  }
} 

const deleteById = async (req,res,next)=>{
  try{
    const {id} = req.params;

    const studentData=await student.findByIdAndDelete(id);

    if(!studentData){
      return(new httpError("student not found",404))
    }
    res.status(200).json({
      success:true,
      message:"student deleted successfully",deleteById
    })
  }catch(error){
    next(new httpError(error.message,500))
  }
}


export default {
    add,
    getAllStudent,
    deleteAllStudent,
    updatemanually,
    updateById,
    deleteById
};