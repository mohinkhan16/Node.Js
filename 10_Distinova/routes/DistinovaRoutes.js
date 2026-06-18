import express from "express";

import upload from "../controller/upload.js";
import DistinovaController from "../controller/DistinovaController.js";

const router = express.Router();

router.post(
  "/add",
  upload.single("packageImage"),
  DistinovaController.add
);

router.get("/all", DistinovaController.getAllPackage);

router.get("/:id",DistinovaController.getPackgeById);

router.delete("/:id",DistinovaController.PackageDelete);

router.put("/:id",DistinovaController.UpdatePackage);

export default router;