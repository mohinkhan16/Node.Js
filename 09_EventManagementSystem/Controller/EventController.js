import fs from "fs";
import HttpError from "../middleware/HttpError.js";
import Event from "../model/EventManagement.js";

// Create Event
const createEvent = async (req, res, next) => {
    try {

        const {
            EventName,
            EventDate,
            EventVenue,
            EventDescription,
            TicketPrice
        } = req.body;

            
        const EventImages = req.files?.eventImages?.map((file) => file.path )|| null;

        const EventPoster =
            req?.files?.EventPoster?.[0]?.path || "";

        const EventBanner =
            req?.files?.EventBanner?.map(file => file.path) || [];

        const EventSpeaker =
            req?.files?.EventSpeaker?.map(file => file.path) || [];

        const newEvent = new Event({
            EventName,
            EventDate,
            EventVenue,
            EventDescription,
            TicketPrice,
             EventImages,
            EventPoster,
            EventBanner,
            EventSpeaker
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            newEvent
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};


const getAllEvent = async (req, res, next) => {
    try {

        const EventData = await Event.find({});

        if (!EventData || EventData.length === 0) {
            return next(
                new HttpError("Event data not available", 404)
            );
        }

        res.status(200).json({
            success: true,
            message: "Event data found successfully",
            EventData
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const GetEventById = async (req, res, next) => {
    try {

        const id = req.params.id;

        const event = await Event.findById(id);

        if (!event) {
            return next(
                new HttpError("Event not found", 404)
            );
        }

        res.status(200).json({
            success: true,
            message: "Event found successfully",
            event
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};


const DeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return next(new HttpError("Event not found", 404));
    }

    const filesToDelete = [
      event.EventPoster,
      ...(event.EventBanner || []),
      ...(event.EventSpeaker || [])
    ];

    filesToDelete.forEach((file) => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return next(new HttpError(error.message, 500));
  }
};

const UpdateEventData = async (req, res, next) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return next(
                new HttpError("Event not found", 404)
            );
        }

        const updates = Object.keys(req.body);

        const allowedFields = [
            "EventName",
            "EventDate",
            "EventVenue",
            "EventDescription",
            "TicketPrice"
        ];

        const isValidUpdate = updates.every((field) =>
            allowedFields.includes(field)
        );

        if (!isValidUpdate) {
            return next(
                new HttpError("Invalid update fields", 400)
            );
        }

        if (req.files?.EventImages) {
            event.EventImages?.forEach((file) => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

            event.EventImages = req.files.EventImages.map(
                (file) => file.path
            );
        }

        if (req.files?.EventPoster) {
            if (
                event.EventPoster &&
                fs.existsSync(event.EventPoster)
            ) {
                fs.unlinkSync(event.EventPoster);
            }

            event.EventPoster =
                req.files.EventPoster[0].path;
        }

        if (req.files?.EventBanner) {
            event.EventBanner?.forEach((file) => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

            event.EventBanner = req.files.EventBanner.map(
                (file) => file.path
            );
        }

        if (req.files?.EventSpeaker) {
            event.EventSpeaker?.forEach((file) => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });

            event.EventSpeaker = req.files.EventSpeaker.map(
                (file) => file.path
            );
        }

        updates.forEach((field) => {
            event[field] = req.body[field];
        });

        await event.save();

        res.status(200).json({
            success: true,
            message: "Event Updated Successfully",
            event
        });

    } catch (error) {
        console.log(error);

        return next(
            new HttpError(error.message, 500)
        );
    }
};
export default {
    createEvent,
    getAllEvent,
    GetEventById,
    DeleteById,
    UpdateEventData
};