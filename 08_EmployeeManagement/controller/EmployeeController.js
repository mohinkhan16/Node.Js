import Employee from "../model/Employee.js";

const add = async (req, res, next) => {

    try {

        const { name, Id, MobileNumber, department, salary } = req.body;

        const newEmployee = new Employee({
            name,
            Id,
            MobileNumber,
            department,
            salary,
        });

        await newEmployee.save();

        res.status(201).json({
            success: true,
            message: "Employee data added successfully",
            newEmployee,
        });

    } catch (error) {

        next(error);
    }
};


const creatEmployee = async (req,res,next)=>{
    try{
        const employeeData=await Employee.find({});

        res.status(200).json({
            success:true,
            totalEmployee:employeeData.length,
            message:"employee data found successfully",
            employee:employeeData,
        });
    }catch(error){
        next(new httpError(error.message,500))
    }
}

const EmployeeById= async (req,res,next)=>{

    try{
        const {id}=req.params;

        const employeeData= await Employee.findById(id);

        if(!employeeData){
            return next(new httpError("employee data not found",404));
        }
        res.status(200).json({
            success:true,
            message:"employee data found successfully",
            employee:employeeData,
        })

    }catch(error){
        next(new httpError(error.message,500))
    }
} 

//this two method for delete employee data by id and delete all employee data

const deleteById= async (req,res,next)=>{
    try{

        const {id}=req.params;

        const employeeData = await employee.findByIdAndDelete(id);

        if(!employeeData){
            return next(new httpError("employee data not found",404));
        }

        res.status(200).json({
            success:true,
            message:"employee data deleted successfully"
        })

    }catch(error){
        next (new httpError(error.message,500))
    }
}

const  deleteAllEmployee = async (req,res,next)=>{

    try{

        const employeeData = await Employee.deleteMany({});

        res.status(200).json({
            success:true,
            message:"all employee data deleted successfully"
        })


    }catch(error){
        next(new httpError(error.message,500))
    }
}

//update

const updateById = async (req,res,next)=>{
    try{

        const {id}= req.params;

        const UpdateEmployee= await Employee.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );

        if(!updateEmployee){
            return next(new employee("employee data not found",404));
        }

        res.status(200).json({
            success:true,
            message:"employee data update successfully",
            updateByID
        });


    }catch(error){
        next(new httpError(error.message,500))
    }
}

const updateManually = async (req,res,next)=>{
    try{
        const {id}= req.params;

        const employeeData = await Employee.findById(id);

        if(!employeeData){
            return next(new httpError("Employee data not found",404));
        }

        const Update=object.keys(req.body);

        const AllowFiled=[
            "name",
            "MobileNumber",
            "department"
        ];

        const isValid=Update.every((update)=> AllowFiled.includes(update));

        if(!isValid){
            return next(new httpError("invalid Update",404));
        }

        update.forEach((update)=>{
            EmployeeData[update]=
            req.body[update];
        });

        await employeeData.save();

        res.status(200).json({
            success:true,
            message:"employee data update successfully"
        });

    }catch(error){
        next(new httpError(error.message,500))
    }
}



export default {
    add,
    creatEmployee,
    EmployeeById,
    deleteById,
    deleteAllEmployee,
    updateById,
    updateManually
};