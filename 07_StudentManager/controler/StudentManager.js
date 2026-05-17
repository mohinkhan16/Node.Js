import Student from "./model/Student.js";

export const getStudent=(req,res,next)=>{

    try{
        const student=await student.find();

        res.status(200).json({
            success:true,
            data:student
        })
    }
    catch(error){
        next(error)
    }
}

export const creatStudent = async(req,res,next)=>{
    try{
        const student = await student.creat(req.body);
        
        res.status(201).json({
            success:true,
            data:student
        })
    }
    catch(error){
        next(error)
    }
}