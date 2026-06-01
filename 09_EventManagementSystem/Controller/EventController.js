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

        const id = req.params.id;

        const eventbyid = await Event.findById(id);

        if (!eventbyid) {
            return next(
                new HttpError("Event not found", 404)
            );
        }

      if (eventbyid.EventPoster && eventbyid.EventPoster.length > 0) {
    eventbyid.EventPoster.forEach((poster) => {
        if (fs.existsSync(poster)) {
            fs.unlinkSync(poster);
        }
    });
}

        if (eventbyid.EventBanner?.length > 0) {
            eventbyid.EventBanner.forEach((banner) => {
                if (fs.existsSync(banner)) {
                    fs.unlinkSync(banner);
                }
            });
        }

        if (eventbyid.EventSpeaker?.length > 0) {
            eventbyid.EventSpeaker.forEach((speaker) => {
                if (fs.existsSync(speaker)) {
                    fs.unlinkSync(speaker);
                }
            });
        }

        await eventbyid.deleteOne();

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default {
    createEvent,
    getAllEvent,
    GetEventById,
    DeleteById
};