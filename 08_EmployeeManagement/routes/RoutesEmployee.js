import express from "express";

import EmployeeController from "../controller/EmployeeController.js";

const router = express.Router();

router.post("/add", EmployeeController.add);

router.get("/all",EmployeeController.creatEmployee);

router.get("/EmpId",EmployeeController.EmployeeById);

router.delete("/det",EmployeeController.deleteById);

router.delete("/delete",EmployeeController.deleteAllEmployee);

router.patch("/update",EmployeeController.updateById);

router.patch("/upd",EmployeeController.updateManually)

export default router;