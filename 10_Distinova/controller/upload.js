import multer from "multer";
import pkg from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary.js";

const { CloudinaryStorage } = pkg;

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Distinova",
        allowed_formats: ["jpeg", "png", "webp", "jpg"],
        transformation: [
            {
                height: 800,
                width: 800,
                crop: "limit",
            },
            {
                fetch_format: "webp",
            },
            {
                quality: "auto",
            },
        ],
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;