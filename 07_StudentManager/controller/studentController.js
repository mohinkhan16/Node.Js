import httpError from "../middleware/httpError.js";
import Student from "../model/student.js";

const add = async (req, res, next) => {
  try {
    const { name, GRID, email, Number, Course } = req.body;

    const newStudent = new Student({
      name,
      GRID,
      email,
      Number,
      Course,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student data added successfully",
      newStudent,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const creatStudent = async (req, res, next) => {
  try {
    const studentData = await Student.find({});

    res.status(200).json({
      success: true,
      total: studentData.length,
      message: "Student data found",
      student: studentData,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const studentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentData = await Student.findById(id);

    if (!studentData) {
      return next(new httpError("Student not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Student found",
      studentData,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const studentData = await Student.findByIdAndDelete(id);

    if (!studentData) {
      return next(new httpError("Student not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const updateById= async(req,res,next)=>{

  try{
    const {id} = req.params;
    const updateStudent= await Student.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    );

    if(!updateStudent){
       return next(new httpError("Student not found", 404));
    }

    res.status(200).json({
      success:true,
      message:"Student Updated successfully",
      updateById,
    });
  }catch(error){
      next(new httpError(error.message, 500));
  }
}

export default {
  add,
  creatStudent,
  studentById,
  deleteById,
  updateById,
};