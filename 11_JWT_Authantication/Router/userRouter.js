

import express from "express";

import controller from "../Controller/UserController.js";

const router = express.Router();

router.post("/add",controller.add);


export default router;