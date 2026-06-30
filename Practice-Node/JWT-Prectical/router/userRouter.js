
import express from "express";

import controller from "../controller/UserController.js";
import  auth from "../middleware/auth.js"

const router = express.Router();

router.post("/add",controller.add);

router.get("/getAll",controller.getAll);

router.post("/login",controller.login);

router.get("/loginAuth",auth,controller.AuthLogin);

router.post("/logOut",auth,controller.logOut);

router.post("/logOutAll",auth,controller.logOutAll);

router.delete("/delete",auth,controller.DeleteUser);

router.patch("/update",auth,controller.UpdateUser);

export default router;

