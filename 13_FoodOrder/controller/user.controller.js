
import  HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import cloudinary from "../config/Cloudniaray.js";
import RestaurantModel from "../model/Resturantmodel.js";
import userModel from "../model/user.model.js"

//for user add
const add = async (req, res, next) => {
  try {
     const {
            name,
            email,
            password,
            address,
            PhoneNumber,
            role,
            ProfilePic,
            cloudinaryId
       
        } = req.body;

         const {
            name,
            email,
            password,
            address,
            PhoneNumber,
            role,
            ProfilePic,
            cloudinaryId,
            restaurant
        } = req.body;

        const restaurantData = await RestaurantModel.findById(restaurant);

        if(!restaurantData){
            return res.status(404).json({
                message:"restaurant not found"
            })
        }

        const newUser = new User({
            name,
            email,
            password,
            address,
            PhoneNumber,
            role,
            Profile_Pic: req.file?.path,
            Cloudinary_Id: req.file.filename,
            restaurant:restaurantData._id,
            ProfilePic:req.file ? req.file.path :"null",
            cloudinaryId:req.file ?req.file.filename:"null"
        });

    
     await newUser.save();
 
    res.status(201).json({ success: true, message: "new User added", newUser });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


//for how many user there are for check
const getAll = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      role,
      search,
      city,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (city) {
      filter.address = {
        $regex: city,
        $options: "i",
      };
    }

    if (role) {
      filter.role = role;
    }

    const sortOption = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const totalUser = await User.countDocuments(filter);

    const user = await User.find(filter)
      .populate("restaurant", "name address -_id")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (user.length === 0) {
      return res.status(404).json({
        success: true,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user founds",
      totalUser: totalUser,
      totalPages: Math.ceil(totalUser / limit),
      page: page,
      currentPage: page,
      user,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

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
        filter.userName ={
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

    const totalUser = await userModel.countDocument(filter);

    const User = await RestaurantModel 
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

//for auth login 
const Authlogin =async (req,res,next)=>{
    try {
        const user= req.user;

        if(!user){
            return next(new HttpError("unable to login",401));
        }

        res.status(200).json({
            success:true,
            message:"Auth login successfully",
            user
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//for user login
const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user=await User.findByCredentials(email,password);
         
           const token = await user.generateAuthToken();

        res.status(200).json({
            success:true,
            message:"login successfully",
            user,
            token,
            
        })
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

//for user
const logout = async(req,res,next)=>{
    try {
        req.user.token = req.user.token.filter((t)=>t.token !=req.token);
         
        req.user.save();

        req.status(200).json({
            success:true,
            message:"user logout successfully"
        });

    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//logout all user 
const  logoutAll = async (req,res,next)=>{
    try {
        
        req.user.token = [];

        req.user.save();

        res.status(200).json({
            success:true,
            message:"user logout all successfully",
        })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

//delete all user 
const deleteUser = async (req,res,next)=>{
    try {

        const targetUser = req.params.id || req.user._id;

            const user = await User.findById(targetUser);

            await cloudinary.uploader.destroy(user.cloudinaryId)

            await user.deleteOne();

            res.status(200).json({
                success:true,
                message:"user deleted successfully"
            })
    } catch (error) {
        next (new HttpError(error.message,500))
    }
}

//user can be update and admin can be update user also
const UpdateUser = async (req,res,next)=>{
    try {
        const targetUser= req.params.id || req.user_.id;
        const user = await User.findById(targetUser);

        const update = object.keys(req.body);

        const allowFiled = ["name","password","phoneNumber"];

        if(req.user.role === "admin"){
            allowFiled = [...allowFiled,"isVerified"];
        }

        const isValidUpdate = update.every((filed)=>{
            return allowFiled.includes(filed)
        });

        if(!isValidUpdate){
            return next(new HttpError("only allow filed can be update"))
        }

        if(req.file){
            if(user.cloudinaryId){
                await cloudinary.update.destroy(user.cloudinaryId);
            }
            user.ProfilePic = req.file.path;
            user.cloudinaryId= req.file.filename;
        }

        update.forEach((update)=>{
            user[update]= req.body[update];
        })

        await user.save();

        res.status(200).json({
            message:"user data updated successfully",
            user
        })
    } catch (error) {
        next(new HttpError(error.message));
    }
}

const GetAllUser =async (req,res,next)=>{
    try {
        const user = await User.find();

      if(user.length === 0){
        return next(new HttpError("User data not found",404));
      }

      res.status(200).json({
        success:true,
        message:"All user data added successfully"
        ,Total :user.length,
        user
      })
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}



export default {add,getAll,login,Authlogin,logout,logoutAll,deleteUser,UpdateUser,GetAllUser}