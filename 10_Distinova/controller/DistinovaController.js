import Distinova from "../model/DistinovaModel.js";
import HttpError from "../middleware/httpError.js";
import httpError from "../middleware/httpError.js";

const add = async (req, res, next) => {
    try {
        const {
            packageName,
            price,
            startDate,
            endDate,
            duration,
            destination,
            packageType,
        } = req.body;

        const packageImage =
            req?.file?.path ||
            req?.files?.packageImage?.[0]?.path ||
            "";

        if (
            !packageName ||
            !price ||
            !startDate ||
            !endDate ||
            !duration ||
            !destination ||
            !packageType
        ) {
            return next(
                new HttpError("All fields are required", 400)
            );
        }

        const newDistinova = new Distinova({
            packageName,
            price,
            startDate,
            endDate,
            duration,
            destination,
            packageType,
            packageImage,
        });

        await newDistinova.save();

        res.status(201).json({
            success: true,
            message: "New package added successfully",
            data: newDistinova,
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};


const getAllPackage= async (req,res,next)=>{
    try{
        const packages=await Distinova.find();

        res.status(200).json({
            success:true,
            count:packages.length,
            data:packages
        });
    }catch(error){
        next(new httpError(error.message,500))
    }
}

const getPackgeById = async (req,res,next)=>{
    try{
        const {id}=req.params;

        const packageData=await Distinova.findById(id);


        if(!packageData){
            return next(new httpError("package not found",404));
        }

        res.status(200).json({
            success:true,
            data:packageData,
        })
    }catch(error){
        next(new httpError(error.message,500))
    }
}

export default {
    add,
    getAllPackage,
    getPackgeById
};