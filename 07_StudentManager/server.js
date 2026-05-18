import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.use("/student", studentRoutes);

app.use((req,res,next)=>{
    return next(new httpError("request route not found",400));
});

app.use((error,req,res,next)=>{

    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message:error.message || "something went wrong"
    });

});

const port = 5000;

async function startserver() {

    try{

        await connectDB();

        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        });

    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

startserver();