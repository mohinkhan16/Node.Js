import RestaurantModel from "../model/Resturantmodel.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req,res,next) =>{
    try {
        
const{
    RestaurantName,Address,phone,description,state,city,openTime,closeTime}=req.body;
    
const newRestaurant= new RestaurantModel({
    RestaurantName,
    Address,
    phone,
    description,
    state,
    city,
    openTime,
    closeTime,
    RestaurantImage:req.file?.path || null,
    cloudinary_id:req.file.filename || null,
});

await newRestaurant.save();

res.status(201).json({
    success:true,
    message:"new Restaurant added",
    newRestaurant
});

} catch (error) {
    next(new HttpError(error.message,500))        
    }
}


const getAll = async (req,res,next)=>{
  try {
    let {
        page=1,
        limit=1,
        isOpen,
        search,
        city,
        sort = "createdAt",
        order="desc",
    }=req.query;

    page = Number(page);

    limit=Number(limit);

    const filter = {};

    if(search){
        filter.RestaurantName ={
            $regex :search,
            $option :"i",
        };
    }

    if(city){
        filter.city = city;
    }

    if(isOpen !== undefined){
        filter.isOpen = isOpen === "true";
    }

    const sortOption = {
        [sort] : order === "asc" ?1 :-1
    };

    const totalRestaurant = await RestaurantModel.countDocument(filter);

    const restaurant = await RestaurantModel 
    .find(filter)
    .populate("owner","name email address -_id")
    .sort(sortOption)
    .skip((page-1)*limit)
    .limit(limit)
    .lean()

    if(restaurant.length === 0){
        res.status(404).json({
            success:true,
            message:"restaurant not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"restaurant founds",
        totalRestaurant :totalRestaurant,
        totalPages:Math.ceil(totalRestaurant / page),
        page:page,
        currentPage :page,
        restaurant
    });
  } catch (error) {
        return next(new HttpError(error.message, 500));
  }
}

const UpdateRestaurant = async (req,res,next)=>{
    try {
        const Restaurant = await RestaurantModel.findById(req.params.id);

        if(!Restaurant){
            return next(new HttpError("restaurant not found",404));
        }

        const update = Object.keys(req.body);

        const allowFiled =[
            "RestaurantName",
            "Address",
            "phone",
            "description",
            "openTime",
            "closeTime"
        ];

        const isValidUpdate= update.every((field)=>{
            allowFiled.includes(field)
        })

        if(!isValidUpdate){
            return next(new HttpError("only allowed can field be update"))
        }

        if(req.file){
            if(Restaurant.cloudinary_id){
                await cloudinary.uploader.destroy(Restaurant.cloudinary_id);
            }
            Restaurant.RestaurantImage = req.file.path;
            Restaurant.cloudinary_id=req.file.filename;
        }

        updates.forEach((field)=>{
            Restaurant[field]= req.body[field];
        })

        await Restaurant.save();

        res.state(200).json({
            success:true,
            message:"Restaurant updated successfully",
            Restaurant
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}


const deleteRestaurant = async(req,res,next)=>{
    try {
        const deleteUser = req.params.id;

        const Restaurant = await RestaurantModel.findById(deleteUser);

        if(user.cloudinary_id){
            await cloudinary.uploader.destroy(Restaurant.cloudinary_id);
        }

        await Restaurant.deleteOne();

        res.status(201).json({
            success:true,
            message:"restaurant deleted successfully",
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}
export default {add,getAll,UpdateRestaurant,deleteRestaurant}