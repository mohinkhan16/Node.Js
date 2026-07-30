
import multer from "multer";
import cloudinary from "../config/coludinary.js"

import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"Blog",
        allowed_formats :["jpeg","png","webp","jpg"],
        transformation:[{
            height:800,
            width:800,
            crop:"limit",
        },{
            fetch_format:"webp"
        },],
    }
});

const upload = multer({
    storage,
    limits:{
        fileSize :5*1024*1024,
    },
});

export default upload;