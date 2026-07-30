import express  from "express";
import usercontroller from "../controller/user.controller.js"
import {addBlogSchema , updateBlogSchema} from "../validation/BlogSchema.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/Auth.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.delete("/delete/:id",auth,checkRole("admin"),usercontroller.deleteUser);

router.patch("/update/:id",auth,checkRole("admin"),upload.single("BlogImg"),usercontroller.updateUser);

export default router;