

import express from "express"

import dotenv from "dotenv";
dotenv.config("./.env");
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js"


const app = express();

app.use(express.json());

//home routes
app.get("/",(req,res)=>{
    res.json({message:"Hello from server"})
});

//Middleware
app.use((req,res,next)=>{
    next(new HttpError("Request route not found",404))
})

//Error handling
app.use((error,req,res,next)=>{
    if(res.hedersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message||"internal server error"
    })
})

async function  Startserver() {
    try {
        await connectDB();

        const port= process.env.PORT || 5000;

        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

Startserver();