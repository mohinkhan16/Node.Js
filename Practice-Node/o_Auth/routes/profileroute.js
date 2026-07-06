import express from "express";

import CheckAuth from "../middleware/CheckAuth.js";

const router =express.Router();

router.get("/",CheckAuth,(req,res)=>{
    res.render("profile", {user:req.user});
})

export default router;