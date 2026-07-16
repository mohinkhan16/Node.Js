
//third party or extrnal module
import express from "express"
import dotenv from "dotenv";

//dotenv config
dotenv.config({path:"./.env"});
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js"
import router from "./routes/user.routes.js";

const app = express();
app.use(express.json());

//routes
app.use("/user",router);

//home routes / server check
app.get("/",(req,res)=>{
    res.json({message:"Hello from server"})
});

//Middleware /// if route not found
app.use((req,res,next)=>{
    next(new HttpError("Request route not found",404))
})

//  centralize Error handling
app.use((error,req,res,next)=>{
    if(res.headersSent){
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