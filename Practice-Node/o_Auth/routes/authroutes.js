import express from "express";

import passport from "../config/passport.js";
import HttpError from "../middleware/HttpError.js";

const router = express.Router();

router.get("/login",(req,res)=>{
    res.render("login");
})


router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    prompt:"select_account"
})
);


router.get("/google/callback",passport.authenticate("google",{
    failureRedirect:"/",
}),

(req,res)=>{
    res.redirect("/profile")
}
)

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(new HttpError("failed to logout"))
        }
    });
    res.redirect("/")
})

export default router;