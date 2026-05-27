

import fs from "fs";

import HttpError from "../middleware/HttpError.js";

import Event from "../model/EventManagement.js"

const createEvent = async (req,res,next)=>{
    try{

        const {EventName,EventDate,EventVenue,EventDescription,TicketPrice}=req.body

        const EventPoster = req?.files.EventPoster?.[0];
        const EventBanner = req?.files.EventBanner || [];
        const EventSpeaker = req?.files.EventSpeaker || [];


        const newEvent=new Event({
            EventName,
            EventDate,
            EventVenue,
            EventDescription,
            TicketPrice,
            EventPoster,
            EventBanner,
        });

        await newEvent.save();

        res.status(201).json({success:true,newEvent});
    }catch(error){

        next(new HttpError(error.message,500));
    }


}