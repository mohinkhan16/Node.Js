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

const getAllBlog = async (req, res, next) => {
  try {
    const blog = await BlogModel.find().populate("Author", "Name Email");

    res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      count: blog.length,
      blog,
    });
  } catch (error) {
    console.log("GetAllBlog Error:", error);   
    next(new HttpError(error.message, 500));
  }
};

const UpdateBlog = async (req, res, next) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return next(new HttpError("Blog not found", 404));
    }

    const updates = Object.keys(req.body || {});

    const allowedFields = ["title", "Discription", "Category"];

    const isValidUpdate = updates.every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidUpdate) {
      return next(
        new HttpError("Only allowed fields can be updated", 400)
      );
    }

    if (req.file) {
      if (blog.cloudinary_id) {
        await cloudinary.uploader.destroy(blog.cloudinary_id);
      }

      blog.BlogImg = req.file.path;
      blog.cloudinary_id = req.file.filename;
    }

    updates.forEach((field) => {
      blog[field] = req.body[field];
    });

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    console.log(error);
    next(new HttpError(error.message, 500));
  }
};

const deleteBlog = async (req, res, next) => {
    try {

        const blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            return next(new HttpError("Blog not found", 404));
        }

        if (blog.cloudinary_id) {
            await cloudinary.uploader.destroy(blog.cloudinary_id);
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });

    } catch (error) {
        console.log(error);
        next(new HttpError(error.message, 500));
    }
};
export default {BlogAdd,getAllBlog,UpdateBlog,deleteBlog};