

import express from "express";

import usercontroller from "../controller/usercontroller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add",usercontroller.add);

router.get("/getAlluser",auth,usercontroller.getAlluser);

router.post("/login",usercontroller.login);


export default router;