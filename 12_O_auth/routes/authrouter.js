
import express from "express";

import HttpError from "../middleware/HttpError.js"


const router = express.Router();

router.get("/login",(req,res)=>{
   
    res.render("login")
});

export default router;