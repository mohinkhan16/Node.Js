
import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validate.js";

import {UserSchema} from "../validation/UserSchema.js";
import {registerSchema} from "../validation/UserSchema.js";
 
import Auth from "../middleware/auth.js"
import checkRole from "../middleware/checkRole.js";
import User from "../model/user.model.js"
import upload from "../middleware/upload.js"

const router = express.Router();

//for add user
router.post("/add",validate(registerSchema),upload.single("ProfilePic"), userController.add);

// for getall user
router.get("/getAll",userController.getAll);

//for login user by email,password
router.post("/login",userController.login);

//for auth login
router.get("/Authlogin",Auth,userController.Authlogin);

//for logout user
router.post("/logOut", Auth, userController.logout);

//for logout all user
router.post("/logOutAll", Auth, userController.logoutAll);

//for delete user
router.delete("/DeleteUser", Auth, userController.deleteUser);

//for update a user 
router.patch("/:id", Auth, userController.UpdateUser);

//for check admin user
router.get("/allUser",Auth,checkRole("admin"),userController.GetAllUser)

export default router;