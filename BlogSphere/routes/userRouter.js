
import express from "express";
import Usercontroller from "../controller/user.controller.js";
import auth from "../middleware/Auth.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.post("/add",Usercontroller.add);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Router is working"
    });
});

router.get("/getAll",Usercontroller.getAllUser);

router.post("/login",Usercontroller.login);

router.post("/authLogin",auth,Usercontroller.authLogin);

router.get("/logoutAll",auth,Usercontroller.logoutAll);

router.delete("/deleteUser",auth,Usercontroller.deleteUser);

router.post("/Update",auth,upload.single("Profile_Pic"),Usercontroller.updateUser);

export default router;