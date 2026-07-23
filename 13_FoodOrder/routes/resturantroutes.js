

import RestaurantController from "../controller/Restaurant.controller.js";
import auth  from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import express from "express";
import validate from "../middleware/validate.js";
import { RestaurantSchema } from "../validation/ResturantSchema.js";

const router = express.Router();

router.post("/add",auth,upload.single("RestaurantImage"),validate(RestaurantSchema),RestaurantController.add);

export default router;