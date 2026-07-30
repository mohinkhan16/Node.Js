import BlogModel from "../model/BlogModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/coludinary.js";

const BlogAdd = async (req,res,next) =>{
    try {
        const {title,Discription,Category}=req.body;

        const newBlog = await BlogModel({
            title,
            Discription,
            Category,
             BlogImg:req.file?.path || null,
             cloudinary_id:req.file?.filename || null,
             Author:req.user._id,
        })
        await newBlog.save();
        res.status(201).json({
            success:true,
            message:"new Blog added successfully",newBlog
        })
    } catch (error) {
        console.log(error);
        next(new HttpError(error.message,500));
    }
}

const getAllBlog  = async (req,res,next)=>{
    try {
        const blog = await BlogModel.find().populate("Author name email","-_id");

        res.status(201).json({
            success:true,
            message:"All bolg find successfully",
            count:blog.length,
            blog,
        });
    } catch (error) {
        next(new HttpError(error.message,500))
    }
};

const UpdateBlog =  async (req,res,next)=>{
    try{
        const blog = await BlogModel.findById(req.params.id);

        if(!blog){
            return next(new HttpError("Blog not found",404));
        }

        const updates = Object.keys(req.body);

        const allowfeilds = ["title","Discription","Category"];

        const isValidateUpdate = update.every((field)=>
        allowedfeilds.include(feild),);

        if(!isValidateUpdate){
            return next(new HttpError("only allowed feilds can be update"));
        }

        if(req.file){
            if(blog.cloudinary_id){
                await cloudinary.uploader.destroy(blog.cloudinary_id);
            }
            blog.blogImg = req.file.path;
            blog.cloudinary_id = req.file.filename;
        }

        updates.forEach((feild)=>{
            blog[feild] = req.body[field];
        });

        await blog.save();

        res.status(200).json({
            success:true,
            message:"Blog update successfully",
            blog,
        })
    }catch(error){
        next(new HttpError(error.message,500));
    }
}

const deleteBlog = async (req,res,next)=>{
    try {
        const targetUser=req.params.id;

        const Blog = await BlogModel.findById(targetUser);

        if(req.user.cloudinary_id){
            await cloudinary.uploader.destroy(Blog.cloudinary_id);
        }
        await Blog.deleteOne();

        res.status(200).json({
            success:true,
            message:"Blog delete successfully"
        })
    } catch (error) {
        next (new HttpError(error.message));
    }
}
export default {BlogAdd,getAllBlog,UpdateBlog,deleteBlog};