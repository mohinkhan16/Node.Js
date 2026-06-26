
import express from "express"
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js";
import router from "./router/userRouter.js"
import Dotenv from "dotenv";
Dotenv.config("./.env")

const app = express()

app.use(express.json());


app.use("/JWT", router);

app.get("/",(req,res,next)=>{
    res.json({message:"hello from server"});
})


app.use((req,res,next)=>{
    next(new HttpError("request routes not found"));
})


app.use((error,req,res,next)=>{
    if(res.hedersSent){
        return next(error)
    }
    res.status(error.statuscode || 500).json({
        success:false,
        message:error.message || "internal server error"
    })
});

async function Startserver() {
    try{
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port,()=>{
        console.log(`surver running on port ${port}`);
    })
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

Startserver();