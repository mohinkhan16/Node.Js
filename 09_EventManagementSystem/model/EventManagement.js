
import mongoose from "mongoose"
import os from "os";


const EventSchema = new mongoose.Schema({

    EventName:{
        type:String,
        trim:true,
        required:true
    },

    EventDate:{
        type:Date,
        required:true
    },

    EventVenue:{
        type:String,
        required:true,
    },

    EventDescription:{
        type:String
    },

    TicketPrice:{
        type:Number,
        required:true,
    },
    
       EventImages: {
        type: [String],
        required: true
    },

    EventPoster:{
        type:[String],
        required:true,
    },

    EventBanner:{
        type:[String],
        required:true
    },

    EventSpeaker:{
        type:[String],
        required:true
    }
})

const Event = mongoose.model("EventManagement",EventSchema);

export default Event;