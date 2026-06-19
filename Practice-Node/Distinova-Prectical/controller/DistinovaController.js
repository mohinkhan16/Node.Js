


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

const PackageDelete = async (req,res,next)=>{
  try{

    const Packages = await Distinova.findById(req.params.id.trim());

    console.log("Package:", Packages);

    if(!Packages){
      return next(new HttpError("Distinova not found",404));
    }

    console.log("Cloudinary ID:", Packages.cloudinary_id);

    if(Packages.cloudinary_id){
      await cloudinary.uploader.destroy(Packages.cloudinary_id);
    }

    await Packages.deleteOne();

    res.status(200).json({
      success:true,
      message:"Package deleted successfully"
    });

  }catch(error){
    console.log("DELETE ERROR:", error);
    return next(new HttpError(error.message,500 ));
  }
}
const UpdatePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packageUpdate = await Distinova.findById(id);

    if (!packageUpdate) {
      return next(new httpError("Package data not available", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdate = [
      "packageName",
      "price",
      "startDate",
      "endDate",
      "destination",
      "packageType", 
    ];

    const isValidUpdates = updates.every((field) =>
      allowedUpdate.includes(field)
    );

    if (!isValidUpdates) {
      return next(new httpError("Only allowed fields can be updated", 400));
    }

    updates.forEach((field) => {
      packageUpdate[field] = req.body[field];
    });

    if (req.file) {
      console.log("Cloudinary ID:", packageUpdate.cloudinary_id);

      await cloudinary.uploader.destroy(packageUpdate.cloudinary_id);
      console.log("Cloudinary ID:", packageUpdate.cloudinary_id);

      packageUpdate.packageImage = req.file.path;
      packageUpdate.cloudinary_id = req.file.filename;
    }

    await packageUpdate.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: packageUpdate,
    });
  } catch (error) {
    console.log(error);
    next(new httpError(error.message, 500));
  }
};
export default {
    add,
    getAllPackage,
    getPackgeById,
    PackageDelete,
    UpdatePackage,
};