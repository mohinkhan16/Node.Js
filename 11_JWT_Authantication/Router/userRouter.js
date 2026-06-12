

import express from "express";

import controller from "../Controller/UserController.js";

const router = express.Router();

router.post("/add",controller.add);

router.get("/getAll",controller.getAll);

router.post("/login",controller.login);


export default router;

