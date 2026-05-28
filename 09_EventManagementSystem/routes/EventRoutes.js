
import express from "express"

import upload from "./middleware/upload.js";

import httpError from "./middleware/httpError.js";

import Controller from "./Controller/EventController.js";

const router = express.Router();

router.post("/add",
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
        {
            name: "EventDocument",
            maxCount: 5
        }
    ]),
    controller.create
)
export default router