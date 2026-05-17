import express from "express";

const router=express.routes();


    import * as studentControler from "./controler/StudentManager.js"

router.routes("/")
.get(studentControler.getStudents)
.post(studentControler.createStudent);


export default router;