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
    return next(new HttpError(error.message,500));
  }
}

const UpdatePackage = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    const UPackage = await Distinova.findById(id);

    if (!UPackage) {
      return next(new HttpError("Distinova not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowFields = [
      "packageName",
      "price",
      "startDate",
      "endDate",
      "duration",
      "destination",
      "packageImage",
      "packageType",
    ];

    const isValidUpdate = updates.every((field) =>
      allowFields.includes(field)
    );

    if (!isValidUpdate) {
      return next(
        new HttpError("Only allowed fields can be updated", 400)
      );
    }

    updates.forEach((field) => {
      UPackage[field] = req.body[field];
    });

    if (req.file) {
      if (UPackage.cloudinary_id) {
        await cloudinary.uploader.destroy(
          UPackage.cloudinary_id
        );
      }

      UPackage.packageImage = req.file.path;
      UPackage.cloudinary_id = req.file.filename;
    }

    await UPackage.save();

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: UPackage,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
    add,
    getAllPackage,
    getPackgeById,
    PackageDelete,
    UpdatePackage
};