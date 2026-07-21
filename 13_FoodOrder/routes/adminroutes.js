import express from "express";

import userController from "../controller/user.controller.js";
import {registerSchema} from "../validation/UserSchema.js"
import validate from "../middleware/validate.js"
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/validate.js";
import { updateUserSchema } from "../validation/UserSchema.js";

const router = express.Router();

router.delete("/delete/:id",auth,checkRole("admin",userController.deleteUser));

router.patch("/update/:id",checkRole("admin"),upload.single(ProfilePic),userController.UpdateUser);

export default router;