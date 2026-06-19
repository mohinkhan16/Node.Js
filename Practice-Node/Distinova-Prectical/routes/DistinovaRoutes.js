import express from "express";
import upload from "../middleware/upload.js";
import controller from "../controller/DistinovaController.js";

const router = express.Router();

router.post(
  "/add",
  upload.single("packageImage"),
  controller.add
);


router.get("/all", controller.getAllPackage);

router.get("/:id",controller.getPackgeById);

router.delete("/:id",controller.PackageDelete);

router.patch("/:id",upload.single("packageImage"),controller.UpdatePackage);
export default router;