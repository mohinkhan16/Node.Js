import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    Id: {
        type: String,
        required: true,
        unique: true
    },

    MobileNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },

    department: {
        type: String,
        required: true,

        enum: [
            "It",
            "Civil",
            "Mechanical",
            "Electrical"
        ]
    },

    salary: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

const Employee = mongoose.model("EmployeeData", EmployeeSchema);

export default Employee;