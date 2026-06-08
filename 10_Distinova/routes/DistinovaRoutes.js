import express from "express";

import upload from "../controller/upload.js";
import DistinovaController from "../controller/DistinovaController.js";

const router = express.Router();

router.post(
  "/add",
  upload.single("packageImage"),
  DistinovaController.add
);

export default router;