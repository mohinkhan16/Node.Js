
import express from "express"
import dotenv from "dotenv"
import HttpError from "./middleware/HttpError";
import connectDB from "./config/db";
dotenv.config({path:"./.env"});


const app = express();
app.use(express.json());

app.get("/",(req,res,next)=>{
    res.json({message:"hello from server"})
});


//middleware
app.get((req,res,next)=>{
    next(new HttpError("request rout not found"))
})

//centralized error

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
});

async function StartServer(params) {
    
    try {
        await connectDB();

        const port = process.env.PORT ||5000;

        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

StartServer()