import express from "express";

import studentControllers from "../controller/studentController.js";

const router = express.Router();

router.post("/add", studentControllers.add);

router.get("/getAllStudents", studentControllers.creatStudent);

router.get("/:id",studentControllers.studentById);

router.delete("/:id",studentControllers.deleteById);

router.patch('/:id',studentControllers. updateById)

export default router;