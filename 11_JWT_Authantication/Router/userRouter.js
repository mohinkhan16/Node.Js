

import express from "express";

import controller from "../Controller/UserController.js";

import Auth from "../middleware/Auth.js";

const router = express.Router();

router.post("/add",controller.add);

router.get("/getAll",controller.getAll);

router.post("/login",controller.login);

router.get("/loginAuth",Auth,controller.AuthLogin);

router.post("/logOut",Auth,controller.logOut);

router.post("/logOutAll",Auth,controller.logOutAll);

router.delete("/DeleteUser",Auth,controller.DeleteUser);

router.patch("/:id",Auth,controller.UpdateUser);

export default router;

