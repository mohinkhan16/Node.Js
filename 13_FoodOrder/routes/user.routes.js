
import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validate.js";
import UserSchema from "../validation/UserSchema.js";

const router = express.Router();

//for add user
router.post("/add",validate(UserSchema),userController.add);

// for getall user
router.get("/getAll",userController.getAll);

//for login user by email,password
router.post("/login",userController.login);

//for auth login
router.get("/Authlogin",Auth,userController.Authlogin);

//for logoutUser
router.post("/logOut",Auth,controller.logOut);

//for logoutAllUser
router.post("/logOutAll",Auth,controller.logOutAll);

//for delete
router.delete("/DeleteUser",Auth,controller.DeleteUser);

//for update
router.patch("/:id",Auth,controller.UpdateUser);

export default router;