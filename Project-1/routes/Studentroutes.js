import express from "express";
import studentController from "../Controller/studentController.js";

const router = express.Router();

router.get("/AllStudent", studentController.getAllStudent);

router.post("/add",studentController.add);

router.delete("/:id",studentController.deleteAllStudent);

router.patch("/:id",studentController.updatemanually);

export default router;