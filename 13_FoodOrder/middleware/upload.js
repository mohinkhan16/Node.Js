import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudniaray.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dagtefhdu",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        width: 800,
        height: 800,
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