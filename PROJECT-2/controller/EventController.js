import fs from "fs";
import HttpError from "../middleware/HttpError.js";
import Event from "../model/EventModel.js";

const createEvent = async (req, res, next) => {
  try {
    const {
      EventName,
      EventDate,
      EventVenue,
      EventDescription,
      TicketPrice,
    } = req.body;

    const EventImages =
      req.files?.EventImages?.map((file) => file.path) || [];

    const EventPoster =
      req.files?.EventPoster?.[0]?.path || "";

    const EventBanner =
      req.files?.EventBanner?.map((file) => file.path) || [];

    const EventSpeaker =
      req.files?.EventSpeaker?.map((file) => file.path) || [];

    const newEvent = new Event({
      EventName,
      EventDate,
      EventVenue,
      EventDescription,
      TicketPrice,
      EventImages,
      EventPoster,
      EventBanner,
      EventSpeaker,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      newEvent,
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
      EventData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const GetEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return next(
        new HttpError("Event not found", 404)
      );
    }

    res.status(200).json({
      success: true,
      message: "Event found successfully",
      event,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const DeleteById = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new HttpError("Invalid Event ID", 400));
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(new HttpError("Event not found", 404));
    }

    const filesToDelete = [
      ...(event.EventImages || []),
      event.EventPoster,
      ...(event.EventBanner || []),
      ...(event.EventSpeaker || []),
    ];

    filesToDelete.forEach((file) => {
      if (file && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateEvent = async (req, res, next) => {
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
      "EventDescription",
      "EventVenue",
      "TicketPrice",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidUpdates) {
      return next(
        new HttpError(
          "Only allowed fields can be updated",
          400
        )
      );
    }

    if (req.files?.EventImages) {
      (event.EventImages || []).forEach((file) => {
        if (file && fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.EventImages = req.files.EventImages.map(
        (file) => file.path
      );
    }

    updates.forEach((field) => {
      event[field] = req.body[field];
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  createEvent,
  getAllEvent,
  GetEventById,
  DeleteById,
  updateEvent,
};