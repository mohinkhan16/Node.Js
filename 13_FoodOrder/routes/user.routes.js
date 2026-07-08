
import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

//for add user
router.post("/add",userController.add);

// for getall user
router.get("/getAll",userController.getAll);

//for login user by email,password
router.post("/login",userController.login);

export default router;