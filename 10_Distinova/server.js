import express from "express";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})

import httpError  from "./middleware/httpError.js";

import connectDB from "./config/db.js";

const app = express();

app.use=(express.json());
app.use("/package",)

app.get("/",(req,res)=>{
    res.json({message:"hello from server"})
})

app.use((req,res,next)=>{
    return next(new httpError(
        "request routes not found",404 ))
})

app.use((next,req,res,next)=>{
    return next(new httpError("request rout not found"));
})

aap.use((error,req,res,next)=>{
     if(res.headersSent){
        return next(error);
     }
     res.status(error.statusCode || 500)
     .json({message:error.message || "internal server error"})
})

const port =5000;

async function startServer() {

    try{
        const connect=await connectDB();

        if(!connect){
            return console.log("failed to connectDB");
        }

        app.listen(port,(err)=>{
            if(err){
                return console.log(err.message);
            }
        })

        console.log(`surver running on port${port}`)
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

startServer()