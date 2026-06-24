
import express from "express";

import HttpError from "../middleware/HttpError.js"


const router = express.Router();

router.get("/login",(req,res)=>{
    console.log("Login route hit");
    res.render("login")
});

export default router;