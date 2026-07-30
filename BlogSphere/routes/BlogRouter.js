import express from "express";

import Blogcontroller from "../controller/Blog.controller.js";
import auth from "../middleware/Auth.js";
import upload from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import {addBlogSchema , updateBlogSchema} from "../validation/BlogSchema.js";

const router = express.Router();

router.post("/add",auth, upload.single("BlogImg"),Blogcontroller.BlogAdd);

router.get("/getAllBlog",auth,Blogcontroller.getAllBlog);

router.patch("/update/:id",auth,upload.single("BlogImg"),validate(updateBlogSchema),Blogcontroller.UpdateBlog);

export default router;