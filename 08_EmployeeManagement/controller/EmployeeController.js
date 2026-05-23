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

export default {
    add
};