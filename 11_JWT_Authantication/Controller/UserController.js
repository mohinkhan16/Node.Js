
import HttpError from "../middleware/HttpError.js";
import model from "../model/userModel.js";

const add = async (req,res,next)=>{

    try{

        const {name,Email,Password}=req.body;

        const newmodel = new model({
            name,
            Email,
            Password
        });

        await newmodel.save();

        res.status(201).json({
            success:true,
            message:"New user added successfully",
            newmodel
        });

    }catch(error){

        next(new HttpError(error.message,500));

    }
}
const getAll = async (req,res,next)=>{
    try {

        const models = await model.find();

        res.status(200).json({
            success:true,
            message:"All data found successfully",
            models
        });

    } catch (error) {

        next(new HttpError(error.message,500));

    }
}


const login = async (req,res,next)=>{
    try {

        const { Email, Password } = req.body;

        const model = await model.findByCredentials(
            Email,
            Password
        );

        res.status(200).json({
            success:true,
            message:"Login successful",
            model
        });

    } catch(error){

        next(new HttpError(error.message,500));

    }
}

export default {add,getAll,login}