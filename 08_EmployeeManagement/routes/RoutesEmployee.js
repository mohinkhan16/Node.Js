import express from "express";

import EmployeeController from "../controller/EmployeeController.js";

const router = express.Router();

router.post("/add", EmployeeController.add);

router.get("/all",EmployeeController.creatEmployee);

export default router;