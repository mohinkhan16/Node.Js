import express from "express";

import upload from "../middleware/upload.js";
import controller from "../Controller/EventController.js";

const router = express.Router();

router.post(
    "/add",
    upload.fields([
        {
            name: "EventPoster",
            maxCount: 1,
        },
        {
            name: "EventBanner",
            maxCount: 5,
        },
        {
            name: "EventSpeaker",
            maxCount: 5,
        },
    ]),
    controller.createEvent
);


router.patch(
  "/:id",

  upload.fields([
    { name: "EventImages", maxCount: 3 },
    { name: "EventPoster", maxCount: 2 },
    { name: "EventBanner", maxCount: 1 },
    { name: "EventSpeaker", maxCount: 2 },
  ]),

  controller.UpdateEventData
);


router.get("/", controller.getAllEvent);

router.get("/:id", controller.GetEventById);

router.delete("/:id", controller.DeleteById);


export default router;