
import mongoose from "mongoose";

const newBlog = new mongoose.Schema({

    title:{
        type:String,
        requried:true
    },
    Discription:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        enum:["Events","sports","Motivated","fun"],
        required:true
    },
    BlogImg:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
})

const BlogSchema = mongoose.model("blog",newBlog)

export default BlogSchema;